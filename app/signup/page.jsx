"use client"
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { signIn } from "next-auth/react";
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
export default function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter(); 
  const handleSubmit=  async (e)=>{
     e.preventDefault();
     if (!email || !password || !username) {
      toast.error('Please fill in all fields.');
       return;
     }  
     const response = await fetch('/api/signup',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({ username, email, password })
     })
     const result = await response.json();
     if(response.ok){
      if (response.ok) {
        toast.success("Registration successful!!");
        router.push('/login');
      }
     }else{
      toast.error(result.message || 'Signup failed. Please try again.');
     }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Toaster /> 
      <div className="bg-white shadow-md w-11/12 my-6 max-w-4xl flex flex-col lg:flex-row rounded-lg overflow-hidden">
        {/* Left Side: Image */}
        <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50">
          <img
            src="./images/signup.webp"
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

          {/* Social Buttons */}
          <div className="space-y-4 mb-6">
            <button onClick={() => signIn('google')} className="w-full flex items-center justify-center space-x-3 bg-gray-100 border border-gray-300 py-2 rounded-lg hover:shadow-md">
              <img
                src="./images/google-icon.webp"
                alt="Google"
                className="h-5"
              />
              <span>Continue With Google</span>
            </button>
            <button className="w-full flex items-center justify-center space-x-3 bg-gray-100 border border-gray-300 py-2 rounded-lg hover:shadow-md">
              <img
                src="./images/twitter.webp"
                alt="Twitter"
                className="h-5"
              />
              <span>Continue With Twitter</span>
            </button>
          </div>

          {/* Signup Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
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
                  type="text"
                  placeholder="Name"
                  value={username}
  onChange={(e) => setUsername(e.target.value)}
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
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-[#1E381E] focus:border-[#1E381E]"
                />
              </div>
            </div>

            {/* Terms and Policy */}
            <div className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                className="h-4 w-4 text-[#1E381E] focus:ring-[#1E381E] border-gray-300 rounded"
              />
              <span className="text-gray-500">
                Agree to our{" "}
                <a href="#" className="text-[#1E381E] hover:underline">
                  Terms of Use{" "}
                </a>
                and{" "}
                <a href="#" className="text-[#1E381E] hover:underline">
                  Privacy Policy
                </a>
              </span>
            </div>

            {/* Signup Button */}
            <button type="submit" className="w-full bg-[#1f6b1f] text-white py-2 rounded-lg hover:bg-[#1f771f]">
              Sign Up
            </button>
          </form>

          {/* Login Link */}
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
