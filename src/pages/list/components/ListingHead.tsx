import Heading from './Heading';
import { Image, Carousel } from '@arco-design/web-react';

const ListingHead = ({ title, locationValue, id, imageSrc ,listing}: any) => {
  return (
    <>
      <Heading listing={listing} title={title} subTitle={'SHANGHAI'} />
      <figure className="relative flex h-[60vh] w-full overflow-hidden rounded-xl">
        {/* <img alt="Image" src={imageSrc} className="object-cover w-full" />
         */}
        <div className="flex-1"></div>
        <Carousel
          autoPlay={true}
          indicatorType="dot"
          showArrow="hover"
          className={'w-[50vw]'}
        >
          {imageSrc.split(';').map((src, index) => (
            <div key={index}>
              <Image
                src={'https://' + src}
                className="w-min-[60vw] object-center overflow-hidden"
              />
            </div>
          ))}
        </Carousel>
        <div className="flex-1"></div>
      </figure>
    </>
  );
};

export default ListingHead;
