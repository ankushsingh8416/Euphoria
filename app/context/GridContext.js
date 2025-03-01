"use client";
import { createContext, useState } from "react";

export const GridContext = createContext();

export const GridProvider = ({ children }) => {
  const [activeView, setActiveView] = useState("grid");
  const [productGrid, setProductGrid] = useState("four");

  const fourGrid = () => {
    setActiveView("grid");
    setProductGrid("four");
  };

  const twoGrid = () => {
    setActiveView("list");
    setProductGrid("two");
  };

  return (
    <GridContext.Provider value={{ activeView, productGrid, fourGrid, twoGrid }}>
      {children}
    </GridContext.Provider>
  );
};
