"use client";
import Card from "@/app/Components/Card";
import Graph from "@/app/Components/Graph";
import RecentOrders from "@/app/Components/RecentOrders ";
import RoundChart from "@/app/Components/RoundChart";
import { useContext } from "react";
import { CpanelContext } from "../context/cpanelContext";

const Dashboard = () => {
  const { totalPayments } = useContext(CpanelContext);
  const formatTotalAmount = (amount) => {
    return `₹${(amount / 100).toLocaleString("en-IN")}`;
  };
  const icons = {
    revenue: "/images/icon1.png",
    sales: "/images/icon2.png",
    sku: "/images/icon3.png",
    balance: "/images/icon4.png",
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <Card
          title="Total Revenue"
          value={formatTotalAmount(totalPayments)}
          icon={icons.revenue}
          percentage="+10%"
        />
        <Card
          title="Total Sales"
          value="31,500"
          icon={icons.sales}
          percentage="+15%"
        />
        <Card
          title="Product SKU"
          value="247"
          icon={icons.sku}
          percentage="0%"
        />
        <Card
          title="Balance"
          value="$24,500"
          icon={icons.balance}
          percentage="-25%"
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

      <div className=" w-full">
        <RecentOrders />
      </div>
    </div>
  );
};

export default Dashboard;
