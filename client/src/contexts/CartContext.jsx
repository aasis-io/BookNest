import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch cart items
  const fetchCartItems = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;

      if (!token) {
        setCart([]);
        setLoading(false);
        return;
      }

      const response = await axios.get("http://localhost:3000/api/cart/list", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCart(response.data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setError("Failed to load cart items.");
      setCart([]);
    } finally {
      setLoading(false);
    }
  };

  // Add to cart
  const addToCart = async (bookId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;
    if (!token) return;

    try {
      await axios.post(
        "http://localhost:3000/api/cart/add",
        { bookId, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      fetchCartItems();

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Added to Cart",
        text: "The book has been successfully added to your shopping cart.",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: "swal-popupBounce",
        },
      });
    } catch (error) {
      console.error("Error adding item to cart:", error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Oops...",
        text: "Something went wrong while adding the book to your cart.",
        showConfirmButton: true,
        confirmButtonText: "Retry",
      });
    }
  };

  // Remove from cart
  const removeFromCart = async (cartItemId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;

    if (!token) {
      setError("You need to be logged in to remove items from the cart.");
      return;
    }

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(
          `http://localhost:3000/api/cart/remove/${cartItemId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        fetchCartItems();
        Swal.fire(
          "Removed!",
          "Your item has been removed from the cart.",
          "success"
        );
      } catch (error) {
        console.error("Error removing item from cart:", error);
        setError("Failed to remove item from the cart.");
      }
    }
  };

  // Update quantity of an item in the cart
  const updateCartItem = async (cartItemId, newQuantity) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;

    if (!token) {
      setError("You need to be logged in to update the cart.");
      return;
    }

    try {
      await axios.put(
        `http://localhost:3000/api/cart/update/${cartItemId}`,
        { quantity: newQuantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Fetch the updated cart items (you may want to replace this with your cart context method)
      fetchCartItems();

      // Simple toast notification
      Swal.fire({
        icon: "success",
        title: "Updated",
        text: "Cart updated successfully!",
        showConfirmButton: false,
        timer: 1500, // Show for 1.5 seconds
      });
    } catch (error) {
      console.error("Error updating cart item:", error);

      // Simple error toast notification
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update cart",
        showConfirmButton: false,
        timer: 1500, // Show for 1.5 seconds
      });
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        error,
        addToCart,
        removeFromCart,
        updateCartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
