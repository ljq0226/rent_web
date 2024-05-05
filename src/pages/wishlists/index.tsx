import React, { useEffect, useState } from 'react';
import ListingCard from '../list/components/ListingCard';
import useStorage from '@/utils/useStorage';

const WishList = () => {
  const [listData, setListData] = useStorage('wishList', []);
  return (
    <div className="w-full px-[15%] h-[80vh]">
      <h1>我的心愿单</h1>
      <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
        <div className="grid grid-cols-1 gap-8 pt-24 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {listData?.map((listing: any) => (
            <ListingCard key={listing.id} data={listing} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishList;
