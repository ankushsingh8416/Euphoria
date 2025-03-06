"use client";
import axios from "axios";
import { LucideLogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiSolidMagicWand } from "react-icons/bi";
import { FiHeart, FiUser } from "react-icons/fi";
import { MdDashboardCustomize } from "react-icons/md";
import { motion } from "framer-motion";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { AuthContext } from "../context/AuthContext";
import { useUser } from "../context/UserContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();
  const [dropDown, setdropDown] = useState(false);
  const { cart } = useContext(CartContext);
  const { wishList } = useContext(WishlistContext);
  const { authToken } = useContext(AuthContext);
  const { user, loading } = useUser();

  const router = useRouter();

  const userClick = () => {
    if (session) {
      setdropDown((prevState) => !prevState);
    } else {
      router.push("/login");
    }
  };

  const dropDownVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 15,
      },
    },
    exit: { opacity: 0, y: -10, scale: 0.9 },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <>
      <div className="bg-[#1E381E]  text-white text-center py-2">
        <Link href="#" className="text-sm font-medium">
          Use Code:{" "}
          <Link href="/" className="underline">
            royal15
          </Link>{" "}
          for Extra Discount
        </Link>
      </div>

      <header className="shadow-xl z-40 sticky top-0">
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
                alt="menu"
              />
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`fixed top-0 left-0 bg-[#faf8f0] w-[320px] h-screen z-40 transition-transform duration-300 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
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
              ].map((item, index) => (
                <Link
                  key={index}
                  href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="relative group  hover:text-[#B18E35] transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#B18E35] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </nav>

            <div className=" block md:hidden m-4">
              <Link
                href={"/wishList"}
                className="group inline-flex gap-2 text-[#1E381E] font-medium px-8 py-3 border border-[#1E381E] rounded-md hover:bg-[#1E381E] hover:text-white transition-all duration-300 ease-in-out shadow-sm hover:shadow-md"
              >
                Wishlist <FiHeart className="transition-transform group-hover:scale-110" />
              </Link>
            </div>

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
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={{
                    hidden: { opacity: 0, y: -10, scale: 0.97 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                        duration: 0.3,
                      },
                    },
                    exit: {
                      opacity: 0,
                      y: -10,
                      scale: 0.97,
                      transition: { duration: 0.2 },
                    },
                  }}
                  className="w-64 z-20 shadow-lg absolute top-[55px] -left-[12rem] md:-left-36 bg-white rounded-lg p-3 border border-gray-100"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.25,
                      delay: 0.1,
                    }}
                    className="flex items-center p-2"
                  >
                    <div className="flex gap-3 items-center">
                      <motion.div
                        className="rounded-full overflow-hidden border border-gray-200 shadow-sm"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Image
                          src={user?.profileImage || "/images/profile.webp"}
                          alt="user"
                          className="object-cover w-[34px] h-[34px]"
                          width={100}
                          height={100}
                        />
                      </motion.div>
                      <h3 className="text-sm text-[#1e381e] font-medium capitalize">
                        {user?.name || "Guest"}
                      </h3>
                    </div>
                  </motion.div>

                  <div className="border-t border-gray-200 my-1"></div>

                  <motion.ul
                    className="p-1.5"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.05,
                          delayChildren: 0.1,
                        },
                      },
                    }}
                  >
                    {[
                      {
                        href: `/edit/${session?.user?.name}?id=${session?.user?.id}`,
                        icon: <FiUser className="text-[#1e381e] w-4 h-4" />,
                        label: "Edit Profile",
                      },
                      {
                        href: "/cpanel/login",
                        icon: (
                          <MdDashboardCustomize className="text-[#1e381e] w-4 h-4" />
                        ),
                        label: "Dashboard",
                      },
                      {
                        href: "/support",
                        icon: (
                          <BiSolidMagicWand className="text-[#1e381e] w-4 h-4" />
                        ),
                        label: "Euphoria AI",
                      },
                    ].map((item, index) => (
                      <motion.li
                        key={index}
                        variants={{
                          hidden: { opacity: 0, x: -5 },
                          visible: {
                            opacity: 1,
                            x: 0,
                            transition: {
                              type: "spring",
                              stiffness: 400,
                              damping: 30,
                            },
                          },
                        }}
                        whileHover={{ x: 2 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Link
                          href={item.href}
                          className="block"
                          onClick={() => setdropDown((prevState) => !prevState)}
                        >
                          <div className="flex items-center text-[#1e381e] hover:bg-gray-50 p-2.5 rounded-md cursor-pointer transition-all duration-200 group">
                            <div className="p-1.5 rounded-md group-hover:bg-[#1e381e]/5 transition-colors duration-200">
                              {item.icon}
                            </div>
                            <span className="ml-2 text-sm group-hover:text-[#1e381e] group-hover:font-medium transition-all duration-200">
                              {item.label}
                            </span>
                          </div>
                        </Link>
                      </motion.li>
                    ))}

                    <motion.li
                      variants={{
                        hidden: { opacity: 0, x: -5 },
                        visible: {
                          opacity: 1,
                          x: 0,
                          transition: {
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                          },
                        },
                      }}
                      whileHover={{ x: 2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <button
                        className="flex items-center text-red-600 hover:bg-red-50 p-2.5 rounded-md cursor-pointer w-full transition-all duration-200 group"
                        onClick={() => signOut()}
                      >
                        <div className="p-1.5 rounded-md group-hover:bg-red-100/30 transition-colors duration-200">
                          <LucideLogOut className="w-4 h-4" />
                        </div>
                        <span className="ml-2 text-sm group-hover:font-medium transition-all duration-200">
                          Logout
                        </span>
                      </button>
                    </motion.li>
                  </motion.ul>
                </motion.div>
              )}
            </div>

            {/* Wishlist Icon */}
            <Link href="/wishlist" className="relative hidden lg:block">
              <Image
                src="/images/wishlist-icon.svg"
                alt="Wishlist"
                width={24}
                height={24}
                className=" cursor-pointer"
              />
              {session && (
                <div className="bg-[#1e381e] flex items-center justify-center text-white text-[10px] w-[16px] h-[16px] rounded-full absolute -top-1 -right-[0.6rem]">
                  {wishList.length}
                </div>
              )}
            </Link>

            {/* Cart Icon */}
            <Link href="/cart" className="relative">
              <Image
                src="/images/cart-icon.svg"
                alt="Cart"
                width={24}
                height={24}
                className="cursor-pointer"
              />
              {session && (
                <div className="bg-[#1e381e] flex items-center justify-center text-white text-[10px] w-[16px] h-[16px] rounded-full absolute -top-1 -right-[0.6rem]">
                  {cart.length}
                </div>
              )}
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}