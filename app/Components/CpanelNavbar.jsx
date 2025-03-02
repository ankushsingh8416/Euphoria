import { useContext, useEffect, useState, useRef } from "react";
import jwt from "jsonwebtoken";
import { useRouter } from "next/navigation";
import { FiSearch, FiBell, FiLogOut, FiUser, FiSettings, FiMenu, FiChevronDown, FiPackage } from "react-icons/fi";
import { HiOutlineUserCircle } from "react-icons/hi";
import Image from "next/image";
import Link from "next/link";
import { AuthContext } from "../context/AuthContext";

const CpanelNavbar = () => {
  const { authToken } = useContext(AuthContext);
  const [userEmail, setUserEmail] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (authToken) {
      try {
        const decoded = jwt.decode(authToken);
        if (decoded?.email) {
          setUserEmail(decoded.email);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    } else {
      router.push("/cpanel/login");
    }
  }, [authToken]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    router.push("/cpanel/login");
  };

  return (

    <div className="bg-white shadow-lg border-b border-gray-100">
      <div className="max-w-full mx-auto">
        {/* Main navbar */}
        <div className="py-3 px-4 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button className="md:hidden bg-gray-50 p-2 rounded-full text-gray-600 hover:bg-gray-100 transition-all shadow-sm">
              <FiMenu />
            </button>

            <Link href="/" className="flex items-center">
              <div className="relative">
                <Image
                  src="/images/euphoria.webp"
                  alt="Euphoria"
                  width={110}
                  height={45}
                  className="object-contain"
                />
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {/* Stylish searchbar */}
            <div className="hidden md:flex relative group">
              <input
                type="text"
                placeholder="Search..."
                className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-64 pl-12 pr-4 py-2.5 transition-all duration-300 focus:w-72 shadow-sm"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none group-focus-within:text-blue-500">
                <FiSearch className="text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Stylish icons */}
              <button className="relative p-2.5 text-gray-600 bg-gray-50 rounded-full hover:bg-blue-50 hover:text-blue-500 transition-all shadow-sm">
                <FiBell size={18} />
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-sm">
                  5
                </span>
              </button>

              <Link href={"/cpanel/addnew"} className="p-2.5 text-gray-600 bg-gray-50 rounded-full hover:bg-blue-50 hover:text-blue-500 transition-all shadow-sm">
                <FiPackage size={18} />
              </Link>

              {/* Stylish admin button */}
              <div className="relative ml-2" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-3 bg-white border border-gray-200 hover:border-blue-200 hover:bg-blue-50 transition-all rounded-full py-2 px-4 shadow-sm"
                >
                  <div className="bg-gradient-to-r from-blue-500 to-teal-400 rounded-full p-1.5 shadow-md">
                    <HiOutlineUserCircle className="text-white text-lg" />
                  </div>
                  <span className="text-gray-800 text-sm font-medium hidden md:block">Admin Panel</span>
                  <FiChevronDown className={`text-gray-500 transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`} />
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-3 w-72 bg-white rounded-xl shadow-xl z-10 border border-gray-200 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-500 to-teal-400 px-6 py-5 text-white">
                      <p className="font-medium">Administrator</p>
                      <p className="text-sm text-white/80 truncate">{userEmail}</p>
                    </div>

                    <div className="py-3 divide-y divide-gray-100">
                      <div className="px-2">
                        <Link href="/cpanel/profile" className="flex items-center gap-3 w-full text-left px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg mx-1 my-1 transition-colors">
                          <div className="bg-blue-100 rounded-lg p-2 text-blue-500">
                            <FiUser size={16} />
                          </div>
                          <span>My Profile</span>
                        </Link>

                        <Link href="/cpanel/addnew" className="flex items-center gap-3 w-full text-left px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg mx-1 my-1 transition-colors">
                          <div className="bg-green-100 rounded-lg p-2 text-green-500">
                            <FiPackage size={16} />
                          </div>
                          <span>Add Product</span>
                        </Link>
                      </div>

                      <div className="px-2 pt-1">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 w-full text-left px-5 py-3 text-sm text-gray-700 hover:bg-red-50 rounded-lg mx-1 my-1 transition-colors"
                        >
                          <div className="bg-red-100 rounded-lg p-2 text-red-500">
                            <FiLogOut size={16} />
                          </div>
                          <span>Sign out</span>
                        </button>
                      </div>
                    </div>

                    <div className="bg-gray-50 py-3 px-6 text-center text-xs text-gray-500 border-t border-gray-100">
                      © 2025 Euphoria Admin System
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CpanelNavbar;