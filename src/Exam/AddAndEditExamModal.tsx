import * as React from "react";
import { Modal, Form, Input, message } from "antd";
import { examRequest } from "../request";

export const AddAndEditExamModal: React.FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      const res = await examRequest.AddExam(values);
      if (res.status === 201 || res.status === 200) {
        message.success("添加成功", 1, onClose);
      }
    } catch (error) {}
  };

  return (
    <Modal open={open} onCancel={onClose} title="添加试卷" onOk={form.submit}>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        form={form}
        onFinish={onFinish}
      >
        <Form.Item
          label="试卷名称"
          name="name"
          required
          rules={[
            {
              validator: (_, value, callback) => {
                if (!value) {
                  callback("请填写试卷名称");
                }
                callback();
              },
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="试卷内容"
          name="content"
          required
          rules={[
            {
              validator: (_, value, callback) => {
                if (!value) {
                  callback("试卷内容");
                }
                callback();
              },
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
