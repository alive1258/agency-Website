import { RiArrowRightSLine } from "@remixicon/react";
import Link from "next/link";

const CareerBanner = () => {
  return (
    <div className="about-us-section-bg md:h-[338px] h-[150px]">
      <div className="bg-[#000] opacity-70 w-full h-full">
        <div className="container flex h-full justify-center items-center">
          <div className="z-50 text-white">
            <h1 className="md:text-[48px] text-[#FAFAFA] text-center uppercase font-extrabold">
              Career
            </h1>
            <div className="flex justify-center items-center mt-3">
              <div className="bg-[#27272A] w-fit px-4 py-2 rounded-3xl flex items-center justify-center space-x-2">
                <Link href="/">
                  <span className="text-[#A1A1AA] text-[16px] ">Home</span>
                </Link>
                <RiArrowRightSLine size={22} />
                <span className="text-[#FAFAFA] text-[16px] ">Career</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerBanner;
