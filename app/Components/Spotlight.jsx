import Image from 'next/image';

const categories = [
  { id: 1, name: 'READY TO SHIP', imagePath: '/images/spotlight1.jpg' },
  { id: 2, name: 'MORDERN HEIRLOOMS', imagePath: '/images/spotlight2.jpg' },
  { id: 3, name: 'TIMELESS REDS', imagePath: '/images/spotlight3.jpg' },
  { id: 4, name: 'VEGAN ACCESSORIES', imagePath: '/images/spotlight4.jpg' },
];

export default function Spotlight() {
  return (
    <div className="w-full mx-auto md:px-4 py-10 pt-0 pb-0 md:pt-10">
      <h2 className="text-center text-3xl md:text-4xl my-10 font-thin crimson green tracking-wider">
        IN THE SPOTLIGHT
      </h2>
      <div className="flex flex-wrap justify-center gap-x-4  md:gap-6">
        {categories.map((spotlight) => (
          <div
            key={spotlight.id}
            className="text-center cursor-pointer w-[46%] lg:w-[23%] overflow-hidden group relative"
          >
            <div className="relative w-full aspect-[3/4] overflow-hidden">
              <Image
                src={spotlight.imagePath}
                alt={spotlight.name}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-500 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <p className="text-white text-md  tracking-wider uppercase">
                 Shop Now 
                </p>
              </div>
            </div>
            <h3 className="my-4 text-[.9rem]">{spotlight.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}