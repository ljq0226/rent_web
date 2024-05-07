import React from 'react';
import { Link } from 'react-router-dom';

const Banner = () => {
  return (
    <section className="relative h-[65vh] md:h-[85vh]">
      <div className="absolute z-10 w-full bg-gradient-to-b from-transparent-black to-transparent h-28" />
      <img
        src="/assets/banner.webp"
        alt="banner"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center bottom',
        }}
      />

      <div className="container">
        <div className="absolute z-10 left-0 right-0 top-[45%] md:top-[50%] xl:top-[40%]">
          <h1 className="max-w-[250px] xl:max-w-[350px] mx-auto px-4 text-2xl font-bold tracking-wide text-center text-gray-500 md:px-0 md:text-3xl xl:text-4xl">
            一瓦一世界，留住每一刻温情
          </h1>
          <div className="space-x-2 text-center">
            <button className="px-8 py-2 mx-auto mt-4 text-sm text-[#1a1] font-bold duration-150 bg-white rounded-md sm:py-3 active:scale-90 text-md md:mx-0 hover:shadow-xl lg:text-base">
              <Link to={'/list'}>快捷租房</Link>
            </button>
            <button className="px-8 py-2 mx-auto mt-4 text-sm text-[#1a1] font-bold duration-150 bg-white rounded-md sm:py-3 active:scale-90 text-md md:mx-0 hover:shadow-xl lg:text-base">
              <Link to={'/list'}>快捷短租</Link>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
const Card = () => {
  return (
    <section className="my-12 mb-20">
      <div className="container">
        <div className="relative block">
          <div className="h-[400px] lg:h-[400px] object-cover rounded-3xl">
            <div className="absolute inset-0 z-10 md:hidden" />
            <img
              src="/assets/card.webp"
              alt="banner"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              className="rounded-xl"
            />
          </div>

          <div className="absolute z-10 right-8 left-8 sm:right-12 sm:left-12 md:left-16 lg:left-20 md:right-16 lg:right-20 top-8 sm:top-12 md:top-auto md:bottom-1/2 md:translate-y-1/2 md:text-left">
            <h2 className="font-bold sm:font-normal text-gray-500 md:mb-2 w-[180px] sm:w-[350px] md:mx-0 text-md sm:text-xl xl:text-2xl leading-7">
              春水初生，春林初盛，春风十里，不如你。
            </h2>
            <h2 className="ml-2 font-bold sm:font-normal text-gray-500 md:mb-2 w-[180px] sm:w-[350px] md:mx-0 text-md sm:text-xl xl:text-2xl leading-7">
              夏河始溢，夏木始密，夏月万顷，唯余情。
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};
export { Banner, Card };
