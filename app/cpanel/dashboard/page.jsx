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

  // Calculate balance value and percentage change
  const balanceValue = totalPayments + 2000000;
  const balancePercentage =
    totalPayments !== 0
      ? ((balanceValue - totalPayments) / totalPayments) * 100
      : 0;

  // Calculate total sales and percentage change
  const previousSales = 100;
  const totalSales = (Object.keys(products).length + 1) * 15;
  const salesPercentage =
    previousSales !== 0
      ? ((totalSales - previousSales) / previousSales) * 100
      : 0;

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
          value={orders.length}
          icon={icons.sku}
          percentage="0%"
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
