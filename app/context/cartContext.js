"use client";
import { createContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import jwt from "jsonwebtoken";
import { useRouter } from "next/navigation";

// Create the Cart Context
export const cartContext = createContext();

// Cart Provider Component
export const Cartprovider = ({ children }) => {
  const { data: session } = useSession();
  const router = useRouter();

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
  const [authToken, setAuthToken] = useState(null);

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

  // Fetch and set token from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        setAuthToken(storedToken);
        const decodedToken = jwt.decode(storedToken);
        if (decodedToken?.isAdmin) {
          router.push("/cpanel/dashboard");
        } else {
          router.push("/cpanel/login");
        }
      }
    }
  }, [router]);

  // Update localStorage whenever cart or wishlist changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cart));
      console.log(cart)
    }
  }, [cart]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("wishList", JSON.stringify(wishList));
    }
  }, [wishList]);

  // Function to set auth token
  const setToken = (token) => {
    localStorage.setItem("authToken", token);
    setAuthToken(token);
  };

  // Add item to cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.find((item) => item._id === product._id)
        ? prevCart.map((item) =>
            item._id === product._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...prevCart, { ...product, quantity: 1 }];
  
      console.log("Cart after adding:", updatedCart);
      return updatedCart;
    });
  };
  

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
  };

  // Add item to wishlist
  const addToWishlist = (product) => {
    setWishList((prevList) => {
      const exists = prevList.some((item) => item._id === product._id);
      if (exists) {
        console.log("Product is already in the wishlist");
        return prevList;
      }
      return [...prevList, { ...product }];
    });
  };

  // Remove item from wishlist
  const removeFromWishlist = (productId) => {
    setWishList((prevList) => prevList.filter((item) => item._id !== productId));
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
    authToken,
    setToken,
  };

  return (
    <cartContext.Provider value={contextValue}>{children}</cartContext.Provider>
  );
};
