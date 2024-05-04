import React from 'react';
import {
  Modal,
  Form,
  Input,
  Button,
  InputNumber,
} from '@arco-design/web-react';

interface Props {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  updateInfo: any;
}
const FormItem = Form.Item;
function AuthenticationModal({ visible, setVisible, updateInfo }: Props) {
  const [form] = Form.useForm();
  return (
    <div>
      <Modal
        title="请先完成身份认证"
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
