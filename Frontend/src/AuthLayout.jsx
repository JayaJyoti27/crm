// layouts/AuthLayout.jsx
import { Outlet } from "react-router-dom";
import React from "react";
export default function AuthLayout() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Outlet />
    </div>
  );
}
