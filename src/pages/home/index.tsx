import React from 'react';
import { Banner, Card } from '@/components/home/Banner';
import AppNearby from '@/components/home/AppNearby';
import AppLiveAnywhere from '@/components/home/AppLiveAnywhere';

const HomePage = () => {
  return (
    <div>
      <Banner />
      <main className="px-4 mx-auto mt-4 space-y-4 max-w-7xl sm:px-10 lg:px-16 xs:px-8">
        <AppNearby />
        <AppLiveAnywhere />
      </main>
      <Card />
    </div>
  );
};

export default HomePage;
