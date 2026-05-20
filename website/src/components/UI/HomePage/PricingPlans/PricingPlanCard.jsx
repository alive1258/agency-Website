import SlideUp from "@/utils/animations/SlideUp";
import {
  RiArrowRightUpLine,
  RiCheckboxCircleFill,
  RiCheckboxCircleLine,
} from "@remixicon/react";
import Link from "next/link";

const PricingPlanCard = ({ item, index, delay = 0 }) => {
  return (
    <SlideUp delay={delay}>
      <div
        key={item?.id}
        className="border border-[#D4D4D8] rounded-2xl bg-white-base h-full w-full"
      >
        <div className="bg-[#F4F4F5] rounded-t-2xl md:p-6 p-3">
          <div className="flex justify-between items-center">
            <h3 className="font-satoshi font-bold text-secondary-base text-2xl">
              {item?.title}
            </h3>
            {index === 1 && (
              <div className="border rounded-[99px] bg-[#DBEAFE] border-[#3B82F6] px-3 py-1.5 shadow-[-5px_5px_0px_0px_rgba(33,84,255,0.4),-10px_10px_0px_0px_rgba(46,100,240,0.3),-15px_15px_0px_0px_rgba(46,114,240,0.2),-20px_20px_0px_0px_rgba(46,141,240,0.1),-25px_25px_0px_0px_rgba(46,148,240,0.05)]">
                <p className="text-[#3B82F6] text-sm ">Most Popular</p>
              </div>
            )}
          </div>

          <div className="md:mt-6 mt-3 flex items-center ">
            <h1 className="font-satoshi font-bold text-secondary-base md:text-[32px] text-[28px]">
              ${item?.price}
            </h1>
            <div className=" text-primary-base text-[16px] mt-4 flex space-x-0.5">
              <span> /</span>
              <div className="lowercase">
                <span>per </span>
                {item?.category}
              </div>
            </div>
          </div>
          <p className=" text-secondary-base text-lg md:mt-6 mt-4 ">
            {item?.des}
          </p>
          <div className="md:mt-12 mt-6 flex justify-center items-center">
            <Link className="w-full" href="/contact">
              <button
                type="button"
                className={`group relative inline-flex w-full uppercase  text-[16px] cursor-pointer h-14 px-6 py-4 justify-center items-center gap-1 rounded-full text-white-base overflow-hidden transition-all duration-300 focus:ring-4 focus:outline-none ${
                  index === 1
                    ? "bg-gradient-to-r from-[#2154FF] to-[#5079FF]"
                    : "bg-[#000]"
                }`}
              >
                {index !== 1 && (
                  <span className="absolute inset-0 bg-gradient-to-r from-[#2154FF] to-[#5079FF] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full z-0" />
                )}
                <span className="relative z-10 flex items-center gap-1">
                  get started
                  <RiArrowRightUpLine
                    className="transform transition-all duration-300 ease-in-out group-hover:rotate-45"
                    size={24}
                  />
                </span>
              </button>
            </Link>
          </div>
        </div>
        <div className=" md:p-6 p-3">
          <h5 className="text-secondary-base font-satoshi font-bold text-lg">
            {item?.plan_title}
          </h5>
          <div className="mt-4 space-y-4">
            {item?.plan?.map((pla) => (
              <div key={pla.id} className="flex space-x-2">
                <RiCheckboxCircleFill className="text-[#3B82F6] h-6 w-6 " />
                <p className="text-primary-base text-[16px]">
                  {pla?.plan_des1}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideUp>
  );
};

export default PricingPlanCard;
