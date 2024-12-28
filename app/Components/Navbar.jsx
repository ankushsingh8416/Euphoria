import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="shadow-xl  z-50">
     
      <div className="bg-[#1E381E] text-white text-center py-2">
        <Link href="#" className="text-sm font-medium">
          Shop At Special Prices |
          <Link href="/" className="underline"> Discover Now</Link>
        </Link>
      </div>

      {/* Main Header Section */}
      <div className="flex items-center justify-between px-4 md:px-6 py-3">
        {/* Left Section */}
        <div className="flex items-center">
          <Link href="#" className="hidden lg:block text-sm font-medium text-gray-700 hover:underline">
            Language :
          </Link>
          <button className="block lg:hidden">
            <img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/menu--v3.png" alt="menu--v3" />
          </button>
        </div>

        <div className="logo">
          {/* Logo */}
          <Link href="#">
            <Image src="/images/euphoria.png" alt="Anita Dongre" width={80} height={64} className="object-cover" />
          </Link>
        </div>

        {/* Right Section (Icons) */}
        <div className="flex items-center space-x-2 lg:space-x-4">
          {/* Search Icon */}
          <Image src="/images/search-icon.svg" alt="Search" width={24} height={24} className="cursor-pointer" />

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
      <nav className="hidden lg:flex justify-center space-x-8 py-4 text-gray-700">
        <Link
          href="#"
          className="relative group hover:text-[#B18E35] transition-all duration-300"
        >
          Women
          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#B18E35] transition-all duration-300 group-hover:w-full"></span>
        </Link>
        <Link
          href="#"
          className="relative group hover:text-[#B18E35] transition-all duration-300"
        >
          Men
          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#B18E35] transition-all duration-300 group-hover:w-full"></span>
        </Link>
        <Link
          href="#"
          className="relative group hover:text-[#B18E35] transition-all duration-300"
        >
          Wedding
          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#B18E35] transition-all duration-300 group-hover:w-full"></span>
        </Link>
        <Link
          href="#"
          className="relative group hover:text-[#B18E35] transition-all duration-300"
        >
          Jewelry
          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#B18E35] transition-all duration-300 group-hover:w-full"></span>
        </Link>
        <Link
          href="#"
          className="relative group hover:text-[#B18E35] transition-all duration-300"
        >
          Accessories
          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#B18E35] transition-all duration-300 group-hover:w-full"></span>
        </Link>
        <Link
          href="#"
          className="relative group hover:text-[#B18E35] transition-all duration-300"
        >
          Gifting
          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#B18E35] transition-all duration-300 group-hover:w-full"></span>
        </Link>

        <Link
          href="#"
          className="relative group hover:text-[#B18E35] transition-all duration-300"
        >
          Discover
          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#B18E35] transition-all duration-300 group-hover:w-full"></span>
        </Link>
        <Link
          href="#"
          className="relative group hover:text-[#B18E35] transition-all duration-300"
        >
          Celebrity Closet
          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#B18E35] transition-all duration-300 group-hover:w-full"></span>
        </Link>
        <Link
          href="#"
          className="relative group hover:text-[#B18E35] transition-all duration-300"
        >
          Sale
          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#B18E35] transition-all duration-300 group-hover:w-full"></span>
        </Link>
      </nav>
    </header>
  );
}
