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
            Not sure where to go? Perfect.
          </h1>
          <div className="text-center">
            <button className="px-8 py-2 mx-auto mt-4 text-sm font-medium text-white duration-150 rounded-md sm:py-3 active:scale-90 text-md bg-primary md:mx-0 hover:shadow-xl lg:text-base">
              <Link to={'/list'}>I&apos;m flexible</Link>
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
            <h2 className="font-bold sm:font-normal text-gray-500 md:mb-2 w-[180px] sm:w-[350px] md:mx-0 text-2xl sm:text-4xl xl:text-5xl leading-7">
              The Greatest Outdoors
            </h2>
            <p className="mb-4 text-xs text-gray-500 sm:mb-5 sm:text-base">
              Whitelists curated by Airbnb
            </p>
            <button className="px-6 py-2 text-sm font-medium text-white bg-gray-500 rounded-lg sm:text-base sm:py-3">
              Get Inspired
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
export { Banner, Card };
