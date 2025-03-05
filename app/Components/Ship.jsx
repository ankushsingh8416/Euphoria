import Image from "next/image";
import Link from "next/link";
import React from "react";

const Ship = () => {
  return (
    <div className="w-full ship  mx-auto py-10 pt-0 pb-0 md:pt-6">
      <Link href={"/sale"}>
        <div className="relative w-full h-full desktop__img hidden md:block">
          <Image
            src="https://res.cloudinary.com/dvucqewfn/image/upload/v1741142256/ship_web_bdkygn.webp"
            alt="ship"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
        <div className="relative w-full h-full mob__img block md:hidden">
          <Image
            src="https://res.cloudinary.com/dvucqewfn/image/upload/v1741142256/ship_mob_jlagsm.webp"
            alt="ship"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
      </Link>
    </div>
  );
};

export default Ship;
