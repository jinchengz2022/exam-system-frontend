import React from "react";
import { Button, Form, Input, Space, message } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { userRequest } from "../request";

const { Item } = Form;

export const Login = () => {
  const [form] = Form.useForm();
  const nagetive = useNavigate();
  const { pathname } = useLocation();

  const topicObject: any = {
    "/register": {
      theme: "注册",
      operate: "注册",
    },
    "/login": {
      theme: "用户登录",
      operate: "登录",
    },
    "/updatePwd": {
      theme: "修改密码",
      operate: "更新",
    },
  };

  const onFinish = async (values: any) => {
    try {
      const res = pathname.includes("register")
        ? await userRequest.Register(values)
        : pathname.includes("updatePwd")
        ? await userRequest.UpdatePassword(values)
        : await userRequest.Login(values);
      if (res.status === 201 || res.status === 200) {
        message.success("操作成功!", 1, () => nagetive("/"));
      } else {
        message.error(res.data.data);
      }
    } catch (error: any) {
        message.error(error.response.data.message);
        console.log(error);
    }
  };

  const getCode = async (action: "register" | "updatePwd") => {
    const email = form.getFieldValue("email");
    const res = await userRequest.GetCode({ to: email, action });
    if (res.status === 201 || res.status === 200) {
      message.success("发送成功!");
    } else {
      message.error(res.data.data);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 200 }}>
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        onFinish={onFinish}
        layout="horizontal"
      >
        <Item label=" " colon={false} style={{ marginBottom: 0 }}>
          <h2>{topicObject?.[pathname]?.theme}</h2>
        </Item>
        <Item
          label="用户名"
          name="userName"
          required
          rules={[
            {
              validator(_, value, callback) {
                if (!value) {
                  callback("请输入用户名");
                }
                callback();
              },
            },
          ]}
        >
          <Input style={{ width: 300 }} />
        </Item>
        <Item
          style={{ marginBottom: pathname.includes("login") ? 0 : undefined }}
          label="密码"
          name="password"
          required
          rules={[
            {
              validator(_, value, callback) {
                if (!value) {
                  callback("请输入密码");
                }
                callback();
              },
            },
          ]}
        >
          <Input.Password style={{ width: 300 }} />
        </Item>

        {["/register", "/updatePwd"].includes(pathname) ? (
          <Item
            label="邮箱"
            name="email"
            required
            rules={[
              {
                validator(_, value, callback) {
                  if (!value) {
                    callback("邮箱");
                  }
                  callback();
                },
              },
            ]}
          >
            <Input style={{ width: 300 }} />
          </Item>
        ) : null}

        {["/register", "/updatePwd"].includes(pathname) ? (
          <Item required label="验证码">
            <Space>
              <Item
                style={{ marginBottom: 0 }}
                name="captcha"
                required
                rules={[
                  {
                    validator(_, value, callback) {
                      if (!value) {
                        callback("请输入验证码");
                      }
                      callback();
                    },
                  },
                ]}
              >
                <Input style={{ width: 190 }} />
              </Item>
              <Button onClick={() => getCode(pathname.split("/")[1] as any)}>
                获取验证码
              </Button>
            </Space>
          </Item>
        ) : null}
        {pathname.includes("login") ? (
          <Item label=" " colon={false} style={{ marginBottom: 0 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span onClick={() => nagetive("/register")}>注册</span>
              <span onClick={() => nagetive("/updatePwd")}>忘记密码？</span>
            </div>
          </Item>
        ) : null}
        <Item label=" " colon={false}>
          <Button onClick={form.submit} type="primary" style={{ width: 300 }}>
            {topicObject[pathname].operate}
          </Button>
        </Item>
      </Form>
    </div>
  );
};
