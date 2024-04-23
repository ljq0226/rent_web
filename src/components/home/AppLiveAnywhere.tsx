import { FC } from 'react';
import { liveAnywhere } from './data';
import { Link } from 'react-router-dom';
interface IAppLiveAnywhereProps {
  isSmall?: boolean;
}

const AppLiveAnywhere: FC<IAppLiveAnywhereProps> = ({ isSmall }) => {
  return (
    <section className="my-10">
      <div className="container">
        <h2 className="mb-4 text-2xl font-bold md:mb-4 lg:mb-8 md:text-3xl lg:text-4xl">
          {'Live Anywhere'}
        </h2>
        <div
          className={
            'grid grid-cols-2 lg:gap-x-4 gap-x-1 gap-y-2 lg:grid-cols-4'
          }
        >
          {liveAnywhere?.map((data, index) => (
            <Link key={index} to="/">
              <div className="transition ease-in-out cursor-pointer xs:m-2 rounded-xl hover:scale-105 hover:bg-gray-100 hover:bg-opacity-90 lg:pr-3 gap-y-4 active:scale-105 active:bg-gray-200 active:bg-opacity-40">
                <div className="relative w-full h-40 mb-2 md:h-60 lg:h-72">
                  <img
                    src={data.img}
                    alt={data.title}
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
                <div>
                  <h3 className="font-medium leading-5 text-gray-500 text-md md:text-xl">
                    {data.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AppLiveAnywhere;
