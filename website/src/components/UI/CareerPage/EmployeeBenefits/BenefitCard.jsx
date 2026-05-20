import SlideUp from "@/utils/animations/SlideUp";
import Image from "next/image";
import React from "react";

const BenefitCard = ({ benefit, delay = 0 }) => {
  return (
    <SlideUp delay={delay}>
      <div className="bg-[#FFF] h-full p-6 rounded-2xl cursor-pointer transition-all ease-in-out duration-300 hover:scale-105">
        <div className="rounded-lg size-14 flex justify-center bg-[#DBEAFE] items-center">
          {/* Replace this static SVG with dynamic icon rendering if needed */}
          <Image height={30} width={30} src={benefit?.icon} alt="icon" />
        </div>
        <h3 className="text-lg mt-4 text-primary-base font-satoshi font-bold">
          {benefit.title}
        </h3>
        <p className="text-[#71717A] text-sm font-medium mt-4">
          {benefit.description}
        </p>
      </div>
    </SlideUp>
  );
};

export default BenefitCard;
