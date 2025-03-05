import Image from "next/image";
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram, FaPinterest, FaArrowRight } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className=" text-white ">
              <div className="bg-[#1E381E] text-white py-8">
                <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-center gap-6 md:gap-12 items-center">
                    {/* Title Section */}
                    <h2 className="text-lg font-semibold text-center md:text-left">
                        Enter Into The World of Euphoria
                    </h2>

                    {/* Form Section */}
                    <form className="flex items-center w-full md:w-[70%] max-w-md border-b-2 border-white focus-within:border-gray-500">
                        <input
                            type="email"
                            placeholder="Enter Your Email Here"
                            className="w-full bg-transparent border-none focus:outline-none px-2 py-1 text-white placeholder-gray-300"
                        />
                        <button
                            type="submit"
                            className="text-white hover:text-green-500 transition-all"
                        >
                            <FaArrowRight className="ml-2" />
                        </button>
                    </form>
                </div>
            </div>
            <div className=" text-gray-700  py-20 pb-12">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-6 text-sm">
                    {/* Customer Care */}
                    <div>
                        <h3 className="font-bold mb-4 text-[1rem]">Customer Care</h3>
                        <ul>
                            <li className="my-2 text-[.9rem] hover:underline transition-all cursor-pointer hover:text-[#1E381E]">Orders & Shipment</li>
                            <li className="my-2 text-[.9rem] hover:underline transition-all cursor-pointer hover:text-[#1E381E]">Returns & Exchange</li>
                            <li className="my-2 text-[.9rem] hover:underline transition-all cursor-pointer hover:text-[#1E381E]">Contact Us</li>
                            <li className="my-2 text-[.9rem] hover:underline transition-all cursor-pointer hover:text-[#1E381E]">FAQs</li>
                            <li className="my-2 text-[.9rem] hover:underline transition-all cursor-pointer hover:text-[#1E381E]">Check Gift Card Balance</li>
                        </ul>
                    </div>
                    {/* About Us */}
                    <div>
                        <h3 className="font-bold mb-4 text-[1rem]">About Us</h3>
                        <ul>
                            <li className="my-2 text-[.9rem] hover:underline transition-all cursor-pointer hover:text-[#1E381E]">Euphoria Foundation</li>
                            <li className="my-2 text-[.9rem] hover:underline transition-all cursor-pointer hover:text-[#1E381E]">Sustainability</li>
                            <li className="my-2 text-[.9rem] hover:underline transition-all cursor-pointer hover:text-[#1E381E]">Careers</li>
                        </ul>
                    </div>
                    {/* Categories */}
                    <div>
                        <h3 className="font-bold mb-4 text-[1rem]">Categories</h3>
                        <ul>
                            <li className="my-2 text-[.9rem] hover:underline transition-all cursor-pointer hover:text-[#1E381E]">Women</li>
                            <li className="my-2 text-[.9rem] hover:underline transition-all cursor-pointer hover:text-[#1E381E]">Men</li>
                            <li className="my-2 text-[.9rem] hover:underline transition-all cursor-pointer hover:text-[#1E381E]">Wedding</li>
                        </ul>
                    </div>
                    {/* Legal */}
                    <div>
                        <h3 className="font-bold mb-4 text-[1rem]">Legal</h3>
                        <ul>
                            <li className="my-2 text-[.8rem] hover:underline transition-all cursor-pointer hover:text-[#1E381E]">Corporate Information</li>
                            <li className="my-2 text-[.8rem] hover:underline transition-all cursor-pointer hover:text-[#1E381E]">Terms & Conditions</li>
                            <li className="my-2 text-[.8rem] hover:underline transition-all cursor-pointer hover:text-[#1E381E]">Privacy Policy</li>
                            <li className="my-2 text-[.8rem] hover:underline transition-all cursor-pointer hover:text-[#1E381E]">Cookie Policy</li>
                            <li className="my-2 text-[.8rem] hover:underline transition-all cursor-pointer hover:text-[#1E381E]">Shipping Policy</li>
                        </ul>
                    </div>
                    {/* Need Help */}
                    <div>
                        <h3 className="font-bold mb-4 text-[1rem]">Need Help?</h3>
                        <ul>
                            <li className="flex items-center my-2 text-[.8rem] hover:underline transition-all cursor-pointer hover:text-[#1E381E] gap-2">
                                <Image src="/images/location.svg" width={24} height={24} alt="location" /> Store Locator
                            </li>
                            <li className="flex items-center my-2 text-[.8rem] hover:underline transition-all cursor-pointer hover:text-[#1E381E] gap-2">
                            <Image src="/images/email.svg" width={24} height={24} alt="location" /> Email Us
                            </li>
                            <li className="flex items-center my-2 text-[.8rem] hover:underline transition-all cursor-pointer hover:text-[#1E381E] gap-2">
                            <Image src="/images/call.svg" width={24} height={24} alt="location" />  WhatsApp / Call Us: +91 98015 16770
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Social Media and Copyright */}
            <div className="bg-[#F5F5F5] text-gray-700 py-4">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-center md:text-left mb-6 md:mb-0">
                        © 2025 House of Euphoria Private Limited. | All Rights Reserved.
                    </p>
                    <div className="flex space-x-4">
                        <FaFacebookF className="hover:text-[#1E381E] cursor-pointer" />
                        <FaTwitter className="hover:text-[#1E381E] cursor-pointer" />
                        <FaYoutube className="hover:text-[#1E381E] cursor-pointer" />
                        <FaInstagram className="hover:text-[#1E381E] cursor-pointer" />
                        <FaPinterest className="hover:text-[#1E381E] cursor-pointer" />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
