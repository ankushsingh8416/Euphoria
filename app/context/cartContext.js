"use client";
import { createContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";

// Create the Cart Context
export const cartContext = createContext();

// Cart Provider Component
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

  // Cart and Wishlist states (initialized from localStorage)
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

  // Update localStorage whenever cart or wishlist changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("wishList", JSON.stringify(wishList));
    }
  }, [wishList]);

  // Add item to cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item._id === product._id);
      if (existingProduct) {
        // If product already exists, update its quantity
        const updatedCart = prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return updatedCart;
      } else {
        // If product doesn't exist, add it to the cart with quantity 1
        const updatedCart = [...prevCart, { ...product, quantity: 1 }];
        return updatedCart;
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item._id !== productId);
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
      const updatedList = [...prevList, { ...product }];
      return updatedList;
    });
  };

  // Remove item from wishlist
  const removeFromWishlist = (productId) => {
    setWishList((prevList) => {
      const updatedList = prevList.filter((item) => item._id !== productId);
      return updatedList;
    });
  };

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

  // Handle filter changes
  const handleFilterChange = (filter, option) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filter]: prev[filter]?.includes(option)
        ? prev[filter].filter((item) => item !== option)
        : [...(prev[filter] || []), option],
    }));
  };

  // Context value
  const contextValue = {
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
    cart,
    addToCart,
    removeFromCart,
    addToWishlist,
    wishList,
    removeFromWishlist,
  };

  return (
    <cartContext.Provider value={contextValue}>{children}</cartContext.Provider>
  );
};
