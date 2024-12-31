import Image from 'next/image';
import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

const Gifting = () => {
  return (
    <div className="max-w-6xl mx-auto px-2 py-4 lg:px-4 lg:py-10 flex flex-wrap items-center">
      {/* Image Section */}
      <div className="w-full md:w-1/2 px-4 mb-6 md:mb-0">
        <Image
          src="/images/gifting.png"
          alt="Thoughtfully Crafted Gifts"
          width={500}
          height={500}
          className="w-full" 
        />
      </div>

      {/* Text Section */}
      <div className="w-full md:w-1/2 px-4 text-center">
        <h2 className="text-2xl md:text-4xl font-thin crimson mb-4">
          THOUGHTFULLY CRAFTED GIFTS
        </h2>
        <p className="text-gray-700 mb-6 text-[.9rem] md:text-[1rem]">
          Rooted in Rajasthan & meticulously handcrafted by master artisans, these
          modern-day keepsakes make the perfect gifts.
        </p>

        {/* Button Section */}
        <div className="mt-6 lg:mt-8">
          <button className="group inline-flex items-center text-[#1E381E] px-6 py-3 border border-[#1E381E] hover:bg-[#1E381E] hover:text-white transition duration-300">
            SHOP NOW
            <FaArrowRight className="ml-2 transition-all group-hover:ml-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Gifting;
