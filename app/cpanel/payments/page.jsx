"use client";
import { useContext, useEffect, useState } from "react";
import { BiBlanket } from "react-icons/bi";
import {
  FaRegCreditCard,
  FaWallet,
  FaHistory,
  FaExchangeAlt,
  FaRegCheckCircle,
  FaRegTimesCircle,
  FaRegClock,
  FaChevronRight,
  FaFilter,
  FaSearch,
  FaCalendarAlt,
} from "react-icons/fa";
import { MdOutlineAccountBalance } from "react-icons/md";
import { CpanelContext } from "../context/cpanelContext";

const PaymentHistory = () => {
  const { payments, isLoading, totalPayments } = useContext(CpanelContext);
  const [activeFilter, setActiveFilter] = useState("all");

  // Helper function to get status icon and color
  const getStatusDetails = (status) => {
    const statusMap = {
      successful: {
        icon: <FaRegCheckCircle className="mr-1" />,
        color: "bg-green-100 text-green-700 border-green-200",
        gradient: "from-green-400 to-green-500",
      },
      completed: {
        icon: <FaRegCheckCircle className="mr-1" />,
        color: "bg-green-100 text-green-700 border-green-200",
        gradient: "from-green-400 to-green-500",
      },
      pending: {
        icon: <FaRegClock className="mr-1" />,
        color: "bg-yellow-100 text-yellow-700 border-yellow-200",
        gradient: "from-yellow-400 to-yellow-500",
      },
      failed: {
        icon: <FaRegTimesCircle className="mr-1" />,
        color: "bg-red-100 text-red-700 border-red-200",
        gradient: "from-red-400 to-red-500",
      },
    };

    return (
      statusMap[status.toLowerCase()] || {
        icon: <FaHistory className="mr-1" />,
        color: "bg-gray-100 text-gray-700 border-gray-200",
        gradient: "from-gray-400 to-gray-500",
      }
    );
  };

  // Helper function to get payment method icon
  const getMethodIcon = (method) => {
    const methodMap = {
      card: <FaRegCreditCard className="text-white" />,
      "credit card": <FaRegCreditCard className="text-white" />,
      upi: <FaExchangeAlt className="text-white" />,
      netbanking: <BiBlanket className="text-white" />,
      wallet: <FaWallet className="text-white" />,
      bank: <MdOutlineAccountBalance className="text-white" />,
    };

    return (
      methodMap[method.toLowerCase()] || (
        <FaExchangeAlt className="text-white" />
      )
    );
  };

  // Get background color for method icon
  const getMethodBgColor = (method) => {
    const colorMap = {
      card: "from-blue-500 to-blue-600",
      "credit card": "from-blue-500 to-blue-600",
      upi: "from-purple-500 to-purple-600",
      netbanking: "from-green-500 to-green-600",
      wallet: "from-orange-500 to-orange-600",
      bank: "from-teal-500 to-teal-600",
    };

    return colorMap[method.toLowerCase()] || "from-gray-500 to-gray-600";
  };

  // Format amount with commas
  const formatAmount = (amount) => {
    return `₹${(amount / 100).toLocaleString("en-IN")}`;
  };

  const formatTotalAmount = (amount) => {
    return `₹${(amount / 100).toLocaleString("en-IN")}`;
  };

  // Filter options
  const filterOptions = [
    { id: "all", label: "All" },
    { id: "completed", label: "Completed" },
    { id: "pending", label: "Pending" },
    { id: "failed", label: "Failed" },
  ];

  const filteredPayments =
    activeFilter === "all"
      ? payments
      : payments.filter(
          (payment) => payment.status.toLowerCase() === activeFilter
        );

  return (
    <div className="w-full mx-auto bg-white shadow-xl overflow-hidden">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h2 className="text-2xl font-bold flex items-center">
              <FaHistory className="mr-2" /> Payment History
            </h2>
            <p className="text-blue-100 mt-1">
              Track all your transactions in one place
            </p>
          </div>
          <div className="mt-4 md:mt-0 py-2 px-4 bg-white bg-opacity-20 backdrop-blur-md rounded-lg text-white">
            <div className="text-xs uppercase tracking-wide">
              Total Successful
            </div>
            <div className="text-xl font-bold">
              {formatTotalAmount(totalPayments)}
            </div>
          </div>
        </div>

        {/* 
        Filter Bar */}
        <div className="mt-6 flex flex-col md:flex-row gap-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {filterOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setActiveFilter(option.id)}
                className={`px-3 py-1 rounded-full text-sm whitespace-nowrap transition-all ${
                  activeFilter === option.id
                    ? "bg-white text-blue-700 font-medium"
                    : "bg-blue-600 bg-opacity-30 text-blue-100 hover:bg-opacity-40"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 md:p-6">
        {isLoading ? (
          <div className="animate-pulse space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-100 h-20 rounded-xl"></div>
            ))}
          </div>
        ) : filteredPayments.length > 0 ? (
          <div className="space-y-4">
            {filteredPayments.map((payment) => {
              const { icon, color, gradient } = getStatusDetails(
                payment.status
              );
              const methodBgColor = getMethodBgColor(payment.method);
              const paymentDate = new Date(payment.date || Date.now());

              return (
                <div
                  key={payment.id}
                  className="flex items-center bg-white border border-gray-100 rounded-xl p-4 hover:shadow-lg transition-all duration-200 hover:bg-blue-50"
                >
                  <div
                    className={`h-14 w-14 rounded-xl bg-gradient-to-br ${methodBgColor} flex items-center justify-center text-xl mr-4 shadow-md`}
                  >
                    {getMethodIcon(payment.method)}
                  </div>

                  <div className="flex-grow">
                    <h3 className="font-semibold text-gray-800 text-lg">
                      {payment.email}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <span className="font-medium">{payment.method}</span>
                      <span className="mx-2 text-gray-300">•</span>
                      <span className="flex items-center">
                        <FaCalendarAlt className="mr-1 text-gray-400" />
                        {paymentDate.toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end">
                    <div className="font-bold text-gray-800 text-xl">
                      {formatAmount(payment.amount)}
                    </div>
                    <div
                      className={`flex items-center px-3 py-1 rounded-full text-xs font-medium mt-1 ${color}`}
                    >
                      {icon} {payment.status}
                    </div>
                  </div>

                  <div className="ml-4 w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center hover:bg-gray-100 cursor-pointer transition-colors">
                    <FaChevronRight className="text-gray-400" />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-xl">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaHistory className="text-gray-300 text-4xl" />
            </div>
            <p className="text-gray-500 font-medium text-lg">
              No payment history found
            </p>
            <p className="text-gray-400 mt-2">
              Transactions will appear here when you make payments
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;
