"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiMoreVertical } from "react-icons/fi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const RecentOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/api/products/');
        const products = response.data;

        // Map the API data to the desired structure
        const mappedOrders = products.map((product) => ({
          id: 1 || 'N/A',
          product: product.title || 'No Title',
          image: (product.images && product.images[0].defaultImage) || 'https://via.placeholder.com/50',
          date: new Date(product.createdAt).toLocaleString() || 'N/A',
          customer: 'N/A',
          email: 'N/A',
          total: `$${product.price || '0.00'}`,
          payment: 'N/A',
          status: product.readyToShip ? 'Ready to Ship' : 'Processing',
        }));

        setOrders(mappedOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      {/* Header Section */}
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Order Management Dashboard</h1>
        <p className="text-gray-600 mt-2">Overview of recent orders and statuses.</p>
      </header>

      {/* Recent Orders Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3">Order ID</th>
              <th scope="col" className="px-6 py-3">Image</th>
              <th scope="col" className="px-6 py-3">Product</th>
              <th scope="col" className="px-6 py-3">Date</th>
              <th scope="col" className="px-6 py-3">Customer</th>
              <th scope="col" className="px-6 py-3">Total</th>
              <th scope="col" className="px-6 py-3">Payment</th>
              <th scope="col" className="px-6 py-3">Status</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="bg-white border-b">
                <td className="px-6 py-4">{order.id}</td>
                <td className="px-6 py-4">
                  <img src={order.image} alt={order.product} className="w-24 rounded-md shadow-lg" />
                </td>
                <td className="px-6 py-4">{order.product}</td>
                <td className="px-6 py-4">{order.date}</td>
                <td className="px-6 py-4">
                  {order.customer}<br />
                  <span className="text-xs text-gray-400">{order.email}</span>
                </td>
                <td className="px-6 py-4">{order.total}</td>
                <td className="px-6 py-4">{order.payment}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'Ready to Ship' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                    }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                    <DropdownMenu>
                    <DropdownMenuTrigger><FiMoreVertical className="text-black" size={20} /></DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                      <DropdownMenuItem>Billing</DropdownMenuItem>
                      <DropdownMenuItem>Team</DropdownMenuItem>
                      <DropdownMenuItem>Subscription</DropdownMenuItem>
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
