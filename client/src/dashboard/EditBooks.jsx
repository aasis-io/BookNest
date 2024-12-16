import React, { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useLoaderData, useParams, useNavigate } from "react-router-dom";
import { handleUpdateBook } from "../api/auth"; // Import the shared handleUpdateBook function

const EditBooks = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Use navigate for redirection
  const {
    bookTitle,
    authorName,
    coverImage,
    category,
    bookDescription,
    bookPrice,
  } = useLoaderData();

  const bookCategories = [
    "Fiction",
    "Non-Fiction",
    "Mystery",
    "Programming",
    "Science Fiction",
    "Fantasy",
    "History",
    "Horror",
    "Biography",
    "Autobiography",
    "Self-help",
    "Memoir",
    "Business",
    "Children's Books",
    "Travel",
    "Religion",
    "Art and Design",
    "Romance",
  ];

  const [selectedBookCategory, setSelectedBookCategory] = useState(category);
  const [newImage, setNewImage] = useState(null);

  const handleChangeSelectedValue = (event) => {
    setSelectedBookCategory(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setNewImage(file);
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    const form = event.target;

    const updatedBookData = {
      bookTitle: form.bookTitle.value,
      authorName: form.authorName.value,
      category: form.categoryName.value,
      bookDescription: form.bookDescription.value,
      bookPrice: parseFloat(form.bookPrice.value),
    };

    const formData = new FormData();
    Object.keys(updatedBookData).forEach((key) => {
      formData.append(key, updatedBookData[key]);
    });

    if (newImage) {
      formData.append("coverImage", newImage);
    }

    try {
      const response = await handleUpdateBook(id, formData);

      if (response?.status === 200 || response?.status === 204) {
        const MySwal = withReactContent(Swal);
        MySwal.fire({
          icon: "success",
          title: "Book updated successfully!",
          text: "Click OK to go to Manage Books",
          confirmButtonText: "OK",
          timer: 1500, // Sets the auto-close timer
          timerProgressBar: true, // Shows a progress bar for the timer
        }).then((result) => {
          if (
            result.isConfirmed ||
            result.dismiss === Swal.DismissReason.timer
          ) {
            window.history.back(); // Go back in both cases: user clicks OK or timer runs out
          }
        });
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: error.message,
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen py-12 px-6 w-full max-w-[70%]">
      <div className="bg-white shadow-2xl rounded-xl p-12 lg:p-16">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-6 text-center font-acme">
          Edit Your Book
        </h2>
        <form
          onSubmit={handleUpdate}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          encType="multipart/form-data"
        >
          {/* Book Title */}
          <div>
            <label
              htmlFor="bookTitle"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Book Title
            </label>
            <input
              id="bookTitle"
              name="bookTitle"
              type="text"
              defaultValue={bookTitle}
              placeholder="Enter the book title"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-300"
              required
            />
          </div>

          {/* Author Name */}
          <div>
            <label
              htmlFor="authorName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Author Name
            </label>
            <input
              id="authorName"
              name="authorName"
              type="text"
              defaultValue={authorName}
              placeholder="Enter author's name"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-300"
              required
            />
          </div>

          {/* Book Image */}
          <div>
            <label
              htmlFor="imageUpload"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Book Cover Image
            </label>
            <div className="mb-2">
              {/* Display Current Image */}
              {coverImage && (
                <img
                  src={`http://localhost:3000${coverImage}`}
                  alt={bookTitle}
                  className="w-32 object-cover mb-2 border border-gray-300 rounded-md"
                />
              )}
            </div>
            <input
              id="imageUpload"
              name="imageUpload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring focus:ring-blue-300"
            />
            <p className="text-sm text-gray-500 mt-2">
              Upload a new image to replace the current one if needed.
            </p>
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="categoryName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Book Category
            </label>
            <select
              id="categoryName"
              name="categoryName"
              value={selectedBookCategory}
              onChange={handleChangeSelectedValue}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-300"
              required
            >
              {bookCategories.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Book Description */}
          <div className="lg:col-span-2">
            <label
              htmlFor="bookDescription"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Book Description
            </label>
            <textarea
              id="bookDescription"
              name="bookDescription"
              rows="4"
              defaultValue={bookDescription}
              placeholder="Enter book description"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-300"
              required
            ></textarea>
          </div>

          {/* Book Price */}
          <div>
            <label
              htmlFor="bookPrice"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Book Price
            </label>
            <input
              id="bookPrice"
              name="bookPrice"
              type="number"
              defaultValue={bookPrice}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-300"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="lg:col-span-2 text-right">
            <button
              type="submit"
              className="w-full lg:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:from-blue-700 hover:to-indigo-700 focus:ring focus:ring-blue-300"
            >
              Update Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBooks;
