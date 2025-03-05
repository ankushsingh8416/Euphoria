// components/CategorySection.js
import Image from 'next/image';
import Link from 'next/link';

const categories = [
  { id: 1, name: 'SAREES', imagePath: 'https://res.cloudinary.com/dvucqewfn/image/upload/v1741139432/cat1_uzqw8p.webp' },
  { id: 2, name: 'LEHENGA SETS', imagePath: 'https://res.cloudinary.com/dvucqewfn/image/upload/v1741139432/cat2_jhzr4b.jpg' },
  { id: 3, name: 'KURTA SETS', imagePath: 'https://res.cloudinary.com/dvucqewfn/image/upload/v1741139432/category3_dqfach.webp' },
  { id: 4, name: 'CO-ORD SETS', imagePath: 'https://res.cloudinary.com/dvucqewfn/image/upload/v1741139432/category4_bjzkbk.avif' },
];
export default function Category() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 pt-0 pb-0 md:pt-10">
      <h2 className="text-center text-3xl md:text-4xl my-10 font-thin  crimson green tracking-wider">SHOP BY CATEGORY</h2>
      <div className="flex flex-wrap justify-center gap-4 md:gap-6">
        {categories.map((category) => (
          <Link key={category.id} href="/women" passHref legacyBehavior>
            <a className="w-[46%] lg:w-[23%] block">
              <div className="shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg text-center overflow-hidden">
                <div className="relative w-full aspect-[3/4]">
                  <Image
                    src={category.imagePath}
                    alt={category.name}
                    layout="fill"
                    objectFit="cover"
                    priority
                    className="rounded-lg"
                  />
                </div>
                <h3 className="my-2 text-[.9rem]">{category.name}</h3>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}
