"use client";
import React from "react";
import { motion } from "framer-motion";

const SlideRight = ({ children, className = "", delay = 1 }) => {
  const slideRightVariants = {
    offscreen: {
      x: 100,
      opacity: 0,
    },
    onscreen: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        delay: delay === 1 ? 0 : 0.4 * delay,
      },
    },
  };

  return (
    <div className="overflow-hidden">
      <motion.div
        className={`w-full max-w-[99%] mx-auto ${className}`}
        variants={slideRightVariants}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: false, amount: 0.2 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default SlideRight;
