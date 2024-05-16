import { get } from '@/utils/http';
import { Comment, List, Message, Popover, Rate } from '@arco-design/web-react';
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
interface Props {
  reviewList: any;
}

const RatingInfo = [
  {
    title: '干净卫生',
    value: 'cleanliness',
  },
  {
    title: '如实描述',
    value: 'description',
  },
  {
    title: '入住便捷',
    value: 'checkIn',
  },
  {
    title: '沟通顺畅',
    value: 'communication',
  },
  {
    title: '地段优越',
    value: 'location',
  },
  {
    title: '高性价比',
    value: 'value',
  },
];
const ListingReviewList = ({ reviewList }: Props) => {
  return (
    <div>
      {reviewList.length == 0 && <p>该房源暂无用户评价</p>}
      {reviewList.map((item: any) => {
        const tenant = item?.Tenant;
        const rating = item?.rating;
        return (
          <List.Item key={item.id}>
            <div className="flex">
              <Comment
                author={tenant.username}
                avatar={'https://' + tenant.avatar || '/assets/avatar.jpg'}
                content={item.content}
                datetime={dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss')}
              />
              <div className="flex-1"></div>
              <div className="cursor-pointer">
                <Popover
                  title={`评分${rating.totalScore}`}
                  content={
                    <div>
                      {RatingInfo.map((item: any) => {
                        return (
                          <div
                            key={item.title}
                            className="flex items-center justify-center"
                          >
                            <span>{item.title}</span>:
                            <Rate
                              count={5}
                              value={rating[item.value]}
                              readonly
                              allowHalf
                            />
                          </div>
                        );
                      })}
                    </div>
                  }
                >
                  <Rate
                    count={5}
                    value={item.rating.totalScore}
                    readonly
                    allowHalf
                  />
                </Popover>
              </div>
            </div>
          </List.Item>
        );
      })}
    </div>
  );
};

export default ListingReviewList;
