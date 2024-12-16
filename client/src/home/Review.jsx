import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
//react icons
import { FaStar } from "react-icons/fa6";

//Flowbite
import { Avatar } from "flowbite-react";
import proPic from "../assets/profile.jpg";
import { motion } from "motion/react";
import { fadeIn } from "../variants";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import './styles.css';

// import required modules
import { Pagination } from "swiper/modules";
const Review = () => {
  return (
    <motion.div
      variants={fadeIn("up", 0.2)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.4 }}
      className="my-12 px-4 lg:px-24"
    >
      <h2 className="text-5xl font-bold text-center mb-10 font-acme text-gray-text leading-snug">
        Our Customers
      </h2>
      <div>
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
          }}
          // modules={[Pagination]}
          className="mySwiper reviewSwiper"
        >
          <SwiperSlide className="shadow-sm bg-white py-8 px-4 md:m-5 rounded-lg border">
            <div className="space-y-6 ">
              <div className="text-amber-500 flex gap-1">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>

              {/*Text*/}
              <div className="mt-7">
                <p className="mb-5">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Perferendis totam, porro numquam voluptatum fugiat autem
                  distinctio minima ab quaerat facilis harum assumenda fugit
                  sequi ducimus, qui aliquid, ratione eum nesciunt.
                </p>
                <Avatar
                  img={proPic}
                  alt="avatar of Jese"
                  rounded
                  className="w-10 mb-4"
                />
                <h5 className="text-lg font-medium">Mark Ping</h5>
                <p className="text-base">CEO of ABC Company</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="shadow-sm bg-white py-8 px-4 md:m-5 rounded-lg border">
            <div className="space-y-6 ">
              <div className="text-amber-500 flex gap-1">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>

              {/*Text*/}
              <div className="mt-7">
                <p className="mb-5">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Perferendis totam, porro numquam voluptatum fugiat autem
                  distinctio minima ab quaerat facilis harum assumenda fugit
                  sequi ducimus, qui aliquid, ratione eum nesciunt.
                </p>
                <Avatar
                  img={proPic}
                  alt="avatar of Jese"
                  rounded
                  className="w-10 mb-4"
                />
                <h5 className="text-lg font-medium">Mark Ping</h5>
                <p className="text-base">CEO of ABC Company</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="shadow-sm bg-white py-8 px-4 md:m-5 rounded-lg border">
            <div className="space-y-6 ">
              <div className="text-amber-500 flex gap-1">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>

              {/*Text*/}
              <div className="mt-7">
                <p className="mb-5">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Perferendis totam, porro numquam voluptatum fugiat autem
                  distinctio minima ab quaerat facilis harum assumenda fugit
                  sequi ducimus, qui aliquid, ratione eum nesciunt.
                </p>
                <Avatar
                  img={proPic}
                  alt="avatar of Jese"
                  rounded
                  className="w-10 mb-4"
                />
                <h5 className="text-lg font-medium">Mark Ping</h5>
                <p className="text-base">CEO of ABC Company</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="shadow-sm bg-white py-8 px-4 md:m-5 rounded-lg border">
            <div className="space-y-6 ">
              <div className="text-amber-500 flex gap-1">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>

              {/*Text*/}
              <div className="mt-7">
                <p className="mb-5">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Perferendis totam, porro numquam voluptatum fugiat autem
                  distinctio minima ab quaerat facilis harum assumenda fugit
                  sequi ducimus, qui aliquid, ratione eum nesciunt.
                </p>
                <Avatar
                  img={proPic}
                  alt="avatar of Jese"
                  rounded
                  className="w-10 mb-4"
                />
                <h5 className="text-lg font-medium">Mark Ping</h5>
                <p className="text-base">CEO of ABC Company</p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </motion.div>
  );
};

export default Review;
