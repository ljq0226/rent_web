import React, { useEffect, useRef, useState } from 'react';
import { Modal, Form, Input, Button, Message } from '@arco-design/web-react';
import SignatureCanvas from 'react-signature-canvas';
import { uploadFile } from '@/utils/http';
interface Props {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  updateInfo: any;
  userInfo: any;
}
const FormItem = Form.Item;
function AuthenticationModal({
  visible,
  setVisible,
  updateInfo,
  userInfo,
}: Props) {
  const [form] = Form.useForm();
  const { realname, cardId } = userInfo;
  useEffect(() => {
    form.setFieldsValue({
      realname,
      cardId,
    });
  }, [userInfo]);
  return (
    <div>
      <Modal
        title="身份认证"
        visible={visible}
        onOk={() => {
          updateInfo(form.getFieldsValue());
        }}
        onCancel={() => setVisible(false)}
        autoFocus={false}
        focusLock={true}
      >
        <Form form={form} autoComplete="off">
          <FormItem label="姓名" field="realname">
            <Input placeholder="请输入你的真实姓名" />
          </FormItem>
          <FormItem label="身份证" field="cardId">
            <Input placeholder="请输入你的身份证" />
          </FormItem>
        </Form>
      </Modal>
    </div>
  );
}

export default AuthenticationModal;
