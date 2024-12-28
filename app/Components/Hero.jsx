"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

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
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
        className="w-full h-full"
        loop={true}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-screen">
              {/* Desktop Image */}
              <div className="hidden lg:block w-full h-full">
                <Image
                  src={slide.desktop}
                  alt={slide.alt}
                  layout="fill"
                  objectFit="cover" 
                  objectPosition="center" 
                />
              </div>

              {/* Mobile Image */}
              <div className="block lg:hidden w-full h-full">
                <Image
                  src={slide.mobile}
                  alt={slide.alt}
                  layout="fill"
                  objectFit="cover" 
                  objectPosition="center" 
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
