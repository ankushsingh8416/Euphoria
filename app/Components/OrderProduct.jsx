import { CheckCircle, Clock } from "lucide-react";
import Link from "next/link";
import React from "react";

const OrderProduct = ({ product, qty, status }) => {
  if (!product) return null;

  return (
    <div className="grid grid-cols-12 gap-4 items-center py-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
      {/* Product Image - Column 1 */}
      <div className="col-span-2">
        <Link
          href={{
            pathname: `/productdetails/${product.page}/${product.title}`,
            query: { id: product._id },
          }}
        >
          <div className="h-20 w-20 overflow-hidden rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
            <img
              src={product.images[0]?.defaultImage}
              alt={product.title}
              className="h-full w-full object-cover object-top transform hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>
      </div>

      {/* Product Title - Column 2 */}
      <div className="col-span-3">
        <Link
          href={{
            pathname: `/productdetails/${product.page}/${product.title}`,
            query: { id: product._id },
          }}
        >
          <h3 className="text-sm font-medium text-gray-800 hover:text-blue-600 transition-colors line-clamp-2">
            {product.title}
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            {product.category || "Category"}
          </p>
        </Link>
      </div>

      {/* Product Price - Column 3 */}
      <div className="col-span-2">
        <p className="font-bold text-gray-900">₹{product.price}</p>
        {product.mrp && product.mrp > product.price && (
          <p className="text-xs text-gray-500 line-through">₹{product.mrp}</p>
        )}
      </div>

      {/* Product Quantity - Column 4 */}
      <div className="col-span-1 text-center">
        <span className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full font-medium text-sm shadow-sm">
          {qty}
        </span>
      </div>

      {/* Product Status - Column 5 */}
      <div className="col-span-2 text-center">
        {product.readyToShip ? (
          <span className="inline-flex items-center px-2 py-1.5 rounded-full text-[10px] font-medium bg-gradient-to-r from-emerald-50 to-green-100 text-emerald-800 border border-emerald-200 shadow-sm transition-all duration-300 hover:shadow-md">
            <CheckCircle className="w-4 h-4 mr-2 text-emerald-500" />
            READY TO SHIP
          </span>
        ) : (
          <span className="inline-flex items-center px-2 py-1.5 rounded-full text-[10px] font-medium bg-gradient-to-r from-amber-50 to-amber-100 text-amber-800 border border-amber-200 shadow-sm transition-all duration-300 hover:shadow-md">
            <Clock className="w-4 h-4 mr-2 text-amber-500" />
            NEW ARRIVAL
          </span>
        )}
      </div>

      {/* Payment Status - Column 6 */}
      <div className="col-span-2 text-center">
        <span
          className={`px-3 py-1.5 text-sm font-semibold rounded-full inline-flex items-center justify-center ${
            status === "completed"
              ? "bg-gradient-to-r from-green-50 to-green-100 text-green-700 border border-green-200"
              : "bg-gradient-to-r from-amber-50 to-amber-100 text-amber-700 border border-amber-200"
          } shadow-sm transition-all duration-300 hover:shadow-md`}
        >
          <span className={`w-2 h-2 rounded-full mr-2 ${
            status === "completed" ? "bg-green-500" : "bg-amber-500"
          }`}></span>
          {status === "completed" ? "Paid" : "Pending"}
        </span>
      </div>
    </div>
  );
};

export default OrderProduct;