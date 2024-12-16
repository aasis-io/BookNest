// NotFoundPage.jsx
import React from "react";
import Image from "../assets/404.png";

const NotFoundPage = () => {
  return (
    <div className="flex justify-center items-center py-20">
      <div className="text-center text-gray-800">
        <h1 className="text-6xl font-extrabold mb-4">404</h1>
        <p className="text-2xl mb-8">
          Oops! The page you're looking for does not exist.
        </p>
        <div className="mb-8">
          <img
            src={Image}
            alt="404"
            className="mx-auto w-full h-64 object-cover animate-bounce"
          />
        </div>
        <a
          href="/"
          className="text-lg font-semibold bg-gray-700 hover:bg-gray-800 hover:text-teal-500 font-acme text-white py-3 px-6 rounded-lg shadow-md transition-all"
        >
          Go back to Home
        </a>
      </div>
    </div>
  );
};

export default NotFoundPage;
