"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Loader from "../Components/Loader";

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      toast.error(data.message);
      return;
    }

    toast.success("Account created successfully! Redirecting...");

    // Clear input fields after successful signup
    setFormData({ name: "", email: "", password: "" });

    setTimeout(() => {
      router.push("/login");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Toaster />
      <div className="bg-white shadow-md w-11/12 my-6 max-w-4xl flex flex-col lg:flex-row rounded-lg overflow-hidden">
        {/* Left Side: Image */}
        <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50">
          <img
            src="/images/signup.png"
            alt="Signup Illustration"
            className="object-cover object-top w-full h-52 md:h-64 lg:h-full"
          />
        </div>

        {/* Right Side: Signup Form */}
        <div className="w-full lg:w-1/2 px-6 py-8 md:px-10">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center lg:text-left crimson">
            Sign Up
          </h1>
          <p className="text-sm text-gray-500 mb-6 text-center lg:text-left">
            Sign up for free to access any of our products
          </p>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            <div className="relative">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <div className="relative">
                <FontAwesomeIcon
                  icon={faUser}
                  className="absolute size-4 left-3 top-3 text-gray-500"
                />
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-[#1E381E] focus:border-[#1E381E]"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="relative">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <div className="relative">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="absolute size-4 left-3 top-3 text-gray-500"
                />
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-[#1E381E] focus:border-[#1E381E]"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <FontAwesomeIcon
                  icon={faLock}
                  className="absolute size-4 left-3 top-3 text-gray-500"
                />
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-[#1E381E] focus:border-[#1E381E]"
                />
              </div>
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              className={`w-full bg-[#1f6b1f] text-white py-2 rounded-lg hover:bg-[#1f771f] flex justify-center ${
                loading ? "opacity-50 cursor-not-allowed" : "opacity-100"
              }`}
              disabled={loading}
            >
              {loading ? <Loader /> : "Sign Up"}
            </button>
          </form>

          <p className="text-sm text-center text-gray-500 mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-[#1E381E] hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
