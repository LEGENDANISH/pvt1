import React, { useState } from "react";
import { CheckCircle, Search, Server } from "lucide-react"; // Replaced HardDrive with Server icon
import Sidebar from "./Sidebar";

// Mock Data for Enclosures
const enclosuresData = [
  { id: 0, status: "Online", type: "Type A", slots: 24, capacityGB: "28,585.90", capacityGiB: "26,622.70", physicalCapacity: "26,622.70" },
  { id: 1, status: "Online", type: "Type B", slots: 12, capacityGB: "14,292.95", capacityGiB: "13,311.35", physicalCapacity: "13,311.35" },
  { id: 2, status: "Offline", type: "Type C", slots: 48, capacityGB: "57,171.80", capacityGiB: "53,245.40", physicalCapacity: "53,245.40" },
  { id: 3, status: "Online", type: "Type A", slots: 24, capacityGB: "28,585.90", capacityGiB: "26,622.70", physicalCapacity: "26,622.70" },
  { id: 4, status: "Online", type: "Type B", slots: 12, capacityGB: "14,292.95", capacityGiB: "13,311.35", physicalCapacity: "13,311.35" },
  { id: 5, status: "Critical", type: "Type D", slots: 60, capacityGB: "71,464.75", capacityGiB: "66,556.75", physicalCapacity: "66,556.75" },
];

// Mock Storage Systems Data
const storageSystems = [
  { id: 1, name: "Storage System 1", status: "healthy" },
  { id: 2, name: "Storage System 2", status: "warning" },
  { id: 3, name: "Storage System 3", status: "critical" },
];

const EnclosuresTable = () => {
  const [search, setSearch] = useState("");

  // Handle system selection
  const handleSelectSystem = (system) => {
    console.log("Selected System:", system);
  };

  // Filter enclosures based on search
  const filteredEnclosures = enclosuresData.filter((enclosure) =>
    enclosure.id.toString().includes(search)
  );

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      {/* Sidebar */}
      <Sidebar
        storageSystems={storageSystems}
        onSelectSystem={handleSelectSystem}
      />

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="bg-gray-800 shadow-md rounded-lg p-6">
          {/* Header */}
          <div className="flex justify-between items-center border-b border-gray-700 pb-4">
            <h2 className="text-xl font-semibold flex items-center">
              <Server className="h-5 w-5 mr-2 text-blue-500" /> Enclosures
            </h2>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
              Export report
            </button>
          </div>

          {/* Health Status */}
          <div className="flex items-center text-green-500 mt-4">
            <CheckCircle className="h-5 w-5 mr-2" />
            <span>Health: 5 Online, 1 Critical</span>
          </div>

          {/* Search */}
          <div className="relative mt-4">
            <Search className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-gray-700 rounded-md bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Table */}
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full bg-gray-800 border border-gray-700">
              <thead>
                <tr className="bg-gray-700 border-b border-gray-600">
                  <th className="text-left p-3">Name</th>
                  <th className="text-left p-3">Status</th>
                  <th className="text-left p-3">Type</th>
                  <th className="text-left p-3">Slots</th>
                  <th className="text-left p-3">Capacity (GB)</th>
                  <th className="text-left p-3">Capacity (GiB)</th>
                  <th className="text-left p-3">Physical Capacity</th>
                </tr>
              </thead>
              <tbody>
                {filteredEnclosures.map((enclosure, index) => (
                  <tr key={index} className="border-b border-gray-700 hover:bg-gray-700">
                    <td className="p-3">{enclosure.id}</td>
                    <td className="p-3 flex items-center">
                      {enclosure.status === "Online" && (
                        <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                      )}
                      {enclosure.status === "Critical" && (
                        <CheckCircle className="h-4 w-4 mr-1 text-red-500" />
                      )}
                      {enclosure.status}
                    </td>
                    <td className="p-3 text-blue-400">{enclosure.type}</td>
                    <td className="p-3">{enclosure.slots}</td>
                    <td className="p-3">{enclosure.capacityGB} GB</td>
                    <td className="p-3">{enclosure.capacityGiB} GiB</td>
                    <td className="p-3">{enclosure.physicalCapacity} GiB</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4 text-gray-400">
            <span>Items per page: 50</span>
            <span>1-6 of 6 items</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnclosuresTable;