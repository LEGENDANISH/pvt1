import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Search, ChevronLeft, ChevronRight, HardDrive, Settings, Bell, Users, BarChart2, Shield, Zap, ChevronUp, ChevronDown } from 'lucide-react';
import { StorageSystem } from '../types';

import file from "../storage_system.json";

interface SidebarProps {
  storageSystems: StorageSystem[];
  onSelectSystem: (system: StorageSystem) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ storageSystems, onSelectSystem }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [insightsOpen, setInsightsOpen] = useState(false);
  const navigate = useNavigate(); // Initialize navigate function

  // Extract customer numbers from the JSON file
  const custNumbers: string[] = file.topLevelSystems.flatMap(system =>
    Object.values(system.components)
      .map(component => component.properties?.name?.stringValue)
      .filter(Boolean) // Remove undefined values
  );

  const getStatusColor = (status: 'healthy' | 'warning' | 'critical') => {
    switch (status) {
      case 'healthy': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className={`h-screen bg-gray-900 text-white transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'} flex flex-col`}>
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className={`flex items-center ${collapsed ? 'justify-center w-full' : ''}`}>
          <HardDrive className="h-6 w-6 text-blue-400" />
          {!collapsed && <span className="ml-2 font-semibold text-lg">Storage Admin</span>}
        </div>
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-400 hover:text-white"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Search Bar */}
      <div className={`p-4 ${collapsed ? 'hidden' : 'block'}`}>
        <div className="relative">
          <input
            type="text"
            placeholder="Search storage systems..."
            className="w-full bg-gray-800 text-white px-4 py-2 rounded-md pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>
      </div>

      {/* Storage Systems List */}
      <div className="flex-1 overflow-hidden">
        <div className={`px-4 py-2 text-xs font-semibold text-gray-400 uppercase ${collapsed ? 'text-center' : ''}`}>
          {!collapsed && 'Storage Systems'}
        </div>
        <ul className="overflow-y-auto max-h-[calc(100vh-180px)]">
          {custNumbers.map((name, index) => (
            <li key={index} className="mb-1">
              <button
                onClick={() => {
                  // Find the corresponding storage system if it exists
                  const selectedSystem = storageSystems.find(system => system.name === name);
                  if (selectedSystem) {
                    onSelectSystem(selectedSystem);
                  }
                }}
                className={`w-full flex items-center px-4 py-3 hover:bg-gray-800 rounded-md transition-colors ${collapsed ? 'justify-center' : ''}`}
              >
                <span className={`h-2.5 w-2.5 rounded-full ${getStatusColor('healthy')} mr-2`}></span>
                {!collapsed && (
                  <span className="truncate">{name}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-gray-700">
        <ul>
          <li className="mb-2">
            <button onClick={() => navigate('/')} className={`w-full flex items-center px-4 py-2 hover:bg-gray-800 rounded-md transition-colors ${collapsed ? 'justify-center' : ''}`}>
              <BarChart2 className="h-5 w-5 text-gray-400" />
              {!collapsed && <span className="ml-3">Dashboard</span>}
            </button>
          </li>
          <li className="mb-2">
            <button className={`w-full flex items-center px-4 py-2 hover:bg-gray-800 rounded-md transition-colors ${collapsed ? 'justify-center' : ''}`}>
              <Bell className="h-5 w-5 text-gray-400" />
              {!collapsed && <span className="ml-3">Alerts</span>}
            </button>
          </li>
          {/* Insights Section */}
          <li className="mb-2">
            <button
              onClick={() => setInsightsOpen(!insightsOpen)}
              className={`w-full flex items-center px-4 py-2 hover:bg-gray-800 rounded-md transition-colors ${collapsed ? 'justify-center' : ''}`}
            >
              <BarChart2 className="h-5 w-5 text-gray-400" />
              {!collapsed && <span className="ml-3">Insights</span>}
              {!collapsed && (
                <span className="ml-auto">
                  {insightsOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </span>
              )}
            </button>
            {insightsOpen && (
              <ul className="pl-8">
                {["Reclaimation", "Reduceable", "Backend", "Drives", "Encloser", "New-system"].map((item) => (
                  <li key={item} className="mb-1">
                    <button
                      onClick={() => {
                        switch (item) {
                          case "Reclaimation":
                            navigate('/reclaimation');
                            break;
                          case "Reduceable":
                            navigate('/reduceable');
                            break;
                          case "Drives":
                            navigate('/drive');
                            break;
                          case "Encloser":
                            navigate('/encloser');
                            break;
                          default:
                            navigate('/');
                        }
                      }}
                      className="w-full flex items-center px-4 py-2 hover:bg-gray-800 rounded-md transition-colors"
                    >
                      {!collapsed && <span className="truncate">{item}</span>}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
          <li className="mb-2">
            <button className={`w-full flex items-center px-4 py-2 hover:bg-gray-800 rounded-md transition-colors ${collapsed ? 'justify-center' : ''}`}>
              <Shield className="h-5 w-5 text-gray-400" />
              {!collapsed && <span className="ml-3">Security</span>}
            </button>
          </li>
          <li className="mb-2">
            <button className={`w-full flex items-center px-4 py-2 hover:bg-gray-800 rounded-md transition-colors ${collapsed ? 'justify-center' : ''}`}>
              <Users className="h-5 w-5 text-gray-400" />
              {!collapsed && <span className="ml-3">Users</span>}
            </button>
          </li>
          <li>
            <button className={`w-full flex items-center px-4 py-2 hover:bg-gray-800 rounded-md transition-colors ${collapsed ? 'justify-center' : ''}`}>
              <Settings className="h-5 w-5 text-gray-400" />
              {!collapsed && <span className="ml-3">Settings</span>}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;