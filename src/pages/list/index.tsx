import Header from '@/components/Header';
import React, { useEffect, useState } from 'react';
import ListingCard from './components/ListingCard';
import { get } from '@/utils/http';
import {
  Route,
  Switch,
  useRouteMatch,
  useParams,
  useLocation,
} from 'react-router-dom';
import ListingInfo from './listinginfo';
import useStorage from '@/utils/useStorage';
import Loader from '@/components/Loader';

const HomePage = () => {
  let { path } = useRouteMatch();
  const [listData, setListData] = useState([]);
  const location = useLocation();
  const searchInput = location.search.split('=')[1];
  const [, setSearchInput] = useStorage('searchInput');
  const [loading, setLoading] = useState(false);
  const getListDataBySearch = async (searchInput: string) => {
    const { msg, data, code }: any = await get(
      'listing/getall_listing_bysearch/' + searchInput
    );
    if (code === 200) {
      setListData(data?.arr);
      setTimeout(() => {
        setLoading(false);
      }, 800);
    }
  };
  const getListData = async () => {
    const { code, data, msg }: any = await get(`listing/getall_listing`);
    if (code == 200) {
      setListData(data?.arr);
    }
  };
  useEffect(() => {
    if (searchInput) {
      setLoading(true);
      getListDataBySearch(searchInput);
    } else {
      getListData();
    }
  }, [searchInput]);
  return (
    <div>
      <Switch>
        <Route exact path={path}>
          {/* 当用户访问 "/list" 时，显示这里的内容 */}
          {loading ? (
            <Loader />
          ) : (
            <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
              <div className="grid grid-cols-1 gap-8 pt-24 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                {listData?.map((listing: any) => (
                  <ListingCard key={listing.id} data={listing} />
                ))}
                {listData?.length == 0 && (
                  <h1 className="flex justify-center w-full">暂无搜索结果</h1>
                )}
              </div>
            </div>
          )}
        </Route>
        <Route path={`${path}/:id`}>
          <ListingInfo />
        </Route>
      </Switch>
    </div>
  );
};

export default HomePage;
