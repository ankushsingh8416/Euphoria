import Link from "next/link";
import React from "react";
import { FiHome, FiBox, FiShoppingCart, FiGrid, FiSettings } from "react-icons/fi";

const CpanelSidebar = () => {
  return (
    <div className="bg-gray-800 text-white sticky top-0 left-0 w-64 h-screen p-6 shadow-lg">

      {/* Navigation Links */}
      <nav>
        <ul className="space-y-6">
          {/* Dashboard */}
          <li className="rounded-lg hover:bg-gray-700 cursor-pointer transition">
            <Link href="/cpanel/dashboard" className="flex items-center gap-4 p-3">
              <FiHome className="text-xl" />
              <span className="text-sm font-medium">Dashboard</span>
            </Link>
          </li>

          {/* All Products */}
          <li className="rounded-lg hover:bg-gray-700 cursor-pointer transition">
            <Link href="/cpanel/products" className="flex items-center gap-4 p-3">
              <FiBox className="text-xl" />
              <span className="text-sm font-medium">All Products</span>
            </Link>
          </li>

          {/* Order List */}
          <li className="rounded-lg hover:bg-gray-700 cursor-pointer transition">
            <Link href="/cpanel/order" className="flex items-center gap-4 p-3">
              <FiShoppingCart className="text-xl" />
              <span className="text-sm font-medium">Order List</span>
            </Link>
          </li>

          {/* Categories */}
          <li className="rounded-lg hover:bg-gray-700 cursor-pointer transition">
            <Link href="/cpanel/category" className="flex items-center gap-4 p-3">
              <FiGrid className="text-xl" />
              <span className="text-sm font-medium">Categories</span>
            </Link>
          </li>

          {/* Settings */}
          <li className="rounded-lg hover:bg-gray-700 cursor-pointer transition">
            <Link href="/cpanel/settings" className="flex items-center gap-4 p-3">
              <FiSettings className="text-xl" />
              <span className="text-sm font-medium">Settings</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default CpanelSidebar;
