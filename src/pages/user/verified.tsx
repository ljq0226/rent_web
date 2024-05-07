import React, { useEffect, useState } from 'react';
import {
  Descriptions,
  Typography,
  Image,
  Button,
  Message,
} from '@arco-design/web-react';
import styles from './style/index.module.less';
import useStorage from '@/utils/useStorage';
import { post } from '@/utils/http';
import AuthenticationModal from './AuthenticationModal';

function Verified() {
  const [userInfo, setUserData] = useStorage('tenantUser');
  const [visible, setVisible] = React.useState(false);
  const updateInfo = async (dto) => {
    try {
      const { code, msg, data } = await post(
        'tenant/update_tenant/' + userInfo.id,
        {
          isUpdate: true,
          ...dto,
        }
      );
      if (code == 200) {
        setVisible(false);
        setUserData(data);
        Message.success('身份认证成功!');
      }
    } catch (err) {
      Message.error('身份认证失败' + err.toString());
    }
  };
  return (
    <div className={styles.verified}>
      <Typography.Title heading={6}>{'个人实名认证'}</Typography.Title>
      <div className="right-0 mb-2">
        <Button
          type="primary"
          onClick={() => {
            setVisible(true);
          }}
        >
          {userInfo?.isUpdate ? '更新认证信息' : '去认证'}
        </Button>
      </div>
      <Descriptions
        className={styles['verified-enterprise']}
        labelStyle={{ textAlign: 'right' }}
        layout="inline-horizontal"
        colon="："
        column={2}
        data={[
          {
            label: '真实姓名',
            value: userInfo?.realname,
          },
          {
            label: '身份证',
            value: userInfo?.cardId,
          },
          // {
          //   label: '电子签名',
          //   value: (
          //     <>
          //       <Image
          //         width={200}
          //         src={'https://' + userInfo?.signature}
          //         alt="lamp"
          //       />
          //     </>
          //   ),
          // },
        ]}
      />
      <AuthenticationModal
        visible={visible}
        setVisible={setVisible}
        updateInfo={updateInfo}
        userInfo={userInfo}
      />
    </div>
  );
}

export default Verified;
