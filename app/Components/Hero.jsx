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
      desktop: "https://res.cloudinary.com/dvucqewfn/image/upload/v1741139139/banner-3_jvshvh.jpg",
      mobile: "https://res.cloudinary.com/dvucqewfn/image/upload/v1741139139/banner-3-mobile_q1ywdk.jpg",
      alt: "Banner1",
    },
    {
      desktop: "https://res.cloudinary.com/dvucqewfn/image/upload/v1741139140/banner-4_v8ptco.jpg",
      mobile: "https://res.cloudinary.com/dvucqewfn/image/upload/v1741139140/banner-4-mobile_dfyjcu.jpg",
      alt: "Banner2",
    },
    {
      desktop: "https://res.cloudinary.com/dvucqewfn/image/upload/v1741139142/banner5_apybcj.jpg",
      mobile: "https://res.cloudinary.com/dvucqewfn/image/upload/v1741139142/banner-5-mobile_xqtnyv.jpg",
      alt: "Banner3",
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
