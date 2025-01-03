"use client";

import { useState } from "react";
import { RiArrowDropDownLine, RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { FiGrid, FiList } from "react-icons/fi";

export default function FilterSection() {
  const [activeFilter, setActiveFilter] = useState(null);
  const [activeView, setActiveView] = useState("grid");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleFilter = (filter) => {
    setActiveFilter(activeFilter === filter ? null : filter);
  };

  return (
    <div className="p-4 bg-[#faf8f0]">
      {/* Breadcrumb */}
      <div className="text-sm mb-4">
        <span className="text-gray-500">Home</span> | <span className="font-semibold">Women</span>
      </div>

      {/* Filters and View Options */}
      <div className="flex justify-between items-center mb-6">
        {/* Filters Menu Button (Small Screens) */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center gap-2 text-gray-700 md:hidden"
        >
          <RiMenu3Line size={20} />
          <span className="text-sm font-semibold">Filters</span>
        </button>

        {/* Filters (Hidden on Small Screens) */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } absolute top-16 left-0 w-full bg-white p-4 shadow-md md:static md:block md:w-auto`}
        >
          <div className="flex flex-wrap gap-6">
            {["Category", "Price", "Color", "Size", "Brand"].map((filter) => (
              <div key={filter} className="relative">
                <label
                  onClick={() => toggleFilter(filter)}
                  className="flex items-center cursor-pointer text-gray-700 text-sm"
                >
                  {filter}
                  <RiArrowDropDownLine size={20} className="ml-1" />
                </label>
                {activeFilter === filter && (
                  <div className="absolute left-0 mt-2 bg-white border rounded-md shadow-md p-4 w-48 z-10">
                    <ul className="space-y-2">
                      {["Option 1", "Option 2", "Option 3"].map((option, idx) => (
                        <li key={idx} className="flex items-center text-sm">
                          <input type="checkbox" id={`${filter}-${idx}`} className="mr-2" />
                          <label htmlFor={`${filter}-${idx}`}>{option}</label>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Reset Filters */}
          <button
            className="mt-4 text-sm text-blue-600 underline block md:hidden"
            onClick={() => alert("Reset filters")}
          >
            Reset Filters
          </button>
        </div>

        {/* Sort and View Options */}
        <div className="flex items-center gap-4">
          {/* View Toggle */}
          <button
            onClick={() => setActiveView("grid")}
            className={`p-2 border rounded-md ${
              activeView === "grid" ? "bg-gray-200" : "hover:bg-gray-100"
            }`}
          >
            <FiGrid size={20} />
          </button>
          <button
            onClick={() => setActiveView("list")}
            className={`p-2 border rounded-md hidden md:block ${
              activeView === "list" ? "bg-gray-200" : "hover:bg-gray-100"
            }`}
          >
            <FiList size={20} />
          </button>

          {/* Sort Dropdown */}
          <select className="border rounded-md px-3 py-2 bg-white text-sm">
            <option value="relevance">Sort by: Relevance</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="newest">Newest Arrivals</option>
          </select>
        </div>
      </div>

      <div className="text-sm text-gray-600 md:block hidden">1,049 Results</div>
    </div>
  );
}
