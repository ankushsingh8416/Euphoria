"use client";
import { createContext, useState } from "react";

export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    Category: [],
    Price: [],
    Color: [],
    Size: [],
    Brand: [],
  });

  const handleFilterChange = (filter, option) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filter]: prev[filter]?.includes(option)
        ? prev[filter].filter((item) => item !== option)
        : [...prev[filter], option],
    }));
  };

  return (
    <FilterContext.Provider value={{ selectedFilters, setSelectedFilters, handleFilterChange }}>
      {children}
    </FilterContext.Provider>
  );
};
