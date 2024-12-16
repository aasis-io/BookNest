import React from "react";
import { useCart } from "../contexts/CartContext"; // Assuming CartContext.js is properly set up
import Swal from "sweetalert2"; // Import SweetAlert for confirmation
import CartIcon from "./../assets/emptycart.png";

const Cart = () => {
  const { cart, loading, addToCart, removeFromCart, updateCartItem } =
    useCart(); // Ensure `updateCartItem` is available

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (cart.length === 0) {
    return (
      <div className="text-center my-16">
        <img
          src={CartIcon}
          alt="Empty Cart"
          className="mx-auto w-48 h-48 object-contain mb-4 animate-bounce"
        />
        <h2 className="text-xl font-semibold text-gray-700">
          Your cart is currently empty.
        </h2>
        <p className="text-gray-500 mt-2">
          Add some books to your cart to get started!
        </p>
        <button
          onClick={() => (window.location.href = "/shop")}
          className="mt-4 px-6 py-3 bg-gray-700 text-white rounded-md hover:bg-gray-800 focus:outline-none"
        >
          Go to Shop
        </button>
      </div>
    );
  }

  let totalPrice = 0;

  return (
    <div className="max-w-7xl mx-auto py-20 px-4">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      <div className="space-y-4">
        {cart.map((item) => {
          const { _id, bookDetails, quantity } = item;
          const { title, coverImage, bookPrice } = bookDetails;

          const itemTotal = bookPrice * quantity;
          totalPrice += itemTotal;

          return (
            <div
              key={_id}
              className="flex justify-between items-center border-b py-4 px-6 bg-white rounded-lg shadow-md"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={`${
                    import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
                  }${coverImage}`}
                  alt={title}
                  className="w-24 h-32 object-cover rounded-md"
                />
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {title}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Price: Rs. {bookPrice}
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <button
                      onClick={() => {
                        if (quantity === 1) {
                          // Confirm before removing the item
                          Swal.fire({
                            title: "Remove item?",
                            text: "Are you sure you want to remove this item from your cart?",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonText: "Yes, remove it",
                            cancelButtonText: "No, keep it",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              removeFromCart(_id);
                            }
                          });
                        } else {
                          updateCartItem(_id, quantity - 1);
                        }
                      }}
                      className="px-3 py-1 bg-gray-300 rounded-md hover:bg-gray-400 text-gray-800"
                    >
                      -
                    </button>
                    <span className="text-gray-800">{quantity}</span>
                    <button
                      onClick={() => updateCartItem(_id, quantity + 1)}
                      className="px-3 py-1 bg-gray-300 rounded-md hover:bg-gray-400 text-gray-800"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-lg text-gray-800">
                  Total: Rs. {itemTotal.toFixed(2)}
                </p>
                <button
                  onClick={() => removeFromCart(_id)}
                  className="mt-2 text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">
          Total: Rs. {totalPrice.toFixed(2)}
        </h2>
        <button
          onClick={() =>
            Swal.fire(
              "Proceeding to Checkout",
              "Redirecting to payment...",
              "info"
            )
          }
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
