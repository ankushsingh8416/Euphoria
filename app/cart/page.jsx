"use client";
import React, { useContext } from "react";
import { cartContext } from "../context/cartContext";

const Cart = () => {
    const { data } = useContext(cartContext);

    return (
        <div>
          
                <ul className="flex justify-center space-x-4">
                    {data.map((item, index) => (
                        <li key={index} className="shadow-lg w-48 p-4 rounded-lg bg-white">
                            <h1 className="text-2xl text-orange-600">{item.name}</h1>
                            <p>Price :- {item.price}</p>
                        </li>
                    ))}
                </ul>
            
        </div>
    );
};

export default Cart;
