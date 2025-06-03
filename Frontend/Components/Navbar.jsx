import React from "react";
import { NavLink } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { PiUploadSimple } from "react-icons/pi";
import { SiCampaignmonitor } from "react-icons/si";
import { FaArrowsDownToPeople } from "react-icons/fa6";
import { RiGeminiLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";

const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: <MdOutlineDashboard /> },
  { name: "Upload Data", path: "/upload", icon: <PiUploadSimple /> },
  { name: "Segments", path: "/segments", icon: <FaArrowsDownToPeople /> },
  { name: "Campaigns", path: "/campaigns", icon: <SiCampaignmonitor /> },
  { name: "AI Assistant", path: "/ai", icon: <RiGeminiLine /> },
];

const Navbar = () => {
  return (
    <div className="w-64 h-screen bg-white shadow-lg fixed top-0 left-0 flex flex-col justify-between">
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#3b3b3b]">Campaign Hub</h1>
          <h2 className="text-sm text-blue-600 font-medium">
            Marketing Platform
          </h2>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-sm text-gray-500 font-semibold mb-3">
            Navigation
          </h3>
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-2 py-1.5 rounded-md transition-colors ${
                    isActive
                      ? "text-blue-600 font-semibold bg-blue-50"
                      : "text-gray-700 hover:text-blue-500"
                  }`
                }
              >
                <span className="text-xl">{item.icon}</span>
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* Logout */}
      <div className="px-6 pb-6">
        <NavLink
          to="/profile"
          className="flex m-4 items-center gap-5 text-gray-700 hover:text-red-500 transition-colors"
        >
          <CgProfile className="text-xl" />
          Profile
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
