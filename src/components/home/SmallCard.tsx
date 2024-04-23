import React from 'react';

function SmallCard({ image, distance, location }: any) {
  return (
    <div className="flex items-center mt-5 space-x-4 transition ease-in-out cursor-pointer xs:m-2 rounded-xl hover:scale-105 hover:bg-gray-100 hover:bg-opacity-90">
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
