"use client"
import { FaSearch } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import Spotlight from './Spotlight';
import Link from 'next/link';

const SearchPanel = () => {
  return (
    <div className="fixed top-0 left-0 h-screen overflow-auto w-full searchpannel bg-white z-50">
      {/* Top Notification Bar */}
      <div className="bg-[#1E381E] text-white text-center py-2">
        <Link href="#" className="text-sm font-medium">
          Shop At Special Prices |
          <Link href="/" className="underline"> Discover Now</Link>
        </Link>
      </div>

      <button
        className="absolute top-20 right-8 flex items-center justify-center w-14 h-14 rounded-full bg-gray-100 shadow-xl hover:shadow-2xl hover:bg-red-600 hover:text-white text-gray-600 text-3xl transition-all duration-300 transform hover:scale-110"
        onClick={() => console.log('Close button clicked')} 
      >
        <IoClose />
      </button>


      {/* Search Panel Content */}
      <div className="p-4 bg-[#faf8f0]">
        {/* Search Bar */}
        <div className="relative w-full max-w-4xl mx-auto mt-6">
          <div className="flex items-center border-2 border-gray-300 rounded-full shadow-xl bg-white transition-all duration-300 hover:shadow-2xl">
            <input
              type="text"
              placeholder="Search for products, categories, or keywords..."
              className="flex-grow px-6 py-4 text-lg  font-semibold text-gray-800 bg-transparent focus:outline-none"
            />
            <button className="px-5 text-gray-500  transition-all rounded-full">
              <FaSearch className="text-2xl " />
            </button>
          </div>
        </div>

        {/* Popular Searches */}
        <div className="mt-12">
          <h2 className="text-lg font-bold text-gray-800">POPULAR SEARCHES</h2>
          <div className="flex flex-wrap gap-6 mt-4">
            {['Lehenga', 'Sharara', 'Anarkali', 'Bags', 'Benarasi', 'Dress'].map((item) => (
              <div key={item} className="flex items-center space-x-2">
                <FaSearch className="text-gray-600" />
                <span className="text-gray-700 font-medium text-base">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <Spotlight />
        </div>
      </div>
    </div>
  );
};

export default SearchPanel;
