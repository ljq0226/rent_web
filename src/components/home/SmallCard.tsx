import React from 'react';
import { useHistory } from 'react-router-dom';
function SmallCard({ image, distance, location }: any) {
  const history = useHistory();
  const clickHandle = () => {
    if (location == '北京市') {
      location = '海淀区';
    }
    if (location == '上海市') {
      location = '浦东新区';
    }
    history.push('/list', { city: location });
  };
  return (
    <div
      onClick={clickHandle}
      className="flex items-center mt-5 space-x-4 transition ease-in-out cursor-pointer xs:m-2 rounded-xl hover:scale-105 hover:bg-gray-100 hover:bg-opacity-90"
    >
      <div className="relative w-16 h-16">
        <img alt="promotion" src={image} className="rounded-lg" />
      </div>
      <div className="text-sm font-semibold sm:text-base">
        <h2>{location}</h2>
        <h3 className="text-gray-400">{distance}</h3>
      </div>
    </div>
  );
}

export default SmallCard;
