import React from "react";
import { FaUsers, FaChartLine, FaBook, FaCog } from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="p-6 min-h-screen max-w-[80%]">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-700">Admin Dashboard</h1>
        <p className="text-sm text-gray-500">
          Welcome back, Admin! Here is your dashboard overview.
        </p>
      </div>

      {/* Stats Cards */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Users</p>
            <h2 className="text-2xl font-bold text-gray-700">1,245</h2>
          </div>
          <FaUsers className="text-4xl text-blue-500" />
        </div>

        <div className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Books Sold</p>
            <h2 className="text-2xl font-bold text-gray-700">3,467</h2>
          </div>
          <FaBook className="text-4xl text-green-500" />
        </div>

        <div className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Revenue</p>
            <h2 className="text-2xl font-bold text-gray-700">$45,789</h2>
          </div>
          <FaChartLine className="text-4xl text-yellow-500" />
        </div>

        <div className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Settings</p>
            <h2 className="text-2xl font-bold text-gray-700">4 Pending</h2>
          </div>
          <FaCog className="text-4xl text-red-500" />
        </div>
      </div> */}

      {/* Main Content */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-2 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-bold text-gray-700 mb-4">
            Recent Activities
          </h2>
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th className="px-4 py-2">Activity</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-2">User John Doe registered</td>
                <td className="px-4 py-2">Dec 6, 2024</td>
                <td className="px-4 py-2 text-green-600">Completed</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2">Book "React Mastery" sold</td>
                <td className="px-4 py-2">Dec 5, 2024</td>
                <td className="px-4 py-2 text-green-600">Completed</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2">Settings updated</td>
                <td className="px-4 py-2">Dec 4, 2024</td>
                <td className="px-4 py-2 text-yellow-600">Pending</td>
              </tr>
            </tbody>
          </table>
        </div>

        
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-bold text-gray-700 mb-4">
            Quick Actions
          </h2>
          <button className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 mb-4">
            Add New Book
          </button>
          <button className="w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 mb-4">
            View Users
          </button>
          <button className="w-full bg-yellow-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-yellow-600 mb-4">
            Generate Report
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default Dashboard;
