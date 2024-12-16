import axios from "axios";

const API_URL = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;
// Admin Login - Store token securely in localStorage
export const loginAdmin = async (loginData) => {
  try {
    const response = await axios.post(`${API_URL}/login/admin`, loginData);
    console.log("Response data from server: ", response?.data);
    return response;
  } catch (error) {
    console.error("Error logging in Admin: ", error);
    throw error;
  }
};

// Admin Registration
export const registerAdmin = async (adminData) => {
  try {
    const response = await axios.post(`${API_URL}/register/admin`, adminData);
    return response.data;
  } catch (error) {
    console.error("Admin Registration Error:", error);
    throw error;
  }
};

// Handle user registration
export const registerUser = async (userData) => {
  return axios.post(`${API_URL}/register`, userData);
};

// Handle user login
export const loginUser = async (userData) => {
  return axios.post(`${API_URL}/login`, userData);
};

// Fetch all available books
export const getAllBooks = async () => {
  return axios.get(`${API_URL}/all-books`);
};

// Upload book data
export const uploadBook = async (bookData) => {
  const token = JSON.parse(localStorage.getItem("admin"))?.token;

  if (!token) {
    console.error("No token found. Please login as admin.");
    throw new Error("No token found. Please login as admin.");
  }

  console.log("Uploading book with token:", token);
  console.log("Book data being sent:", bookData);

  try {
    const response = await axios.post(`${API_URL}/upload-book`, bookData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Upload successful: ", response.data);
    return response;
  } catch (error) {
    console.error(
      "Error during book upload:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Update book data
export const handleUpdateBook = async (bookId, updatedBookData) => {
  const token = JSON.parse(localStorage.getItem("admin"))?.token;

  try {
    const response = await axios.patch(
      `${API_URL}/book/${bookId}`,
      updatedBookData, // Pass updatedBookData directly here
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error updating book: ", error);
    throw error;
  }
};

// Handle book deletion
export const handleDeleteBook = async (bookId) => {
  try {
    const token = JSON.parse(localStorage.getItem("admin"))?.token;

    if (!token) {
      throw new Error("Authorization token not found. Please log in again.");
    }

    const response = await axios.delete(`${API_URL}/book/${bookId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.error("Failed to delete the book:", error.message);
    throw error;
  }
};

// Add book to cart
export const addBookToCart = async (bookId, token) => {
  return axios.post(
    `${API_URL}/api/cart`,
    { bookId, quantity: 1 },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
