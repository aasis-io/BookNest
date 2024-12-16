import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


//react icons
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import { HiShoppingCart } from "react-icons/hi";
import { useCart } from "../contexts/CartContext"; // Import useCart to access the cart data
import { FaRegCircleUser } from "react-icons/fa6";

import { BiSearchAlt } from "react-icons/bi";

// import { AuthContext } from "../contexts/AuthProvider";
import Logo from "../assets/logo.png";

const Navbar = () => {
  const { cart } = useCart(); // Access the cart from CartContext

  // Get the total number of items in the cart
  const totalItemsInCart = cart.reduce((acc, item) => acc + item.quantity, 0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch the user data from localStorage
    const userData = JSON.parse(localStorage.getItem("user"));

    if (userData && userData.name) {
      setUser(userData); // Set user data if exists
    }
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  // const { user } = useContext(AuthContext);
  // console.log(user);
  // //toggle Menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  useEffect(() => {
    const handleScroll = () => {
      if (window.screenY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.addEventListener("scroll", handleScroll);
    };
  }, []);

  //navItems
  const navItems = [
    { link: "Home", path: "/" },
    { link: "Shop", path: "/shop" },
    { link: "About", path: "/about" },
    { link: "Blog", path: "/blog" },
  ];
  return (
    <header
      className="w-full top-0 left-0 right-0 flex mb-1 justify-center transition-allease-in duration-300 shadow-sm"
    >
      <nav
        className={`py-4 px-4 container ${
          isSticky ? "sticky top-0 left-0 right-0" : ""
        }`}
      >
        <div className="flex justify-between items-center text-base gap-8">
          {/* Logo */}
          <div>
            <Link to="/">
              <img className="inline-block logo h-14" src={Logo} />
            </Link>
          </div>

          {/*nav for large devices*/}
          <ul className="md:flex space-x-12 hidden">
            {navItems.map(({ link, path }) => (
              <Link
                key={path}
                to={path}
                className="block text-lg font-acme text-gray-text cursor-pointer hover:text-cyan-500 duration-300"
              >
                {link}
              </Link>
            ))}
          </ul>
          {/*button for lg devices*/}
          <div className="space-x-4 hidden lg:flex place-items-center">
            <Link
              to="/search"
              className="flex justify-center place-items-center hover:text-cyan-500 duration-300 gap-1"
            >
              <BiSearchAlt className="w-6 h-6" />
            </Link>
            <Link
              to={user ? `/profile` : `/auth/login`}
              className="flex justify-center place-items-center hover:text-cyan-500 duration-300 gap-1"
            >
              <FaRegCircleUser className="w-5 h-5" />
              {/* {user ? `Hello, ${user.name.split(" ")[0]}!` : "Login"} */}
              {user ? `Profile` : "Login"}
            </Link>

            {user ? (
              <Link
                to={"/cart"}
                className="flex justify-center place-items-center text-white hover:bg-cyan-600 duration-300 gap-1 mt-0.5 py-2 px-4 bg-cyan-500 rounded-lg cursor-pointer relative"
              >
                Cart <HiShoppingCart className="w-6 h-6" />
                <div className="absolute -top-2 -right-2 bg-red-500 w-6 h-6 rounded-full flex justify-center place-items-center">
                  <span>{totalItemsInCart > 0 ? totalItemsInCart : 0}</span>
                </div>
              </Link>
            ) : (
              ""
            )}
          </div>

          {/*menu button for mobile devices*/}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-black focus:ouline-none"
            >
              {isMenuOpen ? (
                <FaXmark className="h-5 w-5 text-black" />
              ) : (
                <FaBarsStaggered className="h-5 w-5 text-black" />
              )}
              Menu
            </button>
          </div>
        </div>
        {/*nav items for mobile devices*/}
        <div
          className={`space-y-4 px-4 mt-16 py-7 bg-gray-100 ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          {navItems.map(({ link, path }) => (
            <Link
              key={path}
              to={path}
              className="block text-lg font-acme text-gray-800 cursor-pointer"
            >
              {link}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
