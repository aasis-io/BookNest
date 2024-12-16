import React from "react";
import { BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";
import Logo from "../assets/Logo.svg";
import KhaltiIcon from "../assets/khalti.svg"; // Add this icon in your assets folder

const MyCreativeFooter = () => {
  return (
    <footer className=" text-white font-poppins relative overflow-hidden pt-12">
      {/* Decorative Top Divider */}
      <div className="relative top-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 60"
          className="w-full h-auto"
        >
          <path
            fill="#1f2937"
            fillOpacity="1"
            d="M0,30L120,36C240,42,480,50,720,40C960,30,1200,18,1320,20L1440,22V60H1320C1200,60,960,60,720,60C480,60,240,60,120,60H0Z"
          ></path>
        </svg>
      </div>

      {/* Container */}
      <div className="max-w-full mx-auto px-6 sm:px-12 lg:px-32 lg:pt-20 pb-8 relative z-10 bg-gray-800">
        {/* Upper Footer Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Logo or Brand Section */}
          <div className="flex flex-col items-start">
            <img src={Logo} className="w-56 mb-4" alt="YourBrand Logo" />
            <p className="text-gray-400 text-sm">
              Connecting readers with books they'll love.
            </p>
          </div>

          {/* About Links */}
          <div>
            <h4 className="text-lg font-semibold mb-3 text-gradient">About</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="hover:text-gradient transition duration-300"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-gradient transition duration-300"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-gradient transition duration-300"
                >
                  Press
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-gradient transition duration-300"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Help Center Links */}
          <div>
            <h4 className="text-lg font-semibold mb-3 text-gradient">
              Help Center
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="hover:text-gradient transition duration-300"
                >
                  Support
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-gradient transition duration-300"
                >
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-gradient transition duration-300"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div>
            <h4 className="text-lg font-semibold mb-3 text-gradient">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="hover:text-gradient transition duration-300"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-gradient transition duration-300"
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-gradient transition duration-300"
                >
                  Licenses
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="flex justify-center space-x-6 mb-12">
          <a
            href="#"
            className="text-gray-400 hover:text-gradient hover:scale-110 transition duration-200"
          >
            <BsFacebook className="h-6 w-6" />
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-gradient hover:scale-110 transition duration-200"
          >
            <BsInstagram className="h-6 w-6" />
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-gradient hover:scale-110 transition duration-200"
          >
            <BsTwitter className="h-6 w-6" />
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-gradient hover:scale-110 transition duration-200"
          >
            <BsGithub className="h-6 w-6" />
          </a>
        </div>

        {/* We Accept Payment Section */}
        <div className="flex items-center justify-center bg-gray-700 py-3 px-6 rounded-lg shadow-md space-x-4 mb-6">
          <span className="text-gray-300 text-sm">We Accept:</span>
          <img
            src={KhaltiIcon}
            alt="Khalti Payment"
            className="w-24 bg-gray-100 py-2 px-3 rounded hover:opacity-80 transition duration-200"
          />
        </div>

        {/* Copyright Section */}
        <div className="text-sm text-gray-400 border-t border-gray-600 pt-4 text-center">
          &copy; {new Date().getFullYear()} BookNest. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default MyCreativeFooter;
