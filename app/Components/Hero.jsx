"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

const slides = [
  {
    desktop: "https://res.cloudinary.com/dvucqewfn/image/upload/f_auto,q_auto/v1741139139/banner-3_jvshvh.jpg",
    mobile: "https://res.cloudinary.com/dvucqewfn/image/upload/f_auto,q_auto/v1741139139/banner-3-mobile_q1ywdk.jpg",
    alt: "Banner1",
  },
  {
    desktop: "https://res.cloudinary.com/dvucqewfn/image/upload/f_auto,q_auto/v1741139140/banner-4_v8ptco.jpg",
    mobile: "https://res.cloudinary.com/dvucqewfn/image/upload/f_auto,q_auto/v1741139140/banner-4-mobile_dfyjcu.jpg",
    alt: "Banner2",
  },
  {
    desktop: "https://res.cloudinary.com/dvucqewfn/image/upload/f_auto,q_auto/v1741139142/banner5_apybcj.jpg",
    mobile: "https://res.cloudinary.com/dvucqewfn/image/upload/f_auto,q_auto/v1741139142/banner-5-mobile_xqtnyv.jpg",
    alt: "Banner3",
  },
];

const Hero = () => {
  return (
    <div className="hero relative w-full overflow-hidden">
      <Swiper
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        modules={[Pagination, Autoplay]}
        className="w-full h-full"
        loop
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-auto">
              {/* Desktop Image */}
              <div className="hidden md:block w-full h-auto">
                <Image
                  src={slide.desktop}
                  alt={slide.alt}
                  width={1920}
                  height={800}
                  priority={index === 0} // Only the first image is preloaded
                  loading={index === 0 ? "eager" : "lazy"}
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Mobile Image */}
              <div className="block md:hidden w-full h-auto">
                <Image
                  src={slide.mobile}
                  alt={slide.alt}
                  width={1080}
                  height={600}
                  priority={index === 0} // Only the first image is preloaded
                  loading={index === 0 ? "eager" : "lazy"}
                  className="w-full h-auto object-cover"
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
