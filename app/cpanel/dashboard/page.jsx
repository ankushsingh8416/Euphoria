"use client";
import Card from "@/app/Components/Card";
import Graph from "@/app/Components/Graph";
import RoundChart from "@/app/Components/RoundChart";
import { useContext } from "react";
import { CpanelContext } from "../context/cpanelContext";
import { useOrders } from "../context/orderContext";
import RecentOrders from "@/app/Components/RecentOrders ";

const Dashboard = () => {
  const { totalPayments } = useContext(CpanelContext);
  const { orders, products } = useOrders();

  const formatTotalAmount = (amount) => {
    return `₹${(amount / 100).toLocaleString("en-IN")}`;
  };

  const icons = {
    revenue: "/images/icon1.png",
    sales: "/images/icon2.png",
    sku: "/images/icon3.png",
    balance: "/images/icon4.png",
  };

  const previousData = {
    totalPayments: 1800000,
    totalSales: 120,
    totalOrders: 90,
  };

  // Current Data
  const balanceValue = totalPayments;
  const totalSales = (Object.keys(products).length);
  const totalOrders = orders.length;

  // Percentage change calculations
  const calculatePercentageChange = (current, previous) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return ((current - previous) / previous) * 100;
  };

  const balancePercentage = calculatePercentageChange(balanceValue, previousData.totalPayments);
  const salesPercentage = calculatePercentageChange(totalSales, previousData.totalSales);
  const ordersPercentage = calculatePercentageChange(totalOrders, previousData.totalOrders);

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <Card
          title="Total Revenue"
          value={formatTotalAmount(balanceValue)}
          icon={icons.revenue}
          percentage={`${balancePercentage.toFixed(2)}%`}
        />
        <Card
          title="Total Sales"
          value={totalSales}
          icon={icons.sales}
          percentage={`${salesPercentage.toFixed(2)}%`}
        />
        <Card
          title="Total Orders"
          value={totalOrders}
          icon={icons.sku}
          percentage={`${ordersPercentage.toFixed(2)}%`}
        />
        <Card
          title="Balance"
          value={formatTotalAmount(balanceValue)}
          icon={icons.balance}
          percentage={`${balancePercentage.toFixed(2)}%`}
        />
      </div>

      {/* -------------------- DASHBOARD ------------- */}
      <div className="w-full flex md:flex-row flex-col-reverse gap-4">
        <div className="w-full">
          <Graph />
        </div>
        <div className="w-full md:w-[50%]">
          <RoundChart />
        </div>
      </div>

      <div className="my-8 w-full">
        <RecentOrders />
      </div>
    </div>
  );
};

export default Dashboard;
