"use client"
import { createContext, useState } from "react";

export const cartContext = createContext();



export const Cartprovider = ({ children }) => {

    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [activeView, setActiveView] = useState("grid");
    const [productGrid, setproductGrid] = useState("four");

    const fourGrid = () => {
        setActiveView("grid")
        setproductGrid("four")
    }
    const twoGrid = () => {
        setActiveView("list")
        setproductGrid("two")
    }

    return (
        <cartContext.Provider value={{ isSearchOpen, setIsSearchOpen, fourGrid, twoGrid, activeView, productGrid  }}>
            {children}
        </cartContext.Provider>
    )
}
