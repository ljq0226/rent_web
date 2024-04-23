import { FC } from 'react';
import { exploreNearby } from './data';
import SmallCard from './SmallCard';
interface IAppNearbyProps {
  isSmall?: boolean;
}

const AppNearby: FC<IAppNearbyProps> = ({ isSmall }) => {
  return (
    <section>
      <h2 className="py-5 text-2xl font-semibold md:text-3xl">
        Explore Nearby
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {exploreNearby?.map((item: any) => (
          <SmallCard
            image={item.img}
            distance={item.distance}
            location={item.location}
            key={item.location}
          />
        ))}
      </div>
    </section>
  );
};

export default AppNearby;
