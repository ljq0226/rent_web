import React from 'react';

const Login = () => {
  return (
    <section className="flex flex-col items-center justify-center h-screen mx-5 my-2 space-y-10 md:flex-row md:space-y-0 md:space-x-16 md:mx-0 md:my-0">
      <div className="max-w-sm md:w-1/3">
        <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          alt="Sample image"
        />
      </div>
      <div className="max-w-sm md:w-1/3">
        <div className="text-center md:text-left">
          <label className="mr-1">Sign in with</label>
          <button
            type="button"
            className="mx-1 h-9 w-9  rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-[0_4px_9px_-4px_#3b71ca]"
          >
          </button>
          <button
            type="button"
            className="inlne-block mx-1 h-9 w-9 rounded-full bg-blue-600 hover:bg-blue-700 uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca]"
          >
          </button>
        </div>
        <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
          <p className="mx-4 mb-0 font-semibold text-center text-slate-500">
            Or
          </p>
        </div>
        <input
          className="w-full px-4 py-2 text-sm border border-gray-300 border-solid rounded"
          type="text"
          placeholder="Email Address"
        />
        <input
          className="w-full px-4 py-2 mt-4 text-sm border border-gray-300 border-solid rounded"
          type="password"
          placeholder="Password"
        />
        <div className="flex justify-between mt-4 text-sm font-semibold">
          <label className="flex cursor-pointer text-slate-500 hover:text-slate-600">
            <input className="mr-1" type="checkbox" />
            <span>Remember Me</span>
          </label>
          <a
            className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4"
            href="#"
          >
            Forgot Password?
          </a>
        </div>
        <div className="text-center md:text-left">
          <button
            className="px-4 py-2 mt-4 text-xs tracking-wider text-white uppercase bg-blue-600 rounded hover:bg-blue-700"
            type="submit"
          >
            Login
          </button>
        </div>
        <div className="mt-4 text-sm font-semibold text-center text-slate-500 md:text-left">
          Don&apos;t have an account?{' '}
          <a
            className="text-red-600 hover:underline hover:underline-offset-4"
            href="#"
          >
            Register
          </a>
        </div>
      </div>
    </section>
  );
};

export default Login;
