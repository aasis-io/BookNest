import React from "react";
import { Link } from "react-router-dom";
import bookPic from "../assets/awardbooks.png";
import { motion } from "motion/react";
import { fadeIn } from "../variants";

const PromoBanner = () => {
  return (
    <motion.div
      variants={fadeIn("up", 0.2)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.4 }}
      className="mt-16 py-12 bg-gray-100 px-4 lg:px-24"
    >
      <div className="flex flex-col container mx-auto md:flex-row justify-between items-center gap-12">
        <div className="m:w-1/2">
          <h2 className="text-4xl font-bold font-acme text-gray-text mb-6 leading-snug">
            2023 National Book Awards for Fiction Shortlist
          </h2>
          <Link to="/shop" className="block">
            <button className="bg-gray-text text-white font-acme font-semibold px-6 py-3 rounded hover:bg-black transition-all duration-300">
              Get Promo Code
            </button>
          </Link>
        </div>
        <div>
          <img src={bookPic} alt="" className="w-96" />
        </div>
      </div>
    </motion.div>
  );
};

export default PromoBanner;
