import React, { useEffect, useState } from 'react';
import ListingCard from './components/ListingCard';
import { get } from '@/utils/http';
import {
  Route,
  Switch,
  useRouteMatch,
  useHistory,
  useLocation,
} from 'react-router-dom';
import ListingInfo from './listinginfo';
import Loader from '@/components/Loader';
import { Radio, Form } from '@arco-design/web-react';
import { parseUrl } from '@/utils';
const RadioGroup = Radio.Group;
const HomePage = () => {
  let { path } = useRouteMatch();
  const history = useHistory();
  const [listData, setListData] = useState([]);
  const [price, setPrice] = useState();
  const [rentType, setRentType] = useState();
  const [roomCount, setRoomCount] = useState();

  const location = useLocation();
  const [searchInput, setSearchInput] = useState(
    parseUrl(location.search)['searchInput'] || ''
  );
  const [loading, setLoading] = useState(false);
  const getListDataBySearch = async (searchInput: string) => {
    const body = {
      price,
      rentType,
      roomCount,
      searchInput,
      isShort: false,
    };
    const queryString = Object.keys(body)
      .map((key) => {
        if (body[key] !== undefined) {
          return key + '=' + encodeURIComponent(body[key]);
        } else {
          return '';
        }
      })
      .join('&');
    const { msg, data, code }: any = await get(
      'listing/getall_listing_bysearch_short/?' + queryString
    );
    if (code === 200) {
      setListData(data?.arr);
      setTimeout(() => {
        setLoading(false);
      }, 800);
    }
  };
  const getListData = async () => {
    const { code, data, msg }: any = await get(`listing/getall_listing_notshort`);
    if (code == 200) {
      setListData(data?.arr);
    }
  };
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchInput) {
      setLoading(true);
      getListDataBySearch(searchInput);
    } else {
      getListData();
    }
  }, [searchInput]);
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (price !== undefined) {
      (price as number) < 0
        ? searchParams.delete('price')
        : searchParams.set('price', price);
    }

    if (rentType !== undefined) {
      (rentType as number) < 0
        ? searchParams.delete('rentType')
        : searchParams.set('rentType', rentType);
    }

    if (roomCount !== undefined) {
      (roomCount as number) < 0
        ? searchParams.delete('roomCount')
        : searchParams.set('roomCount', roomCount);
    }
    getListDataBySearch(searchInput);
    history.replace({
      pathname: location.pathname,
      search: searchParams.toString(),
    });
  }, [price, rentType, roomCount, searchInput]);
  useEffect(() => {
    setSearchInput(parseUrl(location.search)['searchInput']);
  }, [location.search]);
  return (
    <div>
      <Switch>
        <Route exact path={path}>
          {/* 当用户访问 "/list" 时，显示这里的内容 */}
          {loading ? (
            <Loader />
          ) : (
            <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
              <div className="flex flex-col px-4 pt-12">
                <div className="flex items-center justify-center">
                  <div className="flex items-center justify-center mr-2">
                    租金:
                  </div>
                  <RadioGroup
                    type="button"
                    name="price"
                    onChange={(value) => {
                      setPrice(value);
                    }}
                  >
                    <Radio value={-1}>不限</Radio>
                    <Radio value={0}>1000元以下</Radio>
                    <Radio value={1250}>1000~1500元</Radio>
                    <Radio value={1750}>1500~2000元</Radio>
                    <Radio value={2250}>2000~2500元</Radio>
                    <Radio value={2750}>2500~3000元</Radio>
                    <Radio value={3000}>3000元以上</Radio>
                  </RadioGroup>
                  <div className="flex-1"></div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="flex items-center justify-center mr-2">
                    厅室:
                  </div>
                  <RadioGroup
                    type="button"
                    name="roomcount"
                    onChange={(value) => {
                      setRoomCount(value);
                    }}
                  >
                    <Radio value={-1}>不限</Radio>
                    <Radio value={1}>一室</Radio>
                    <Radio value={2}>二室</Radio>
                    <Radio value={3}>三室</Radio>
                    <Radio value={4}>三室以上</Radio>
                  </RadioGroup>
                  <div className="flex-1"></div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="flex items-center justify-center mr-2">
                    方式:
                  </div>
                  <RadioGroup
                    type="button"
                    name="rentType"
                    onChange={(value) => {
                      console.log('value', value);
                      setRentType(value);
                    }}
                  >
                    <Radio value={-1}>不限</Radio>
                    <Radio value={0}>整租</Radio>
                    <Radio value={1}>合租/单间</Radio>
                  </RadioGroup>
                  <div className="flex-1"></div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-8 pt-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
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
