import React from 'react';
import dayjs from 'dayjs';
import { Descriptions } from '@arco-design/web-react';
import { PriceTypeMap, RentType } from '@/types';

const ListingDescription = ({ listing }) => {
  const data1 = [
    {
      label: '城市',
      value: listing?.city,
    },
    {
      label: '地址',
      value: listing?.address,
    },
    {
      label: '附近描述',
      value: listing?.nearbyInfo,
    },
  ];
  const data2 = [
    {
      label: '租赁方式',
      value: RentType[listing?.rentType],
    },
    {
      label: '租金',
      value: listing?.price,
    },
    {
      label: '押金',
      value: listing?.deposit,
    },
    {
      label: '租赁周期',
      value: '每' + PriceTypeMap[listing?.priceType],
    },
    {
      label: '可租赁时间',
      value:
        dayjs(listing?.availableFrom).format('YYYY-MM-DD') +
        '——' +
        dayjs(listing?.availableUntil).format('YYYY-MM-DD'),
    },
  ];
  const data3 = [
    {
      label: '房间数',
      value: listing?.roomCount,
    },
    //客厅
    {
      label: '客厅',
      value: listing?.livingroomCount,
    },
    //卫生间
    {
      label: '卫生间',
      value: listing?.bathroomCount,
    },
    {
      label: '面积',
      value: listing?.area,
    },
    //楼层
    {
      label: '楼层',
      value: listing?.floor,
    },
    //楼层总数
    {
      label: '楼层总数',
      value: listing?.totalFloor,
    },
    //建筑年份
    {
      label: '建筑年份',
      value: listing?.buildYear,
    },
    {
      label: '朝向',
      value: listing?.direction,
    },
  ];
  return (
    <div className="p-4 border rounded-sm shadow-sm">
      <Descriptions
        column={1}
        title="基本信息"
        data={data1}
        style={{ marginBottom: 20 }}
        labelStyle={{ paddingRight: 36 }}
      />
      <Descriptions
        column={1}
        title="租赁信息"
        data={data2}
        style={{ marginBottom: 20 }}
        labelStyle={{ paddingRight: 36 }}
      />
      <Descriptions
        column={2}
        title="建筑信息"
        data={data3}
        style={{ marginBottom: 20 }}
        labelStyle={{ paddingRight: 36 }}
      />
    </div>
  );
};

export default ListingDescription;
