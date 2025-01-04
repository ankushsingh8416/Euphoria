"use client";

import { cartContext } from "@/app/context/cartContext";
import React, { useContext } from "react";
import { SlHeart } from "react-icons/sl";

const products = [
    {
        id: 1,
        title: "Rann Handcrafted Bandhani Silk Lehenga",
        price: "₹150,000",
        defaultImage: "/images/product1.webp",
        hoverImage: "/images/product1-hover.webp",
        readyToShip: true,
    },
    {
        id: 2,
        title: "Avis Printed Silk Kaftan - Blue",
        price: "₹26,000",
        defaultImage: "/images/product2.webp",
        hoverImage: "/images/product2-hover.webp",
        readyToShip: true,
    },
    {
        id: 3,
        title: "Suramya Embroidered Zardozi Lehenga",
        price: "₹600,000",
        defaultImage: "/images/product3.webp",
        hoverImage: "/images/product3-hover.webp",
        readyToShip: true,
    },
    {
        id: 4,
        title: "Ranjika Handwoven Maheshwari Suit",
        price: "₹45,000",
        defaultImage: "/images/product4.webp",
        hoverImage: "/images/product4-hover.webp",
        readyToShip: true,
    },
    {
        id: 1,
        title: "Rann Handcrafted Bandhani Silk Lehenga",
        price: "₹150,000",
        defaultImage: "/images/product1.webp",
        hoverImage: "/images/product1-hover.webp",
        readyToShip: true,
    },
    {
        id: 2,
        title: "Avis Printed Silk Kaftan - Blue",
        price: "₹26,000",
        defaultImage: "/images/product2.webp",
        hoverImage: "/images/product2-hover.webp",
        readyToShip: true,
    },
    {
        id: 3,
        title: "Suramya Embroidered Zardozi Lehenga",
        price: "₹600,000",
        defaultImage: "/images/product3.webp",
        hoverImage: "/images/product3-hover.webp",
        readyToShip: true,
    },
    {
        id: 4,
        title: "Ranjika Handwoven Maheshwari Suit",
        price: "₹45,000",
        defaultImage: "/images/product4.webp",
        hoverImage: "/images/product4-hover.webp",
        readyToShip: true,
    },
];

const Men = () => {

const {productGrid } = useContext(cartContext)



    return (
        <div >
            <div className="flex flex-wrap justify-between gap-2">
                {products.map((product, index) => (
                    <div key={index} className={`mb-8 group ${productGrid === "four" ? "w-[48%] lg:w-[24%]" : " w-[100%] lg:w-[49%]"}`}>
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
                            {product.readyToShip && (
                                <div className="mt-2 text-[.7rem] font-medium text-[#1E381E] bg-[#F5F5F5] border border-gray-300 px-2 py-1  inline-block">
                                    READY TO SHIP
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Men;
