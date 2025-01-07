import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Cpanel() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 to-green-200">
      <div className="bg-white shadow-2xl w-full max-w-5xl flex flex-col lg:flex-row rounded-lg overflow-hidden">
        {/* Left Side: Image */}
        <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-100">
          <img
            src="/images/cpanel-login.jpeg"
            alt="Login Illustration"
            className="object-cover w-full h-full object-top"
          />
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full lg:w-1/2 px-10 py-12 flex items-center justify-center bg-white">
          <div className="w-full max-w-md">
            <h1 className="text-3xl md:text-4xl font-extrabold mb-6 text-center lg:text-left text-[#1E381E]">
              Welcome Back
            </h1>
            <p className="text-base text-gray-600 mb-8 text-center lg:text-left">
              Access your control panel and manage your settings effortlessly.
            </p>

            {/* Login Form */}
            <form className="space-y-6">
              <div className="relative">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="absolute size-4 text-gray-500 left-3 top-3"
                  />
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-[#1E381E] focus:border-[#1E381E]"
                  />
                </div>
              </div>

              <div className="relative">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faLock}
                    className="absolute size-4 text-gray-500 left-3 top-3"
                  />
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-[#1E381E] focus:border-[#1E381E]"
                  />
                </div>
              </div>

              <button className="w-full bg-[#1f6b1f] text-white py-3 rounded-lg text-lg font-semibold hover:bg-[#1f771f] shadow-lg transition">
                Log In
              </button>

              <div className="text-center mt-4">
                <Link href="/forgot-password" className="text-sm text-[#1E381E] hover:underline">
                  Forgot your password?
                </Link>
              </div>
            </form>

            <p className="text-sm text-center text-gray-500 mt-6">
              New to the platform?{' '}
              <Link href="/signup" className="text-[#1E381E] hover:underline font-medium">
                Create an account
              </Link>
            </p>

            <div className="mt-10 text-center">
              <p className="text-gray-500 text-xs">
                By logging in, you agree to our{' '}
                <Link href="/terms" className="text-[#1E381E] hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-[#1E381E] hover:underline">
                  Privacy Policy
                </Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
