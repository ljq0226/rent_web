'use client';

import useStorage from '@/utils/useStorage';
import { Button, Message } from '@arco-design/web-react';
import { useEffect, useState } from 'react';

const Heading = ({ title, subTitle, center, listing }: any) => {
  const [wishList, setWishList] = useStorage('wishList', []);
  const [isInWishList, setIsInWishList] = useState(false);
  const handleClick = () => {
    if (isInWishList) {
      setWishList(wishList.filter((item) => item.id !== listing.id));
      setIsInWishList(false);
      Message.info('从心愿单移除');
    } else {
      setIsInWishList(true);
      setWishList([...wishList, listing]);
      Message.success('添加到心愿单');
    }
  };
  useEffect(() => {
    wishList.map((item) => {
      if (item.id == listing.id) {
        setIsInWishList(true);
      }
    });
  }, [wishList]);
  return (
    <div className="flex items-center justify-center">
      <div className={center ? 'text-center' : 'text-start'}>
        <div className="text-2xl font-bold">{title}</div>
        <div className="mt-2 font-light text-neutral-500">{subTitle}</div>
      </div>
      <div className="flex-1"></div>
      <div>
        {isInWishList ? (
          <Button onClick={handleClick}>从心愿单中移除</Button>
        ) : (
          <Button onClick={handleClick}>添加到心愿单</Button>
        )}
      </div>
    </div>
  );
};

export default Heading;
