import Image from 'next/image'
import React from 'react'
import { FaArrowRight } from 'react-icons/fa'

const FooterBanner = () => {
    return (
        <div className="w-full ship mx-auto py-10 pt-0 pb-0 md:pt-6">

            <div className="relative w-full h-full desktop__img hidden md:block">
                <Image
                    src="https://res.cloudinary.com/dvucqewfn/image/upload/v1741142556/mid-banner_nmldqx.webp"
                    alt="ship"
                    layout="fill"
                    objectFit="cover"
                    priority
                />
            </div>
            <div className="relative w-full  h-full mob__img footer-banner-mob block md:hidden">
                <Image
                    src="https://res.cloudinary.com/dvucqewfn/image/upload/v1741142557/mid-banner_mob_pqupak.webp"
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
