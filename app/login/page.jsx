import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md w-11/12 my-6 max-w-5xl flex flex-col lg:flex-row rounded-lg overflow-hidden">
        {/* Left Side: Image */}
        <div className="w-full lg:w-1/2 hidden lg:block">
          <img
            src="./images/login.png"
            alt="Login Illustration"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full lg:w-1/2 p-8">
          <h1 className="text-3xl font-bold mb-4 text-center lg:text-left">Log In</h1>
          <p className="text-sm text-gray-500 mb-6 text-center lg:text-left">
            Log in to access your account
          </p>

          {/* Social Buttons */}
          <div className="space-y-4 mb-6">
            <button className="w-full flex items-center justify-center space-x-3 bg-gray-100 border border-gray-300 py-2 rounded-lg hover:shadow-md">
              <img
                src="./images/google-icon.png"
                alt="Google"
                className="h-5"
              />
              <span>Continue With Google</span>
            </button>
            <button className="w-full flex items-center justify-center space-x-3 bg-gray-100 border border-gray-300 py-2 rounded-lg hover:shadow-md">
              <img
                src="./images/twitter.png"
                alt="Twitter"
                className="h-5"
              />
              <span>Continue With Twitter</span>
            </button>
          </div>

          {/* Login Form */}
          <form className="space-y-4">
            {/* Email Field */}
            <div className="relative">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="absolute size-4 left-3 top-3 text-gray-400"
                />
                <input
                  id="email"
                  type="email"
                  placeholder="Email Address"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <FontAwesomeIcon
                  icon={faLock}
                  className="absolute size-4 left-3 top-3 text-gray-400"
                />
                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Login Button */}
            <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">
              Log In
            </button>
          </form>

          {/* Signup Link */}
          <p className="text-sm text-center text-gray-500 mt-4">
            Don't have an account?{" "}
            <Link href="/signup" className="text-indigo-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
