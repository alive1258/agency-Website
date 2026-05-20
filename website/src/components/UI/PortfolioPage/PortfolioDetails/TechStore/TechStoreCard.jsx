import SlideUp from "@/utils/animations/SlideUp";
import Image from "next/image";
import React from "react";

const TechStoreCard = ({ tech, delay = 0 }) => {
  return (
    <SlideUp delay={delay}>
      <div className="flex items-center space-x-4">
        <div className="size-14 rounded-full flex justify-center items-center bg-[#3B82F6]">
          <Image src={tech?.icon} alt="icon" width={24} height={24} />
        </div>
        <div>
          <p className="font-medium text-[#33F3F46] text-lg">{tech?.title}</p>
          <h6 className="font-satoshi font-bold text-[#33F3F46] text-lg">
            {tech?.value}
          </h6>
        </div>
      </div>
    </SlideUp>
  );
};

export default TechStoreCard;
