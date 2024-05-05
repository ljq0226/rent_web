import React, { useEffect, useState } from 'react';
import ListingHead from '../components/ListingHead';
import { useLocation, useParams } from 'react-router-dom';
import ListingInfo from '../components/ListingInfo';
import ListingReservation from '../components/ListingReservation';
import ListingDescription from '../components/ListingDescription';
import { get } from '@/utils/http';
import { Message } from '@arco-design/web-react';

const ListingInfoApp = () => {
  const location = useLocation();
  const state = location?.state as any;
  const [listing, setListing] = useState(state.data);
  // const [isSubmitting, setIsSubmitting] = useState(false);
  // const [totalPrice, setTotalPrice] = useState(listing.price);
  // const [dateRange, setDateRange] = useState();
  return (
    <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
      <div className="max-w-screen-lg mx-auto ">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            // imageSrc={'https://' + listing.cover}
            imageSrc={listing?.images}
            id={listing.id}
            locationValue={listing.locationValue}
            listing={listing}
          />
          <div className="grid grid-cols-1 mt-6 md:grid-cols-7 md:gap-10">
            <ListingInfo listing={listing} />
            <div className="order-first mb-10 md:order-last md:col-span-3">
              {/* <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                // onSubmit={onCreateReservation}
                disabled={isSubmitting}
                // disabledDates={disabledDates}
              /> */}
              <ListingDescription listing={listing} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingInfoApp;
