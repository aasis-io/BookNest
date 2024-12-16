import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import SideBar from "./SideBar";

const DashboardLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin token exists
    const storedAdmin = localStorage.getItem("admin");
    if (!storedAdmin) {
      // If no token exists, navigate to admin login
      navigate("/login/admin");
    }
  }, [navigate]);

  return (
    <div className="flex gap-4 flex-col md:flex-row min-h-screen bg-gray-50 font-poppins">
      <SideBar />
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
