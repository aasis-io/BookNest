import React, { useEffect } from "react";
import Banner from "../components/Banner";
import BestSellerBooks from "./BestSellerBooks";
import FavBook from "./FavBook";
import PromoBanner from "./PromoBanner";
import OtherBooks from "./OtherBooks";
import Review from "./Review";
import Swal from "sweetalert2";

const Home = () => {
  useEffect(() => {
    // Check if the login success flag exists in localStorage (or sessionStorage)
    const loginToastShown = localStorage.getItem("loginToastShown");

    // Check if user data exists in localStorage (or sessionStorage)
    const user = JSON.parse(
      localStorage.getItem("user") || sessionStorage.getItem("user")
    );

    // Show the login success toast only if user is logged in and toast hasn't been shown
    if (user && !loginToastShown) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: `Welcome, ${user.name}!`,
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });

      // Set a flag in localStorage that the login toast has been shown
      localStorage.setItem("loginToastShown", "true");
    }
  }, []);
  return (
    <div>
      <Banner />
      <BestSellerBooks />
      <FavBook />
      <PromoBanner />
      <OtherBooks />
      <Review />
    </div>
  );
};

export default Home;
