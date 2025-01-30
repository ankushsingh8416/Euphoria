"use client";
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FiMoreHorizontal } from 'react-icons/fi';

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
            <h1 className="text-2xl font-extrabold text-gray-900 mb-4 sm:mb-0">All Products</h1>
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
                    <th className="px-4 sm:px-6 py-3 font-semibold text-sm sm:text-base">Product</th>
                    <th className="px-4 sm:px-6 py-3 font-semibold text-sm sm:text-base">Price</th>
                    <th className="px-4 sm:px-6 py-3 font-semibold text-sm sm:text-base">Brand</th>
                    <th className="px-4 sm:px-6 py-3 font-semibold text-sm sm:text-base">Category</th>
                    <th className="px-4 sm:px-6 py-3 font-semibold text-sm sm:text-base">Size</th>
                    <th className="px-4 sm:px-6 py-3 font-semibold text-sm sm:text-base">Status</th>
                    <th className="px-4 sm:px-6 py-3 font-semibold text-sm sm:text-base">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b border-gray-300 hover:bg-gray-100">
                      <td className="px-4 sm:px-6 py-4 flex items-center space-x-4">
                        <img
                          src={product.images[0]?.defaultImage}
                          alt={product.title}
                          className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg border border-gray-300"
                        />
                        <div>
                          <h2 className="text-sm font-semibold text-gray-900">{product.title}</h2>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 text-sm sm:text-lg font-bold text-gray-700">
                        ₹{parseFloat(product.price).toLocaleString()}
                      </td>
                      <td className="px-4 sm:px-6 py-4 text-sm sm:text-base text-gray-600">{product.brand}</td>
                      <td className="px-4 sm:px-6 py-4 text-sm sm:text-base text-gray-600">{product.category}</td>
                      <td className="px-4 sm:px-6 py-4">
                        {product.size.map((size) => (
                          <span
                            key={size}
                            className="text-xs sm:text-sm bg-gray-300 text-gray-600 px-2 py-1 rounded-full mb-2 mr-2 inline-block"
                          >
                            {size}
                          </span>
                        ))}
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
                          <FiMoreHorizontal className="text-lg sm:text-xl" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center py-8 text-gray-600">No products found.</p>
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
