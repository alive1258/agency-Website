import Image from "next/image";
import React from "react";
import Questions from "./Questions";
import SlideUp from "@/utils/animations/SlideUp";
import SlideLeft from "@/utils/animations/SlideLeft";

const OurSolutions = () => {
  return (
    <div className="container mt-14">
      <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-x-16 gap-y-6">
        <div>
          {/* button  */}
          <SlideUp>
            <div className="md:block flex justify-center items-center">
              <div className="border border-[#D4D4D8]  bg-white py-2 pl-2 pr-4 rounded-full w-fit ">
                <div className="flex items-center gap-x-2">
                  <div className="border border-[#3B82F6] bg-[#BFDBFE] flex justify-center items-center rounded-full size-7">
                    <Image
                      src="/images/footer/footerLogo.png"
                      alt="logo"
                      width={9}
                      height={14}
                    />
                  </div>
                  <p className="text-[#71717A] text-sm uppercase ">
                    Our Web Development Solutions
                  </p>
                </div>
              </div>
            </div>
          </SlideUp>

          <div className="mt-8">
            <SlideUp>
              <h1 className="md:text-[40px] max-w-[470px] text-[35px] md:text-start text-center font-satoshi font-bold text-primary-base">
                Custom Web Solutions Designed for Impact
              </h1>
            </SlideUp>

            <SlideUp delay={0.6}>
              <p className="text-[20px] md:text-start text-center  text-primary-base mt-8">
                From sleek websites to dynamic web applications, we build
                solutions that don’t just look good — they work flawlessly.
              </p>
            </SlideUp>
            <div className="mt-8">
              <SlideLeft>
                <Image
                  className="w-full h-full"
                  src="/images/services/serviceDetails.png"
                  alt=""
                  width={650}
                  height={522}
                />
              </SlideLeft>
            </div>
          </div>
        </div>
        {/* question  */}
        <div>
          <Questions />
        </div>
      </div>
    </div>
  );
};

export default OurSolutions;
