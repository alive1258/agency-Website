import SlideUp from "@/utils/animations/SlideUp";
import React from "react";

const OpenPositionsCard = ({ job, delay = 0, index }) => {
  return (
    <>
      <SlideUp delay={delay}>
        <div className="p-6 rounded-2xl hover:scale-105 transition-all ease-in-out duration-300 bg-white-base shadow-[0px_0px_96px_0px_rgba(59,130,246,0.16)]">
          <div className="bg-[#F4F4F5] rounded-full px-4 py-2 w-fit">
            <p className="text-[#71717A] text-sm  text-center">{job?.type}</p>
          </div>
          <h3 className="text-lg mt-4 font-satoshi font-bold text-primary-base">
            {job?.title}
          </h3>
          <p className="text-[#71717A] text-[16px]  mt-4">{job?.description}</p>

          <div className="mt-4 w-fit">
            <button className="bg-[#18181B] cursor-pointer hover:bg-[#3B82F6] text-sm text-white px-6 py-3 rounded-full transition-all duration-300">
              Job Details
            </button>
          </div>
        </div>
      </SlideUp>
    </>
  );
};

export default OpenPositionsCard;
