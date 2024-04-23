import Header from '@/components/Header';
import React, { useEffect, useState } from 'react';
import ListingCard from './components/ListingCard';
import { get } from '@/utils/http';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import ListingInfo from './listinginfo';

const HomePage = () => {
  let { path } = useRouteMatch();
  const [listData, setListData] = useState([]);
  const getListData = async () => {
    const { code, data, msg }: any = await get(`listing/getall_listing`);
    if (code == 200) {
      setListData(data?.arr);
    }
  };
  useEffect(() => {
    getListData();
  }, []);
  return (
    <div>
      <Switch>
        <Route exact path={path}>
          {/* 当用户访问 "/list" 时，显示这里的内容 */}
          <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
            <div className="grid grid-cols-1 gap-8 pt-24 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
              {listData?.map((listing: any) => (
                <ListingCard key={listing.id} data={listing} />
              ))}
            </div>
          </div>
        </Route>
        <Route path={`${path}/:id`}>
          <ListingInfo />
        </Route>
      </Switch>
    </div>
  );
};

export default HomePage;
