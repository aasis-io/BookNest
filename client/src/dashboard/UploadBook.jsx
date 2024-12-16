import React, { useState } from "react";
import { uploadBook } from "./../api/auth";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const UploadBook = () => {
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

  const [selectedBookCategory, setSelectedBookCategory] = useState(
    bookCategories[0]
  );
  const [selectedImage, setSelectedImage] = useState(null);

  const handleChangeSelectedValue = (event) => {
    setSelectedBookCategory(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleBookSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;

    const bookTitle = form.bookTitle.value;
    const authorName = form.authorName.value;
    const category = form.categoryName.value;
    const bookDescription = form.bookDescription.value;
    const bookPrice = parseFloat(form.bookPrice.value);

    // Validation for negative book price
    if (bookPrice < 0) {
      withReactContent(Swal).fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: "Book price cannot be negative.",
        showConfirmButton: false,
        timer: 3000,
      });
      return;
    }

    if (!selectedImage) {
      withReactContent(Swal).fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: "Please select an image to upload.",
        showConfirmButton: false,
        timer: 3000,
      });
      return;
    }

    const formData = new FormData();
    formData.append("coverImage", selectedImage); // Changed to match server-side expected field name
    formData.append("bookTitle", bookTitle);
    formData.append("authorName", authorName);
    formData.append("category", category);
    formData.append("bookDescription", bookDescription);
    formData.append("bookPrice", bookPrice);

    try {
      const response = await uploadBook(formData);
      if (response.status === 201) {
        // Adjusted server response status check
        withReactContent(Swal).fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Book uploaded successfully!",
          showConfirmButton: false,
          timer: 3000,
        });
        form.reset();
        setSelectedImage(null);
      }
    } catch (error) {
      console.error("Error during upload:", error);
      withReactContent(Swal).fire({
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
          Upload Your Book
        </h2>
        <form
          onSubmit={handleBookSubmit}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          enctype="multipart/form-data"
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
              placeholder="Enter the book title"
              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring focus:ring-blue-300"
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
              placeholder="Enter the author's name"
              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring focus:ring-blue-300"
              required
            />
          </div>

          {/* Upload Image */}
          <div>
            <label
              htmlFor="imageUpload"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Upload Book Image
            </label>
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring focus:ring-blue-300"
              required
            />
          </div>

          {/* Book Category */}
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
              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring focus:ring-blue-300"
              required
            >
              {bookCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Book Description (Spans Full Row) */}
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
              placeholder="Enter the book description"
              className="w-full border border-gray-300 h-32 rounded-lg p-3 text-sm focus:ring focus:ring-blue-300"
              required
            />
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
              className="w-full border border-gray-300 rounded-lg text-sm p-3 focus:ring focus:ring-blue-300"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="lg:col-span-2 text-right">
            <button
              type="submit"
              className="w-full lg:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:from-blue-700 hover:to-indigo-700 focus:ring focus:ring-blue-300"
            >
              Upload Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadBook;
