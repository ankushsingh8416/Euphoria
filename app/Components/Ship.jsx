import Image from 'next/image'
import React from 'react'

const Ship = () => {
  return (
    <div className="w-full ship  mx-auto py-10 pt-0 pb-0 md:pt-6">
    
      <div className="relative w-full h-full desktop__img hidden md:block">
        <Image 
          src="/images/ship_web.jpg" 
          alt="ship" 
          layout="fill" 
          objectFit="cover" 
          priority 
        />
      </div>
      <div className="relative w-full h-full mob__img block md:hidden">
        <Image 
          src="/images/ship_mob.jpg" 
          alt="ship" 
          layout="fill" 
          objectFit="cover" 
          priority 
        />
      </div>
    </div>
  )
}

export default Ship
