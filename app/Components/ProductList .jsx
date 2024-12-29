"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { FaArrowRight } from "react-icons/fa";

const products = [
    {
        id: 1,
        title: "Kirsa Ajrakh Hand-block Printed Silk Sharara Set - Red",
        price: "₹185,000",
        defaultImage: "/images/product1.jpg",
        hoverImage: "/images/product1-hover.jpg",
    },
    {
        id: 2,
        title: "Cinnabar Handcrafted Bandhani Silk Suit Set - Red",
        price: "₹110,000",
        defaultImage: "/images/product2.jpg",
        hoverImage: "/images/product2-hover.jpg",
    },
    {
        id: 3,
        title: "Kasano Ajrakh Hand-block Printed Silk Suit Set - Mustard",
        price: "₹130,000",
        defaultImage: "/images/product3.jpg",
        hoverImage: "/images/product3-hover.jpg",
    },
    {
        id: 4,
        title: "Khevna Handwoven Benarasi Silk Sharara Set - Red",
        price: "₹145,000",
        defaultImage: "/images/product4.jpg",
        hoverImage: "/images/product4-hover.jpg",
    },
];

const ProductList = () => {
    return (
        <div className="p-4 lg:px-16">
            <Swiper
                modules={[Pagination]}
                pagination={{
                    clickable: true,
                }}
                spaceBetween={16}
                breakpoints={{
                    1024: { slidesPerView: 4 },
                    642: { slidesPerView: 2 },
                    0: { slidesPerView: 2 },
                }}
                className="product-slider"
                loop={true}
            >
                {products.map((product) => (
                    <SwiperSlide key={product.id}>
                        <div className="group mb-8">
                            <div className="relative overflow-hidden">
                                {/* Default Image */}
                                <img
                                    src={product.defaultImage}
                                    alt={product.title}
                                    className="w-full transition-transform duration-500 group-hover:scale-110"
                                />
                                {/* Hover Image */}
                                <img
                                    src={product.hoverImage}
                                    alt={`${product.title} Hover`}
                                    className="absolute inset-0 w-full h-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                                />
                            </div>
                            <div className="mt-4">
                                <h3 className="text-sm font-medium uppercase truncate overflow-hidden whitespace-nowrap relative">
                                    {product.title}
                                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#B18E35] transition-all duration-500 group-hover:w-full"></span>
                                </h3>
                                <p className="text-gray-600 mt-1">{product.price}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>


            {/* Button */}
            <div className="text-center my-6">
                <button className="group inline-flex items-center text-[#1E381E] px-8 py-3 border border-[#1E381E] hover:bg-[#1E381E] hover:text-white transition duration-300">
                    SHOP THE COLLECTION
                    <FaArrowRight className="ml-2 transition-all  group-hover:ml-4" />
                </button>
            </div>
        </div>
    );
};

export default ProductList;
