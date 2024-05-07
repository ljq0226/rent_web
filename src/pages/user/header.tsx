import React, { useEffect, useState } from 'react';
import {
  Button,
  Avatar,
  Upload,
  Descriptions,
  Tag,
  Skeleton,
  Link,
  Message,
} from '@arco-design/web-react';
import { debounce } from 'lodash';
import { IconCamera, IconPlus } from '@arco-design/web-react/icon';
import styles from './style/header.module.less';
import useStorage from '@/utils/useStorage';
import dayjs from 'dayjs';
import { post, uploadFile } from '@/utils/http';

export default function Info() {
  const [userInfo, setUserInfo] = useStorage('tenantUser');
  const [avatar, setAvatar] = useState(
    userInfo?.avatar
      ? 'https://' + userInfo?.avatar
      : '../../../public/assets/avatar.jpg'
  );

  const onAvatarChange = debounce(async (_, file) => {
    const { code, data, msg }: any = await uploadFile(
      'upload',
      file.originFile
    );
    if (code == 200) {
      const newAvatar = 'https://' + data.fileUrl;
      const res = await post('tenant/update_tenant/' + userInfo.id, {
        avatar: data.fileUrl,
      });
      if (res?.code == 200) {
        setAvatar(newAvatar);
        setUserInfo(res?.data);
        Message.success('头像修改成功');
      }
    } else {
      Message.error(msg);
    }
  }, 300);

  useEffect(() => {
    if (userInfo) {
      if (userInfo?.avatar) setAvatar('https://' + userInfo.avatar);
    }
  }, [userInfo]);

  return (
    <div className={styles['info-wrapper']}>
      <Upload showUploadList={false} onChange={onAvatarChange}>
        {
          <Avatar
            size={100}
            triggerIcon={<IconCamera />}
            className={styles['info-avatar']}
          >
            {<img src={avatar} />}
          </Avatar>
        }
      </Upload>
      <Descriptions
        className={styles['info-content']}
        column={1}
        colon="："
        labelStyle={{ textAlign: 'right' }}
        data={[
          {
            label: '用户名',
            value: userInfo.username,
          },
          {
            label: '账号 ID',
            value: userInfo.id,
          },
          {
            label: '注册时间',
            value: dayjs(userInfo.createdAt).format('YYYY-MM-DD HH:mm:ss'),
          },
        ]}
      ></Descriptions>
    </div>
  );
}
