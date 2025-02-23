"use client";
import React, { useContext, useState } from "react";
import { cartContext } from "@/app/context/cartContext";
import { useSession } from "next-auth/react";

const Page = () => {
  const { wishList, removeFromWishlist, addToCart } = useContext(cartContext);
  const [quantities, setQuantities] = useState(wishList.map(() => 1));
  const { data: session } = useSession();

  // const handleQuantityChange = (index, newQuantity) => {
  //   const updatedQuantities = [...quantities];
  //   updatedQuantities[index] = parseInt(newQuantity);
  //   setQuantities(updatedQuantities);
  // };
  // const calculateTotalPrice = () => {
  //   return wishList
  //     .reduce(
  //       (total, product, index) => total + product.price * quantities[index],
  //       0
  //     )
  //     .toFixed(2);
  // };

  return (
    <>
      <div className="container mx-auto mt-10">
        <div className="sm:flex shadow-md my-10">
          <div className="w-full  bg-white px-10 py-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">Your Wish Lsit</h1>
              <h2 className="font-semibold text-2xl">{wishList.length} Items</h2>
            </div>

            {wishList.length === 0 ? (
              <p>Your wishlist is empty.</p>
            ) : (
              wishList.map((product, index) => (
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
                    </div>
                    <p className="md:text-sm text-xs leading-3  text-gray-600 py-4">
                      Color: {product.color}
                    </p>
                    <p className="md:text-sm text-xs leading-3 text-gray-600 pt-2">
                      Height: 10 inches
                    </p>
                    <div className="flex items-center justify-between pt-5">
                      <div className="flex items-center">
                        <p 
                        onClick={() => addToCart(product._id)}
                        className="md:text-sm text-xs leading-3 underline text-gray-800 cursor-pointer">
                         Add to Cart
                        </p>
                        <p
                          onClick={() => removeFromWishlist(index)}
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
        </div>
      </div>
    </>
  );
};

export default Page;
