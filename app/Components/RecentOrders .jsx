"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiMoreVertical } from "react-icons/fi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaEdit, FaExchangeAlt, FaTrashAlt, FaEye } from "react-icons/fa";

// Shimmer component for loading placeholders
const Shimmer = ({ type }) => {
  switch (type) {
    case "id":
      return <div className="h-4 w-16 bg-gray-300 rounded-md"></div>;
    case "image":
      return <div className="h-16 w-16 bg-gray-300 rounded-md"></div>;
    case "title":
      return <div className="h-4 w-32 bg-gray-300 rounded-md"></div>;
    case "date":
      return <div className="h-4 w-24 bg-gray-300 rounded-md"></div>;
    case "customer":
      return <div className="h-4 w-24 bg-gray-300 rounded-md"></div>;
    case "email":
      return <div className="h-4 w-32 bg-gray-300 rounded-md"></div>;
    case "total":
      return <div className="h-4 w-16 bg-gray-300 rounded-md"></div>;
    case "status":
      return <div className="h-4 w-20 bg-gray-300 rounded-md"></div>;
    case "action":
      return <div className="h-4 w-12 bg-gray-300 rounded-md"></div>;
    default:
      return <div className="h-4 w-16 bg-gray-300 rounded-md"></div>;
  }
};

const RecentOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/api/cart");
        const products = response.data;
        console.log(products);
        const mappedOrders = products.map((product, index) => ({
          id: index + 1 || "N/A",
          product: product?.products[0]?.product?.title || "No Title",
          image:
            product?.products[0]?.product?.images[0].defaultImage ||
            "https://via.placeholder.com/50",
          date: new Date(product.createdAt).toLocaleString() || "N/A",
          customer: product?.user?.name || "N/A",
          email: product?.user?.email || "N/A",
          total: `₹${product?.products[0]?.product?.price || "0.00"}`,
          status: product?.products[0]?.product?.readyToShip
            ? "Shipped"
            : "Processing",
        }));

        setOrders(mappedOrders);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Order Management Dashboard
        </h1>
        <p className="text-gray-600 mt-2">
          Overview of recent orders and statuses.
        </p>
      </header>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3">
                Order ID
              </th>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Customer
              </th>
              <th scope="col" className="px-6 py-3">
                Total
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index} className="bg-white border-b">
                    <td className="px-6 py-4">
                      <Shimmer type="id" />
                    </td>
                    <td className="px-6 py-4">
                      <Shimmer type="image" />
                    </td>
                    <td className="px-6 py-4">
                      <Shimmer type="title" />
                    </td>
                    <td className="px-6 py-4">
                      <Shimmer type="date" />
                    </td>
                    <td className="px-6 py-4">
                      <Shimmer type="customer" />
                    </td>
                    <td className="px-6 py-4">
                      <Shimmer type="total" />
                    </td>
                    <td className="px-6 py-4">
                      <Shimmer type="status" />
                    </td>
                    <td className="px-6 py-4">
                      <Shimmer type="action" />
                    </td>
                  </tr>
                ))
              : orders.map((order) => (
                  <tr key={order.product.id} className="bg-white border-b">
                    <td className="px-6 py-4">{order.id}</td>
                    <td className="px-6 py-4">
                      <img
                        src={order?.image ?? "https://via.placeholder.com/100"}
                        alt={order?.product ?? "No Product"}
                        className="w-24 rounded-md shadow-lg"
                      />
                    </td>
                    <td className="px-6 py-4">{order.product}</td>
                    <td className="px-6 py-4">{order.date}</td>
                    <td className="px-6 py-4 capitalize">
                      {order.customer}
                      <br />
                      <span className="text-xs text-gray-400">
                        {order.email}
                      </span>
                    </td>
                    <td className="px-6 py-4">{order.total}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 inline-flex whitespace-nowrap text-xs leading-5 font-semibold rounded-full ${
                          order.status === "Processing"
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
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
                            <FaTrashAlt className="mr-2 text-red-500" /> Cancel
                            Order
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;
