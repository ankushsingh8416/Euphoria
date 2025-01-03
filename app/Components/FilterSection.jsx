"use client";

import { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FiGrid, FiList } from "react-icons/fi";

export default function FilterSection() {
    const [activeFilter, setActiveFilter] = useState(null);
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [activeView, setActiveView] = useState("grid");

    const toggleFilter = (filter) => {
        setActiveFilter(activeFilter === filter ? null : filter);
    };

    return (
        <div className="p-4 bg-[#faf8f0] text-[#333]">
            {/* Breadcrumb */}
            <div className="text-sm mb-4">
                <span className="text-gray-500">Home</span> |{" "}
                <span className="font-semibold">WOMEN</span>
            </div>

            {/* Filters and Sorting */}
            <div className="flex justify-between items-center border-b w-full border-gray-300 pb-3 mb-4">
                {/* Filters Section */}
                <div className=" flex-wrap gap-4 hidden lg:flex">
                    {["Category", "Price", "Color", "Size", "Brand"].map((filter) => (
                        <div key={filter} className="relative">
                            <button
                                onClick={() => toggleFilter(filter)}
                                className="flex items-center text-gray-700 text-sm"
                            >
                                {filter}
                                <RiArrowDropDownLine size={20} />
                            </button>
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

                <div className="relative block lg:hidden">
                    <button
                        onClick={() => setIsSortOpen(!isSortOpen)}
                        className="flex items-center text-gray-700 text-sm"
                    >
                        Sort by:
                        <RiArrowDropDownLine size={20} />
                    </button>
                    {isSortOpen && (
                        <div className="absolute left-0 mt-2 bg-white border rounded-md shadow-md p-4 w-48 z-10">
                            <ul className="space-y-2">
                                {["Price: Low to High", "Price: High to Low", "Newest Arrivals"].map((option, idx) => (
                                    <li key={idx} className="text-sm hover:bg-gray-100 p-1 cursor-pointer">
                                        {option}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>



                {/* Right Side: Sort and View Options */}
                <div className="flex  items-center gap-4 lg:w-auto">
                    {/* Results Count */}
                    <div className="text-sm text-gray-600">1,050 Results</div>

                    {/* View Options */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => setActiveView("grid")}
                            className={`p-2 border rounded-md ${activeView === "grid" ? "bg-gray-200" : "hover:bg-gray-100"
                                }`}
                        >
                            <FiGrid size={16} />
                        </button>
                        <button
                            onClick={() => setActiveView("list")}
                            className={`p-2 border rounded-md ${activeView === "list" ? "bg-gray-200" : "hover:bg-gray-100"
                                }`}
                        >
                            <FiList size={16} />
                        </button>
                    </div>

                    {/* Sort Dropdown */}
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
                                <ul className="space-y-2">
                                    {["Price: Low to High", "Price: High to Low", "Newest Arrivals"].map((option, idx) => (
                                        <li key={idx} className="text-sm hover:bg-gray-100 p-1 cursor-pointer">
                                            {option}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
