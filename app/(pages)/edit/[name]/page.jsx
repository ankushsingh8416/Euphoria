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
} from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import ImageUploading from "react-images-uploading";

export default function EditProfile() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: [],
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
          confirmPassword: "",
          profileImage,
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
    const uploadedImages = await Promise.all(
      imageList.map(async (image) => {
        if (!image.file) {
          return {
            Profileimage: image.data_url,
          };
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
            return null;
          }

          const data = await response.json();
          return {
            Profileimage: data.secure_url,
          };
        } catch (error) {
          console.error("Fetch error:", error);
          toast.error("An error occurred during the upload.");
          return null;
        }
      })
    );

    const validImages = uploadedImages.filter((img) => img !== null);

    setFormData((prevData) => ({ ...prevData, profileImage: validImages }));
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
        profileImage:formData.profileImage[0].Profileimage
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
          <li className="flex items-center gap-4 p-2 rounded-md bg-gray-300 font-semibold">
            <Link href="/edit-profile" className="flex items-center gap-4">
              <FaUserEdit /> Edit Profile
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
          <ImageUploading
            value={formData.profileImage}
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
              <div className="relative w-28 h-28">
                {imageList.length === 0 ? (
                  <div
                    onClick={onImageUpload}
                    {...dragProps}
                    className="rounded-full border-4 border-gray-400 shadow-md flex items-center justify-center cursor-pointer w-full h-full"
                  >
                    <FaUserEdit size={40} className="text-gray-500" />
                  </div>
                ) : (
                  <div className="relative w-28 h-28">
                    <img
                      src={formData.profileImage[0].Profileimage}
                      alt="Profile Picture"
                      width={112}
                      height={112}
                      className="rounded-full block h-[112] w-[112] border-4 border-gray-400 shadow-md object-cover"
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
          {["fullName", "email"].map((field, index) => (
            <div key={index} className="flex flex-col">
              <label className="text-gray-700 font-semibold capitalize text-sm">
                {field}
              </label>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            </div>
          ))}
          {["password", "confirmPassword"].map((field, index) => (
            <div key={index} className="flex flex-col">
              <label className="text-gray-700 font-semibold capitalize text-sm">
                {field}
              </label>
              <div className="relative">
                <input
                  type={
                    field === "password"
                      ? showPassword
                        ? "text"
                        : "password"
                      : showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
                <span
                  onClick={
                    field === "password"
                      ? () => setShowPassword(!showPassword)
                      : () => setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-3 top-3 cursor-pointer"
                >
                  {field === "password" &&
                    (showPassword ? <FaEyeSlash /> : <FaEye />)}
                  {field === "confirmPassword" &&
                    (showConfirmPassword ? <FaEyeSlash /> : <FaEye />)}
                </span>
              </div>
            </div>
          ))}
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
