import React from 'react';
import { FiSearch, FiBell } from 'react-icons/fi';
import { HiOutlineUserCircle } from 'react-icons/hi';
import Image from 'next/image'
import Link from 'next/link'
const CpanelNavbar = () => {
  return (
    <div>
      <div className="bg-white shadow-md p-4 px-8 flex items-center justify-between">
        <div className="logo">
          <Link href="/">
            <Image src="/images/euphoria.webp" alt="Anita Dongre" width={100} height={100} className="object-cover" />
          </Link>
        </div>
        <div className="flex items-center gap-6">
          {/* Search Icon */}
          <button className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-all duration-300 shadow-md">
            <FiSearch className="text-gray-600 text-lg" />
          </button>

          {/* Notification Bell Icon */}
          <button className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-all duration-300 shadow-md">
            <FiBell className="text-gray-600 text-lg" />
          </button>

          {/* Admin/User Icon */}
          <button className="bg-gray-100 px-5 py-2 rounded-full hover:bg-gray-200 transition-all duration-300 shadow-md text-gray-700 flex items-center gap-3">
            <HiOutlineUserCircle className="text-gray-600 text-2xl" />
            <span className="font-medium">Admin</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CpanelNavbar;
