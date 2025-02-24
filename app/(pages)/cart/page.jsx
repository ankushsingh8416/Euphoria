"use client";
import React, { useContext, useState } from "react";
import { cartContext } from "@/app/context/cartContext";
import { useSession } from "next-auth/react";

const Page = () => {
  const { cart, removeFromCart, addToWishlist } = useContext(cartContext);
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
          <div className="w-full sm:w-3/4 bg-red-600 px-10 py-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">Shopping Cart</h1>
              <h2 className="font-semibold text-2xl">{cart.length} Items</h2>
            </div>

            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-4 py-16">
                <img
                  src="/images/cart-empty.png"
                  alt="Empty Cart"
                  className="w-96"
                />
                <p>Your cart is empty.</p>
              </div>
            ) : (
              cart.map((product, index) => {
                // Defensive check for images
                const defaultImage =
                  product?.images?.[0]?.defaultImage ||
                  "https://via.placeholder.com/150";
                const hoverImage =
                  product?.images?.[0]?.hoverImage || defaultImage;

                  return (
                    <div
                      key={index}
                      className="flex flex-col md:flex-row items-center gap-6 p-6 border border-gray-200 rounded-xl shadow-md bg-white transition-all hover:shadow-lg"
                    >
                      {/* Product Image */}
                      <div className="relative md:w-1/4 w-full">
                        <img
                          src={defaultImage}
                          alt={product.title || "Product Image"}
                          className="w-full h-36 md:h-44 object-cover rounded-lg"
                        />
                        <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-md">
                          Bestseller
                        </span>
                      </div>
                  
                      {/* Product Details */}
                      <div className="md:w-3/4 w-full flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <div>
                            <h2 className="text-lg font-semibold text-gray-800">{product.title}</h2>
                            <p className="text-sm text-gray-500 mt-1">
                              <span className="font-medium">Brand:</span> {product.brand}
                            </p>
                            <p className="text-sm text-gray-500">
                              <span className="font-medium">Color:</span> {product.color}
                            </p>
                          </div>
                  
                          {/* Quantity Selector */}
                          <select
                            aria-label="Select quantity"
                            className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                            value={quantities[index]}
                            onChange={(e) => handleQuantityChange(index, e.target.value)}
                          >
                            {[1, 2, 3, 4, 5].map((num) => (
                              <option key={num} value={num}>
                                {num}
                              </option>
                            ))}
                          </select>
                        </div>
                  
                        {/* Actions & Price */}
                        <div className="flex justify-between items-center mt-5">
                          <div className="flex gap-4">
                            <button
                              onClick={() => addToWishlist(product._id)}
                              className="text-sm text-blue-600 hover:text-blue-800 transition-all hover:scale-105"
                            >
                              ⭐ Add to Wishlist
                            </button>
                            <button
                              onClick={() => removeFromCart(product._id)}
                              className="text-sm text-red-600 hover:text-red-800 transition-all hover:scale-105"
                            >
                              ❌ Remove
                            </button>
                          </div>
                          <p className="text-lg font-bold text-gray-900">
                            ₹{(product.price * quantities[index]).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                  
              })
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
                ₹{calculateTotalPrice()}
              </span>
            </div>
            <div>
              <label className="font-medium inline-block mb-3 text-sm uppercase">
                Shipping
              </label>
              <select className="block p-2 text-gray-600 w-full text-sm">
                <option>Standard shipping - ₹10.00</option>
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
