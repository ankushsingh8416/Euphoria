"use client";

import { cartContext } from "@/app/context/cartContext";
import React, { useContext, useEffect } from "react";
import { SlHeart } from "react-icons/sl";
import axios from "axios";

const Women = () => {
    const {
        selectedFilters,
        sortOption,
        setProducts,
        totalProducts,
        products,
        productGrid,
    } = useContext(cartContext);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("/api/products");
                let filteredProducts = response.data;

                filteredProducts = filteredProducts.filter(
                    (product) => product.page === "Men"
                );

                // Apply additional filters
                Object.keys(selectedFilters).forEach((filter) => {
                    if (selectedFilters[filter].length > 0) {
                        filteredProducts = filteredProducts.filter((product) => {
                            if (filter === "Price") {
                                return selectedFilters[filter].some((priceRange) => {
                                    const [min, max] = priceRange.split("-").map(Number);
                                    return product.price >= min && product.price <= max;
                                });
                            } else if (Array.isArray(product[filter.toLowerCase()])) {
                                return product[filter.toLowerCase()].some((size) =>
                                    selectedFilters[filter].includes(size)
                                );
                            }
                            return selectedFilters[filter].includes(
                                product[filter.toLowerCase()]
                            );
                        });
                    }
                });

                // Apply sorting
                filteredProducts.sort((a, b) => {
                    const priceA = parseFloat(a.price);
                    const priceB = parseFloat(b.price);
                    if (sortOption === "Price:LowtoHigh") return priceA - priceB;
                    if (sortOption === "Price:HightoLow") return priceB - priceA;
                    if (sortOption === "NewestArrivals") return a.id - b.id;
                    return 0;
                });

                setProducts(filteredProducts);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            }
        };

        fetchProducts();
    }, [selectedFilters, sortOption, setProducts]);

    return (
        <>
            {totalProducts === 0 ? (
                <div className="text-center mt-8">
                    <h1 className="text-[#1E381E] text-xl lg:text-2xl">
                        No products found. Please try adjusting your filters.
                    </h1>
                </div>
            ) : (
                <div className="flex flex-wrap justify-between gap-2">
                    {products.map((product, index) => (
                        <div
                            key={index}
                            className={` cursor-pointer mb-8 group ${productGrid === "four" ? "w-[48%] lg:w-[24%]" : " w-[100%] lg:w-[48%]"
                                }`}
                        >
                            <div className="relative overflow-hidden">
                                {/* Default Image */}
                                <img
                                    src={product.images[0]?.defaultImage}
                                    alt={product.title}
                                    className="w-full transition-transform duration-500 group-hover:scale-110"
                                />
                                {/* Hover Image */}
                                <img
                                    src={product.images[1]?.hoverImage}
                                    alt={`${product.title} Hover`}
                                    className="absolute inset-0 w-full h-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                                />
                            </div>
                            <div className="mt-4">
                                <h3 className="text-sm font-medium uppercase truncate overflow-hidden whitespace-nowrap relative">
                                    {product.title}
                                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#B18E35] transition-all duration-500 group-hover:w-full"></span>
                                </h3>
                                {/* Price and Heart Icon */}
                                <div className="flex items-center justify-between mt-1">
                                    <p className="text-gray-600">₹{product.price}</p>
                                    <button
                                        className="text-gray-500 hover:text-[#B18E35] transition duration-300"
                                        aria-label="Add to Wishlist"
                                    >
                                        <SlHeart size={18} />
                                    </button>
                                </div>
                                {product.readyToShip ? (
                                    <div className="mt-2 text-[.7rem] font-medium text-[#1E381E] bg-[#F5F5F5] border border-gray-300 px-2 py-1  inline-block">
                                        READY TO SHIP
                                    </div>
                                ) : (
                                    <div className="mt-2 text-[.7rem] font-medium text-[#1E381E] bg-[#fecdcd70] border border-gray-300 px-2 py-1  inline-block">
                                        NEW ARRIVALS
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default Women;
