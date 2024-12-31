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

          

        </div>
    )
}

export default FooterBanner
