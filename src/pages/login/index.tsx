import { post } from '@/utils/http';
import useStorage from '@/utils/useStorage';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Message } from '@arco-design/web-react';

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [tenantUser, setTenantUser] = useStorage('tenantUser');
  const history = useHistory();
  const submit = async () => {
    try {
      const { code, msg, data } = isRegister
        ? await post('tenant/register', {
            username,
            password,
          })
        : await post('tenant', {
            username,
            password,
          });
      if (code == 200) {
        setTenantUser(data);
        history.push('/');
        Message.success(isRegister ? '注册并登录成功' : '登录成功');
      }
    } catch (error: any) {
      console.log('error', error);
    }
  };
  return (
    <section className="flex flex-col items-center justify-center h-screen mx-5 my-2 space-y-10 md:flex-row md:space-y-0 md:space-x-16 md:mx-0 md:my-0">
      <div className="max-w-sm md:w-1/3">
        <img src="/public/assets/login.webp" alt="login image" />
      </div>
      <div className="max-w-sm md:w-1/3">
        <div className="text-center md:text-left"></div>
        <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
          <p className="mx-4 mb-0 text-2xl font-bold text-center text-font-bold">
            {isRegister ? '注册账号' : '登录账号'}
          </p>
        </div>
        <input
          className="w-full px-4 py-2 text-sm border border-gray-300 border-solid rounded"
          type="text"
          placeholder="用户名"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="w-full px-4 py-2 mt-4 text-sm border border-gray-300 border-solid rounded"
          type="password"
          placeholder="密码"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <div className="flex justify-between mt-4 text-sm font-semibold">
          <label className="flex cursor-pointer text-slate-500 hover:text-slate-600">
            <input className="mr-1" type="checkbox" />
            <span>记住密码</span>
          </label>
        </div>
        <div className="text-center md:text-left">
          <button
            className="w-full px-4 py-2 mt-4 text-xs tracking-wider text-white uppercase bg-blue-600 rounded hover:bg-blue-700"
            type="submit"
            onClick={submit}
          >
            {isRegister ? '注册' : '登录'}
          </button>
        </div>
        <div className="mt-4 text-sm font-semibold text-center text-slate-500 md:text-left">
          <div
            className="text-red-600 hover:underline hover:underline-offset-4"
            onClick={() => {
              setIsRegister(!isRegister);
            }}
          >
            {isRegister ? '去登录' : '没有账号?去注册'}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
