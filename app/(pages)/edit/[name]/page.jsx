"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaUserEdit, FaBell, FaHeart, FaCog, FaLock, FaSignOutAlt, FaHome, FaEye, FaEyeSlash } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

export default function EditProfile() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    // Fetch data from the API
    axios
      .get("http://localhost:3000/api/users")
      .then((response) => {
        const data = response.data[0]; // Assuming you are getting a list, and you want to use the first item
        setFormData({
          fullName: data.name,
          email: data.email,
          password: data.password, // Don't populate password initially for security reasons
          confirmPassword: "",
        });
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <div className="flex min-h-screen bg-white p-10 gap-10">
      <aside className="w-1/4 bg-gray-100 p-6 rounded-lg shadow-md border border-gray-300">
        <ul className="space-y-6 text-gray-800 text-base font-medium">
          <li className="flex items-center gap-4 p-2 rounded-md transition hover:bg-gray-200">
            <Link href="/dashboard" className="flex items-center gap-4">
              <FaHome /> Dashboard
            </Link>
          </li>
          <li className="flex items-center gap-4 p-2 rounded-md transition hover:bg-gray-200">
            <Link href="/favourites" className="flex items-center gap-4">
              <FaHeart /> Favourites
            </Link>
          </li>
          <li className="flex items-center gap-4 p-2 rounded-md transition hover:bg-gray-200">
            <Link href="/setting" className="flex items-center gap-4">
              <FaCog /> Setting
            </Link>
          </li>
          <li className="flex items-center gap-4 p-2 rounded-md transition hover:bg-gray-200">
            <Link href="/notification" className="flex items-center gap-4">
              <FaBell /> Notification
            </Link>
          </li>
          <li className="flex items-center gap-4 p-2 rounded-md bg-gray-300 font-semibold">
            <Link href="/edit-profile" className="flex items-center gap-4">
              <FaUserEdit /> Edit Profile
            </Link>
          </li>
          <li className="flex items-center gap-4 p-2 rounded-md transition hover:bg-gray-200">
            <Link href="/security" className="flex items-center gap-4">
              <FaLock /> Security
            </Link>
          </li>
          <li className="flex items-center gap-4 p-2 rounded-md text-red-600 transition hover:bg-red-700 hover:text-white">
            <Link href="/logout" className="flex items-center gap-4">
              <FaSignOutAlt /> Log Out
            </Link>
          </li>
        </ul>
      </aside>
      <main className="flex-1 bg-white p-8 rounded-lg shadow-md border border-gray-300">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Profile</h2>
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-28 h-28">
            <Image
              src="/images/profile.webp"
              alt="Profile Picture"
              width={112}
              height={112}
              className="rounded-full border-4 border-gray-400 shadow-md"
            />
            <span className="absolute bottom-1 right-1 bg-gray-400 text-white p-1 rounded-full shadow-md">
              <FaUserEdit size={16} />
            </span>
          </div>
        </div>
        <form className="space-y-6">
          {Object.keys(formData).map((field, index) => (
            field !== 'password' && field !== 'confirmPassword' ? (
              <div key={index} className="flex flex-col">
                <label className="text-gray-700 font-semibold capitalize text-sm">{field}</label>
                <input
                  type="text"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
              </div>
            ) : (
              <div key={index} className="flex flex-col">
                <label className="text-gray-700 font-semibold capitalize text-sm">{field}</label>
                <div className="relative">
                  <input
                    type={field === 'password' ? (showPassword ? 'text' : 'password') : (showConfirmPassword ? 'text' : 'password')}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-gray-400"
                  />
                  <span
                    onClick={field === 'password' ? togglePasswordVisibility : toggleConfirmPasswordVisibility}
                    className="absolute right-3 top-3 cursor-pointer"
                  >
                    {field === 'password' && (showPassword ? <FaEyeSlash /> : <FaEye />)}
                    {field === 'confirmPassword' && (showConfirmPassword ? <FaEyeSlash /> : <FaEye />)}
                  </span>
                </div>
              </div>
            )
          ))}
          <div className="flex justify-between">
            <button className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg shadow-md hover:bg-gray-400">Back To Home</button>
            <button className="px-6 py-3 bg-[#1E381E] text-white rounded-lg shadow-md hover:bg-gray-800">Save Changes</button>
          </div>
        </form>
      </main>
    </div>
  );
}
