import Image from "next/image";
import React from "react";
import SlideUp from "@/utils/animations/SlideUp";
const FeatureCard = ({ feature, delay = 0 }) => {
  return (
    <SlideUp delay={delay}>
      <div className="flex gap-x-4">
        <div
          className={`rounded px-[22px] pt-[22px] pb-[59px] w-fit h-fit bg-gradient-to-b ${feature?.gradient}`}
        >
          <Image
            src={feature?.img}
            alt={feature?.title}
            height={48}
            width={48}
          />
        </div>
        <div>
          <h4 className="text-secondary-base text-lg font-satoshi font-bold">
            {feature?.title}
          </h4>
          <p className="text-[#71717A] text-sm font-medium mt-2">
            {feature?.description}
          </p>
        </div>
      </div>
    </SlideUp>
  );
};

export default FeatureCard;
