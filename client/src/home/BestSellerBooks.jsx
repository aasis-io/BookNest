import React, { useEffect, useState } from "react";
import BookCards from "../components/BookCards";

const BestSellerBooks = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/all-books`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }
        const data = await response.json();
        setBooks(data.slice(0, 8));
      } catch (err) {
        setError(err.message);
      }
    };

    fetchBooks();
  }, []); // Dependency array ensures this runs only once after component mounts

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="py-4">
      {books.length > 0 ? (
        <BookCards
          books={books}
          headline="Top Sellers"
          subHeading="Explore the best selling books"
        />
      ) : (
        <p>Loading...</p> // Show loading text while books are being fetched
      )}
    </div>
  );
};

export default BestSellerBooks;
