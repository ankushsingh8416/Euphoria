import Image from 'next/image'
import React from 'react'
import { FaArrowRight } from 'react-icons/fa'

const FooterBanner = () => {
    return (
        <div className="w-full ship mx-auto py-10 pt-0 pb-0 md:pt-6">

            <div className="relative w-full h-full desktop__img hidden md:block">
                <Image
                    src="/images/mid-banner.jpg"
                    alt="ship"
                    layout="fill"
                    objectFit="cover"
                    priority
                />
            </div>
            <div className="relative w-full  h-full mob__img footer-banner-mob block md:hidden">
                <Image
                    src="/images/mid-banner_mob.jpg"
                    alt="ship"
                    layout="fill"
                    objectFit="cover"
                    priority
                />
            </div>

            <div className="bg-[#1E381E] text-white py-8">
                <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-center gap-6 md:gap-12 items-center">
                    {/* Title Section */}
                    <h2 className="text-lg font-semibold text-center md:text-left">
                        Enter Into The World of Anita Dongre
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

        </div>
    )
}

export default FooterBanner
