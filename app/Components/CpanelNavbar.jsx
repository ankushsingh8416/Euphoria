import { useContext, useEffect, useState, useRef } from "react";
import jwt from "jsonwebtoken";
import { useRouter } from "next/navigation";
import { FiSearch, FiBell, FiLogOut, FiUser } from "react-icons/fi";
import { HiOutlineUserCircle } from "react-icons/hi";
import { FaChevronDown } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { AuthTokenContext } from "../context/AuthTokenContext";

const CpanelNavbar = () => {
  const { authToken } = useContext(AuthTokenContext);
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

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    router.push("/cpanel/login");
  };

  return (
    <div>
      <div className="bg-white shadow-md p-4 px-4 md:px-8 flex items-center justify-between">
        <div className="logo">
          <Link href="/">
            <Image
              src="/images/euphoria.webp"
              alt="Euphoria"
              width={100}
              height={100}
              className="object-cover"
            />
          </Link>
        </div>
        <div className="flex items-center gap-4 md:gap-6">
          <button className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-all duration-300 shadow-md">
            <FiSearch className="text-gray-600 text-lg" />
          </button>

          <button className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-all duration-300 shadow-md">
            <FiBell className="text-gray-600 text-lg" />
          </button>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="bg-gray-100 px-3 md:px-5 py-2 rounded-full shadow-md text-gray-700 flex items-center gap-3 hover:bg-gray-200"
            >
              <HiOutlineUserCircle className="text-gray-600 text-xl md:text-2xl" />
              <span className="hidden md:block font-medium">Admin</span>
              <FaChevronDown
                className={`hidden md:block text-sm transition-transform duration-300 ${
                  showDropdown ? "rotate-180" : ""
                }`}
              />
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-auto bg-white rounded-lg shadow-lg z-10">
                {userEmail && (
                  <div className="px-6 py-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full p-2 text-white">
                        <FiUser />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Signed in as
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {userEmail}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                <div className="py-1">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full text-left px-6 py-3 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <div className="bg-red-100 rounded-full p-2 text-red-500">
                      <FiLogOut />
                    </div>
                    <span>Sign out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CpanelNavbar;
