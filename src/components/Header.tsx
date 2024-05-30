import React, { useEffect, useRef, useState } from 'react';
import { Navigation, LogIn, LogOut, X } from 'lucide-react';
import { Link, useHistory } from 'react-router-dom';
import { Avatar, Dropdown, Menu, Button, Space } from '@arco-design/web-react';
import useStorage from '@/utils/useStorage';
import Logo from './Logo';
// import { debounce } from 'lodash';
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}

function Header({ placeholder = '', setSearchInput, searchInput }: any) {
  const inputRef = useRef(null);
  const [tenantUser, , removeTenantUser] = useStorage('tenantUser');
  const user = JSON.parse(localStorage.getItem('rent_tenant') as string);
  const history = useHistory();
  const [avatar, setAvatar] = useState(
    tenantUser?.avatar ? 'https://' + tenantUser?.avatar : '/assets/avatar.jpg'
  );
  useEffect(() => {
    if (tenantUser) {
      setAvatar(
        tenantUser?.avatar
          ? 'https://' + tenantUser?.avatar
          : '/assets/avatar.jpg'
      );
    }
  }, [tenantUser]);
  const handleSearch = () => {
    const input = inputRef.current.value;
    setSearchInput(input);
    history.push(`/list?searchInput=${input}`);
  };
  const signIn = () => {
    history.push('/login');
  };
  const signOut = () => {
    history.push('/login');
  };
  const dropList = (
    <Menu>
      <Menu.Item
        key="wishlist"
        onClick={() => {
          history.push('/wishlist');
        }}
      >
        我的心愿单
      </Menu.Item>
      <Menu.Item
        key="order"
        onClick={() => {
          history.push('/order');
        }}
      >
        我的订单
      </Menu.Item>
      <Menu.Item
        key="contract"
        onClick={() => {
          history.push('/contractlist');
        }}
      >
        我的合同
      </Menu.Item>
      <Menu.Item
        key="user"
        onClick={() => {
          history.push('/user');
        }}
      >
        用户设置
      </Menu.Item>
      {!tenantUser ? (
        <Menu.Item key="in" onClick={signIn}>
          登录
        </Menu.Item>
      ) : (
        <Menu.Item key="out" onClick={signOut}>
          退出登录
        </Menu.Item>
      )}
    </Menu>
  );
  return (
    <div>
      <header className="sticky top-0 z-50 flex justify-between grid-cols-3 p-4 space-x-1 bg-white border-b shadow-sm md:px-6">
        {/* Left */}
        <Link to="/">
          <div
            className={`-mb-5 ml-4  flex h-12 cursor-pointer items-center object-contain xs:-ml-0 ${
              user && 'child:mt-3'
            } `}
          >
            <Logo />
          </div>
        </Link>
        {/* Middle */}
        <div className="my-auto flex h-12 max-w-[180px] flex-grow items-center rounded-full border-2 px-2 shadow-sm md:max-w-sm xs:max-w-sm">
          <input
            type="text"
            ref={inputRef}
            className="flex-1 pl-2 truncate bg-transparent outline-none text-gray-6 00"
            placeholder={placeholder ? placeholder : '输入你想去的地方'}
            onChange={(event) => {
              console.log('aaaasasasassa');
              const value = event.target.value;
              const debouncedFunction = debounce(
                () => setSearchInput(value),
                1000
              );
              // debounce(setSearchInput(value), 100);
              debouncedFunction();
            }}
            onKeyDown={(event) => event.key === 'Enter' && handleSearch()}
          />
          {searchInput && (
            <X
              onClick={() => {
                inputRef.current.value = '';
                setSearchInput('');
                handleSearch();
              }}
              className="w-[15px] h-[15px] cursor-pointer"
            />
          )}
          <div onClick={handleSearch}>
            <Navigation className="-mr-[2px] ml-3 h-9 w-9 cursor-pointer rounded-full bg-opacity-75 p-2 hover:bg-opacity-95" />
          </div>
        </div>
        {/* Right */}
        <div>
          <Dropdown droplist={dropList} position="bl">
            <Avatar className={'cursor-pointer'}>
              <img alt="avatar" src={avatar} />
            </Avatar>
          </Dropdown>
        </div>
      </header>
    </div>
  );
}

export default Header;
