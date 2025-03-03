import React, { useState } from "react";
import Sidebar from "./Sidebar";
import {
  Search,
  AlertTriangle,
  RefreshCw,
  BarChart2,
  Filter,
} from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, BarChart as RechartsBarChart, Bar, XAxis, YAxis } from "recharts";

// Mock Data
const data = [
  { name: "Reclaimable", value: 168.51, color: "#3b82f6" },
  { name: "Used", value: 50, color: "#22c55e" },
];

const tableData = Array(10).fill({
  name: "GDPS-UTI...",
  tier: "None observed",
  pool: "CKD_0",
  storageSystem: "2107.75LDK71",
  capacity: "0.00 GiB",
  thinProvisioned: "No",
  usedCapacity: "0.00 GiB",
  unusedCapacity: "0.00 GiB",
  virtualVolumeId: "0.00",
  hosts: "-",
});

// Mock Storage Systems Data
const storageSystems = [
  { id: 1, name: "Storage System 1", status: "healthy" },
  { id: 2, name: "Storage System 2", status: "warning" },
  { id: 3, name: "Storage System 3", status: "critical" },
];

const Dashboard = () => {
  const [search, setSearch] = useState("");
  const [selectedSystem, setSelectedSystem] = useState(null);

  // Handle system selection
  const handleSelectSystem = (system) => {
    setSelectedSystem(system);
    console.log("Selected System:", system);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      {/* Sidebar */}
      <Sidebar
        storageSystems={storageSystems}
        onSelectSystem={handleSelectSystem}
      />

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center bg-gray-800 p-4 shadow-md rounded-lg mb-6">
          <h1 className="text-xl font-bold">Reduceable</h1>
          <div className="flex space-x-4 items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="px-4 py-2 border rounded-md pl-10 bg-gray-700 text-white placeholder-gray-400"
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

        {/* Charts */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          {/* Reduceable Capacity Chart */}
          <div className="bg-gray-800 p-6 shadow-md rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Reducable Capacity</h2>
            <PieChart width={200} height={200}>
              <Pie data={data} dataKey="value" outerRadius={80}>
                {data.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
            <p className="text-center mt-4 font-bold text-xl">168.51 TiB</p>
          </div>

          {/* Graphs Chart */}
          <div className="col-span-2 bg-gray-800 p-6 shadow-md rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Graphs</h2>
            <RechartsBarChart width={900} height={150} data={[{ name: "Not Tiered", value: 100 }]}>
              <XAxis dataKey="name" stroke="white" />
              <YAxis stroke="white" />
              <Tooltip />
              <Bar dataKey="value" fill="#22c55e" />
            </RechartsBarChart>
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-yellow-900 text-yellow-200 p-4 rounded-lg mb-6 flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2" />
          Storage system's maintenance expired.{" "}
          <a href="#" className="ml-2 underline">
            Maintenance Info
          </a>
        </div>

        {/* Table */}
        <div className="bg-gray-800 p-6 shadow-md rounded-lg">
          <div className="flex justify-between mb-4">
            <div className="text-lg font-semibold">Recommendations</div>
            <div className="flex space-x-2">
              <button className="p-2 bg-gray-700 rounded-md flex items-center">
                <Filter className="h-4 w-4 text-white" />
              </button>
            </div>
          </div>
          <table className="w-full border-collapse text-white">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="text-left p-2">Name</th>
                <th className="text-left p-2">Tier</th>
                <th className="text-left p-2">Pool</th>
                <th className="text-left p-2">Storage System</th>
                <th className="text-left p-2">Capacity</th>
                <th className="text-left p-2">Thin Provisioned</th>
                <th className="text-left p-2">Used Capacity</th>
                <th className="text-left p-2">Unused Capacity</th>
                <th className="text-left p-2">Virtual Volume ID</th>
                <th className="text-left p-2">Hosts</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index} className="border-b border-gray-700 hover:bg-gray-700">
                  <td className="p-2">{row.name}</td>
                  <td className="p-2">{row.tier}</td>
                  <td className="p-2">{row.pool}</td>
                  <td className="p-2">{row.storageSystem}</td>
                  <td className="p-2">{row.capacity}</td>
                  <td className="p-2">{row.thinProvisioned}</td>
                  <td className="p-2">{row.usedCapacity}</td>
                  <td className="p-2">{row.unusedCapacity}</td>
                  <td className="p-2">{row.virtualVolumeId}</td>
                  <td className="p-2">{row.hosts}</td>
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