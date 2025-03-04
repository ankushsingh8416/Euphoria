"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { RiChatSmileAiLine } from "react-icons/ri";
import Link from "next/link";

const Hero = () => {
  const slides = [
    {
      desktop: "/images/banner-3.jpg",
      mobile: "/images/banner-3-mobile.jpg",
      alt: "Banner 1",
    },
    {
      desktop: "/images/banner-4.jpg",
      mobile: "/images/banner-4-mobile.jpg",
      alt: "Banner 1",
    },
    {
      desktop: "/images/banner5.jpg",
      mobile: "/images/banner-5-mobile.jpg",
      alt: "Banner 1",
    },
  ];

  return (
    <div className="hero relative w-full overflow-hidden">
      <Swiper
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
        className="w-full h-full"
        loop={true}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              {/* Desktop Image */}
              <div className="hidden md:block w-full h-full">
                <Image
                  src={slide.desktop}
                  alt={slide.alt}
                  fill
                  sizes="100vw"
                  style={{
                    objectFit: "cover",
                    objectPosition: "top",
                  }}
                />
              </div>

              {/* Mobile Image */}
              <div className="block md:hidden w-full h-full">
                <Image
                  src={slide.mobile}
                  alt={slide.alt}
                  fill
                  sizes="100vw"
                  style={{
                    objectFit: "cover",
                    objectPosition: "top",
                  }}
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
