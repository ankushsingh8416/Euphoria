"use client"
import { createContext, useEffect, useState } from "react";
export const cartContext = createContext();
export const Cartprovider = ({ children }) => {

    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [activeView, setActiveView] = useState("grid");
    const [productGrid, setproductGrid] = useState("four");
    const [sortOption, setSortOption] = useState("Price:LowtoHigh");
    const [products, setProducts] = useState([]);
    const [totalProducts, setTotalProducts] = useState(0);
    const [selectedFilters, setSelectedFilters] = useState({
        Category: [],
        Price: [],
        Color: [],
        Size: [],
        Brand: [],
    });


    useEffect(() => {
        setTotalProducts(products.length);
    }, [products]);

    const fourGrid = () => {
        setActiveView("grid")
        setproductGrid("four")
    }
    const twoGrid = () => {
        setActiveView("list")
        setproductGrid("two")
    }

    const handleCheckboxChange = (filter, value) => {
        alert(value)
    };




    return (
        <cartContext.Provider value={{
            isSearchOpen,
            setIsSearchOpen,
            fourGrid,
            twoGrid,
            activeView,
            productGrid,
            sortOption,
            setSortOption,
            products,
            setProducts,
            totalProducts,
            handleCheckboxChange
        }}>
            {children}
        </cartContext.Provider>
    )
}
