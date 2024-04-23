import React, { useState } from 'react';
import { Navigation, LogIn, LogOut } from 'lucide-react';
import { Link, useHistory } from 'react-router-dom';
import { Avatar, Dropdown, Menu, Button, Space } from '@arco-design/web-react';
import useStorage from '@/utils/useStorage';
function Header({ placeholder = '' }) {
  const [searchInput, setSearchInput] = useState('');
  const [tenantUser, , removeTenantUser] = useStorage('tenantUser');
  const user = JSON.parse(localStorage.getItem('rent_tenant') as string);
  const history = useHistory();
  const signIn = () => {
    history.push('/login');
  };
  const signOut = () => {
    history.push('/login');
  };
  const dropList = (
    <Menu>
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
      <header className="sticky top-0 z-50 flex justify-between grid-cols-3 p-4 space-x-1 bg-white border-b shadow-md md:px-6">
        {/* Left */}
        <Link to="/">
          <div
            className={`-mb-5 -ml-3 flex h-12 cursor-pointer items-center object-contain xs:-ml-0 ${
              user && 'child:mt-3'
            } `}
          >
            {/* <AirbnbIcon className="w-16 h-16" />
            <AirbnbLogo className="hidden h-10 w-28 md:inline-flex" /> */}
          </div>
        </Link>
        {/* Middle */}
        <div className="my-auto flex h-12 max-w-[180px] flex-grow items-center rounded-full border-2 px-2 shadow-sm md:max-w-sm xs:max-w-sm">
          <input
            type="text"
            className="flex-1 pl-2 truncate bg-transparent outline-none text-gray-6 00"
            placeholder={placeholder ? placeholder : '输入你想去的地方'}
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
          />
          <div>
            <Navigation className="-mr-[2px] ml-3 h-9 w-9 cursor-pointer rounded-full bg-opacity-75 p-2 hover:bg-opacity-95" />
          </div>
        </div>
        {/* Right */}
        <div>
          <Dropdown droplist={dropList} position="bl">
            <Avatar className={'cursor-pointer'}>
              <img alt="avatar" src="/public/assets/avatar.jpg" />
            </Avatar>
          </Dropdown>
        </div>
      </header>
    </div>
  );
}

export default Header;
