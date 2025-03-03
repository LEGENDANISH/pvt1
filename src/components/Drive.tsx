import React, { useState } from "react";
import { CheckCircle, Search, HardDrive } from "lucide-react"; // Added HardDrive icon
import Sidebar from "./Sidebar";

// Mock Data
const drivesData = [
  { id: 0, status: "Online", raid: "array0", class: "-", capacityGB: "2,858.59", capacityGiB: "2,662.27", physicalCapacity: "2,662.27" },
  { id: 1, status: "Online", raid: "array0", class: "-", capacityGB: "2,858.59", capacityGiB: "2,662.27", physicalCapacity: "2,662.27" },
  { id: 2, status: "Online", raid: "array0", class: "-", capacityGB: "2,858.59", capacityGiB: "2,662.27", physicalCapacity: "2,662.27" },
  { id: 3, status: "Online", raid: "array0", class: "-", capacityGB: "2,858.59", capacityGiB: "2,662.27", physicalCapacity: "2,662.27" },
  { id: 4, status: "Online", raid: "array0", class: "-", capacityGB: "2,858.59", capacityGiB: "2,662.27", physicalCapacity: "2,662.27" },
  { id: 5, status: "Online", raid: "None", class: "-", capacityGB: "2,858.59", capacityGiB: "2,662.27", physicalCapacity: "2,662.27" },
];

// Mock Storage Systems Data
const storageSystems = [
  { id: 1, name: "Storage System 1", status: "healthy" },
  { id: 2, name: "Storage System 2", status: "warning" },
  { id: 3, name: "Storage System 3", status: "critical" },
];

const DrivesTable = () => {
  const [search, setSearch] = useState("");

  // Handle system selection
  const handleSelectSystem = (system) => {
    console.log("Selected System:", system);
  };

  // Filter drives based on search
  const filteredDrives = drivesData.filter((drive) =>
    drive.id.toString().includes(search)
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
              <HardDrive className="h-5 w-5 mr-2 text-blue-500" /> Drives
            </h2>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
              Export report
            </button>
          </div>

          {/* Health Status */}
          <div className="flex items-center text-green-500 mt-4">
            <CheckCircle className="h-5 w-5 mr-2" />
            <span>Health: 6 Online</span>
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
                  <th className="text-left p-3">RAID Array</th>
                  <th className="text-left p-3">Class</th>
                  <th className="text-left p-3">Capacity (GB)</th>
                  <th className="text-left p-3">Capacity (GiB)</th>
                  <th className="text-left p-3">Physical Capacity</th>
                </tr>
              </thead>
              <tbody>
                {filteredDrives.map((drive, index) => (
                  <tr key={index} className="border-b border-gray-700 hover:bg-gray-700">
                    <td className="p-3">{drive.id}</td>
                    <td className="p-3 text-green-500 flex items-center">
                      <CheckCircle className="h-4 w-4 mr-1" /> {drive.status}
                    </td>
                    <td className="p-3 text-blue-400">{drive.raid}</td>
                    <td className="p-3">{drive.class}</td>
                    <td className="p-3">{drive.capacityGB} GB</td>
                    <td className="p-3">{drive.capacityGiB} GiB</td>
                    <td className="p-3">{drive.physicalCapacity} GiB</td>
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

export default DrivesTable;