"use client"
import { createContext, useState } from "react";

export const cartContext = createContext();



export const Cartprovider = ({ children }) => {

    const [data, setdata] = useState([])
    const addtoCart = (item) => {
        setdata((prevCart) => [...prevCart, item]);

    }
    return (
        <cartContext.Provider value={{ addtoCart, data }}>
            {children}
        </cartContext.Provider>
    )
}
