"use client";
import { FaSearch } from "react-icons/fa";
import Spotlight from "./Spotlight";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useContext } from "react";
import { cartContext } from "../context/cartContext";

const SearchPanel = () => {
  const { isSearchOpen, setIsSearchOpen } = useContext(cartContext);
  if (!isSearchOpen) return null;

  return (
    <div className="fixed top-0 left-0 h-screen overflow-auto w-full searchpannel bg-white z-50">
      {/* Top Notification Bar */}
      <div className="bg-[#1E381E] text-white text-center py-2 text-sm md:text-base">
        <Link href="#" className="font-medium">
          Shop At Special Prices |
          <Link href="/" className="underline"> Discover Now</Link>
        </Link>
      </div>

      {/* Back Button */}
      <button 
        className="absolute top-12 lg:top-16  sm:top-20 left-4 sm:left-6 text-lg sm:text-xl md:text-2xl text-[#1E381E] hover:text-gray-600 cursor-pointer"
        onClick={() => setIsSearchOpen(false)}
      >
        <FaArrowLeftLong />
      </button>

      {/* Search Panel Content */}
      <div className="p-4 pt-6 md:pt-5 sm:p-6 md:p-8 bg-[#faf8f0]">
        {/* Search Bar */}
        <div className="relative w-full max-w-4xl mx-auto mt-4 sm:mt-6">
          <div className="flex items-center border-2 border-gray-300 rounded-full shadow-xl bg-white transition-all duration-300 hover:shadow-2xl">
            <input
              type="text"
              placeholder="Search for products, categories, or keywords..."
              className="flex-grow px-4 py-3 sm:px-6 sm:py-4 text-sm sm:text-lg md:text-xl font-medium text-gray-800 bg-transparent focus:outline-none"
            />
            <button className="px-4 sm:px-5 text-gray-500 transition-all rounded-full">
              <FaSearch className="text-lg sm:text-2xl " />
            </button>
          </div>
        </div>

        {/* Popular Searches */}
        <div className="mt-8 sm:mt-10 md:mt-12">
          <h2 className="text-sm sm:text-lg md:text-xl font-bold text-gray-800">POPULAR SEARCHES</h2>
          <div className="flex flex-wrap gap-4 sm:gap-6 mt-4">
            {["Lehenga", "Sharara", "Anarkali", "Bags", "Benarasi", "Dress"].map((item) => (
              <div key={item} className="flex items-center space-x-2">
                <FaSearch className="text-gray-600 text-xs sm:text-base" />
                <span className="text-gray-700 font-medium text-xs sm:text-base md:text-lg">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Spotlight Section */}
        <div className="mt-8 lg:mt-2 sm:mt-10 md:mt-12">
          <Spotlight />
        </div>
      </div>
    </div>
  );
};

export default SearchPanel;
