"use client";
import { useContext, useState } from "react";
import { FiGrid, FiList } from "react-icons/fi";
import { cartContext } from "@/app/context/cartContext";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoFilterSharp } from "react-icons/io5";
import { BiRupee } from "react-icons/bi";

export default function FilterSection() {
  const {
    selectedFilters,
    handleFilterChange,
    setSortOption,
    totalProducts,
    fourGrid,
    twoGrid,
    activeView,
  } = useContext(cartContext);
  const [activeFilter, setActiveFilter] = useState(null);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const pathname = usePathname();

  const toggleFilter = (filter) => {
    setActiveFilter(activeFilter === filter ? null : filter);
  };

  const sorting = (option) => {
    const sanitizedOption = option.replace(/\s+/g, "");
    setSortOption(sanitizedOption);
    setIsSortOpen(false);
  };

  let filterOptions = {};
  if (pathname === "/women") {
    filterOptions = {
      Category: [
        "Kurta Sets",
        "Sarees & Blouses",
        "Lehenga Sets",
        "Kaftans",
        "Gowns",
        "Dresses & Jumpsuits",
        "Co-Ord Sets",
      ],
      Price: ["1000-10000", "10000-50000", "50000-100000", "100000-200000"],
      Color: [
        "Red",
        "Blue",
        "Green",
        "Yellow",
        "Pink",
        "Black",
        "White",
        "Beige",
        "Purple",
      ],
      Size: ["XS", "S", "M", "L", "XL", "XXL"],
      Brand: [
        "FabIndia",
        "Biba",
        "W for Women",
        "Manish Malhotra",
      ],
    };
  } else if (pathname === "/men") {
    filterOptions = {
      Category: [
        "Kurtas & Shirts",
        "Sherwanis",
        "Bandhgalas",
        "Nehru Jackets",
        "Bottoms",
        "Blazers & Suits",
        "Casual Wear",
      ],
      Price: ["1000-10000", "10000-50000", "50000-100000", "100000-200000"],
      Color: [
        "Red",
        "Blue",
        "Green",
        "Yellow",
        "Pink",
        "Black",
        "White",
        "Grey",
        "Brown",
      ],
      Size: ["XS", "S", "M", "L", "XL", "XXL"],
      Brand: [
        "FabIndia",
        "Biba",
        "W for Women",
        "Manish Malhotra",
      ],
    };
  } else if (pathname === "/wedding") {
    filterOptions = {
      Category: [
        "Lehenga Sets",
        "Sarees & Blouses",
        "Gowns",
        "Co-ord Sets",
        "Kurta Sets",
        "For Groom",
        "Sherwanis",
        "Bandhgalas",
        "Kurtas & Shirts",
        "Nehru Jackets",
      ],
      Price: ["1000-10000", "10000-50000", "50000-100000", "100000-200000"],
      Color: [
        "Red",
        "Blue",
        "Green",
        "Yellow",
        "Pink",
        "Black",
        "White",
        "Grey",
        "Brown",
      ],
      Size: ["XS", "S", "M", "L", "XL", "XXL"],
      Brand: [
        "FabIndia",
        "Biba",
        "W for Women",
        "Manish Malhotra",
      ],
    };
  } else if (pathname === "/jewelry") {
    filterOptions = {
      Category: [
        "Earrings",
        "Necklaces",
        "Bangles & Bracelets",
        "Rings & Haathphools",
        "Maangtikkas & Mathapattis",
        "Nose Rings",
        "Waist Belts",
      ],
      Price: ["1000-10000", "10000-50000", "50000-100000", "100000-200000"],
      Color: [
        "Red",
        "Blue",
        "Green",
        "Yellow",
        "Pink",
        "Black",
        "White",
        "Grey",
        "Brown",
      ],
      Size: ["XS", "S", "M", "L", "XL", "XXL"],
      Brand: [
        "FabIndia",
        "Biba",
        "W for Women",
        "Manish Malhotra",
      ],
    };
  } else if (pathname === "/accessories") {
    filterOptions = {
      Category: ["Scarves & Dupattas", "Bags", "Shoes", "Belts"],
      Price: ["1000-10000", "10000-50000", "50000-100000", "100000-200000"],
      Color: [
        "Red",
        "Blue",
        "Green",
        "Yellow",
        "Pink",
        "Black",
        "White",
        "Grey",
        "Brown",
      ],
      Size: ["XS", "S", "M", "L", "XL", "XXL"],
      Brand: [
        "FabIndia",
        "Biba",
        "W for Women",
        "Manish Malhotra",
      ],
    };
  } else if (pathname === "/gifting") {
    filterOptions = {
      Category: ["Gifts for Her", "Gifts for Him"],
      Price: ["1000-10000", "10000-50000", "50000-100000", "100000-200000"],
      Color: [
        "Red",
        "Blue",
        "Green",
        "Yellow",
        "Pink",
        "Black",
        "White",
        "Grey",
        "Brown",
      ],
      Size: ["XS", "S", "M", "L", "XL", "XXL"],
      Brand: [
        "FabIndia",
        "Biba",
        "W for Women",
        "Manish Malhotra",
      ],
    };
  } else if (pathname === "/sale") {
    filterOptions = {
      Category: [
        "Dresses & Jumpsuits",
        "Co-Ord Sets",
        "Kurta Sets",
        "Sarees & Blouses",
        "Lehenga Sets",
        "Gowns",
        "Kaftans",
        "Tops & Jackets",
      ],
      Price: ["1000-10000", "10000-50000", "50000-100000", "100000-200000"],
      Color: [
        "Red",
        "Blue",
        "Green",
        "Yellow",
        "Pink",
        "Black",
        "White",
        "Grey",
        "Brown",
      ],
      Size: ["XS", "S", "M", "L", "XL", "XXL"],
      Brand: [
        "FabIndia",
        "Biba",
        "W for Women",
        "Manish Malhotra",
      ],
    };
  }

  return (
    <div className="p-4 relative bg-[#faf8f0] text-[#333]">
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm mb-4">
          <span className="text-gray-500">Home</span> |{" "}
          <span className="font-semibold uppercase">
            {pathname.replace(/^\//, "")}
          </span>
        </div>
        <div className="relative block lg:hidden">
          <button
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="flex items-center text-gray-700 text-sm"
          >
            Sort by:
            <RiArrowDropDownLine size={20} />
          </button>
          {isSortOpen && (
            <div className="absolute right-0 mt-2 bg-white border rounded-md shadow-md p-4 w-48 z-10">
              <ul className="space-y-2">
                {[
                  "Price: Low to High",
                  "Price: High to Low",
                  "Newest Arrivals",
                ].map((option, idx) => (
                  <li
                    key={idx}
                    className="text-sm hover:bg-gray-100 p-1 cursor-pointer"
                    onClick={() => sorting(option)}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/*Desktop Filter Section */}
      <div className="flex justify-between items-center border-b w-full border-gray-300 pb-3 mb-4">
        <div className="filter-category flex-wrap gap-4 hidden lg:flex">
          {Object.entries(filterOptions).map(([filter, options]) => (
            <div key={filter} className="mb-4">
              <button
                onClick={() =>
                  setActiveFilter(activeFilter === filter ? null : filter)
                }
                className="flex items-center text-gray-700 text-sm"
              >
                {filter} <RiArrowDropDownLine />
              </button>
              {activeFilter === filter && (
                <div className="absolute left-8 mt-6 bg-white border rounded-md shadow-md p-4 w-[260px] z-10">
                  <ul className="space-y-2">
                    {options.map((option, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedFilters[filter]?.includes(option)}
                            onChange={() => handleFilterChange(filter, option)}
                            className="mr-2"
                          />
                          {filter === "Price" ? (
                            <div className="flex  items-center">
                              <BiRupee />
                              {option}
                            </div>
                          ) : (
                            option
                          )}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
        {/* Mobile Filter Icon */}
        <button
          onClick={() => setIsFilterVisible(!isFilterVisible)}
          className="filter-icon p-2 border block lg:hidden rounded-md bg-gray-100"
        >
          <IoFilterSharp size={16} />
        </button>
        {/* Right Side: Sort and View Options */}
        <div className="flex items-center gap-4 lg:w-auto">
          <div className="text-sm text-gray-600">{totalProducts} Results</div>
          <div className="flex gap-2">
            <button
              onClick={fourGrid}
              className={`p-2 border rounded-md ${
                activeView === "grid" ? "bg-gray-200" : "hover:bg-gray-100"
              }`}
            >
              <FiGrid size={16} />
            </button>
            <button
              onClick={twoGrid}
              className={`p-2 border rounded-md ${
                activeView === "list" ? "bg-gray-200" : "hover:bg-gray-100"
              }`}
            >
              <FiList size={16} />
            </button>
          </div>
          <div className="relative hidden lg:block">
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center text-gray-700 text-sm"
            >
              Sort by:
              <RiArrowDropDownLine size={20} />
            </button>

            {isSortOpen && (
              <div className="absolute right-0 mt-2 bg-white border rounded-md shadow-md p-4 w-48 z-10">
                <ul
                  className="space-y-2"
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  {[
                    "Price: Low to High",
                    "Price: High to Low",
                    "Newest Arrivals",
                  ].map((option, idx) => (
                    <li
                      key={idx}
                      className="text-sm hover:bg-gray-100 p-1 cursor-pointer"
                      onClick={() => sorting(option)}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* mobile filter menu */}
      <div
        className={`fixed h-screen top-0 overflow-auto searchpannel  z-50 left-0 w-full flex flex-col gap-6 bg-[#faf8f0] border border-gray-200 p-6  shadow-xl lg:hidden transition-transform duration-500 ease-in-out ${
          isFilterVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        {/* Title */}
        <div className="flex justify-between items-center pb-2 border-b border-gray-300">
          <h2 className="text-lg font-semibold text-[#1E381E]">Filters</h2>
          <button
            onClick={() => setIsFilterVisible(false)}
            className="text-sm text-gray-500 hover:text-gray-800 transition"
          >
            <Image
              src="/images/cancel-icon.webp"
              alt="Close"
              width={30}
              height={30}
            />
          </button>
        </div>

        {Object.entries(filterOptions).map(([filter, options]) => (
          <div key={filter} className="relative">
            <button
              onClick={() => toggleFilter(filter)}
              className="flex justify-between items-center w-full text-gray-700 text-sm font-medium p-3 bg-[#d5fed55f] rounded-md hover:bg-[#d5fed580] transition"
            >
              {filter}
              <RiArrowDropDownLine size={20} />
            </button>
            {activeFilter === filter && (
              <div className="mt-3 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-10 transition-all duration-300">
                <ul className="space-y-2">
                  {options.map((option, idx) => (
                    <li key={idx} className="flex items-center text-sm">
                      <input
                        type="checkbox"
                        checked={selectedFilters[filter]?.includes(option)}
                        onChange={() => handleFilterChange(filter, option)}
                        className="mr-3 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor={`${filter}-${idx}`}
                        className="text-gray-800 hover:underline cursor-pointer"
                      >
                        {filter === "Price" ? (
                          <div className="flex  items-center">
                            <BiRupee />
                            {option}
                          </div>
                        ) : (
                          option
                        )}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}

        <div className="flex flex-col gap-4">
          <button
            onClick={() => setIsFilterVisible(false)}
            className="group flex justify-center items-center w-full text-[#1E381E] px-8 py-3 border border-[#1E381E] rounded-lg hover:bg-[#1E381E] hover:text-white hover:shadow-lg transition-all duration-300 ease-in-out"
          >
            Reset
          </button>

          <button
            onClick={() => setIsFilterVisible(false)}
            className="group flex justify-center items-center w-full px-8 py-3 border border-[#1E381E] bg-[#1E381E] text-white rounded-lg hover:bg-transparent hover:text-[#1E381E] hover:shadow-lg transition-all duration-300 ease-in-out"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
