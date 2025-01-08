"use client";

import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

export default function CpanelAuth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();

        const validEmail = "nkshrazz@gmail.com";
        const validPassword = "rajputankush999";

        if (email === validEmail && password === validPassword) {
            router.push("/cpanel");
        } else {
            alert("Email and password is not correct")
        }
    };

    return (
        <div className="h-screen overflow-hidden flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-md w-full max-w-full flex flex-col lg:flex-row rounded-none">
                {/* Left Side: Image */}
                <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50">
                    <img
                        src="/images/login.webp"
                        alt="Login Illustration"
                        className="object-cover w-full h-auto object-top"
                    />
                </div>

                {/* Right Side: Login Form */}
                <div className="w-full lg:w-1/2 px-6 py-8 md:px-10 flex items-center justify-center">
                    <div className="w-full max-w-md">
                        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center lg:text-left text-[#1E381E]">
                            Welcome Back
                        </h1>
                        <p className="text-sm text-gray-500 mb-6 text-center lg:text-left">
                            Please log in to manage your control panel.
                        </p>

                        {/* Login Form */}
                        <form className="space-y-4" onSubmit={handleLogin}>
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
                                    />
                                </div>
                            </div>

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
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-[#1E381E] focus:border-[#1E381E]"
                                    />
                                </div>
                            </div>

                            <button className="w-full bg-[#1f6b1f] text-white py-2 rounded-lg hover:bg-[#1f771f]">
                                Log In
                            </button>

                            <div className="text-center mt-4">
                                <Link href="/forgot-password" className="text-sm text-[#1E381E] hover:underline">
                                    Forgot your password?
                                </Link>
                            </div>
                        </form>

                        <p className="text-sm text-center text-gray-500 mt-6">
                            New to the platform?{" "}
                            <Link href="/signup" className="text-[#1E381E] hover:underline">
                                Create an account
                            </Link>
                        </p>

                        <div className="mt-8 text-center">
                            <p className="text-gray-500 text-xs">
                                By logging in, you agree to our{" "}
                                <Link href="/terms" className="text-[#1E381E] hover:underline">
                                    Terms of Service
                                </Link>{" "}
                                and{" "}
                                <Link href="/privacy" className="text-[#1E381E] hover:underline">
                                    Privacy Policy
                                </Link>
                                .
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
