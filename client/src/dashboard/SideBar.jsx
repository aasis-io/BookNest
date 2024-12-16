import React from "react";
import Logo from "./../assets/favico.svg";
import { HiOutlineBookOpen } from "react-icons/hi";
import { RiDashboardLine, RiUploadCloud2Line } from "react-icons/ri";
import { LuLogOut } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import { NavLink, Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { LuExternalLink } from "react-icons/lu";

const MySwal = withReactContent(Swal);

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Show confirmation popup first
      const { isConfirmed } = await MySwal.fire({
        title: "Are you sure?",
        text: "You will need to log in again if you proceed.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, log out",
        cancelButtonText: "Cancel",
      });

      if (isConfirmed) {
        // Show loading popup (simulate logout)
        // await MySwal.fire({
        //   title: "Logging Out...",
        //   text: "Please wait...",
        //   icon: "info",
        //   allowOutsideClick: false,
        // });

        // Perform logout logic
        localStorage.removeItem("admin");

        // Show success popup
        await MySwal.fire({
          title: "Logout Successful!",
          text: "You have been logged out successfully.",
          icon: "success",
          confirmButtonText: "Go to Homepage",
        });

        // Redirect to home
        navigate("/");
      }
    } catch (error) {
      console.error("Error during logout", error);

      await MySwal.fire({
        title: "Oops!",
        text: "Something went wrong while logging out.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col justify-between">
      {/* Top Section */}
      <div>
        {/* Logo */}
        <div className="flex items-center justify-center py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-white text-xl font-bold">
              <img src={Logo} className="w-7 h-7" alt="" />
            </div>
            <h1 className="text-xl font-semibold tracking-wide font-acme">
              BookNest
            </h1>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="mt-6 font-poppins text-sm">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-4 px-6 py-3  hover:text-cyan-500 transition ${
                isActive ? "text-teal-500" : ""
              }`
            }
          >
            <RiDashboardLine className="text-xl" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/admin/dashboard/upload"
            className={({ isActive }) =>
              `flex items-center gap-4 px-6 py-3  hover:text-cyan-500 transition ${
                isActive ? "text-teal-500" : ""
              }`
            }
          >
            <RiUploadCloud2Line className="text-xl" />
            <span>Upload Book</span>
          </NavLink>

          <NavLink
            to="/admin/dashboard/manage"
            className={({ isActive }) =>
              `flex items-center gap-4 px-6 py-3  hover:text-cyan-500 transition ${
                isActive ? "text-teal-500" : ""
              }`
            }
          >
            <HiOutlineBookOpen className="text-xl" />
            <span>Manage Books</span>
          </NavLink>

          <NavLink
            to="/admin/dashboard/users"
            className={({ isActive }) =>
              `flex items-center gap-4 px-6 py-3  hover:text-cyan-500 transition ${
                isActive ? "text-teal-500" : ""
              }`
            }
          >
            <FaRegUser className="text-xl" />
            <span>Users</span>
          </NavLink>
        </nav>
      </div>

      {/* Bottom Section */}
      <div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-4 px-6 py-3 hover:text-red-600 transition cursor-pointer"
        >
          <LuLogOut className="text-xl" />
          <span>Log Out</span>
        </button>
        <div className="px-6 py-3">
          <Link
            to={`/`}
            className="text-cyan-600 text-sm hover:text-cyan-700 transition duration-200 flex place-items-center gap-1"
          >
            Go to Site Home Page <LuExternalLink />
          </Link>
        </div>

        <footer className="text-center text-sm text-gray-400 py-4">
          &copy; {new Date().getFullYear()} BOOKNEST. All rights reserved.
        </footer>
      </div>
    </aside>
  );
};

export default Sidebar;
