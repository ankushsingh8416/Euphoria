"use client"
import axios from "axios";
import {  useSearchParams } from "next/navigation";
import { useState } from "react";
import { FaHeart, FaTruck } from "react-icons/fa";
import { HiOutlineHome, HiOutlineLocationMarker } from "react-icons/hi";
import { IoBagHandle } from "react-icons/io5";
const ProductDetails = () => {
    const searchParams = useSearchParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const id = searchParams.get('id'); 
    console.log("This is id: " + id);

    if (id) {
        axios.get(`/api/products/${id}`)
            .then((response) => {
                setProduct(response.data);
                console.log("Product details:", response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching product details:", error);
                setLoading(false);
            });
    } else {
        setLoading(false); 
    }
    return (
        <div className="w-full lg:w-[95%] shadow-lg mx-auto px-4 py-8">
            <div className="flex flex-col gap-10 lg:flex-row">
                {/* Left Section - Images */}
                <div className="flex-1">
                    <div className="grid grid-cols-1 gap-4">
                        <img
                            src="/images/category1.webp"
                            alt="Main Product"
                            className="w-full rounded-md"
                        />
                    </div>
                </div>
                {/* Right Section - Details */}
                <div className="flex-1 lg:pl-8">
                    <h1 className="text-[25px] lg:text-[30px] crimson tracking-wider mb-4">
                        Honeydew Printed Kaftan - Yellow
                    </h1>
                    <p className="text-base lg:text-lg text-gray-500 mt-2">₹22,900</p>
                    <p className="text-sm lg:text-base text-gray-400 mt-1">MRP Inclusive of all taxes</p>
                    <p className="text-gray-700 mt-4 text-sm lg:text-base">
                        Add a touch of freshness to your summertime wardrobe with our Honeydew kaftan. Crafted in breezy crepe fabric and peppered with nature-inspired motifs, this kaftan comes with a fabric belt.
                    </p>
                    {/* Color Options */}
                    <div className="mt-6">
                        <p className="text-sm lg:text-base text-gray-700">Colour:</p>
                        <div className="flex items-center gap-3 mt-2 cursor-pointer">
                            <div className="w-6 h-6 rounded-full bg-yellow-400 border-2 border-gray-500 transform transition-transform duration-300 hover:scale-125"></div>
                        </div>
                    </div>
                    {/* Size Options */}
                    <div className="mt-6">
                        <p className="text-sm lg:text-base text-gray-700">Size:</p>
                        <div className="flex items-center gap-2 lg:gap-3 mt-2">
                            {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                                <button
                                    key={size}
                                    className="px-3 py-1.5 text-xs lg:text-sm border rounded-md hover:bg-gray-100"
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                        <a
                            href="#"
                            className="text-xs lg:text-sm text-blue-500 underline mt-2 inline-block"
                        >
                            View Size Guide
                        </a>
                    </div>
                    {/* Delivery Options */}
                    <div className="mt-6">
                        <p className="text-sm lg:text-base text-gray-700">Delivery Method:</p>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-2">
                            <div className="flex items-center gap-2 text-xs lg:text-sm">
                                <HiOutlineHome />
                                <span>Home Delivery</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs lg:text-sm">
                                <HiOutlineLocationMarker />
                                <span>Store Pickup</span>
                            </div>
                        </div>
                    </div>
                    {/* Add to Cart */}
                    <button className=" flex items-center justify-center gap-2  my-4 sticky bottom-4 lg:static  w-full bg-gradient-to-r from-[#1e381e] to-[#2b4f2b] text-white  py-3 rounded-md transform transition-all duration-300 hover:shadow-lg hover:from-[#2b4f2b] hover:to-[#1e381e] text-sm lg:text-base">
                        Add To Bag
                        <IoBagHandle className="text-white text-xl" />

                    </button>
                    <button className="w-full flex items-center justify-center gap-2 border border-transparent py-3 rounded-md text-black transform transition-all duration-300 shadow-lg border-[#1e381e] text-sm lg:text-base">
                        <FaHeart className="text-red-500 text-xl" />
                        <span>Add to Wishlist</span>
                    </button>
                    {/* Additional Info */}
                    <div className="mt-6 border-t pt-4">
                        <p className="text-xs lg:text-sm text-gray-500">
                            This is a made-to-order style and will take 30 business days for production and dispatch orders within India and internationally.
                        </p>
                        <div className="flex sm:flex-row items-center gap-4 mt-4 border p-4 justify-center border-gray-400">
                            <FaTruck />
                            <p className="text-xs lg:text-sm">Explore Kaftans shipping in 24 hours</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ProductDetails;