"use client";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaEdit, FaExchangeAlt, FaEye, FaTrashAlt } from "react-icons/fa";
import { FiMoreHorizontal, FiMoreVertical } from "react-icons/fi";

// Shimmer effect components
const ShimmerLine = ({ width }) => (
  <div className={`h-4 bg-gray-300 rounded ${width}`}></div>
);

const ShimmerBlock = ({ width, height }) => (
  <div className={`bg-gray-300 rounded ${width} ${height}`}></div>
);

const Shimmer = () => (
  <div className="animate-pulse space-y-6">
    {/* Shimmer Header */}
    <div className="space-y-4">
      <ShimmerLine width="w-1/3" />
      <ShimmerLine width="w-1/4" />
    </div>

    {/* Shimmer Breadcrumb */}
    <ShimmerLine width="w-1/2" />

    {/* Shimmer Table */}
    <div className="space-y-4">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="flex space-x-4 items-center">
          <ShimmerBlock width="w-12 h-12 sm:w-16 sm:h-16" />
          <div className="flex-1 space-y-2">
            <ShimmerLine width="w-3/4" />
            <ShimmerLine width="w-1/2" />
          </div>
          <ShimmerLine width="w-1/6" />
          <ShimmerLine width="w-1/6" />
          <ShimmerLine width="w-1/6" />
          <ShimmerLine width="w-1/6" />
          <ShimmerLine width="w-1/6" />
        </div>
      ))}
    </div>
  </div>
);

const Products = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="p-6 sm:p-8 bg-gradient-to-r from-gray-50 to-gray-100 min-h-screen">
      {loading ? (
        <Shimmer />
      ) : (
        <>
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
            <h1 className="text-2xl font-extrabold text-gray-900 mb-4 sm:mb-0">
              All Products
            </h1>
            <Link href="/cpanel/addnew">
              <div className="bg-gray-800 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg shadow-xl hover:opacity-80 transition duration-300 text-sm sm:text-base">
                + Add New Product
              </div>
            </Link>
          </div>

          {/* Breadcrumb */}
          <p className="text-sm sm:text-lg text-gray-700 mb-6">
            Home &gt; <span className="text-black">All Products</span>
          </p>

          {/* Table */}
          <div className="overflow-x-auto bg-white rounded-lg shadow-xl">
            {products.length > 0 ? (
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 text-left">
                    <th className="px-4 sm:px-6 py-3 font-semibold text-sm sm:text-base">
                      Product
                    </th>
                    <th className="px-4 sm:px-6 py-3 font-semibold text-sm sm:text-base">
                      Price
                    </th>
                    <th className="px-4 sm:px-6 py-3 font-semibold text-sm sm:text-base">
                      Brand
                    </th>
                    <th className="px-4 sm:px-6 py-3 font-semibold text-sm sm:text-base">
                      Category
                    </th>
                    <th className="px-4 sm:px-6 py-3 font-semibold text-sm sm:text-base">
                      Size
                    </th>
                    <th className="px-4 sm:px-6 py-3 font-semibold text-sm sm:text-base">
                      Status
                    </th>
                    <th className="px-4 sm:px-6 py-3 font-semibold text-sm sm:text-base">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr
                      key={product.id}
                      className="border-b border-gray-300 hover:bg-gray-100"
                    >
                      <td className="px-4 sm:px-6 py-4 flex items-center space-x-4">
                        <img
                          src={product.images[0]?.defaultImage}
                          alt={product.title}
                          className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg border border-gray-300"
                        />
                        <div>
                          <h2 className="text-sm font-semibold text-gray-900">
                            {product.title}
                          </h2>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 text-sm sm:text-lg font-bold text-gray-700">
                        ₹{parseFloat(product.price).toLocaleString()}
                      </td>
                      <td className="px-4 sm:px-6 py-4 text-sm sm:text-base text-gray-600">
                        {product.brand}
                      </td>
                      <td className="px-4 sm:px-6 py-4 text-sm sm:text-base text-gray-600">
                        {product.category}
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <img
                              src="/images/size.png"
                              alt=""
                              className="w-12"
                            />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="bg-white shadow-lg rounded-lg w-48 py-2">
                            <DropdownMenuLabel className="px-4 py-2 text-sm font-semibold text-gray-700">
                              Size Guide
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator className="border-t border-gray-200 my-2" />
                            <DropdownMenuItem className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 cursor-pointer">
                              {product.size.map((size) => (
                                <span
                                  key={size}
                                  className="text-xs sm:text-sm bg-gray-300 text-gray-600 w-[30] h-[30] rounded-full inline-flex items-center justify-center"
                                >
                                  {size}
                                </span>
                              ))}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        {product.readyToShip ? (
                          <span className="text-xs whitespace-nowrap font-medium text-green-700 bg-green-100 p-2 rounded">
                            Ready to ship
                          </span>
                        ) : (
                          <span className="text-xs whitespace-nowrap font-medium text-red-700 bg-red-100 p-2 rounded">
                            New Arrivals
                          </span>
                        )}
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <button className="text-gray-400 hover:text-gray-600">
                          <DropdownMenu>
                            <DropdownMenuTrigger>
                              <FiMoreVertical
                                className="text-gray-700 hover:text-gray-500"
                                size={20}
                              />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-white shadow-lg rounded-lg w-48 py-2">
                              <DropdownMenuLabel className="px-4 py-2 text-sm font-semibold text-gray-700">
                                Order Actions
                              </DropdownMenuLabel>
                              <DropdownMenuSeparator className="border-t border-gray-200 my-2" />
                              <DropdownMenuItem className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 cursor-pointer">
                                <FaEye className="mr-2 text-blue-500" /> View
                                Details
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 cursor-pointer">
                                <FaEdit className="mr-2 text-green-500" /> Edit
                                Order
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 cursor-pointer">
                                <FaExchangeAlt className="mr-2 text-yellow-500" />{" "}
                                Change Status
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 cursor-pointer">
                                <FaTrashAlt className="mr-2 text-red-500" />{" "}
                                Cancel Order
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>{" "}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center py-8 text-gray-600">
                No products found.
              </p>
            )}
          </div>

          {/* Footer */}
          <footer className="mt-16 text-center text-sm text-gray-600">
            © 2023 - pulistron Dashboard | About | Careers | Policy | Contact
          </footer>
        </>
      )}
    </div>
  );
};

export default Products;
