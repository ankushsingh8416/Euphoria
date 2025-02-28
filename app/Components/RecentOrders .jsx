"use client";
import React from "react";
import { useOrders } from "../cpanel/context/orderContext";
import OrderProduct from "./OrderProduct";
import { FileText, Calendar, CreditCard } from "lucide-react";

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

  const renderOrderHeader = (order) => (
    <div className="px-8 py-6 bg-gradient-to-r from-blue-50 to-gray-50 flex flex-wrap items-center justify-between">
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mr-4">
          <span className="text-blue-600 font-bold text-lg">
            {(userOrders[order.user]?.name || "Customer").charAt(0)}
          </span>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900">
            {userOrders[order.user]?.name || "Customer"}
          </h3>
          <p className="text-sm text-gray-500">{order.email}</p>
        </div>
      </div>

      <div className="flex items-center mt-4 md:mt-0 space-x-10">
        <div className="flex items-start">
          <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
          <div className="ml-3">
            <span className="text-xs text-gray-500 uppercase font-medium">
              ORDER ID
            </span>
            <p className="text-sm font-medium text-gray-700">
              {order._id.substring(0, 10)}...
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <Calendar className="h-5 w-5 text-blue-600 mt-0.5" />
          <div className="ml-3">
            <span className="text-xs text-gray-500 uppercase font-medium">
              DATE
            </span>
            <p className="text-sm font-medium text-gray-700">
              {new Date(order.createdAt || Date.now()).toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                }
              )}
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <CreditCard className="h-5 w-5 text-blue-600 mt-0.5" />
          <div className="ml-3">
            <span className="text-xs text-gray-500 uppercase font-medium">
              TOTAL AMOUNT
            </span>
            <p className="text-lg font-bold text-blue-600">
              ₹{Number(order.totalAmount).toLocaleString("en-IN")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderOrderDetails = (order) => (
    <div className="px-8 py-4">
      <div className="mt-2">
        <div className="grid grid-cols-12 gap-4 items-center py-3 border-b border-gray-200">
          <div className="col-span-2 font-medium text-xs text-gray-500 uppercase">
            PRODUCT
          </div>
          <div className="col-span-3 font-medium text-xs text-gray-500 uppercase">
            NAME
          </div>
          <div className="col-span-2 font-medium text-xs text-gray-500 uppercase">
            PRICE
          </div>
          <div className="col-span-1 font-medium text-xs text-gray-500 uppercase text-center">
            QTY
          </div>
          <div className="col-span-2 font-medium text-xs text-gray-500 uppercase text-center">
            STATUS
          </div>
          <div className="col-span-2 font-medium text-xs text-gray-500 uppercase text-center">
            PAYMENT
          </div>
        </div>

        <div>
          {order.products.map((product) => {
            const productDetails = products[product.productId];
            return (
              productDetails && (
                <OrderProduct
                  key={product._id || product.productId}
                  product={productDetails}
                  qty={product.quantity}
                  status={order.paymentStatus}
                />
              )
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Recent Orders</h2>
          <span className="bg-blue-50 text-blue-700 text-sm font-medium px-4 py-1 rounded-full">
            {orders.length} Orders
          </span>
        </div>

        {orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200"
              >
                {renderOrderHeader(order)}
                {renderOrderDetails(order)}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white shadow rounded-lg p-8 text-center">
            <div className="mx-auto h-16 w-16 text-gray-400 bg-gray-100 rounded-full flex items-center justify-center">
              <svg
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              No recent orders
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              No orders have been placed recently.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentOrders;
