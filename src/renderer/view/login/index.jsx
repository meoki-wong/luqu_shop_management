import React from 'react';
import './index.scss';
import { Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { request } from '../api/request';
import BASE from '../utils/base';
import logo from '../assets/luqu-logo.png';

export default function Login() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const goLogin = () => {
    form.validateFields({ validateOnly: true }).then(
      async (params) => {
        console.log('成功', params);
        try {
          const res = await request.post('/Account/LoginByPhoneNumber', params);

          const { data } = res;
          console.log('=======chegng ', data);

          localStorage.setItem('token', data.access_token);
          localStorage.setItem('expired_in', Date.now() + data.expires_in * 1000);
          const userInfo = (await request.get('/Account/Get')).data;
          localStorage.setItem('user', JSON.stringify(userInfo));
          localStorage.setItem('roleType', BASE.SHOP_ROLE);
          navigate('/');
        } catch (err) {
          console.log(err);
        }

        // getApp().globalData.userId = userInfo.ITCode
        // console.log(userInfo);

        // uni.navigateTo({
        // 	url: "/pages/role-choose/role-choose"
        // })
      },
      (e) => {
        console.log('---失败', e);
      },
    );
  };
  return (
    <div className="login-contain">
      <div className="input-box">
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div className="logo">
            <img src={logo} alt="" />
          </div>
          <Form.Item label="用户名" name="account" rules={[{ required: true, message: '请输入用户名!' }]}>
            <Input />
          </Form.Item>

          <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码!' }]}>
            <Input.Password />
          </Form.Item>
        </Form>
        <div className="login-btn" onClick={goLogin}>
          登录
        </div>
      </div>
    </div>
  );
}
