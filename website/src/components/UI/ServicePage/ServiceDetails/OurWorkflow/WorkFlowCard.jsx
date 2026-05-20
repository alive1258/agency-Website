import SlideUp from "@/utils/animations/SlideUp";
import Image from "next/image";
import React from "react";

const WorkFlowCard = ({ step, index, delay = 0 }) => {
  return (
    <>
      <SlideUp
        delay={delay}
        className={`md:mt-12 relative flex flex-col py-4 items-start gap-4 px-4 flex-[1_0_0] border-dashed border-[#93C5FD] ${
          index % 2 === 1
            ? "md:border-l md:border-b-0 border-b border-r md:border-r-0"
            : "border-l md:border-b-0 border-b"
        }`}
      >
        {/* Blue accent line */}
        <div
          className={`absolute md:block hidden w-[3px] h-8 top-6 -left-[2px] rounded-3xl bg-[#3B82F6] `}
        />

        <div className="flex items-center space-x-3">
          <div className="bg-[#DBEAFE] flex justify-center items-center size-12 rounded-lg border border-[#BFDBFE]">
            <Image src={step.icon} alt="logo" width={21} height={24} />
          </div>
          <h2 className="text-secondary-base font-satoshi font-bold text-2xl">
            {step.title}
          </h2>
        </div>

        <p className="text-[#71717A] text-[16px] ">{step.description}</p>
      </SlideUp>
    </>
  );
};

export default WorkFlowCard;
