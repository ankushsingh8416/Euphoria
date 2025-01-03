"use client";

import React from "react";
import { FaArrowRight } from "react-icons/fa";
import FilterSection from "../Components/FilterSection";

const products = [
    {
        id: 1,
        title: "Kirsa Ajrakh Hand-block Printed Silk Sharara Set - Red",
        price: "₹185,000",
        defaultImage: "/images/product1.webp",
        hoverImage: "/images/product1-hover.webp",
    },
    {
        id: 2,
        title: "Cinnabar Handcrafted Bandhani Silk Suit Set - Red",
        price: "₹110,000",
        defaultImage: "/images/product2.webp",
        hoverImage: "/images/product2-hover.webp",
    },
    {
        id: 3,
        title: "Kasano Ajrakh Hand-block Printed Silk Suit Set - Mustard",
        price: "₹130,000",
        defaultImage: "/images/product3.webp",
        hoverImage: "/images/product3-hover.webp",
    },
    {
        id: 4,
        title: "Khevna Handwoven Benarasi Silk Sharara Set - Red",
        price: "₹145,000",
        defaultImage: "/images/product4.webp",
        hoverImage: "/images/product4-hover.webp",
    },
    {
        id: 5,
        title: "Kirsa Ajrakh Hand-block Printed Silk Sharara Set - Red",
        price: "₹185,000",
        defaultImage: "/images/product1.webp",
        hoverImage: "/images/product1-hover.webp",
    },
    {
        id: 6,
        title: "Cinnabar Handcrafted Bandhani Silk Suit Set - Red",
        price: "₹110,000",
        defaultImage: "/images/product2.webp",
        hoverImage: "/images/product2-hover.webp",
    },
    {
        id: 7,
        title: "Kasano Ajrakh Hand-block Printed Silk Suit Set - Mustard",
        price: "₹130,000",
        defaultImage: "/images/product3.webp",
        hoverImage: "/images/product3-hover.webp",
    },
    {
        id: 8,
        title: "Khevna Handwoven Benarasi Silk Sharara Set - Red",
        price: "₹145,000",
        defaultImage: "/images/product4.webp",
        hoverImage: "/images/product4-hover.webp",
    },
    {
        id: 1,
        title: "Kirsa Ajrakh Hand-block Printed Silk Sharara Set - Red",
        price: "₹185,000",
        defaultImage: "/images/product1.webp",
        hoverImage: "/images/product1-hover.webp",
    },
    {
        id: 2,
        title: "Cinnabar Handcrafted Bandhani Silk Suit Set - Red",
        price: "₹110,000",
        defaultImage: "/images/product2.webp",
        hoverImage: "/images/product2-hover.webp",
    },
    {
        id: 3,
        title: "Kasano Ajrakh Hand-block Printed Silk Suit Set - Mustard",
        price: "₹130,000",
        defaultImage: "/images/product3.webp",
        hoverImage: "/images/product3-hover.webp",
    },
    {
        id: 4,
        title: "Khevna Handwoven Benarasi Silk Sharara Set - Red",
        price: "₹145,000",
        defaultImage: "/images/product4.webp",
        hoverImage: "/images/product4-hover.webp",
    },
    {
        id: 5,
        title: "Kirsa Ajrakh Hand-block Printed Silk Sharara Set - Red",
        price: "₹185,000",
        defaultImage: "/images/product1.webp",
        hoverImage: "/images/product1-hover.webp",
    },
    {
        id: 6,
        title: "Cinnabar Handcrafted Bandhani Silk Suit Set - Red",
        price: "₹110,000",
        defaultImage: "/images/product2.webp",
        hoverImage: "/images/product2-hover.webp",
    },
    {
        id: 7,
        title: "Kasano Ajrakh Hand-block Printed Silk Suit Set - Mustard",
        price: "₹130,000",
        defaultImage: "/images/product3.webp",
        hoverImage: "/images/product3-hover.webp",
    },
    {
        id: 8,
        title: "Khevna Handwoven Benarasi Silk Sharara Set - Red",
        price: "₹145,000",
        defaultImage: "/images/product4.webp",
        hoverImage: "/images/product4-hover.webp",
    },
  
];

const ProductList = () => {
    return (
        <div className="p-4 lg:px-6">
            <FilterSection />
            <div className="flex flex-wrap justify-between gap-2">
                {products.map((product, index) => (
                    <div key={index} className="w-[48%] lg:w-[24%] mb-8 group">
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
                ))}
            </div>

            {/* Button */}
            <div className="text-center my-6">
                <button className="group inline-flex items-center text-[#1E381E] px-8 py-3 border border-[#1E381E] hover:bg-[#1E381E] hover:text-white transition duration-300">
                    SHOP THE COLLECTION
                    <FaArrowRight className="ml-2 transition-all group-hover:ml-4" />
                </button>
            </div>
        </div>
    );
};

export default ProductList;
