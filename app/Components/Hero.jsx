import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";

const Hero = () => {
  const slides = [
    {
      desktop: "/images/banner1.jpg",
      mobile: "/images/banner1-mob.jpg",
      alt: "Banner 1",
    },
    {
      desktop: "/images/banner2.jpg",
      mobile: "/images/banner2-mob.jpg",
      alt: "Banner 2",
    },
  ];

  return (
    <div className="hero relative w-full h-screen overflow-hidden">
      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="w-full h-full"
        loop={true}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-screen">
              {/* Desktop Image */}
              <div className="hidden lg:block absolute inset-0">
                <Image
                  src={slide.desktop}
                  alt={slide.alt}
                  layout="fill"
                  objectFit="cover"
                  priority
                />
              </div>

              {/* Mobile Image */}
              <div className="block lg:hidden absolute inset-0">
                <Image
                  src={slide.mobile}
                  alt={slide.alt}
                  layout="fill"
                  objectFit="cover"
                  priority
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;
