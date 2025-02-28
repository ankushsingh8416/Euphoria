import Link from "next/link";
import React from "react";
import { SlHeart } from "react-icons/sl";

const OrderProduct = ({ product, qty }) => {
  return (
    <>
      <Link
        href={{
          pathname: `/productdetails/${product.page}/${product.title}`,
          query: { id: product._id },
        }}
        key={product._id}
      >
        <div className="relative overflow-hidden">
          <img
            src={product.images[0]?.defaultImage}
            alt={product.title}
            className="w-full transition-transform duration-500 group-hover:scale-110"
          />
         

        
        </div>
        <div className="mt-4">
          <h3 className="text-sm font-medium uppercase truncate overflow-hidden whitespace-nowrap relative">
            {product.title}
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#B18E35] transition-all duration-500 group-hover:w-full"></span>
          </h3>
          <div className="flex items-center justify-between mt-1">
            <p className="text-gray-600">₹{product.price}</p>
          
          </div>
          {product.readyToShip ? (
            <div className="mt-2 text-[.7rem] font-medium text-[#1E381E] bg-[#F5F5F5] border border-gray-300 px-2 py-1 inline-block">
              READY TO SHIP
            </div>
          ) : (
            <div className="mt-2 text-[.7rem] font-medium text-[#1E381E] bg-[#fecdcd70] border border-gray-300 px-2 py-1 inline-block">
              NEW ARRIVALS
            </div>
          )}
        </div>
      </Link>
    </>
  );
};

export default OrderProduct;
