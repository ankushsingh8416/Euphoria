"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  FaUserEdit,
  FaTrash,
  FaEye,
  FaEyeSlash,
  FaHome,
  FaHeart,
  FaCog,
  FaLock,
  FaSignOutAlt,
  FaCartArrowDown,
} from "react-icons/fa";
import Image from "next/image"; // Import Image component
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import ImageUploading from "react-images-uploading";
import { signOut } from "next-auth/react";

export default function EditProfile() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null, // Store as a single URL string
  });

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get(`/api/users/${id}`);
        const { name, email, password, profileImage } = response.data;
        setFormData({
          fullName: name,
          email,
          password,
          confirmPassword: password,
          profileImage: profileImage || null,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to fetch user data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  const onChange = async (imageList) => {
    if (imageList.length === 0) {
      setFormData((prevData) => ({ ...prevData, profileImage: null }));
      return;
    }

    const image = imageList[0]; // Only one image allowed

    if (!image.file) {
      setFormData((prevData) => ({
        ...prevData,
        profileImage: image.data_url,
      }));
      return;
    }

    const formData = new FormData();
    formData.append("file", image.file);
    formData.append("upload_preset", "Euphoria");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dxhwn8am2/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const data = await response.json();
        console.error("Cloudinary upload error:", data);
        toast.error(
          `Error: ${data.error?.message || "Failed to upload image"}`
        );
        return;
      }

      const data = await response.json();
      setFormData((prevData) => ({
        ...prevData,
        profileImage: data.secure_url,
      }));
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("An error occurred during the upload.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      setIsLoading(false);
      return;
    }

    try {
      const updatedUser = {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password || undefined, // Only send if changed
        profileImage: formData.profileImage, // Send the URL
      };

      await axios.put(`/api/users/${id}`, updatedUser);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white p-10 gap-10">
      <aside className="w-1/4 bg-gray-100 p-6 rounded-lg shadow-md border border-gray-300">
        <ul className="space-y-6 text-gray-800 text-base font-medium">
          <Link href="/" className="block">
            <li className="flex items-center gap-4 p-2 rounded-md transition hover:bg-gray-200">
              <FaHome /> <span className="md:block hidden">Euphoria</span>
            </li>
          </Link>

          <Link href="/wishlist" className="block">
            <li className="flex items-center gap-4 p-2 rounded-md transition hover:bg-gray-200">
              <FaHeart /> <span className="md:block hidden">Favourites</span>
            </li>
          </Link>

          <Link href="/cart" className="block">
            <li className="flex items-center gap-4 p-2 rounded-md transition hover:bg-gray-200">
              <FaCartArrowDown />
              <span className="md:block hidden">Cart</span>
            </li>
          </Link>

          <li className="flex items-center gap-4 p-2 rounded-md bg-gray-300 font-semibold">
            <Link href="/edit-profile" className="flex items-center gap-4">
              <FaUserEdit />{" "}
              <span className="md:block hidden">Edit Profile</span>
            </Link>
          </li>
          <li
            onClick={() => signOut()}
            className="flex cursor-pointer items-center gap-4 p-2 rounded-md text-red-600 transition hover:bg-red-700 hover:text-white"
          >
            <div className="flex items-center gap-4">
              <FaSignOutAlt /> <span className="md:block hidden">Log Out</span>
            </div>
          </li>
        </ul>
      </aside>
      <main className="flex-1 bg-white p-8 rounded-lg shadow-md border border-gray-300">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Profile</h2>
        <div className="relative w-full  flex justify-center mb-6">
          <ImageUploading
            value={
              formData.profileImage ? [{ data_url: formData.profileImage }] : []
            } // Correct value prop
            onChange={onChange}
            maxNumber={1}
            dataURLKey="data_url"
          >
            {({
              imageList,
              onImageUpload,
              onImageRemoveAll,
              onImageRemove,
              onImageUpdate,
              dragProps,
            }) => (
              <div>
                {imageList.length === 0 ? (
                  <div
                    onClick={onImageUpload}
                    {...dragProps}
                    className="rounded-full h-[112] w-[112] border-4 border-gray-400 shadow-md flex items-center justify-center cursor-pointer "
                  >
                    <FaUserEdit size={40} className="text-gray-500" />
                  </div>
                ) : (
                  <div className="relative w-28 h-28">
                    <Image
                      src={formData.profileImage}
                      alt="Profile Picture"
                      width={112}
                      height={112}
                      className="rounded-full block w-full h-full border-4 border-gray-400 shadow-md object-cover"
                    />
                    <span
                      onClick={() => onImageUpdate(0)}
                      className="absolute bottom-1 right-1 bg-gray-400 text-white p-1 rounded-full shadow-md cursor-pointer"
                    >
                      <FaUserEdit size={16} />
                    </span>
                    <span
                      onClick={onImageRemoveAll}
                      className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full shadow-md cursor-pointer"
                    >
                      <FaTrash size={16} />
                    </span>
                  </div>
                )}
              </div>
            )}
          </ImageUploading>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold capitalize text-sm">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold capitalize text-sm">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold capitalize text-sm">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 cursor-pointer"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold capitalize text-sm">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 cursor-pointer"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-[#1E381E] text-white rounded-lg shadow-md hover:bg-gray-800"
          >
            Save Changes
          </button>
        </form>
      </main>
    </div>
  );
}
