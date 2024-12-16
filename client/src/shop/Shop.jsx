import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";

const Shop = () => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/all-books`)
      .then((res) => res.json())
      .then((data) => setBooks(data));
  });
  return (
    <div className="mt-12 container mx-auto lg:px-24">
      <h2 className="text-5xl font-bold font-acme text-gray-text text-center">
        All Books are here
      </h2>

      <div className="grid gap-8 my-12 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1">
        {books.map((book) => (
          <Link to={`/book/${book._id}`} className="">
            <div className="relative bookLink">
              <img
                src={`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}${
                  book.coverImage
                }`}
                alt=""
              />
              <div className="absolute top-3 right-3 bg-blue-600 hover:bg-black p-2 rounded">
                <FaCartShopping className="w-4 h-4 text-white" />
              </div>
            </div>
            <div>
              <h3 className="font-acme text-lg text-gray-text text-center mt-3">
                {book.bookTitle}
              </h3>
              <p className="text-center font-acme text-lg text-orange-500 mt-1">
                Rs. {book.bookPrice}
              </p>
            </div>
            <div className="mt-2">
              <Link
                to={`/book/${book._id}`}
                className="font-acme text-center block py-2 border-2 border-gray-text text-gray-text rounded-md hover:text-white hover:bg-gray-text duration-300"
              >
                Add to Cart
              </Link>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Shop;
