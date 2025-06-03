import { FaRegPaperPlane, FaUserCircle } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [stats, setStats] = useState({ total: 0, sent: 0, failed: 0 });

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const res = await axios.get("http://localhost:4000/campaign/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }); // Adjust base URL if needed

      const data = res.data;
      setCampaigns(data.campaigns || []);

      const total = data.campaigns?.length || 0;
      let sent = 0;
      let failed = 0;
      data.campaigns?.forEach((c) => {
        sent += c.stats?.sent || 0;
        failed += c.stats?.failed || 0;
      });

      setStats({ total, sent, failed });
    } catch (err) {
      console.error("Error fetching campaigns:", err.message);
    }
  };

  const getSuccessRate = () => {
    const total = stats.sent + stats.failed;
    return total === 0 ? "0%" : `${Math.round((stats.sent / total) * 100)}%`;
  };

  return (
    <div className="ml-[250px] p-8 bg-[#f9fbff] min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-purple-700">Campaign History</h1>
        <button className="bg-white border px-4 py-2 rounded-lg shadow">
          Back to Dashboard
        </button>
      </div>

      <p className="text-gray-500 mb-8">
        Track and manage all your marketing campaigns
      </p>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-sm text-gray-500">Total Campaigns</p>
          <h2 className="text-2xl font-semibold text-blue-600 mt-2">
            {stats.total}
          </h2>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-sm text-gray-500">Messages Sent</p>
          <h2 className="text-2xl font-semibold text-green-600 mt-2">
            {stats.sent}
          </h2>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-sm text-gray-500">Failed Sends</p>
          <h2 className="text-2xl font-semibold text-red-500 mt-2">
            {stats.failed}
          </h2>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-sm text-gray-500">Success Rate</p>
          <h2 className="text-2xl font-semibold text-purple-600 mt-2">
            {getSuccessRate()}
          </h2>
        </div>
      </div>

      {/* Campaign Table */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-semibold mb-4">All Campaigns</h3>
        <p className="text-gray-500 mb-6">
          Complete history of your marketing campaigns and their performance
        </p>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-600 border-b">
                <th className="py-2 pr-4">Campaign Name</th>
                <th className="py-2 pr-4">Date Created</th>
                <th className="py-2 pr-4">Segment</th>

                <th className="py-2 pr-4">Sent / Failed</th>
                <th className="py-2 pr-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c, i) => (
                <tr key={i} className="border-b last:border-none">
                  <td className="py-4 pr-4 font-medium">{c.name}</td>
                  <td className="py-4 pr-4">
                    {new Date(c.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 pr-4 flex items-center gap-2">
                    <FaUserCircle className="text-gray-500" />
                    {c.segmentId?.name || "N/A"}
                  </td>
                  <td className="py-4 pr-4 flex items-center gap-2">
                    <FaRegPaperPlane className="text-gray-500" />
                    {c.message}
                  </td>
                  <td className="py-4 pr-4">
                    <span className="text-green-600">
                      ✔ {c.stats?.sent || 0}
                    </span>
                    <span className="text-red-500 ml-2">
                      ✘ {c.stats?.failed || 0}
                    </span>
                  </td>
                  <td className="py-4 pr-4">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                      Completed
                    </span>
                  </td>
                </tr>
              ))}
              {campaigns.length === 0 && (
                <tr>
                  <td colSpan="7" className="py-4 text-center text-gray-400">
                    No campaigns found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Campaigns;
