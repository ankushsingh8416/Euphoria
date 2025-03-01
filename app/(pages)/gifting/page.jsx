"use client";

import React, { useContext, useEffect, useState } from "react";
import { SlHeart } from "react-icons/sl";
import axios from "axios";
import Link from "next/link";
import { GridContext } from "@/app/context/GridContext";
import { FilterContext } from "@/app/context/FilterContext";
import { CartContext } from "@/app/context/CartContext";
import { useOrders } from "@/app/cpanel/context/orderContext";

const Gifting = () => {
   
     const {
            setProducts,
            totalProducts,
            setTotalProducts,
            products
        } = useContext(useOrders);
        const { addToCart } = useContext(CartContext);
        const { selectedFilters, sortOption } = useContext(FilterContext);
        const { productGrid } = useContext(GridContext);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true); 
            try {
                const response = await axios.get("/api/products");
                let filteredProducts = response.data;

                // Filter products by page
                filteredProducts = filteredProducts.filter(
                    (product) => product.page === "Gifting"
                );

                // Apply filters
                for (const filter in selectedFilters) {
                    if (selectedFilters[filter].length > 0) {
                      filteredProducts = filteredProducts.filter((product) => {
                        if (filter === "Price") {
                          return selectedFilters[filter].some((range) => {
                            const [min, max] = range.split("-").map(Number);
                            return product.price >= min && product.price <= max;
                          });
                        }
                        if (filter === "Size") {
                          return selectedFilters[filter].some((size) =>
                            product.size.includes(size)
                          );
                        }
          
                        return selectedFilters[filter].includes(
                          product[filter.toLowerCase()]
                        );
                      });
                    }
                  }

                // Apply sorting
                filteredProducts.sort((a, b) => {
                    if (sortOption === "Price:LowtoHigh") return a.price - b.price;
                    if (sortOption === "Price:HightoLow") return b.price - a.price;
                    if (sortOption === "NewestArrivals") {
                        const newA = a.newArrivals ? 1 : 0;
                        const newB = b.newArrivals ? 1 : 0;
                        return newB - newA; 
                    }
                    return 0;
                });
                

                setProducts(filteredProducts);
                setTotalProducts(filteredProducts.length);   
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false); 
            }
        };

        fetchProducts();
    }, [selectedFilters, sortOption, setProducts, setTotalProducts]);

    if (loading) {
        // Shimmer Effect
        return (
            <div className="flex flex-wrap justify-between gap-2 p-2 ">
                {[...Array(16)].map((_, index) => (
                    <div
                        key={index}
                        className={`mb-8 shimmer-container ${productGrid === "four" ? "w-[48%] lg:w-[24%]" : "w-[100%] lg:w-[48%]"}`}
                    >
                    </div>
                ))}
            </div>
        );
    }

    if (totalProducts === 0) {
        // No Results Message
        return (
            <div className="text-center py-10">
                <h1 className="text-lg font-semibold text-gray-700">
                    No products found. Please change your filters.
                </h1>
            </div>
        );
    }



    // Product List
    return (
        <div className="flex flex-wrap justify-between gap-2 px-4 lg:px-6">
            {products.map((product) => (
                <Link  href={{
                    pathname: `/productdetails/${product.page}/${product.title}`,
                    query: { id: product._id }, 
                }}

                    key={product._id}
                    className={`cursor-pointer mb-8 group ${productGrid === "four" ? "w-[48%] lg:w-[24%]" : "w-[100%] lg:w-[48%]"}`}
                >
                    <div className="relative overflow-hidden">
                        <img
                            src={product.images[0]?.defaultImage}
                            alt={product.title}
                            className="w-full transition-transform duration-500 group-hover:scale-110"
                        />
                        <img
                            src={product.images[1]?.hoverImage}
                            alt={`${product.title} Hover`}
                            className="absolute inset-0 w-full h-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        />
                          <img
              src="/images/ribbon.webp"
              alt=""
              className="absolute  bottom-0 left-0 w-full "
            />
                    </div>
                    <div className="mt-4">
                        <h3 className="text-sm font-medium uppercase truncate overflow-hidden whitespace-nowrap relative">
                            {product.title}
                            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#B18E35] transition-all duration-500 group-hover:w-full"></span>
                        </h3>
                        <div className="flex items-center justify-between mt-1">
                            <p className="text-gray-600">₹{product.price}</p>
                            <button
                                className="text-gray-500 hover:text-[#B18E35] transition duration-300"
                                aria-label="Add to Wishlist"
                            >
                                <SlHeart  size={18} onClick={() => addToCart(product)} />
                            </button>
                        </div>
                        {product.readyToShip ? (
                            <div className="mt-2 text-[.7rem] font-medium text-[#1E381E] bg-[#F5F5F5] border border-gray-300 px-2 py-1 inline-block">
                                READY TO SHIP
                            </div>
                        ) : (
                            <div className="mt-2 text-[.7rem] font-medium text-[#1E381E] bg-[#fecdcd70] border border-gray-300 px-2 py-1 inline-block">
                                NEW ARRIVALS
                            </div>
                        )}
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default Gifting;