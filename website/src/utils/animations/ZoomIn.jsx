"use client";
import React from "react";
import { motion } from "framer-motion";

const ZoomIn = ({ children, className = "" }) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{
        opacity: 1,
        scale: 1,
        transition: {
          duration: 0.8,
          ease: "easeInOut",
        },
      }}
      viewport={{ once: false }}
    >
      {children}
    </motion.div>
  );
};

export default ZoomIn;
