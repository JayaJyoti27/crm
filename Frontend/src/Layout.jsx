// Layout.jsx
import Navbar from "../Components/Navbar";
import { Outlet } from "react-router-dom";
import React from "react";
export default function Layout() {
  return (
    <div className="flex">
      <Navbar />
      <div className="ml-64 w-full p-6 bg-gray-50 min-h-screen">
        <Outlet />
      </div>
    </div>
  );
}
