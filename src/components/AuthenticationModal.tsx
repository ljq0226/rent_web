import React from 'react';
import { Modal, Form, Input, Message } from '@arco-design/web-react';

interface Props {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  updateInfo: any;
}
const FormItem = Form.Item;
function AuthenticationModal({ visible, setVisible, updateInfo }: Props) {
  const [form] = Form.useForm();
  const handleSubmit = async () => {
    try {
      await form.validate();
      updateInfo(form.getFieldsValue());
    } catch (error) {
      Message.error('表单校验失败!');
      console.error(error); // 输出校验错误信息
    }
  };
  return (
    <div>
      <Modal
        title="请先完成身份认证"
        visible={visible}
        onOk={() => {
          handleSubmit();
        }}
        onCancel={() => setVisible(false)}
        autoFocus={false}
        focusLock={true}
      >
        <Form form={form} autoComplete="off">
          <FormItem
            label="姓名"
            field="realname"
            rules={[
              {
                match: /^[\u4e00-\u9fa5]{2,4}$/,
                message: '请输入有效的姓名',
              },
            ]}
          >
            <Input placeholder="请输入你的真实姓名" />
          </FormItem>
          <FormItem
            label="身份证"
            field="cardId"
            rules={[
              {
                match:
                  /^\d{6}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dX]$/,
                message: '请输入有效的身份证ID',
              },
            ]}
          >
            <Input placeholder="请输入你的身份证" />
          </FormItem>
          <FormItem
            label="电话号码"
            field="phone"
            rules={[
              { match: /^1[3-9]\d{9}$/, message: '请输入有效的电话号码' },
            ]}
          >
            <Input placeholder="请输入你的电话号码" />
          </FormItem>
        </Form>
      </Modal>
    </div>
  );
}

export default AuthenticationModal;
