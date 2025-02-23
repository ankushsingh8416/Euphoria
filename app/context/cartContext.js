"use client";
import { createContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export const cartContext = createContext();

export const Cartprovider = ({ children }) => {
  const { data: session } = useSession();

  // States
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

  // Cart and Wishlist states (stored in localStorage)
  const [cart, setCart] = useState(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("cart")) || [];
    }
    return [];
  });

  const [wishList, setWishList] = useState(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("wishList")) || [];
    }
    return [];
  });

  // Add item to cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const exists = prevCart.some((item) => item._id === product._id);
      if (exists) {
        console.log("Product is already in the cart");
        return prevCart;
      }

      const updatedCart = [
        ...prevCart,
        { ...product, quantity: 1, user: getUserInfo() },
      ];
      updateLocalStorage("cart", updatedCart);
      return updatedCart;
    });
  };

  // Add item to wishlist
  const addToWishlist = (product) => {
    setWishList((prevList) => {
      const exists = prevList.some((item) => item._id === product._id);
      if (exists) {
        console.log("Product is already in the wishlist");
        return prevList;
      }

      const updatedList = [...prevList, { ...product, user: getUserInfo() }];
      updateLocalStorage("wishList", updatedList);
      return updatedList;
    });
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item._id !== productId);
      updateLocalStorage("cart", updatedCart);
      return updatedCart;
    });
  };

  // Remove item from wishlist
  const removeFromWishlist = (productId) => {
    setWishList((prevList) => {
      const updatedList = prevList.filter((item) => item._id !== productId);
      updateLocalStorage("wishList", updatedList);
      return updatedList;
    });
  };

  // Update localStorage
  const updateLocalStorage = (key, value) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(value));
    }
  };

  // Get user info
  const getUserInfo = () => ({
    name: session?.user?.name || "Guest",
    email: session?.user?.email || "guest@example.com",
  });

  // Update total products count
  useEffect(() => {
    setTotalProducts(products.length);
  }, [products]);

  // Grid view handlers
  const fourGrid = () => {
    setActiveView("grid");
    setProductGrid("four");
  };

  const twoGrid = () => {
    setActiveView("list");
    setProductGrid("two");
  };

  // Handle filter change
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
        removeFromCart,
        addToWishlist,
        wishList,
        removeFromWishlist,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};
