"use client";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useEffect } from 'react';
import { liteClient as algoliasearch } from 'algoliasearch/lite';
import instantsearch from 'instantsearch.js';
import { searchBox, hits } from 'instantsearch.js/es/widgets';

const searchClient = algoliasearch('G7NL75DG1D', '5860c31f24fe6ecf2f3c1fa2c2349de3');

const SearchPanel = () => {
  useEffect(() => {
    const search = instantsearch({
      indexName: 'Product_index',
      searchClient,
    });

    search.addWidgets([
      searchBox({
        container: '#searchbox',
        placeholder: 'Search for products...',
      }),
      hits({
        container: '#hits',
        templates: {
          item: `
            <div class=" product-card border rounded-lg shadow-lg">

            <div class="product-image-container">
            <img class="product-image" src="{{#helpers.highlight}}{ "attribute": "images.0.defaultImage" }{{/helpers.highlight}}" alt="Product Image" class="w-40 h-40 object-cover mr-4"/>
            <img class="product-hover-image" src="{{#helpers.highlight}}{ "attribute": "images.1.hoverImage" }{{/helpers.highlight}}" alt="Product Image" class="w-40 h-40 object-cover mr-4"/>
             </div>
                <div class="p-4">
                <h2 class="product-title">{{#helpers.highlight}}{ "attribute": "title" }{{/helpers.highlight}}
                  <span class="title-underline"></span>
                </h2>

               <div class="flex justify-between my-4">
                    <p className="text-gray-600">₹{{#helpers.highlight}}{ "attribute": "price" }{{/helpers.highlight}}</p>
                    <img src="/images/wishlist-icon.svg" alt="Product Image" class="wishlist object-cover mr-4"/>
                </div 
              </div>
            </div>
          `,
        },
      }),
    ]);

    search.start();

    // Cleanup function
    return () => search.dispose();
  }, []);
  return (
    <div className="relative w-full  space-x-0 bg-white z-50">
      {/* Top Notification Bar */}
      <div className="bg-[#1E381E] text-white text-center py-2 text-sm md:text-base">
        <Link href="#" className="font-medium">
          Shop At Special Prices |
          <Link href="/" className="underline"> Discover Now</Link>
        </Link>
      </div>

      {/* Back Button */}
      <Link href="/" 
        className="absolute top-12 lg:top-16  sm:top-20 left-4 sm:left-6 text-lg sm:text-xl md:text-2xl text-[#1E381E] hover:text-gray-600 cursor-pointer"
      >
        <FaArrowLeftLong />
      </Link>

      {/* Search Panel Content */}
      <div className="p-4 pt-6 md:pt-5 sm:p-6 md:p-8 bg-[#faf8f0]">
        {/* Search Bar */}

        <div id="searchbox" className="mb-6"></div>

        {/* Popular Searches */}
        <div className="mt-8 sm:mt-10 md:mt-12">
          <h2 className="text-sm sm:text-lg md:text-xl font-bold text-gray-800">POPULAR SEARCHES</h2>
          <div className="flex flex-wrap gap-4 sm:gap-6 mt-4">
            {["Lehenga", "Sharara", "Anarkali", "Bags", "Benarasi", "Dress"].map((item) => (
              <div key={item} className="flex items-center space-x-2">
                <FaSearch className="text-gray-600 text-xs sm:text-base" />
                <span className="text-gray-700 font-medium text-xs sm:text-base md:text-lg">{item}</span>
              </div>
            ))}
          </div>
        </div>
      <div id="hits"></div>
      </div>
    </div>
  );
};

export default SearchPanel;