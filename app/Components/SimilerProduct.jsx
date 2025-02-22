"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";

const shimmerClass = "animate-pulse bg-gray-200";

const SimilerProduct = ({ page, category, id }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const pageValue = page.toLowerCase();

    useEffect(() => {
        // Fetch products from API
        axios
            .get("/api/products")
            .then((response) => {
                // Filter products based on page, category, and exclude the current product id
                const filteredProducts = response.data.filter(
                    (product) =>
                        (product.category === category || product.page === page) &&
                        product._id !== id
                );
                setProducts(filteredProducts.slice(0, 4));
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
                setLoading(false);
            });
    }, [page, category, id]);

    return (
        <div className="p-4 lg:px-8 my-8">
            <h2 className="text-center text-3xl md:text-4xl my-8 font-thin crimson green tracking-wider">
                SIMILAR PRODUCTS
            </h2>

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
                {loading ? (
                    // Display shimmer effect for loading state
                    Array.from({ length: 4 }).map((_, index) => (
                        <SwiperSlide key={index}>
                            <div className="group mb-8">
                                <div className={`relative overflow-hidden ${shimmerClass} h-[200px] lg:h-[400px] rounded-md`} />
                                <div className="mt-4">
                                    <div className={`h-4 w-3/4 ${shimmerClass} mb-2`} />
                                    <div className={`h-4 w-1/2 ${shimmerClass}`} />
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                ) : products.length === 0 ? (
                    <h1 className="text-center py-4">No similar products found</h1>
                ) : (
                    products.map((product) => (
                        <SwiperSlide key={product._id}>
                            <Link
                                href={{
                                    pathname: `/productdetails/${product.page}/${product.title}`,
                                    query: { id: product._id },
                                }}
                                passHref
                            >
                                <div className="group mb-8">
                                    <div className="relative overflow-hidden">
                                        {/* Default Image */}
                                        <img
                                            src={product.images[0]?.defaultImage}
                                            alt={product.title}
                                            className="w-full transition-transform duration-500 group-hover:scale-110"
                                        />
                                        {/* Hover Image */}
                                        <img
                                            src={product.images[1]?.defaultImage}
                                            alt={`${product.title} Hover`}
                                            className="absolute inset-0 w-full h-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <h3 className="text-sm font-medium uppercase truncate overflow-hidden whitespace-nowrap relative">
                                            {product.title}
                                            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#B18E35] transition-all duration-500 group-hover:w-full"></span>
                                        </h3>
                                        <p className="text-gray-600 mt-1">₹{product.price.toLocaleString()}</p>
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))
                )}
            </Swiper>

            {/* Button */}
            <div className="text-center my-6">
                <Link href={`/${pageValue}`} className="group inline-flex items-center text-[#1E381E] px-8 py-3 border border-[#1E381E] hover:bg-[#1E381E] hover:text-white transition duration-300">
                    SHOP THE COLLECTION
                    <FaArrowRight className="ml-2 transition-all group-hover:ml-4" />
                </Link>
            </div>
        </div>
    );
};

export default SimilerProduct;
