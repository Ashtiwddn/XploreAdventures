import React, { useState, useEffect } from "react";
import Image from "next/image";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { useRouter } from "next/router";
import promoData from "../../public/promos.json"; // Adjust the path as needed

const PromoSection = ({ handleShowDetailPromo }) => {
  const [promos, setPromos] = useState([]);
  const router = useRouter();
  const handleDragStart = (e) => e.preventDefault();

  useEffect(() => {
    // Directly set the promos state from the imported JSON data
    setPromos(promoData.data);
  }, []);

  const formatNumber = (number) => {
    return `Rs ${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };

  const responsive = {
    500: {
      items: 2,
    },
    850: {
      items: 3,
    },
    1024: {
      items: 2,
    },
    1120: {
      items: 3,
    },
    1350: {
      items: 4,
    },
  };

  // New function to find promo by ID
  const getPromoById = (id) => {
    return promos.find((promo) => promo.id === id);
  };

  return (
    <div className="relative z-20 flex flex-col w-full gap-5 lg:gap-7 xl:gap-10 -mt-12 lg:-mt-10 xl:-mt-8 h-fit text-[10px] lg:text-[11px] xl:text-[13px]">
      <div className="absolute z-0 bg-primaryyellow dark:bg-primaryblue dark:bg-opacity-20 bg-opacity-10 rounded-full w-[250px] h-[250px] lg:w-[500px] lg:h-[400px] blur-3xl -top-5 -left-20"></div>
      <div className="relative flex justify-between w-full">
        <h1 className="flex text-xl font-bold tracking-tight lg:text-2xl xl:text-3xl font-volkhov">
          Choose Your Perfect Destination
        </h1>
        <button
          onClick={() => router.push("/destinations")}
          type="button"
          className="px-3 py-2 font-medium text-white rounded-lg cursor-default cursor-scale lg:cursor-none xl:px-5 xl:py-3 w-fit bg-primaryyellow hover:bg-yellowhover dark:bg-primaryred dark:hover:bg-redhover"
        >
          Explore All
        </button>
      </div>
      <div className="relative w-full overflow-x-hidden rounded-xl">
        <AliceCarousel
          mouseTracking
          paddingRight={50}
          infinite
          autoPlay
          animationDuration={2000}
          disableButtonsControls
          disableDotsControls
          responsive={responsive}
        >
          {promos.map((promo, index) => (
            <div
              key={index}
              onClick={() => handleShowDetailPromo(promo.id)}
              onDragStart={handleDragStart}
              className="w-[95%] cursor-scale cursor-default lg:cursor-none h-48 xl:h-60 overflow-hidden bg-white dark:bg-primaryblack border border-white dark:border-primaryblack hover:border-primaryred dark:hover:border-primaryred cursor-pointer text-primaryblack rounded-xl"
            >
              {(promo.imageUrl.includes(".jpg") ||
                promo.imageUrl.includes(".png") ||
                promo.imageUrl.includes("images")) ? (
                <img
                  src={promo.imageUrl}
                  className="object-cover w-full bg-slate-200 h-[80%]"
                  alt={promo.title}
                />
              ) : (
                <Image
                  src="/images/no-image.png"
                  className="object-cover w-full h-[80%]"
                  width={500}
                  height={500}
                  alt="Unknown Profile"
                />
              )}
              <div className="flex justify-between font-medium items-center w-full h-[20%] px-4 py-3">
                <h1 className="capitalize dark:text-slate-200">
                  {promo.title}
                </h1>
                <h1 className="text-primaryblue">
                  {formatNumber(promo.promo_discount_price)}
                </h1>
              </div>
            </div>
          ))}
        </AliceCarousel>
      </div>
    </div>
  );
};

export default PromoSection;
