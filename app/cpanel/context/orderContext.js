"use client";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

// Create Context
const OrderContext = createContext();

// Order Provider Component
export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]); // Store all cart orders
  const [userOrders, setUserOrders] = useState({}); // Store user-specific order details
  const [products, setProducts] = useState({}); // Store product details
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Fetch all cart data
        const response = await axios.get("/api/cart");
        setOrders(response.data);
        console.log("Cart Data:", response.data);

        const userOrdersData = {}; // Object to store user-specific orders
        const productData = {}; // Object to store product details

        await Promise.all(
          response.data.map(async (order) => {
            if (order.user) {
              try {
                const userResponse = await axios.get(`/api/users/${order.user}`);
                userOrdersData[order.user] = userResponse.data;
              } catch (userError) {
                console.error(`Error fetching user ${order.user}:`, userError);
              }
            }

            // Fetch product details
            if (Array.isArray(order.products) && order.products.length > 0) {
              await Promise.all(
                order.products.map(async (item) => {
                  if (item.productId && !productData[item.productId]) {
                    try {
                      const productResponse = await axios.get(
                        `/api/products/${item.productId}`
                      );
                      productData[item.productId] = productResponse.data;
                    } catch (productError) {
                      console.error(
                        `Error fetching product ${item.productId}:`,
                        productError
                      );
                    }
                  }
                })
              );
            }
          })
        );

        setUserOrders(userOrdersData);
        setProducts(productData);
        console.log("User Orders:", userOrdersData);
        console.log("Product Data:", productData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <OrderContext.Provider value={{ orders, userOrders, products, loading }}>
      {children}
    </OrderContext.Provider>
  );
};

// Custom Hook for using OrderContext
export const useOrders = () => useContext(OrderContext);
