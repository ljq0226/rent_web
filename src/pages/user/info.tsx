import React, { useContext } from 'react';
import {
  Input,
  Select,
  Cascader,
  Button,
  Form,
  Space,
  Message,
  Skeleton,
} from '@arco-design/web-react';

function InfoForm() {
  const [form] = Form.useForm();

  const handleSave = async () => {
    try {
      await form.validate();
      Message.success('userSetting.saveSuccess');
    } catch (_) {}
  };

  const handleReset = () => {
    form.resetFields();
  };

  const loadingNode = (rows = 1) => {
    return (
      <Skeleton
        text={{
          rows,
          width: new Array(rows).fill('100%'),
        }}
        animation
      />
    );
  };

  return (
    <Form
      style={{ width: '500px', marginTop: '6px' }}
      form={form}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
    >
      <Form.Item label={'邮箱'} field="email">
        {<Input placeholder={''} />}
      </Form.Item>

      <Form.Item label=" ">
        <Space>
          <Button type="primary" onClick={handleSave}>
            {'保存'}
          </Button>
          <Button onClick={handleReset}>{'重置'}</Button>
        </Space>
      </Form.Item>
    </Form>
  );
}

export default InfoForm;
