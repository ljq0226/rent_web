import React from 'react';
import dayjs from 'dayjs';
import { Descriptions } from '@arco-design/web-react';
import { PriceTypeMap, RentType } from '@/types';

const ListingDescription = ({ listing, order }) => {
  const data1 = [
    {
      label: '城市',
      value: listing.city,
    },
    {
      label: '地址',
      value: listing.address,
    },
    {
      label: '附近描述',
      value: listing.nearbyInfo,
    },
    {
      label: '合同编号',
      value: listing.contractId,
    },
  ];
  const data2 = [
    {
      label: '租赁方式',
      value: RentType[listing.rentType],
    },
    {
      label: '租金',
      value: listing.price,
    },
    {
      label: '租赁周期',
      value: '每' + PriceTypeMap[listing.priceType],
    },
    {
      label: '租赁时间',
      value:
        dayjs(order.startTime).format('YYYY-MM-DD') +
        '——' +
        dayjs(order.endTime).format('YYYY-MM-DD'),
    },
    {
      label: '总价',
      value: order.totalPrice,
    },
  ];
  return (
    <div className="p-4 border rounded-sm shadow-sm">
      <Descriptions
        column={1}
        title="订单基本信息"
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
    </div>
  );
};

export default ListingDescription;
