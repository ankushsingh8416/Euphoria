// components/CategorySection.js
import Image from 'next/image';

const categories = [
  { id: 1, name: 'SAREES', imagePath: '/images/category1.jpg' },
  { id: 2, name: 'LEHENGA SETS', imagePath: '/images/category2.jpg' },
  { id: 3, name: 'KURTA SETS', imagePath: '/images/category3.jpg' },
  { id: 4, name: 'CO-ORD SETS', imagePath: '/images/category4.jpg' },
];

export default function Category() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 pt-0 pb-0 md:pt-10">
      <h2 className="text-center text-3xl md:text-4xl my-10 font-thin  crimson green">SHOP BY CATEGORY</h2>
      <div className="flex flex-wrap justify-center gap-4 md:gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg text-center w-[46%] lg:w-[23%] overflow-hidden"
          >
            <div className="relative w-full aspect-[3/4]">
              <Image
                src={category.imagePath}
                alt={category.name}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <h3 className="my-2 text-[.9rem] ">{category.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
