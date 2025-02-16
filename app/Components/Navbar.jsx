"use client";
import { LucideLogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiUser } from "react-icons/fi";
import { MdDashboardCustomize } from "react-icons/md";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();
  const [dropDown, setdropDown] = useState(false);
  const router = useRouter();
  const userClick = () => {
    if (session) {
      setdropDown((prevState) => !prevState);
    } else {
      router.push("/login");
    }
  };
  return (
    <>
      <div className="bg-[#1E381E] text-white text-center py-2">
        <Link href="#" className="text-sm font-medium">
          Shop At Special Prices |
          <Link href="/" className="underline">
            Discover Now
          </Link>
        </Link>
      </div>

      <header className="shadow-xl z-50 sticky top-0">
        {/* Main Header Section */}
        <div className="flex items-center justify-between px-4 md:px-6 py-3">
          {/* Left Section */}
          <div className="flex items-center">
            <div className="logo hidden lg:block">
              <Link href="/">
                <Image
                  src="/images/euphoria.webp"
                  alt="Anita Dongre"
                  width={80}
                  height={64}
                  className="object-cover"
                />
              </Link>
            </div>

            <button
              onClick={() => setIsMenuOpen(true)}
              className="block lg:hidden"
            >
              <img
                width="30"
                height="30"
                src="https://img.icons8.com/ios-glyphs/30/menu--v3.png"
                alt="menu--v3"
              />
            </button>
          </div>

          <div
            className={`fixed top-0 left-0 bg-[#faf8f0] w-[320px] h-screen z-40 transition-transform duration-300 ${
              isMenuOpen ? "translate-x-0" : "-translate-x-full"
            } lg:static lg:translate-x-0 lg:flex lg:h-auto lg:w-auto`}
          >
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-8 right-8 lg:hidden"
            >
              <Image
                src="/images/cancel-icon.webp"
                alt="Close"
                width={30}
                height={30}
              />
            </button>
            <nav className="flex flex-col lg:flex-row items-start lg:items-center lg:justify-center w-full space-y-4 lg:space-y-0 lg:space-x-8 py-12 lg:py-4 px-4 lg:px-0 text-gray-700">
              {[
                "Women",
                "Men",
                "Wedding",
                "Jewelry",
                "Accessories",
                "Gifting",
                "Sale",
              ].map((item, index) => {
                const href = `/${item.toLowerCase().replace(/\s+/g, "-")}`;
                return (
                  <Link
                    key={index}
                    href={href}
                    className="relative group hover:text-[#B18E35] transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                    <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#B18E35] transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="logo block lg:hidden ">
            <Link href="/">
              <Image
                src="/images/euphoria.webp"
                alt="Anita Dongre"
                width={100}
                height={64}
                className="object-cover"
              />
            </Link>
          </div>

          {/* Right Section (Icons) */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            {/* Search Icon */}
            <Link href="/search">
              <Image
                src="/images/search-icon.svg"
                alt="Search"
                width={24}
                height={24}
                className="cursor-pointer"
              />
            </Link>

            {/* User Icon */}
            <div className="relative">
              <Image
                onClick={userClick}
                src="/images/user-icon.svg"
                alt="User"
                width={24}
                height={24}
                className="cursor-pointer"
              />
              {dropDown && (
                <div className="w-64 z-10 shadow-2xl absolute top-[55px] -left-36 bg-white rounded-lg  p-4">
                  <div className="flex items-center mb-4">
                    <div className="ml-3 flex gap-4 items-center">
                      <Image
                        src="/images/profile.webp"
                        alt="user"
                        className="object-cover"
                        width={30}
                        height={30}
                      />
                      <h3 className="text-sm  text-gray-900 font-bold capitalize">
                        {session?.user.name}
                      </h3>
                    </div>
                  </div>

                  <div className="border-t border-gray-200"></div>

                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center justify-between text-gray-700 hover:bg-gray-100 p-2 rounded-md cursor-pointer">
                      <Link
                        href={{
                          pathname: `/edit/${session?.user.name}`,
                          query: { id: session?.user.id },
                        }}
                        className="flex items-center"
                      >
                        <FiUser className="w-5 h-5 mr-2 text-gray-500" />
                        Edit Profile
                      </Link>
                    </li>

                    <li className="flex items-center justify-between text-gray-700 hover:bg-gray-100 p-2 rounded-md cursor-pointer">
                      <Link
                        href={"/cpanel/login"}
                        className="flex items-center"
                      >
                        <MdDashboardCustomize className="w-5 h-5 mr-2 text-gray-500" />
                        Dashboard
                      </Link>
                    </li>

                    <li className="flex items-center justify-between text-gray-700 hover:bg-red-100 p-2 rounded-md cursor-pointer">
                      <span
                        className="flex items-center text-red-500"
                        onClick={() => signOut()}
                      >
                        <LucideLogOut className="w-5 h-5 mr-2" />
                        Logout
                      </span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
            {/* Heart Icon */}
            <Image
              src="/images/wishlist-icon.svg"
              alt="Wishlist"
              width={24}
              height={24}
              className="hidden lg:block cursor-pointer"
            />

            {/* Cart Icon */}
            <Link href="/cart">
              <Image
                src="/images/cart-icon.svg"
                alt="Cart"
                width={24}
                height={24}
                className="cursor-pointer"
              />
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
