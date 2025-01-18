"use client";
import { createContext, useState, useEffect } from "react";

export const cartContext = createContext();

export const Cartprovider = ({ children }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    Category: [],
    Price: [],
    Color: [],
    Size: [],
    Brand: [],
  });
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeView, setActiveView] = useState("grid");
  const [productGrid, setproductGrid] = useState("four");
  const [sortOption, setSortOption] = useState("Price:LowtoHigh");
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [cart, setCart] = useState(() => {
    if (typeof window !== "undefined") {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
});

const addToCart = (product) => {
    setCart((prevCart) => {
        const updatedCart = [...prevCart, product];
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return updatedCart;
    });
};

const removeFromCart = (index) => {
    setCart((prevCart) => {
        const updatedCart = prevCart.filter((_, i) => i !== index);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return updatedCart;
    });
};

  useEffect(() => {
    setTotalProducts(products.length);
  }, [products]);

  const fourGrid = () => {
    setActiveView("grid");
    setproductGrid("four");
  };
  const twoGrid = () => {
    setActiveView("list");
    setproductGrid("two");
  };
  const handleFilterChange = (filter, option) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filter]: prev[filter].includes(option)
        ? prev[filter].filter((item) => item !== option)
        : [...prev[filter], option],
    }));
  };

  return (
    <cartContext.Provider
      value={{
        selectedFilters,
        setSelectedFilters,
        handleFilterChange,
        totalProducts,
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
        cart,
        addToCart,
        removeFromCart
      }}
    >
      {children}
    </cartContext.Provider>
  );
};
