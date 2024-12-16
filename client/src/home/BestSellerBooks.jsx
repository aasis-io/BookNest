import React, { useEffect, useState } from "react";
import BookCards from "../components/BookCards";

const BestSellerBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/all-books")
      .then((res) => res.json())
      .then((data) => setBooks(data.slice(0, 8)));
  });
  return (
    <div className="py-4">
      <BookCards
        books={books}
        headline="Top Sellers"
        subHeading="Explore the best selling books"
      />
    </div>
  );
};

export default BestSellerBooks;
