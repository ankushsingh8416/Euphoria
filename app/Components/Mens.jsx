import { FaArrowRight } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

export default function Mens() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 pt-0 pb-0 md:pt-10 ">
      <h2 className="text-center text-3xl md:text-4xl my-10 font-thin  crimson green tracking-wider">
        MENSWEAR
      </h2>
      <div className="flex flex-wrap justify-center gap-6">
        {/* Menswear Images */}
        <div className="w-full sm:w-[48%] overflow-hidden shadow-md">
          <Image
            src="https://res.cloudinary.com/dvucqewfn/image/upload/v1741139960/men1_rpidkn.webp"
            alt="Menswear 1"
            layout="responsive"
            width={500}
            height={600}
            objectFit="cover"
            priority
          />
        </div>
        <div className="w-full sm:w-[48%] overflow-hidden shadow-md">
          <Image
            src="https://res.cloudinary.com/dvucqewfn/image/upload/v1741139961/men2_q5p3z4.webp"
            alt="Menswear 2"
            layout="responsive"
            width={500}
            height={600}
            objectFit="cover"
          />
        </div>
      </div>

      {/* Button */}
      <div className="text-center mt-10">
        <Link
          href={"/men"}
          className="group inline-flex items-center text-[#1E381E] px-8 py-3 border border-[#1E381E] hover:bg-[#1E381E] hover:text-white transition duration-300"
        >
          SHOP THE COLLECTION
          <FaArrowRight className="ml-2 transition-all  group-hover:ml-4" />
        </Link>
      </div>
    </div>
  );
}
