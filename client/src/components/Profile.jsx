import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Fetch user details from localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userDetails = JSON.parse(localStorage.getItem("user"));

    console.log("Token:", token); // Log the token value
    console.log("User Details:", userDetails); // Log the user data

    if (!token && !userDetails) {
      console.log("Token or user details are missing. Redirecting to login.");
      navigate("/auth/login"); // Redirect to login if no token or user found
    } else {
      setUser(userDetails); // Set user details if valid token is found
    }
  }, [navigate]);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to log out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, log me out",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // Remove user and token from localStorage and sessionStorage
        localStorage.removeItem("user");
        sessionStorage.removeItem("user");

        // Redirect to the home page
        navigate("/");

        // Optionally, reload the page if needed
        window.location.reload();

        Swal.fire(
          "Logged Out",
          "You have been logged out successfully.",
          "success"
        );
      }
    });
  };

  // If user details are not yet loaded, show loading state
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-page container mx-auto py-8">
      <div className="bg-white shadow-md p-6 rounded-lg">
        <h1 className="text-3xl font-semibold mb-4">Profile</h1>
        <div className="mb-4">
          <strong>Name: </strong>
          <span>{user.name}</span>
        </div>
        <div className="mb-4">
          <strong>Email: </strong>
          <span>{user.email}</span>
        </div>
        <div className="mb-4">
          <strong>Role: </strong>
          <span>{user.role}</span>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
