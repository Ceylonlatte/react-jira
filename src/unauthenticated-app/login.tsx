import React, { FormEvent } from "react";
import { useAuth } from "context/auth-context";
import { Form, Input, Button } from "antd";

export const LoginScreen = () => {
  const { login, user } = useAuth();

  // HTMLFormElement extends Element
  const handleSubmit = (values: { username: string; password: string }) => {
    login(values);
  };

  return (
    <Form onFinish={handleSubmit}>
      {user ? <div>登陆成功,用户名： {user?.name}</div> : null}
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input type="text" id={"username"} />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input type="password" id={"password"} />
      </Form.Item>
      <Button htmlType={"submit"} type={"primary"}>
        登录
      </Button>
    </Form>
  );
};
