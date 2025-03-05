"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { FaArrowRight } from "react-icons/fa";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Added error state

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null); // Reset error before fetching
      try {
        const response = await axios.get("/api/products");

        // Filter products where category is "Vanna Sets"
        const filteredProducts = response.data
          .filter((product) => product.category === "Vanna Sets")
          .slice(0, 10); // Show only 10 products

        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-4 lg:py-8 lg:px-16">
      {/* Error Message */}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Loading Skeleton */}
      {loading ? (
        <div className="flex flex-wrap justify-between gap-2 p-2">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="mb-8 w-[48%] lg:w-[24%] bg-gray-300 animate-pulse h-60 rounded-lg"
            ></div>
          ))}
        </div>
      ) : (
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
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
            <SwiperSlide key={product._id}>
              <Link
                href={{
                  pathname: `/productdetails/${product.page}/${product.title}`,
                  query: { id: product._id },
                }}
              >
                <div className="group mb-8 cursor-pointer">
                  <div className="relative overflow-hidden">
                    {/* Default Image */}
                    <Image
                      src={product.images[0]?.defaultImage || "/placeholder.jpg"}
                      alt={product.title}
                      width={500}
                      height={600}
                      className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      priority
                    />

                    {/* Hover Image (Only show if available) */}
                    {product.images[1]?.hoverImage && (
                      <Image
                        src={product.images[1].hoverImage}
                        alt={`${product.title} Hover`}
                        width={500}
                        height={600}
                        className="absolute top-0 left-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      />
                    )}
                  </div>
                  <div className="mt-4">
                    <h3 className="text-sm font-medium uppercase truncate overflow-hidden whitespace-nowrap relative">
                      {product.title}
                      <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#B18E35] transition-all duration-500 group-hover:w-full"></span>
                    </h3>
                    <p className="text-gray-600 mt-1">₹{product.price}</p>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* Shop Now Button */}
      <div className="text-center my-6">
        <Link
          href="/women"
          className="group inline-flex items-center text-[#1E381E] px-8 py-3 border border-[#1E381E] hover:bg-[#1E381E] hover:text-white transition duration-300"
        >
          SHOP NOW
          <FaArrowRight className="ml-2 transition-all group-hover:ml-4" />
        </Link>
      </div>
    </div>
  );
};

export default ProductList;
