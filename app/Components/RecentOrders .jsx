"use client";
import React from "react";
import { useOrders } from "../cpanel/context/orderContext";
import OrderProduct from "./OrderProduct";

const RecentOrders = () => {
  const { orders, userOrders, loading, products } = useOrders();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Recent Orders</h2>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              Filter
            </button>
            <button className="px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700">
              Export
            </button>
          </div>
        </div>

        {orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white shadow rounded-lg overflow-hidden border border-gray-200"
              >
                {/* Order Header */}
                <div className="px-6 py-4 bg-gray-50 border-b">
                  <div className="flex flex-wrap items-center justify-between">
                    <div className="mb-2 md:mb-0">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {userOrders[order.user]?.name
                          ? `${userOrders[order.user]?.name}`
                          : "Customer"}
                      </h3>
                      <p className="text-sm text-gray-500">{order.email}</p>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
                      <div>
                        <span className="text-xs text-gray-500">ORDER ID</span>
                        <p className="text-sm font-medium">{order._id.substring(0, 10)}...</p>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500">DATE</span>
                        <p className="text-sm font-medium">
                          {new Date(order.createdAt || Date.now()).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Details */}
                <div className="px-6 py-4">
                  <div className="flex flex-wrap justify-between mb-4 gap-4">
                    <div>
                      <span className="text-xs text-gray-500 block mb-1">PAYMENT STATUS</span>
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded ${
                          order.paymentStatus === "Completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {order.paymentStatus}
                      </span>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 block mb-1">FULFILLMENT</span>
                      <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded">
                        {order.fulfillmentStatus || "Processing"}
                      </span>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 block mb-1">TOTAL AMOUNT</span>
                      <span className="text-lg font-bold text-blue-600">₹{order.totalAmount}</span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Products ({order.products.length})</h4>
                    <div className="space-y-3">
                      {order.products.map((product) => {
                        const productDetails = products[product.productId];
                        return (
                          productDetails && (
                            <OrderProduct
                              key={product._id}
                              product={productDetails}
                              qty={product.quantity}
                            />
                          )
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Order Footer */}
                <div className="bg-gray-50 px-6 py-3 border-t flex justify-end">
                  <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 mr-2">
                    View Details
                  </button>
                  <button className="px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700">
                    Update Status
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white shadow rounded-lg p-8 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No recent orders</h3>
            <p className="mt-1 text-sm text-gray-500">
              No orders have been placed recently.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentOrders;