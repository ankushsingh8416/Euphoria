import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function SignUp() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md my-6 w-11/12 max-w-5xl flex flex-col lg:flex-row rounded-lg overflow-hidden">
        <div className="w-full lg:w-1/2 hidden  lg:block">
          <img
            src="./images/signup.png"
            alt="Signup Illustration"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Right Side: Signup Form */}
        <div className="w-full lg:w-1/2 p-8">
          <h1 className="text-3xl font-bold mb-4 text-center lg:text-left">Sign Up</h1>
          <p className="text-sm text-gray-500 mb-6 text-center lg:text-left">
            Sign up for free to access any of our products
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

          {/* Signup Form */}
          <form className="space-y-4">
            {/* Name Field */}
            <div className="relative">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <div className="relative">
                <FontAwesomeIcon
                  icon={faUser}
                  className="absolute size-4 left-3 top-3 text-gray-400"
                />
                <input
                  id="name"
                  type="text"
                  placeholder="Name"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

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

            {/* Terms and Policy */}
            <div className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <span className="text-gray-500">
                Agree to our{" "}
                <a href="#" className="text-indigo-600 hover:underline">
                  Terms of Use
                </a>{" "}
                and{" "}
                <a href="#" className="text-indigo-600 hover:underline">
                  Privacy Policy
                </a>
              </span>
            </div>

            {/* Signup Button */}
            <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">
              Sign Up
            </button>
          </form>

          {/* Login Link */}
          <p className="text-sm text-center text-gray-500 mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-indigo-600 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
