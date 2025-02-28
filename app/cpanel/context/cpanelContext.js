"use client";
import { createContext, useState, useEffect } from "react";
import { OrderProvider } from "./orderContext";

export const CpanelContext = createContext();

export const CpanelProvider = ({ children }) => {
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPayments, setTotalPayments] = useState(0); // Store total amount

  useEffect(() => {
    const fetchPayments = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/payments");
        const data = await res.json();
        setPayments(data.payments);

        // Calculate total sum of all payments
        const total = data.payments.reduce(
          (sum, payment) => sum + payment.amount,
          0
        );
        setTotalPayments(total);
      } catch (error) {
        console.error("Error fetching payments:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPayments();
  }, []);

  return (
    <CpanelContext.Provider value={{ payments, totalPayments, isLoading }}>
      <OrderProvider>{children}</OrderProvider>
    </CpanelContext.Provider>
  );
};
