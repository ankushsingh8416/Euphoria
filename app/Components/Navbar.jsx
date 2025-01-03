"use client"
import { useContext, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cartContext } from "../context/cartContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setIsSearchOpen } = useContext(cartContext);

  return (
    <>
      <div className="bg-[#1E381E] text-white text-center py-2">
        <Link href="#" className="text-sm font-medium">
          Shop At Special Prices |
          <Link href="/" className="underline"> Discover Now</Link>
        </Link>
      </div>

      <header className="shadow-xl z-50 sticky top-0">
        {/* Main Header Section */}
        <div className="flex items-center justify-between px-4 md:px-6 py-3">
          {/* Left Section */}
          <div className="flex items-center">
            <Link href="#" className="hidden lg:block text-sm font-medium text-gray-700 hover:underline">
              Language :
            </Link>
            <button onClick={() => setIsMenuOpen(true)} className="block lg:hidden">
              <img
                width="30"
                height="30"
                src="https://img.icons8.com/ios-glyphs/30/menu--v3.png"
                alt="menu--v3"
              />
            </button>
          </div>

          <div className="logo">
            {/* Logo */}
            <Link href="/">
              <Image src="/images/euphoria.webp" alt="Anita Dongre" width={80} height={64} className="object-cover" />
            </Link>
          </div>

          {/* Right Section (Icons) */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            {/* Search Icon */}
            <Image     onClick={() => setIsSearchOpen(true)}
            src="/images/search-icon.svg" alt="Search" width={24} height={24} className="cursor-pointer" />

            {/* User Icon */}
            <Link href="/login">
              <Image src="/images/user-icon.svg" alt="User" width={24} height={24} className="cursor-pointer" />
            </Link>
            {/* Heart Icon */}
            <Image src="/images/wishlist-icon.svg" alt="Wishlist" width={24} height={24} className="hidden lg:block cursor-pointer" />

            {/* Cart Icon */}
            <Image src="/images/cart-icon.svg" alt="Cart" width={24} height={24} className="cursor-pointer" />
          </div>
        </div>

        {/* Navigation Links */}
        <div
          className={`fixed top-0 left-0 bg-[#faf8f0] w-[320px] h-screen z-40 transition-transform duration-300 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
            } lg:static lg:translate-x-0 lg:flex lg:h-auto lg:w-auto`}
        >
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-8 right-8 lg:hidden"
          >
            <Image src="/images/cancel-icon.png" alt="Close" width={30} height={30} />
          </button>
          <nav className="flex flex-col lg:flex-row items-start lg:items-center lg:justify-center w-full space-y-4 lg:space-y-0 lg:space-x-8 py-12 lg:py-4 px-4 lg:px-0 text-gray-700">
            {[
              "Women",
              "Men",
              "Wedding",
              "Jewelry",
              "Accessories",
              "Gifting",
              "Discover",
              "Celebrity Closet",
              "Sale",
            ].map((item, index) => (
              <Link
                key={index}
                href="#"
                className="relative group hover:text-[#B18E35] transition-all duration-300"
              >
                {item}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#B18E35] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
}
