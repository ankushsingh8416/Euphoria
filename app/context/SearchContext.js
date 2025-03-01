"use client";
import { createContext, useState } from "react";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <SearchContext.Provider value={{ isSearchOpen, setIsSearchOpen }}>
      {children}
    </SearchContext.Provider>
  );
};
