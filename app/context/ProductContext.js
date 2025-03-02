"use client";
import { createContext, useState, useEffect } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    Category: [],
    Price: [],
    Color: [],
    Size: [],
    Brand: [],
  });
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeView, setActiveView] = useState("grid");
  const [productGrid, setProductGrid] = useState("four");
  const [sortOption, setSortOption] = useState("Price:LowtoHigh");
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    setTotalProducts(products.length);
  }, [products]);

  const handleFilterChange = (filter, option) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filter]: prev[filter]?.includes(option)
        ? prev[filter].filter((item) => item !== option)
        : [...(prev[filter] || []), option],
    }));
  };

  const fourGrid = () => {
    setActiveView("grid");
    setProductGrid("four");
  };

  const twoGrid = () => {
    setActiveView("list");
    setProductGrid("two");
  };

  return (
    <ProductContext.Provider
      value={{
        selectedFilters,
        setSelectedFilters,
        handleFilterChange,
        totalProducts,
        setTotalProducts,
        activeView,
        setSortOption,
        products,
        setProducts,
        sortOption,
        isSearchOpen,
        setIsSearchOpen,
        fourGrid,
        twoGrid,
        productGrid,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
