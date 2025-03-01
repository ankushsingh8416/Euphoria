"use client";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import OtpModal from "@/app/Components/OtpModal";
import toast from "react-hot-toast";
import Loader from "@/app/Components/Loader";
import { useSession } from "next-auth/react";
import { AuthTokenContext } from "@/app/context/AuthTokenContext";

export default function CpanelAuth() {
  const { data: session } = useSession();
  const { setToken } = useContext(AuthTokenContext);
  const [email, setEmail] = useState(session?.user?.email || "");
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "send", email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("OTP sent to your email!");
        setShowOtpModal(true);
      } else {
        toast.error(data.message || "Failed to send OTP");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerified = (token) => {
    setToken(token);
    router.push("/cpanel/dashboard");
  };
  return (
    <div className="h-screen overflow-hidden flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md w-full max-w-full flex flex-col lg:flex-row rounded-none">
        <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50">
          <img
            src="/images/login.webp"
            alt="Login Illustration"
            className="object-cover w-full h-auto object-top"
          />
        </div>

        {showOtpModal && (
          <OtpModal
            email={email}
            onVerified={handleOtpVerified}
            onClose={() => setShowOtpModal(false)}
          />
        )}

        <div className="w-full lg:w-1/2 px-6 py-8 md:px-10 flex items-center justify-center">
          <div className="w-full max-w-md">
            <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center lg:text-left text-[#1E381E]">
              Admin Login
            </h1>
            <p className="text-sm text-gray-500 mb-6 text-center lg:text-left">
              Please enter your email to receive an OTP for login.
            </p>

            <form className="space-y-4" onSubmit={handleEmailSubmit}>
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
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-[#1E381E] focus:border-[#1E381E]"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#1f6b1f] text-white py-2 rounded-lg hover:bg-[#1f771f] transition-colors flex justify-center items-center"
                disabled={loading}
              >
                {loading ? <Loader /> : "Continue"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
