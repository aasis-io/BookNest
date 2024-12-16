import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

import { FaCartShopping } from "react-icons/fa6";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "./styles.css";
import { motion } from "motion/react";
import { fadeIn } from "../variants";

// import required modules
import { Navigation } from "swiper/modules";

const BookCards = ({ headline, subHeading, books }) => {
  return (
    <motion.div
      variants={fadeIn("up", 0.2)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.4 }}
      className="my-16 px-4 container mx-auto"
    >
      <div className="best__sellers overflow-hidden">
        <h2 className="text-3xl font-normal font-acme text-gray-text my-2">
          {headline}
        </h2>
        <p>{subHeading}</p>

        {/* cards */}
        <div className="mt-12 ">
          <Swiper
            slidesPerView="auto"
            spaceBetween={10}
            loop={true}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
              clickable: true,
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              reverseDirection: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 35,
              },
            }}
            modules={[Navigation]}
            className="mySwiper w-full h-full"
          >
            {books.map((book) => (
              <SwiperSlide key={book._id}>
                <Link to={`/book/${book._id}`} className="">
                  <div className="relative bookLink">
                    <img
                      src={`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}${
                        book.coverImage
                      }`}
                      alt=""
                    />
                    <div className="absolute top-3 right-3 bg-blue-600 hover:bg-black p-2 rounded">
                      <FaCartShopping className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-acme text-lg text-gray-text text-center mt-3">
                      {book.bookTitle}
                    </h3>
                    <p className="text-center font-acme text-lg text-orange-500 mt-1">
                      Rs. {book.bookPrice}
                    </p>
                  </div>
                  <div className="mt-2">
                    <Link
                      to={`/book/${book._id}`}
                      className="font-acme text-center block py-2 border-2 border-gray-text text-gray-text rounded-md hover:text-white hover:bg-gray-text duration-300"
                    >
                      Add to Cart
                    </Link>
                  </div>
                </Link>
              </SwiperSlide>
            ))}

            <div className="slider-controler">
              <div className="swiper-button-next slider-arrow">
                <ion-icon name="arrow-forward-outline"></ion-icon>
              </div>
              <div className="swiper-button-prev slider-arrow">
                <ion-icon name="arrow-back-outline"></ion-icon>
              </div>
            </div>
          </Swiper>
        </div>
      </div>
    </motion.div>
  );
};

export default BookCards;
