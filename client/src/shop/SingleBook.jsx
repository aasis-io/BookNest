import React from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { BiSolidStar } from "react-icons/bi";
import { useCart } from "../contexts/CartContext";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2

const SingleBook = () => {
  const { addToCart } = useCart();
  const { book } = useLoaderData();

  // Fetch user from localStorage to check login status
  const user = JSON.parse(localStorage.getItem("user"));

  // Handle the case where the book data is not loaded yet
  if (!book) {
    return <div>Loading...</div>; // Or display an error message or empty state
  }

  const handleAddToCart = () => {
    if (!user) {
      // Fire a SweetAlert if the user is not logged in
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "You need to login first to add items to your cart.",
        showConfirmButton: true,
        confirmButtonText: "Login Now",
        showCancelButton: true,
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          // Redirect to login page on confirm
          window.location.href = "/auth/login";
        }
      });
    } else {
      // Only call addToCart, which handles its own Swal
      addToCart(book._id);
    }
  };

  const { _id, bookTitle, imageURL, bookPrice, authorName, bookDescription } =
    book;

  return (
    <div className="">
      <div className="container mx-auto">
        <div className="py-24 px-20 flex gap-16">
          <div className="singleBookWrapper">
            <figure className="mb-4">
              <img
                src={`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}${
                  book.coverImage
                }`}
                alt={bookTitle}
                className="rounded-r-2xl rounded-l-sm singleBook w-full"
              />
            </figure>
            <figcaption>
              <div className="bookPrice mb-3">
                <span className="font-acme text-cyan-500 px-4">
                  Rs. {bookPrice}
                </span>
              </div>
              <div>
                <button
                  onClick={handleAddToCart}
                  className="font-acme flex w-full text-center py-2.5 border-2 border-gray-text rounded-md text-white bg-gray-text duration-300 justify-center place-items-center gap-1"
                >
                  <MdOutlineShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
              </div>
            </figcaption>
          </div>
          <div>
            <h2 className="font-acme text-3xl text-gray-text mb-3">
              {bookTitle}
            </h2>
            <p className="text-xl text-gray-400">{authorName}</p>
            <div className="flex place-items-center w-44 mt-1 gap-2 relative">
              <div className="flex gap-1">
                <BiSolidStar className="w-6 h-6 text-orange-600" />
                <BiSolidStar className="w-6 h-6 text-orange-600" />
                <BiSolidStar className="w-6 h-6 text-orange-600" />
                <BiSolidStar className="w-6 h-6 text-orange-600" />
                <BiSolidStar className="w-6 h-6 text-orange-600" />
              </div>
              <span className="font-acme text-gray-700 text-2xl mt-1">5</span>
              <span className="absolute -right-16 text-gray-500 top-0">
                16 Ratings
              </span>
            </div>
            <div className="text-gray-800 text-base mt-4">
              <p className="mb-4 font-semibold italic">{bookDescription}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBook;
