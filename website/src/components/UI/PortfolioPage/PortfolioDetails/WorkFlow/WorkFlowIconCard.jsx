import SlideUp from "@/utils/animations/SlideUp";
import Image from "next/image";
import React from "react";

const WorkFlowIconCard = ({ item, delay = 0 }) => {
  return (
    <>
      <SlideUp delay={delay}>
        <div className="bg-[#F4F4F5] w-[200px] h-[184px] relative top-0 cursor-pointer px-6 py-8 rounded-tr-[40px] rounded-bl-[40px] transition-all duration-300 ease-in-out border border-transparent hover:-top-5 hover:bg-white hover:border hover:border-[#BFDBFE] hover:shadow-[inset_8px_8px_24px_#C3D0FE,12px_12px_16px_#E2E2E2] hover:rounded-[0px_40px_0px_40px]">
          <div className="flex justify-center items-center">
            <div className="size-14 rounded-full flex justify-center items-center bg-[#3B82F6] transition-transform duration-300 group-hover:scale-105">
              <Image src={item.icon} alt="workflow" width={24} height={24} />
            </div>
          </div>
          <p className="text-lg mt-4 font-satoshi font-bold text-primary-base text-center">
            {item.title}
          </p>
        </div>
      </SlideUp>
    </>
  );
};

export default WorkFlowIconCard;
