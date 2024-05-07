import { Star } from 'lucide-react';
import ListingCategory from './ListingCategory';
import { Modal } from '@arco-design/web-react';

import { Avatar } from '@arco-design/web-react';
import { useEffect, useState } from 'react';
import { get, post } from '@/utils/http';
import ListingReviewList from './ListingReviewList';
const ListingInfo = ({ listing }: any) => {
  const {
    keywords,
    description,
    roomCount,
    livingroomCount,
    bathroomCount,
    about,
    listingIntro,
    tenantPermission,
    others,
  } = listing;
  console.log('listing', listing);
  const [visible, setVisible] = useState(false);
  const [landlord, setLandlord] = useState(null);
  useEffect(() => {
    getLandlordInfo();
  }, [listing?.landlordId]);
  const getLandlordInfo = async () => {
    const { code, data, msg } = await get(`landlord/${listing?.landlordId}`);
    if (code == 200) {
      setLandlord(data);
    }
  };
  return (
    <>
      <div className="flex flex-col col-span-4 gap-4 mb-[300px]">
        <div className="flex flex-col gap-2">
          <div className="text-2xl font-bold">{keywords}</div>
          <div className="flex">
            {description}
            {' · '}
            <div className="flex flex-row items-center font-light text-neutral-500">
              <div>{roomCount ? roomCount + '室' : ''}</div>
              <div>{livingroomCount ? livingroomCount + '厅' : ''}</div>
              <div>{bathroomCount ? bathroomCount + '卫' : ''}</div>
            </div>
          </div>
          <div className="flex justify-start ">
            <Star fill="black" className="w-[20px] h-[20px]" />
            <div className="ml-1">4.86</div>
            <div className="mx-2">·</div>
            <div className="font-semibold underline cursor-pointer">
              {'23 条评价'}
            </div>
          </div>
        </div>
        <hr />
        <div className="text-2xl font-bold">{'认识你的房东'}</div>
        <div>
          <div className="flex items-center gap-2 ">
            <Avatar className={'cursor-pointer'}>
              <img
                alt="avatar"
                src={'https://' + landlord?.avatar || '/assets/avatar.jpg'}
              />
            </Avatar>
            <div className="text-xl font-semibold">{landlord?.username}</div>
            出租经验:3年
          </div>
          <div>{landlord?.description}</div>
          <div>
            联系方式:
            <div className="flex flex-col text-sm font-light ">
              <div>{landlord?.phone ? '电话 ' + landlord?.phone : ''}</div>
              <div>{landlord?.email ? '邮箱 ' + landlord?.email : ''}</div>
            </div>
          </div>
        </div>

        <hr />
        <div className="text-lg font-light text-neutral-500">{description}</div>
        <hr />
        <div className="text-2xl font-bold">{'关于此房源'}</div>
        <div>
          <div>{about}</div>
          <div className="font-light">{'···'}</div>
          <div
            className="mt-1 text-sm font-semibold underline cursor-pointer"
            onClick={() => setVisible(true)}
          >
            显示更多{' >'}
          </div>
        </div>
        <hr />
        <div className="text-2xl font-bold">{'评论区'}</div>
        <ListingReviewList listing={listing} />
      </div>
      <Modal
        title="关于此房源"
        visible={visible}
        autoFocus={false}
        focusLock={false}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <p>{about}</p>
        {listingIntro && (
          <>
            <h2 className="my-2 font-semibold">房源介绍</h2>
            <p>{listingIntro}</p>
          </>
        )}
        {tenantPermission && (
          <>
            <h2 className="my-2 font-semibold">租客权限</h2>
            <p>{tenantPermission}</p>
          </>
        )}
        {others && (
          <>
            <h2 className="my-2 font-semibold">其他注意事项</h2>
            <p>{others}</p>
          </>
        )}
      </Modal>
    </>
  );
};

export default ListingInfo;
