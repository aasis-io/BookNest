import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState(""); // State to hold search query
  const [books, setBooks] = useState([]); // State to hold search results
  const [isLoading, setIsLoading] = useState(false); // Loading state

  // Function to fetch books from backend
  const fetchBooks = async (query) => {
    if (!query.trim()) return; // Don't search if query is empty

    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/search?q=${query}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }
      const data = await response.json();
      console.log("Books Received:", data); // Log the response for debugging
      setBooks(data); // Update books state with the fetched data
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle input change and trigger book search
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    fetchBooks(e.target.value); // Fetch books based on the input query
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="relative mb-6">
        {/* Search Input */}
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          className="w-full py-3 pl-12 pr-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search for books..."
        />
        {/* Search Icon */}
        <span className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-500">
          <FaSearch />
        </span>
      </div>

      {/* Loading Indicator */}
      {isLoading && <div className="text-center text-blue-500">Loading...</div>}

      {/* Displaying Search Results */}
      {books.length > 0 ? (
        <ul className="space-y-4">
          {books.map((book) => (
            <li
              key={book._id}
              className="p-4 border border-gray-200 rounded-lg shadow-md flex items-center space-x-4"
            >
              {/* Book Cover Image */}
              <Link
                to={`http://localhost:5173/book/${book._id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}${
                    book.coverImage
                  }`} // Book cover image URL
                  alt={book.title}
                  className="w-20 h-30 object-cover rounded-md"
                />
              </Link>

              {/* Book Info */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {book.bookTitle}
                </h3>
                <p className="text-gray-600">{book.authorName}</p>
                <p className="text-lg font-medium text-gray-800">
                  Rs. {book.bookPrice}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        !isLoading && (
          <p className="text-center text-gray-500">No books found.</p>
        )
      )}
    </div>
  );
};

export default Search;
