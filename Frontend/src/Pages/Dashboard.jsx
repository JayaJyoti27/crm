import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [stats, setStats] = useState({
    customers: 0,
    orders: 0,
    campaigns: 0,
    conversionRate: 0,
  });
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const fetchStats = async () => {
    try {
      const [customerRes, orderRes, campaignRes, segmentRes] =
        await Promise.all([
          axios.get("http://localhost:4000/customers/count", config),
          axios.get("http://localhost:4000/orders/count", config),
          axios.get("http://localhost:4000/campaign/count", config),
          axios.get("http://localhost:4000/segment/conversion-rate", config),
        ]);

      setStats({
        customers: customerRes?.data?.count || 0,
        orders: orderRes?.data?.count || 0,
        campaigns: campaignRes?.data?.count || 0,
        conversionRate: segmentRes?.data?.rate || 0,
      });
    } catch (error) {
      console.error("Failed to fetch dashboard stats", error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="p-6 space-y-8 w-full">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-green-700">Welcome! 👋</h1>
        <p className="text-gray-600 mt-1">
          Here's what's happening with your business today
        </p>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          <StatCard
            title="Total Customers"
            value={stats.customers}
            color="blue"
          />
          <StatCard title="Orders" value={stats.orders} color="green" />
          <StatCard title="Campaigns" value={stats.campaigns} color="purple" />
          <StatCard
            title="Conversion Rate"
            value={`${stats.conversionRate}`}
            color="yellow"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <p className="text-gray-500 mb-6">
          Get things done faster with these shortcuts
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <ActionButton text="Upload Data" color="blue" to="/upload" />
          <ActionButton text="Create Segment" color="green" to="/segments" />
          <ActionButton text="Campaigns" color="purple" to="/campaigns" />
          <ActionButton text="AI Features" color="indigo" to="/ai" />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <p className="text-gray-500 mb-4">
          Stay up to date with your latest customer interactions
        </p>
        <div className="space-y-3">
          <div className="bg-blue-50 text-blue-800 px-4 py-3 rounded-lg shadow-sm flex items-center gap-2">
            <span className="h-2 w-2 bg-blue-500 rounded-full"></span>
            <span>
              New customer registered: <strong>Sarah Johnson</strong>
            </span>
            <span className="ml-auto text-xs text-gray-500">2 minutes ago</span>
          </div>
          <div className="bg-green-50 text-green-800 px-4 py-3 rounded-lg shadow-sm flex items-center gap-2">
            <span className="h-2 w-2 bg-green-500 rounded-full"></span>
            <span>
              Campaign <strong>"Summer Sale"</strong> launched successfully
            </span>
            <span className="ml-auto text-xs text-gray-500">1 hour ago</span>
          </div>
          <div className="bg-rose-50 text-rose-800 px-4 py-3 rounded-lg shadow-sm flex items-center gap-2">
            <span className="h-2 w-2 bg-rose-500 rounded-full"></span>
            <span>
              <strong>AI insights</strong> report generated
            </span>
            <span className="ml-auto text-xs text-gray-500">3 hours ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, color }) => {
  const bgColor = {
    blue: "bg-blue-100 text-blue-700",
    green: "bg-green-100 text-green-700",
    purple: "bg-purple-100 text-purple-700",
    yellow: "bg-yellow-100 text-yellow-700",
  };

  return (
    <div className={`rounded-xl p-4 shadow ${bgColor[color]} space-y-1`}>
      <h3 className="text-sm font-medium">{title}</h3>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
};

const ActionButton = ({ text, color, to }) => {
  const navigate = useNavigate();

  const colorMap = {
    blue: "bg-blue-600 hover:bg-blue-700",
    green: "bg-green-600 hover:bg-green-700",
    purple: "bg-purple-600 hover:bg-purple-700",
    orange: "bg-orange-500 hover:bg-orange-600",
    indigo: "bg-indigo-600 hover:bg-indigo-700",
  };

  const handleClick = () => {
    if (to) {
      navigate(to);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`text-white px-4 py-2 rounded-xl w-full font-medium shadow ${colorMap[color]} transition`}
    >
      {text}
    </button>
  );
};

export default Dashboard;
