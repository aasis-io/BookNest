import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Link } from "react-router-dom";
import { handleDeleteBook } from "../api/auth";

const MySwal = withReactContent(Swal);

const ManageBooks = () => {
  const [allBooks, setAllBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/all-books")
      .then((res) => res.json())
      .then((data) => setAllBooks(data));
  }, []);

  const deleteBookHandler = async (bookId) => {
    const result = await MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2c7be5",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await handleDeleteBook(bookId);
        setAllBooks((prevBooks) =>
          prevBooks.filter((book) => book._id !== bookId)
        );

        MySwal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Book deleted successfully",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      } catch (error) {
        MySwal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    }
  };

  return (
    <div className="px-8 py-12 w-full max-w-[75%] font-sans">
      {/* Title */}
      <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center font-acme">
        Manage Your Books
      </h1>

      {/* Table Wrapper */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100 text-gray-600 text-sm">
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Book Title</th>
              <th className="py-3 px-4 text-left">Author</th>
              <th className="py-3 px-4 text-left">Category</th>
              <th className="py-3 px-4 text-left">Price(Rs)</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allBooks.length > 0 ? (
              allBooks.map((book, index) => (
                <tr className="transition-all text-sm duration-200 hover:bg-gray-100 even:bg-gray-50">
                  <td className="py-3 px-4 text-gray-700">{index + 1}</td>
                  <td className="py-3 px-4 text-gray-700">{book.bookTitle}</td>
                  <td className="py-3 px-4 text-gray-700">{book.authorName}</td>
                  <td className="py-3 px-4 text-gray-700">{book.category}</td>
                  <td className="py-3 px-4 text-gray-700">{book.bookPrice}</td>
                  <td className="py-3 px-4 text-center space-x-4">
                    {/* Edit Button - Underline with blue */}
                    <Link
                      to={`/admin/dashboard/edit-books/${book._id}`}
                      className="text-cyan-600 hover:text-cyan-700 underline transition duration-200"
                    >
                      Edit
                    </Link>
                    {/* Delete Button - Underline with red */}
                    <button
                      onClick={() => deleteBookHandler(book._id)}
                      className="text-red-600 hover:text-red-800 underline transition duration-200"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="py-4 px-4 text-center text-gray-600 font-medium"
                >
                  No books available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBooks;
