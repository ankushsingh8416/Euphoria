import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';

export default function Mens() {
    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <h2 className="text-center text-3xl md:text-4xl my-10 font-thin crimson green">MENSWEAR</h2>
            <div className="flex flex-wrap justify-center gap-6">
                {/* Menswear Images */}
                <div className="w-full sm:w-[48%] overflow-hidden shadow-md">
                    <Image
                        src="/images/men1.jpg"
                        alt="Menswear 1"
                        layout="responsive"
                        width={500}
                        height={600}
                        objectFit="cover"
                    />
                </div>
                <div className="w-full sm:w-[48%] overflow-hidden shadow-md">
                    <Image
                        src="/images/men2.jpg"
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
                <button className="inline-flex items-center px-8 py-3 border border-[#1E381E] hover:bg-[#1E381E] hover:text-white transition duration-300">
                    SHOP THE COLLECTION <FontAwesomeIcon icon="arrow-right" />
                </button>
            </div>
        </div>
    );
}
