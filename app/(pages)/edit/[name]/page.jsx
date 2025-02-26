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
  FaLock,
  FaSignOutAlt,
  FaCartArrowDown,
  FaArrowLeft,
  FaUser,
  FaEnvelope,
  FaSave,
  FaCamera,
} from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import ImageUploading from "react-images-uploading";
import { signOut } from "next-auth/react";
import Loader from "@/app/Components/Loader";

export default function EditProfile() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  });

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");

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

    const image = imageList[0];

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
      toast.success("Profile image uploaded successfully!");
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
        password: formData.password || undefined,
        profileImage: formData.profileImage,
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
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(117.86deg, #f8ecd7 -6.6%, #fcf9f5 95.63%)",
      }}
    >
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <div className="max-w-5xl mx-auto">
          {/* Profile Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
            {/* Header Section */}
            <div className="relative">
              {/* Background Banner */}
              <div className="h-48 bg-[#1e381e]/10 flex items-end justify-center">
                <div
                  className="absolute inset-0 bg-cover bg-top"
                  style={{
                    backgroundImage:
                      "url('https://assets2.andaazfashion.com/media/images/home-page-creative/home-page-velvet-dresses-banner-04022025.jpg')", // Replace with your image path
                  }}
                ></div>
              </div>

              {/* Profile Image - Positioned to overlap banner */}
              <div className="absolute left-0 right-0 -bottom-16 flex justify-center">
                <ImageUploading
                  value={
                    formData.profileImage
                      ? [{ data_url: formData.profileImage }]
                      : []
                  }
                  onChange={onChange}
                  maxNumber={1}
                  dataURLKey="data_url"
                >
                  {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    dragProps,
                  }) => (
                    <div className="relative group">
                      {imageList.length === 0 ? (
                        <div
                          onClick={onImageUpload}
                          {...dragProps}
                          className="rounded-full h-32 w-32 border-4 border-white shadow-md flex items-center justify-center cursor-pointer bg-[#fcf9f5] hover:bg-[#f8ecd7] transition-all duration-300"
                        >
                          <div className="text-center">
                            <FaUser
                              size={36}
                              className="text-[#1e381e]/50 mx-auto"
                            />
                            <p className="text-xs text-[#1e381e]/70 mt-2">
                              Upload Photo
                            </p>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md">
                            <Image
                              src={formData.profileImage}
                              alt="Profile Picture"
                              width={128}
                              height={128}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="absolute inset-0 rounded-full bg-black bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center transition-all duration-300">
                            <div className="opacity-0 group-hover:opacity-100 flex space-x-2 transition-opacity duration-300">
                              <button
                                onClick={() => onImageUpdate(0)}
                                className="bg-white p-2 rounded-full shadow-sm text-[#1e381e] hover:bg-[#f8ecd7] transition-colors duration-200"
                                aria-label="Edit profile image"
                              >
                                <FaCamera size={14} />
                              </button>
                              <button
                                onClick={onImageRemoveAll}
                                className="bg-white p-2 rounded-full shadow-sm text-red-500 hover:bg-red-50 transition-colors duration-200"
                                aria-label="Remove profile image"
                              >
                                <FaTrash size={14} />
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </ImageUploading>
              </div>
            </div>

            {/* Form Content */}
            <div className="pt-20 px-6 sm:px-10 pb-10">
              <h1 className="text-2xl font-bold text-center text-[#1e381e] mb-2">
                Edit Your Profile
              </h1>
              <p className="text-[#1e381e]/70 text-center mb-8">
                Customize your account information and preferences
              </p>

              {/* Tabs */}
              <div className="flex justify-center mb-8">
                <div className="inline-flex bg-[#f8ecd7]/50 p-1 rounded-lg">
                  <button
                    onClick={() => setActiveTab("personal")}
                    className={`px-5 py-2 rounded-lg font-medium transition-all duration-200 ${
                      activeTab === "personal"
                        ? "bg-white text-[#1e381e] shadow-sm"
                        : "text-[#1e381e]/70 hover:text-[#1e381e]"
                    }`}
                  >
                    <FaUser className="inline mr-2" /> Personal Info
                  </button>
                  <button
                    onClick={() => setActiveTab("security")}
                    className={`px-5 py-2 rounded-lg font-medium transition-all duration-200 ${
                      activeTab === "security"
                        ? "bg-white text-[#1e381e] shadow-sm"
                        : "text-[#1e381e]/70 hover:text-[#1e381e]"
                    }`}
                  >
                    <FaLock className="inline mr-2" /> Security
                  </button>
                </div>
              </div>

              <form className="space-y-8" onSubmit={handleSubmit}>
                {/* Personal Info Section */}
                <div
                  className={`space-y-6 ${
                    activeTab === "personal" ? "block" : "hidden"
                  }`}
                >
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[#1e381e] font-medium flex items-center">
                        <FaUser className="mr-2 text-[#1e381e]" /> Full Name
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full p-3 bg-[#fcf9f5] border border-[#1e381e]/10 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1e381e]/30 focus:border-[#1e381e]/30 transition-all"
                        placeholder="Your full name"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[#1e381e] font-medium flex items-center">
                        <FaEnvelope className="mr-2 text-[#1e381e]" /> Email
                        Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-3 bg-[#fcf9f5] border border-[#1e381e]/10 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1e381e]/30 focus:border-[#1e381e]/30 transition-all"
                        placeholder="your.email@example.com"
                      />
                      <p className="text-sm text-[#1e381e]/60 mt-1 ml-1">
                        This email will be used for account recovery and
                        notifications
                      </p>
                    </div>
                  </div>
                </div>

                {/* Password Section */}
                <div
                  className={`space-y-6 ${
                    activeTab === "security" ? "block" : "hidden"
                  }`}
                >
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[#1e381e] font-medium flex items-center">
                        <FaLock className="mr-2 text-[#1e381e]" /> New Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className="w-full p-3 bg-[#fcf9f5] border border-[#1e381e]/10 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1e381e]/30 focus:border-[#1e381e]/30 transition-all"
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#1e381e]/50 hover:text-[#1e381e]"
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                      <p className="text-sm text-[#1e381e]/60 mt-1 ml-1">
                        Use at least 8 characters with letters and numbers
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[#1e381e] font-medium flex items-center">
                        <FaLock className="mr-2 text-[#1e381e]" /> Confirm
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className="w-full p-3 bg-[#fcf9f5] border border-[#1e381e]/10 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1e381e]/30 focus:border-[#1e381e]/30 transition-all"
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#1e381e]/50 hover:text-[#1e381e]"
                          aria-label={
                            showConfirmPassword
                              ? "Hide confirm password"
                              : "Show confirm password"
                          }
                        >
                          {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                      <p className="text-sm text-[#1e381e]/60 mt-1 ml-1">
                        Re-enter your new password to confirm
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-6 flex flex-col sm:flex-row justify-end gap-3">
                  <Link
                    href="/"
                    className="px-6 py-3 rounded-lg border border-[#1e381e]/20 text-[#1e381e] font-medium text-center hover:bg-[#f8ecd7]/50 transition-all"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`px-8 py-3 rounded-lg font-medium flex items-center justify-center gap-2 ${
                      isLoading
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-[#1e381e] text-white hover:bg-[#1e381e]/90"
                    } transition-all duration-200`}
                  >
                    {isLoading ? (
                      <Loader />
                    ) : (
                      <>
                        <FaSave className="mr-2" /> Save Changes
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Footer Section */}
          <div className="mt-8 text-center text-[#1e381e]/60 text-sm">
            <p>© 2025 Your Brand Name. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
