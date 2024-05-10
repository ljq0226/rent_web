import React from 'react';
import { Star } from 'lucide-react';
import { PriceTypeMap } from '@/types';
import { useHistory } from 'react-router-dom';
interface Props {
  data: any;
}
const ListingCard = ({ data }: Props) => {
  const history = useHistory();
  return (
    <article className="col-span-1 cursor-pointer group">
      <div
        className="flex flex-col w-full gap-2"
        onClick={() => {
          history.push('/list/' + data?.id, { data });
        }}
      >
        <figure className="relative w-full overflow-hidden aspect-square rounded-xl">
          <img
            src={'https://' + data?.cover}
            alt={'Listing'}
            className="object-cover w-full h-full transition group-hover:scale-110"
            height={220}
            width={220}
          />
          <div className={`absolute top-3 right-3`}>
            {/* <HeartButton listingId={data.id} currentUser={currentUser} /> */}
          </div>
        </figure>
        <div className="flex text-lg font-semibold ">
          {data?.title}
          <div className="flex-1"></div>
          <div className="flex justify-center ">
            <Star fill="black" className="w-[20px] h-[20px]" />
            <div>4.86</div>
          </div>

          {/* {location?.region}, {location?.label} */}
        </div>
        <div className="font-light text-neutral-500">
          {/* {reservationDate || data.category} */}
        </div>
        <div className="flex flex-row items-center gap-1">
          ￥ {data?.price}
          {<div className="font-light">/{PriceTypeMap[data?.priceType]}</div>}
        </div>
      </div>
    </article>
  );
};

export default ListingCard;
