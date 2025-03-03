import Link from "next/link";
import React from "react";
import { FaUsers, FaWallet } from "react-icons/fa";
import {
  FiHome,
  FiBox,
  FiShoppingCart,
  FiGrid,
  FiSettings,
  FiUsers,
} from "react-icons/fi";
import { MdOutlinePayment } from "react-icons/md";

const CpanelSidebar = () => {
  return (
    <div className="bg-gray-900 text-white sticky top-0 left-0 w-16 md:w-64 h-screen p-2 md:p-6 shadow-lg">
      {/* Navigation Links */}
      <nav>
        <ul className="space-y-6">
          {/* Dashboard */}
          <li className="rounded-lg hover:bg-gray-700 cursor-pointer transition">
            <Link
              href="/cpanel/dashboard"
              className="flex items-center gap-4 p-2 md:p-3"
            >
              <FiHome className="text-xl" />
              <span className="text-sm font-medium hidden md:block">
                Dashboard
              </span>
            </Link>
          </li>

          {/* All Products */}
          <li className="rounded-lg hover:bg-gray-700 cursor-pointer transition">
            <Link
              href="/cpanel/products"
              className="flex items-center gap-4 p-2 md:p-3"
            >
              <FiBox className="text-xl" />
              <span className="text-sm font-medium hidden md:block">
                All Products
              </span>
            </Link>
          </li>

          {/* Order List */}
          <li className="rounded-lg hover:bg-gray-700 cursor-pointer transition">
            <Link
              href="/cpanel/order"
              className="flex items-center gap-4 p-2 md:p-3"
            >
              <FiShoppingCart className="text-xl" />
              <span className="text-sm font-medium hidden md:block">
                Order List
              </span>
            </Link>
          </li>

          {/* Categories */}
          <li className="rounded-lg hover:bg-gray-700 cursor-pointer transition">
            <Link
              href="/cpanel/payments "
              className="flex items-center gap-0 md:gap-4 p-2 md:p-3"
            >
              <MdOutlinePayment className="text-xl" />
              <span className="text-sm font-medium hidden md:block">
                Payments{" "}
              </span>
            </Link>
          </li>

          {/* customer */}
          <li className="rounded-lg hover:bg-gray-700 cursor-pointer transition">
            <Link
              href="/cpanel/customer"
              className="flex items-center gap-4 p-2 md:p-3"
            >
              <FiUsers className="text-xl" />
              <span className="text-sm font-medium hidden md:block">
                Customers
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default CpanelSidebar;
