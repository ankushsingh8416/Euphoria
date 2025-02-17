"use client";
import React, { useContext, useState } from "react";
import { cartContext } from "@/app/context/cartContext";
import { useSession } from "next-auth/react";

const Page = () => {
  const { cart, removeFromCart } = useContext(cartContext);
  const [quantities, setQuantities] = useState(cart.map(() => 1));
  const { data: session } = useSession();

  const handleQuantityChange = (index, newQuantity) => {
    const updatedQuantities = [...quantities];
    updatedQuantities[index] = parseInt(newQuantity);
    setQuantities(updatedQuantities);
  };
  const calculateTotalPrice = () => {
    return cart
      .reduce(
        (total, product, index) => total + product.price * quantities[index],
        0
      )
      .toFixed(2);
  };

  return (
    <>
      <div className="container mx-auto mt-10">
        <div className="sm:flex shadow-md my-10">
          <div className="w-full sm:w-3/4 bg-white px-10 py-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">Shopping Cart</h1>
              <h2 className="font-semibold text-2xl">{cart.length} Items</h2>
            </div>

            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              cart.map((product, index) => (
                <div
                  key={index}
                  className="md:flex items-stretch py-8 md:py-10 lg:py-8 border-t border-b border-gray-50"
                >
                  <div className="md:w-2/4 2xl:w-1/4 w-full">
                    <img
                      src={product.images[0]?.defaultImage}
                      alt={product.title}
                      className="h-[60%] object-center object-cover md:block hidden"
                    />
                    <img
                      src={product.images[0]?.defaultImage}
                      alt={product.title}
                      className="md:hidden w-full h-full object-center object-cover"
                    />
                  </div>
                  <div className="md:pl-0 pt-5 md:pt-0 md:w-8/12 2xl:w-3/4 flex flex-col justify-start">
                    <div className="flex items-center justify-between w-full">
                      <p className="text-base font-black leading-none text-gray-800">
                        {product.title}
                      </p>
                      <select
                        aria-label="Select quantity"
                        className="py-2 px-1 border border-gray-200 focus:outline-none"
                        value={quantities[index]}
                        onChange={(e) =>
                          handleQuantityChange(index, e.target.value)
                        }
                      >
                        {[1, 2, 3, 4, 5].map((num) => (
                          <option key={num} value={num}>
                            {num}
                          </option>
                        ))}
                      </select>
                    </div>
                    <p className="md:text-sm text-xs leading-3 text-gray-600 pt-2">
                      Height: 10 inches
                    </p>
                    <p className="md:text-sm text-xs leading-3 text-gray-600 py-4">
                      Color: {product.color}
                    </p>
                    <div className="flex items-center justify-between pt-5">
                      <div className="flex items-center">
                        <p className="md:text-sm text-xs leading-3 underline text-gray-800 cursor-pointer">
                          Add to favorites
                        </p>
                        <p
                          onClick={() => removeFromCart(index)}
                          className="md:text-sm text-xs leading-3 underline text-red-500 md:pl-5 pl-2 cursor-pointer"
                        >
                          Remove
                        </p>
                      </div>
                      <p className="md:text-base text-sm font-black leading-none text-gray-800">
                        ${(product.price * quantities[index]).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}

            <div className="mt-10">
              <a href="/women" className="text-indigo-600 text-sm">
                Continue Shopping
              </a>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="w-full sm:w-1/4 px-8 py-10">
            <h1 className="font-semibold text-2xl border-b pb-8">
              Order Summary
            </h1>
            <div className="flex justify-between mt-10 mb-5">
              <span className="font-semibold text-sm uppercase">
                Items {cart.length}
              </span>
              <span className="font-semibold text-sm">
                ${calculateTotalPrice()}
              </span>
            </div>
            <div>
              <label className="font-medium inline-block mb-3 text-sm uppercase">
                Shipping
              </label>
              <select className="block p-2 text-gray-600 w-full text-sm">
                <option>Standard shipping - $10.00</option>
              </select>
            </div>
            <div className="py-10">
              <label
                htmlFor="promo"
                className="font-semibold inline-block mb-3 text-sm uppercase"
              >
                Promo Code
              </label>
              <input
                type="text"
                id="promo"
                placeholder="Enter your code"
                className="p-2 text-sm w-full"
              />
            </div>
            <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">
              Apply
            </button>
            <div className="border-t mt-8">
              <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                <span>Total cost</span>
                <span>${calculateTotalPrice()}</span>
              </div>
              <button className="bg-indigo-500 hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
