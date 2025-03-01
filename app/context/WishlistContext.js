"use client";
import { createContext, useState, useEffect } from "react";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishList, setWishList] = useState(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("wishList")) || [];
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("wishList", JSON.stringify(wishList));
    }
  }, [wishList]);

  const addToWishlist = (product) => {
    setWishList((prevList) => {
      const exists = prevList.some((item) => item._id === product._id);
      return exists ? prevList : [...prevList, product];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishList((prevList) => prevList.filter((item) => item._id !== productId));
  };

  return (
    <WishlistContext.Provider value={{ wishList, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
