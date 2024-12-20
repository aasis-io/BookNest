import React from "react";
import FavBookImg from "../assets/favoritebook.jpg";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { fadeIn } from "../variants";

const FavBook = () => {
  return (
    <div className="px-4 lg:px-24 my-20 flex flex-col md:flex-row justify-between items-center gap-12">
      <motion.div
        variants={fadeIn("right", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.4 }}
        className="md:w-1/2"
      >
        <img src={FavBookImg} alt="" className="rounded md:w-10/12" />
      </motion.div>
      <motion.div
        variants={fadeIn("left", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.4 }}
        className="md:w-1/2 space-y-6"
      >
        <h2 className="text-5xl font-bold my-5 md:w-3/4 text-gray-text leading-snug font-acme">
          Find Your Favorite{" "}
          <span className="text-cyan-500 block">Book Here</span>
        </h2>
        <p className="mb-10 text-lg md:w-5/6">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore
          velit odio explicabo laudantium in aspernatur facere aut deserunt
          asperiores eligendi, omnis similique tempora reprehenderit? Iste ullam
          repudiandae sapiente omnis perspiciatis!
        </p>

        {/*Stats*/}
        <div className="flex flex-col sm:flex-row justify-between gap-6 md:w-3/4 my-14">
          <div>
            <h3 className="text-3xl font-bold">800+</h3>
            <p className="text-base">Book Listing</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold">550+</h3>
            <p className="text-base">Registered Users</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold">1200+</h3>
            <p className="text-base">PDF Downloaded</p>
          </div>
        </div>
        {/*Links*/}
        <Link to="/shop" className="mt-10 block">
          <button className="bg-gray-text font-acme text-white font-semibold px-6 py-3 rounded hover:bg-black transition-all duration-300">
            Explore More
          </button>
        </Link>
      </motion.div>
    </div>
  );
};

export default FavBook;
