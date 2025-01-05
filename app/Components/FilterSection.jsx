"use client";

import { useContext, useEffect, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FiGrid, FiList } from "react-icons/fi";
import { IoFilterSharp } from "react-icons/io5";
import Image from "next/image";
import { cartContext } from "../context/cartContext";
import { usePathname } from "next/navigation"; 

export default function FilterSection() {
    const [activeFilter, setActiveFilter] = useState(null);
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [isFilterVisible, setIsFilterVisible] = useState(false);

    const toggleFilter = (filter) => {
        setActiveFilter(activeFilter === filter ? null : filter);
    };
    const { fourGrid, twoGrid, activeView, setSortOption, totalProducts } = useContext(cartContext)
    const pathname = usePathname();

    const sorting = (option) => {
        const sanitizedOption = option.replace(/\s+/g, "");
        setSortOption(sanitizedOption)
        setIsSortOpen(false)
    };

    return (
        <div className="p-4 relative bg-[#faf8f0] text-[#333]">
            {/* Breadcrumb */}
            <div className="flex justify-between items-center mb-4">
                <div className="text-sm mb-4">
                    <span className="text-gray-500">Home</span> |{" "}
                    <span className="font-semibold uppercase">{pathname.replace(/^\//, "")}</span>
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
                                {["Price: Low to High", "Price: High to Low", "Newest Arrivals"].map((option, idx) => (
                                    <li key={idx} className="text-sm  hover:bg-gray-100 p-1 cursor-pointer" onClick={() => sorting(option)}>
                                        {option}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex justify-between items-center border-b w-full border-gray-300 pb-3 mb-4">
                <div className="filter-category flex-wrap gap-4 hidden lg:flex">
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
                            className={`p-2 border rounded-md ${activeView === "grid" ? "bg-gray-200" : "hover:bg-gray-100"}`}
                        >
                            <FiGrid size={16} />
                        </button>
                        <button
                            onClick={twoGrid}
                            className={`p-2 border rounded-md ${activeView === "list" ? "bg-gray-200" : "hover:bg-gray-100"}`}
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
                                <ul className="space-y-2">
                                    {["Price: Low to High", "Price: High to Low", "Newest Arrivals"].map((option, idx) => (
                                        <li key={idx} className="text-sm hover:bg-gray-100 p-1 cursor-pointer" onClick={() => sorting(option)}>
                                            {option}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Filter Menu */}
            <div
                className={`fixed h-screen top-0 overflow-auto searchpannel  z-50 left-0 w-full flex flex-col gap-6 bg-[#faf8f0] border border-gray-200 p-6  shadow-xl lg:hidden transition-transform duration-500 ease-in-out ${isFilterVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
                    }`}
            >
                {/* Title */}
                <div className="flex justify-between items-center pb-2 border-b border-gray-300">
                    <h2 className="text-lg font-semibold text-[#1E381E]">Filters</h2>
                    <button
                        onClick={() => setIsFilterVisible(false)}
                        className="text-sm text-gray-500 hover:text-gray-800 transition"
                    >
                        <Image src="/images/cancel-icon.webp" alt="Close" width={30} height={30} />
                    </button>
                </div>

                {["Category", "Price", "Color", "Size", "Brand"].map((filter) => (
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
                                    {["Option 1", "Option 2", "Option 3"].map((option, idx) => (
                                        <li key={idx} className="flex items-center text-sm">
                                            <input
                                                type="checkbox"
                                                id={`${filter}-${idx}`}
                                                className="mr-3 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                            />
                                            <label
                                                htmlFor={`${filter}-${idx}`}
                                                className="text-gray-800 hover:underline cursor-pointer"
                                            >
                                                {option}
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
