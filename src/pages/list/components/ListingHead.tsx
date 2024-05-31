import Heading from './Heading';
import { Image, Carousel } from '@arco-design/web-react';

const ListingHead = ({ title, locationValue, id, imageSrc, listing }: any) => {
  return (
    <>
      <Heading listing={listing} title={title} />
      <figure className="relative flex w-full overflow-hidden px-[12.5vw] rounded-xl">
        {/* <img alt="Image" src={imageSrc} className="object-cover w-full" />
         */}
        <Carousel
          autoPlay={true}
          indicatorType="dot"
          showArrow="hover"
          className={'object-cover'}
        >
          {imageSrc?.split(';').map((src, index) => (
            <div key={index}>
              <Image
                src={'https://' + src}
                className="object-cover overflow-hidden"
              />
            </div>
          ))}
        </Carousel>
      </figure>
    </>
  );
};

export default ListingHead;
