"use client";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
import {
  InstantSearch,
  SearchBox,
  Hits,
  useSearchBox,
  useHits,
} from "react-instantsearch";
import { liteClient as algoliasearch } from "algoliasearch/lite";
import { SlHeart } from "react-icons/sl";
import { useState, useEffect } from "react";
import Image from "next/image";

const searchClient = algoliasearch(
  "G7NL75DG1D",
  "5860c31f24fe6ecf2f3c1fa2c2349de3"
);

// Mock function for addToCart, replace with actual function
const addToCart = (product) => {
  console.log(`Adding product ${product.title} to cart`);
};

// Custom component to render each search result (Hit)
const Hit = ({ hit }) => (
  <Link
    href={{
      pathname: `/productdetails/${hit.page}/${hit.title}`,
      query: { id: hit._id },
    }}
    key={hit._id}
    className="cursor-pointer mb-8 group w-[48%] lg:w-[24%]"
  >
    <div className="relative overflow-hidden">
      <img
        src={hit.images[0]?.defaultImage}
        alt={hit.title}
        className="w-full transition-transform duration-500 group-hover:scale-110"
      />
      {hit.images[1]?.hoverImage && (
        <img
          src={hit.images[1]?.hoverImage}
          alt={`${hit.title} Hover`}
          className="absolute inset-0 w-full h-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      )}
    </div>
    <div className="mt-4">
      <h3 className="text-sm font-medium uppercase truncate overflow-hidden whitespace-nowrap relative">
        {hit.title}
        <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#B18E35] transition-all duration-500 group-hover:w-full"></span>
      </h3>
      <div className="flex items-center justify-between p-1">
        <p className="text-gray-600">₹{hit.price}</p>
        <button
          className="text-gray-500 hover:text-[#B18E35] transition duration-300"
          aria-label="Add to Wishlist"
          onClick={(e) => {
            e.preventDefault(); // Prevent navigation when clicking the button
            addToCart(hit);
          }}
        >
          <SlHeart size={18} />
        </button>
      </div>
      {hit.readyToShip ? (
        <div className="mt-2 text-[.7rem] font-medium text-[#1E381E] bg-[#F5F5F5] border border-gray-300 px-2 py-1 inline-block">
          READY TO SHIP
        </div>
      ) : (
        <div className="mt-2 text-[.7rem] font-medium text-[#1E381E] bg-[#fecdcd70] border border-gray-300 px-2 py-1 inline-block">
          NEW ARRIVALS
        </div>
      )}
    </div>
  </Link>
);

// Custom component to handle search results, including "No Products Found"
const CustomHits = () => {
  const { hits } = useHits();

  return (
    <div>
      {hits.length === 0 ? (
        <div className="flex items-center justify-center mt-12 sm:mt-16 md:mt-24">
          <Image
            src="/images/no-product.png"
            width={150}
            height={150}
            alt="No Products Found"
            className="w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] md:w-[200px] md:h-[200px]"
          />
        </div>
      ) : (
        <Hits hitComponent={Hit} />
      )}
    </div>
  );
};

// Custom SearchBox with default value support
const CustomSearchBox = ({ query }) => {
  const { refine } = useSearchBox();

  useEffect(() => {
    refine(query);
  }, [query, refine]);

  return <SearchBox placeholder="Search for products..." />;
};

const SearchPanel = () => {
  const [query, setQuery] = useState(""); // Default search value

  return (
    <div className="relative w-full space-x-0 bg-white z-50">
      {/* Top Notification Bar */}
      <div className="bg-[#1E381E] text-white text-center py-2 text-sm md:text-base">
        <Link href="#" className="font-medium">
          Shop At Special Prices |{" "}
          <Link href="/" className="underline">
            Discover Now
          </Link>
        </Link>
      </div>

      {/* Back Button */}
      <Link
        href="/"
        className="absolute top-12 lg:top-16 sm:top-20 left-4 sm:left-6 text-lg sm:text-xl md:text-2xl text-[#1E381E] hover:text-gray-600 cursor-pointer"
      >
        <FaArrowLeftLong />
      </Link>

      {/* Search Panel Content */}
      <div className="p-4 pt-6 md:pt-5 sm:p-6 md:p-8 bg-[#faf8f0]">
        <InstantSearch indexName="Euphoria" searchClient={searchClient}>
          {/* Custom Search Box with Default Query */}
          <CustomSearchBox query={query} />

          {/* Popular Searches */}
          <div className="mt-8 sm:mt-10 md:mt-12">
            <h2 className="text-sm sm:text-lg md:text-xl font-bold text-gray-800">
              POPULAR SEARCHES
            </h2>
            <div className="flex flex-wrap gap-4 sm:gap-6 mt-4">
              {["Kurta's", "Mens", "Anarkali", "Bags", "Saree", "Dress"].map(
                (item) => (
                  <div
                    key={item}
                    className="flex items-center space-x-2 cursor-pointer"
                    onClick={() => setQuery(item)}
                  >
                    <FaSearch className="text-gray-600 text-xs sm:text-base" />
                    <span className="text-gray-700 font-medium text-xs sm:text-base md:text-lg">
                      {item}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Search Results (Hits) */}
          <CustomHits />
        </InstantSearch>
      </div>
    </div>
  );
};

export default SearchPanel;
