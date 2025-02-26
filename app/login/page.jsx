"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Loader } from "lucide-react";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });

    setLoading(false);

    if (res.error) {
      toast.error(res.error);
      return;
    }

    toast.success("Login successful! Redirecting...");

    // Clear input fields after successful login
    setFormData({ email: "", password: "" });

    setTimeout(() => {
      router.push("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Toaster />
      <div className="bg-white shadow-md w-11/12 my-6 max-w-4xl flex flex-col lg:flex-row rounded-lg overflow-hidden">
        {/* Left Side: Image */}
        <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50">
          <img
            src="/images/login.webp"
            alt="Login Illustration"
            className="object-cover object-top w-full h-52 md:h-64 lg:h-full"
          />
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full lg:w-1/2 px-6 py-8 md:px-10">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center lg:text-left crimson">
            Log In
          </h1>
          <p className="text-sm text-gray-500 mb-6 text-center lg:text-left">
            Log in to access your account and our products
          </p>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
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

            {/* Login Button */}
            <button
              type="submit"
              className={`w-full bg-[#1f6b1f] text-white py-2 rounded-lg hover:bg-[#1f771f] flex justify-center ${
                loading ? "opacity-50 cursor-not-allowed" : "opacity-100"
              }`}
              disabled={loading}
            >
              {loading ? <Loader className="animate-spin" /> : "Log In"}
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="text-sm text-center text-gray-500 mt-4">
            Don't have an account?{" "}
            <Link href="/signup" className="text-[#1E381E] hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
