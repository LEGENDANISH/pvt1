import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Search, AlertTriangle, RefreshCw, Filter } from "lucide-react";
import volumes from "../volumes.json";

const Dashboard = () => {
  const [search, setSearch] = useState("");

  // Extract data from JSON
  const tableData = volumes.components.map((component) => ({
    name: component.properties?.name?.stringValue || "N/A",
    
    tier: component.properties?.easy_tier_status?.stringValue || "N/A",
    storageSystem: component.properties?.stor_sys?.stringValue || "N/A",
    capacity: `${(component.properties?.cap_bytes?.longValue || 0)} `,
  }));
console.log()
  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center bg-gray-800 p-4 shadow-md rounded-lg mb-6">
          <h1 className="text-xl font-bold">Reclamation</h1>
          <div className="flex space-x-4 items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="px-4 py-2 border rounded-md pl-10 bg-gray-700 text-white placeholder-gray-400 w-full sm:w-auto"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
            </div>
            <button className="p-2 bg-blue-600 text-white rounded-md flex items-center">
              <RefreshCw className="h-4 w-4 mr-1" /> Refresh
            </button>
          </div>
        </div>

        
        {/* Table */}
        <div className="bg-gray-800 p-6 shadow-md rounded-lg overflow-x-auto">
          <div className="flex justify-between mb-4">
            <div className="text-lg font-semibold">Recommendations</div>
            <div className="flex space-x-2">
              <button className="p-2 bg-gray-700 rounded-md flex items-center">
                <Filter className="h-4 w-4 text-white" />
              </button>
            </div>
          </div>
          <table className="w-full border-collapse text-white min-w-[800px]">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="text-left p-2">Name</th>
                <th className="text-left p-2">Tier</th>
                <th className="text-left p-2">Storage System</th>
                <th className="text-left p-2">Capacity</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index} className="border-b border-gray-700 hover:bg-gray-700">
                  <td className="p-2">{row.name}</td>
                  <td className="p-2">{row.tier}</td>
                  <td className="p-2">{row.storageSystem}</td>
                  <td className="p-2">{row.capacity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;