"use client";

import { cartContext } from "@/app/context/cartContext";
import React, { useContext, useEffect } from "react";
import { SlHeart } from "react-icons/sl";

const initialProducts = [
    {
        id: 1,
        title: "Rann Handcrafted Bandhani Silk Lehenga",
        price: "155000",
        defaultImage: "/images/product1.webp",
        hoverImage: "/images/product1-hover.webp",
        meta: {
            readyToShip: true,
            isNewArrival: false,
        },
        color: "Red",
        brand: "Manish Malhotra",
        size: ["M", "L", "XL"],
        category: "Lehenga",
    },
    {
        id: 2,
        title: "Avis Printed Silk Kaftan - Blue",
        price: "27000",
        defaultImage: "/images/product2.webp",
        hoverImage: "/images/product2-hover.webp",
        meta: {
            readyToShip: true,
            isNewArrival: false,
        },
        color: "Blue",
        brand: "FabIndia",
        size: ["Free Size"],
        category: "Kaftan",
    },
    {
        id: 3,
        title: "Suramya Embroidered Zardozi Lehenga",
        price: "610000",
        defaultImage: "/images/product3.webp",
        hoverImage: "/images/product3-hover.webp",
        meta: {
            readyToShip: false,
            isNewArrival: true,
        },
        color: "Gold",
        brand: "Ritu Kumar",
        size: ["M", "L"],
        category: "Lehenga",
    },
    {
        id: 4,
        title: "Ranjika Handwoven Maheshwari Suit",
        price: "46000",
        defaultImage: "/images/product4.webp",
        hoverImage: "/images/product4-hover.webp",
        meta: {
            readyToShip: true,
            isNewArrival: false,
        },
        color: "Pink",
        brand: "Biba",
        size: ["S", "M", "L"],
        category: "Suit",
    },
    {
        id: 5,
        title: "Ananya Designer Saree",
        price: "80000",
        defaultImage: "/images/product1.webp",
        hoverImage: "/images/product1-hover.webp",
        meta: {
            readyToShip: false,
            isNewArrival: true,
        },
        color: "Beige",
        brand: "Global Desi",
        size: ["Free Size"],
        category: "Saree",
    },
    {
        id: 6,
        title: "Tarun Textured Linen Kurta",
        price: "34000",
        defaultImage: "/images/product2.webp",
        hoverImage: "/images/product2-hover.webp",
        meta: {
            readyToShip: true,
            isNewArrival: false,
        },
        color: "White",
        brand: "Local Artisans",
        size: ["M", "L", "XL"],
        category: "Kurta",
    },
    {
        id: 7,
        title: "Vrinda Zari Silk Lehenga",
        price: "525000",
        defaultImage: "/images/product3.webp",
        hoverImage: "/images/product3-hover.webp",
        meta: {
            readyToShip: false,
            isNewArrival: true,
        },
        color: "Purple",
        brand: "Anita Dongre",
        size: ["M", "L"],
        category: "Lehenga",
    },
    {
        id: 8,
        title: "Kamya Embroidered Chikankari Suit",
        price: "39000",
        defaultImage: "/images/product4.webp",
        hoverImage: "/images/product4-hover.webp",
        meta: {
            readyToShip: true,
            isNewArrival: false,
        },
        color: "Yellow",
        brand: "W for Women",
        size: ["S", "M", "L"],
        category: "Suit",
    },
];

const Women = () => {
    const { selectedFilters, sortOption, setProducts, totalProducts, products, productGrid } = useContext(cartContext);

    useEffect(() => {
        let filteredProducts = [...initialProducts];

        Object.keys(selectedFilters).forEach(filter => {
            if (selectedFilters[filter].length > 0) {
                filteredProducts = filteredProducts.filter(product => {
                    if (filter === "Price") {
                        return selectedFilters[filter].some(priceRange => {
                            const [min, max] = priceRange.split("-").map(Number);
                            return product.price >= min && product.price <= max;
                        });
                    } else if (Array.isArray(product[filter.toLowerCase()])) {
                        return product[filter.toLowerCase()].some(size =>
                            selectedFilters[filter].includes(size)
                        );
                    }
                    return selectedFilters[filter].includes(product[filter.toLowerCase()]);
                });
            }
        });

        // Sorting logic
        filteredProducts.sort((a, b) => {
            const priceA = parseFloat(a.price);
            const priceB = parseFloat(b.price);
            if (sortOption === "Price:LowtoHigh") return priceA - priceB;
            if (sortOption === "Price:HightoLow") return priceB - priceA;
            return 0;
        });

        setProducts(filteredProducts);
    }, [selectedFilters, sortOption, setProducts]);

    return (

        <>

            {totalProducts === 0 ? (
                <div className="text-center mt-8">
                    <h1 className="text-[#1E381E] text-xl lg:text-2xl">No products found. Please try adjusting your filters.</h1>
                </div>
            ) : (<div className="flex flex-wrap justify-between gap-2">
                {products.map((product, index) => (
                    <div key={index} className={`mb-8 group ${productGrid === "four" ? "w-[48%] lg:w-[24%]" : " w-[100%] lg:w-[48%]"}`}>
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
                            {/* Price and Heart Icon */}
                            <div className="flex items-center justify-between mt-1">
                                <p className="text-gray-600">{product.price}</p>
                                <button
                                    className="text-gray-500 hover:text-[#B18E35] transition duration-300"
                                    aria-label="Add to Wishlist"
                                >
                                    <SlHeart size={18} />
                                </button>
                            </div>
                            {product.meta.readyToShip ? (
                                <div className="mt-2 text-[.7rem] font-medium text-[#1E381E] bg-[#F5F5F5] border border-gray-300 px-2 py-1  inline-block">
                                    READY TO SHIP
                                </div>
                            ) :
                                <div className="mt-2 text-[.7rem] font-medium text-[#1E381E] bg-[#fecdcd70] border border-gray-300 px-2 py-1  inline-block">
                                    NEW ARRIVALS
                                </div>

                            }
                        </div>
                    </div>
                ))}
            </div>)
            }

        </>

    );
};

export default Women;
