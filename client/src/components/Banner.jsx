import React from "react";
import BannerCard from "../home/BannerCard";
import { Link } from "react-router-dom";

import { motion } from "motion/react";
import { fadeIn } from "../variants";

const Banner = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="px-4 container flex flex-col items-center xl:flex-row">
        <motion.div
          variants={fadeIn("right", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.7 }}
          className="flex w-full flex-col md:flex-row justify-between items-center gap-12 py-40"
        >
          <div className="h-full text-gray-text ml-4">
            <h2 className=" text-4xl mb-5 font-acme leading-snug">
              Find, Buy & Read – It’s That <br />
              Simple
            </h2>
            <p className="mb-8">
              Explore a world of books at your fingertips, with fast delivery
              and a curated selection for every reader.
            </p>
            <Link
              to="/shop"
              className="font-acme bg-gray-text text-white font-normal cursor-pointer hover:text-teal-500 duration-300 px-6 py-3 rounded"
            >
              Explore Now
            </Link>
            <div></div>
          </div>
        </motion.div>
        <motion.div
          variants={fadeIn("left", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.4 }}
        >
          <BannerCard />
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;
