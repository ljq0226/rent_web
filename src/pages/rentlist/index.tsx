import Header from '@/components/Header';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import ListingCard from './components/ListingCard';
import { get } from '@/utils/http';
import { throttle } from 'lodash';
import {
  Route,
  Switch,
  useRouteMatch,
  useHistory,
  useLocation,
} from 'react-router-dom';
import ListingInfo from './listinginfo';
import Loader from '@/components/Loader';
import { Radio, Form, Cascader } from '@arco-design/web-react';
import useStorage from '@/utils/useStorage';
import { PuffLoader } from 'react-spinners';
import { cityOptions, cityString } from '../list/cityoptions';
const RadioGroup = Radio.Group;
const SIZE = 8;
const HomePage = () => {
  let { path } = useRouteMatch();
  const history = useHistory();
  const [listData, setListData] = useState([]);
  const [rawData, setRawData] = useState([]);
  const [page, setPage] = useState(1);
  const [bottomLoading, setBottomLoading] = useState(false);
  const [price, setPrice] = useState();
  const [rentType, setRentType] = useState();
  const [roomCount, setRoomCount] = useState();
  const [city, setCity] = useState('');
  const [selectValue, setSelectValue] = useState<any>('');
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useStorage('searchInput', '');
  const listingListRef = useRef(null);
  const getListDataBySearch = async (searchInput: string) => {
    const body = {
      price,
      rentType,
      roomCount,
      searchInput,
      isShort: 1,
      city,
    };
    const queryString = Object.keys(body)
      .map((key) => {
        if (key == 'city' && body[key] == '') return '';
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
      setRawData(data?.arr);
      setListData(data?.arr?.slice(0, SIZE * page));
      setTimeout(() => {
        setLoading(false);
      }, 800);
    }
  };
  const getListData = async () => {
    const { code, data, msg }: any = await get(
      `listing/getall_listing_notshort`
    );
    if (code == 200) {
      setRawData(data?.arr);
      setListData(data?.arr.slice(0, SIZE * page));
    }
  };
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
  }, [price, rentType, roomCount]);
  useEffect(() => {
    if (searchInput) {
      setLoading(true);
      getListDataBySearch(searchInput);
    } else {
      getListData();
    }
  }, [searchInput]);

  useEffect(() => {
    const state = location.state as any;
    if (state?.city) {
      const a: any = cityString(state?.city);
      setSelectValue(a);
    }
  }, [location.state]);

  useEffect(() => {
    setLoading(true);
    getListDataBySearch(searchInput);
  }, [selectValue]);
  const scrollEventer = () => {
    //滚动到底部剩余 150px 时触发
    if (
      document.documentElement.scrollHeight -
        (document.documentElement.scrollTop + window.innerHeight) <=
      100
    ) {
      const maxPage = Math.ceil(rawData?.length / SIZE);
      if (page < maxPage) {
        setBottomLoading(true);
        setTimeout(() => {
          setPage(page + 1);
          setBottomLoading(false);
        }, 1000);
      }
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', throttle(scrollEventer, 1000));
    return () => {
      window.removeEventListener('scroll', throttle(scrollEventer, 1000));
    };
  }, [rawData]);
  useEffect(() => {
    if (page <= Math.ceil(rawData.length / SIZE) || 1) {
      const newData = [
        ...listData,
        ...rawData.slice(SIZE * (page - 1), SIZE * page),
      ];
      setListData(newData);
    } else {
      window.removeEventListener('scroll', throttle(scrollEventer, 1000));
    }
  }, [page]);

  useEffect(() => {
    // setSearchInput(parseUrl(location.search)['searchInput']);
  }, []);
  return (
    <div>
      <Switch>
        <Route exact path={path}>
          {/* 当用户访问 "/list" 时，显示这里的内容 */}
          {loading ? (
            <Loader />
          ) : (
            <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4 pb-8">
              <div className="flex flex-col px-4 pt-12">
                <div className="flex items-center justify-center">
                  <div className="flex items-center justify-center mr-2">
                    城市:
                  </div>
                  <Cascader
                    allowClear
                    placeholder="选择城市"
                    expandTrigger="hover"
                    onChange={(value: any) => {
                      console.log('value', value);
                      if (value == undefined) {
                      } else {
                        setCity(value[1]);
                        setSelectValue(value);
                      }
                    }}
                    style={{ width: 300, marginBottom: 10 }}
                    options={cityOptions}
                    value={selectValue}
                  />
                  <div className="flex-1"></div>
                </div>
                <div className="flex items-center justify-center mb-2">
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
                <div className="flex items-center justify-center mb-2">
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
                <div className="flex items-center justify-center mb-2">
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
              <div
                ref={listingListRef}
                className="grid grid-cols-1 gap-8 pt-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5"
              >
                {listData?.map((listing: any) => (
                  <ListingCard key={listing.id} data={listing} />
                ))}
                {listData?.length == 0 && (
                  <h1 className="flex justify-center w-full">暂无搜索结果</h1>
                )}
              </div>
              {bottomLoading && (
                <h1 className="flex justify-center w-full">
                  <PuffLoader size={40} color="#e03f5f" />
                </h1>
              )}
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
