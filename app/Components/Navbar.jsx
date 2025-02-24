"use client";
import axios from "axios";
import { LucideLogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { BiSolidMagicWand } from "react-icons/bi";
import { FiUser } from "react-icons/fi";
import { MdDashboardCustomize, MdOutlineContactSupport } from "react-icons/md";
import { cartContext } from "../context/cartContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();
  const [dropDown, setDropDown] = useState(false);
  const [profile, setProfile] = useState({});
  const { cart, wishList } = useContext(cartContext);
  const dropdownRef = useRef(null);
  const [promoCode, setPromoCode] = useState("WELCOME20");
  const [isCodeVisible, setIsCodeVisible] = useState(true);

  const router = useRouter();

  const userClick = () => {
    if (session) {
      setDropDown((prevState) => !prevState);
    } else {
      router.push("/login");
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropDown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Animation for discount code
  useEffect(() => {
    const codes = ["WELCOME20", "SALE50", "NEWUSER15", "EXTRA10"];
    let index = 0;
    
    const intervalId = setInterval(() => {
      setIsCodeVisible(false);
      
      setTimeout(() => {
        index = (index + 1) % codes.length;
        setPromoCode(codes[index]);
        setIsCodeVisible(true);
      }, 500);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!session?.user?.id) return;
      try {
        const response = await axios.get(`/api/users/${session.user.id}`);
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to fetch user data.");
      }
    };

    if (session) {
      fetchUserData();
    }
  }, [session?.user?.id]); // Runs on refresh when session updates

  // Enhanced animations
  const dropDownVariants = {
    hidden: { 
      opacity: 0, 
      y: -10, 
      scale: 0.95,
      transformOrigin: "top right" 
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transformOrigin: "top right",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 20,
        duration: 0.3
      }
    },
    exit: { 
      opacity: 0, 
      y: -10, 
      scale: 0.95,
      transformOrigin: "top right",
      transition: { 
        duration: 0.2,
        ease: "easeInOut"
      } 
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 15,
      x: -5
    },
    visible: (i) => ({ 
      opacity: 1, 
      y: 0, 
      x: 0,
      transition: { 
        delay: i * 0.05,
        duration: 0.3,
        ease: "easeOut"
      } 
    })
  };

  return (
    <>
      <div className="bg-[#1E381E] text-white text-center py-3 relative overflow-hidden">
        <AnimatePresence mode="wait">
          {isCodeVisible && (
            <motion.div
              key={promoCode}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center space-x-2"
            >
              <span className="text-sm font-medium">Use Code:</span>
              <motion.span
                className="font-bold bg-white text-[#1E381E] px-3 py-1 rounded-md"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 2, 0, -2, 0],
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  repeatDelay: 1 
                }}
              >
                {promoCode}
              </motion.span>
              <span className="text-sm font-medium">
                for <span className="underline">Extra Discount</span>
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <header className="shadow-xl z-40 sticky top-0 bg-white">
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
              ].map((item, index) => (
                <Link
                  key={index}
                  href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="relative group hover:text-[#B18E35] transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#B18E35] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </nav>
          </div>
          <div className="logo block lg:hidden">
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
            <div className="relative" ref={dropdownRef}>
              <div className="relative">
                <Image
                  onClick={userClick}
                  src="/images/user-icon.svg"
                  alt="User"
                  width={24}
                  height={24}
                  className={`cursor-pointer transition-all duration-200 ${dropDown ? 'opacity-70' : 'opacity-100'}`}
                />
                {dropDown && (
                  <motion.div 
                    className="absolute w-2 h-2 bg-[#1E381E] rounded-full top-0 right-0"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </div>

              <AnimatePresence>
                {dropDown && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={dropDownVariants}
                    className="w-72 z-10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] absolute top-[55px] right-0 bg-white rounded-lg overflow-hidden"
                    style={{ 
                      boxShadow: "0 4px 25px rgba(0, 0, 0, 0.15)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    {/* Arrow indicator at top */}
                    <div className="absolute top-[-8px] right-[10px] w-0 h-0" style={{ 
                      borderLeft: "8px solid transparent",
                      borderRight: "8px solid transparent",
                      borderBottom: "8px solid white"
                    }}></div>
                    
                    {/* Header with gradient */}
                    <div className="bg-gradient-to-r from-[#1E381E] to-[#2E5A2E] p-5 text-white">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center"
                      >
                        <div className="rounded-full overflow-hidden border-2 border-white p-[2px]">
                          <Image
                            src={profile?.profileImage || "/images/profile.webp"}
                            alt="user"
                            className="object-cover w-[50px] h-[50px] rounded-full"
                            width={100}
                            height={100}
                          />
                        </div>
                        <div className="ml-4">
                          <h3 className="text-base font-bold capitalize">
                            {profile?.name || "Guest"}
                          </h3>
                          <p className="text-xs opacity-80">{profile?.email || "guest@example.com"}</p>
                        </div>
                      </motion.div>
                    </div>

                    <motion.ul
                      className="py-2"
                      initial="hidden"
                      animate="visible"
                      variants={{
                        hidden: { opacity: 0 },
                        visible: {
                          opacity: 1,
                          transition: { staggerChildren: 0.1 },
                        },
                      }}
                    >
                      {[
                        {
                          href: `/edit/${session?.user?.name}?id=${session?.user?.id}`,
                          icon: <FiUser className="w-5 h-5" />,
                          label: "Edit Profile",
                        },
                        {
                          href: "/cpanel/login",
                          icon: <MdDashboardCustomize className="w-5 h-5" />,
                          label: "Dashboard",
                        },
                        {
                          href: "/support",
                          icon: <BiSolidMagicWand className="w-5 h-5" />,
                          label: "Euphoria AI",
                        },
                      ].map((item, index) => (
                        <motion.li 
                          key={index} 
                          custom={index} 
                          variants={itemVariants}
                        >
                          <Link
                            href={item.href}
                            className="block"
                            onClick={() => setDropDown(false)}
                          >
                            <div className="flex items-center text-gray-700 hover:bg-gray-50 hover:text-[#1E381E] py-3 px-5 cursor-pointer transition-all duration-200 group">
                              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-[#1E381E] group-hover:bg-[#E8F1E8] group-hover:scale-110 transition-all duration-200">
                                {item.icon}
                              </div>
                              <span className="ml-3 text-sm font-medium">{item.label}</span>
                            </div>
                          </Link>
                        </motion.li>
                      ))}

                      <motion.div className="border-t border-gray-200 my-2" custom={3} variants={itemVariants} />

                      <motion.li
                        custom={4}
                        variants={itemVariants}
                      >
                        <button
                          className="flex items-center w-full text-left text-gray-700 hover:bg-red-50 hover:text-red-600 py-3 px-5 cursor-pointer transition-all duration-200 group"
                          onClick={() => signOut()}
                        >
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-red-500 group-hover:bg-red-100 group-hover:scale-110 transition-all duration-200">
                            <LucideLogOut className="w-5 h-5" />
                          </div>
                          <span className="ml-3 text-sm font-medium">Logout</span>
                        </button>
                      </motion.li>
                    </motion.ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Wishlist Icon */}
            <Link href="/wishlist" className="relative hidden lg:block">
              <Image
                src="/images/wishlist-icon.svg"
                alt="Wishlist"
                width={24}
                height={24}
                className="cursor-pointer"
              />
              <div className="bg-[#1e381e] flex items-center justify-center text-white text-[10px] w-[16px] h-[16px] rounded-full absolute -top-1 -right-[0.6rem]">
                {wishList.length}
              </div>
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
              <div className="bg-[#1e381e] flex items-center justify-center text-white text-[10px] w-[16px] h-[16px] rounded-full absolute -top-1 -right-[0.6rem]">
                {cart.length}
              </div>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}