"use client";
import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import { motion, useInView } from "framer-motion";

const ScrollCountUp = ({ numericCount, hasPlus }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  const [startCount, setStartCount] = useState(false);

  useEffect(() => {
    if (isInView) {
      setStartCount(true);
    }
  }, [isInView]);

  return (
    <motion.h2
      ref={ref}
      className="text-[#18181B] md:text-[48px] text-[40px] font-black"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {startCount ? (
        <CountUp start={0} end={numericCount} duration={2} separator="," />
      ) : (
        0
      )}
      {hasPlus && "+"}
    </motion.h2>
  );
};

export default ScrollCountUp;
