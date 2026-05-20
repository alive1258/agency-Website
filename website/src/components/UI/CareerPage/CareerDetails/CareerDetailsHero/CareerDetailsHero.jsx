import SlideUp from "@/utils/animations/SlideUp";
import {
  RiDribbbleLine,
  RiFacebookFill,
  RiInstagramLine,
  RiLinkedinFill,
  RiTwitterXLine,
} from "@remixicon/react";
import React from "react";

const CareerDetailsHero = () => {
  return (
    <section className="bg-[#F4F4F5]">
      <div className="container py-[72px]">
        <div className="md:flex justify-between items-center border-b pb-4  border-[#D4D4D8]">
          <SlideUp>
            <h1 className="md:text-[56px] text-3xl text-[#18181B] font-satoshi font-bold">
              Senior UI/UX Designer
            </h1>
          </SlideUp>
          <div className="flex space-x-3 md:mt-0 mt-4 items-center ">
            <p className="text-primary-base font-satoshi font-bold text-lg ">
              Share:
            </p>
            <div className=" flex items-center space-x-3">
              <div className="team-social-icon group">
                <RiFacebookFill
                  className="text-gray-500 group-hover:text-white"
                  size={20}
                />
              </div>
              <div className="team-social-icon group">
                <RiInstagramLine
                  className="text-gray-500 group-hover:text-white"
                  size={20}
                />
              </div>
              <div className="team-social-icon group">
                <RiLinkedinFill
                  className="text-gray-500 group-hover:text-white"
                  size={20}
                />
              </div>
              <div className="team-social-icon group">
                <RiTwitterXLine
                  className="text-gray-500 group-hover:text-white"
                  size={20}
                />
              </div>
              <div className="team-social-icon group">
                <RiDribbbleLine
                  className="text-gray-500 group-hover:text-white"
                  size={20}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="md:flex mt-6 justify-between items-center md:space-y-0 space-y-2">
          <p className="text-[#71717A] text-lg ">
            <span className="text-[#3B82F6]">Atlassian</span> - Sydney Australia
          </p>
          <p className="text-primary-base text-lg ">
            Posted 1 week ago - 15 Applicants
          </p>
        </div>

        <div className="mt-16 flex flex-col items-center justify-center  space-y-6 md:flex-row md:space-x-8 md:space-y-0">
          {/* card 1  */}
          <div
            className="border w-full max-w-[244px] border-border-base bg-[#F4F4F5] rounded-lg  p-4"
            style={{ boxShadow: "0px 12px 16px 0px #EBEBEB" }}
          >
            <h5 className="text-[#71717A] text-center text-[20px]  border-b border-[#D4D4D8] pb-2">
              Employment Type
            </h5>
            <h3 className="text-secondary-base text-2xl font-satoshi font-bold text-center mt-4">
              Full Time
            </h3>
          </div>
          {/* card 1  */}
          <div
            className="border w-full max-w-[244px] border-border-base bg-[#F4F4F5] rounded-lg  p-4"
            style={{ boxShadow: "0px 12px 16px 0px #EBEBEB" }}
          >
            <h5 className="text-[#71717A] text-center text-[20px]  border-b border-[#D4D4D8] pb-2">
              Employment Type
            </h5>
            <h3 className="text-secondary-base text-2xl font-satoshi font-bold text-center mt-4">
              Full Time
            </h3>
          </div>
          {/* card 1  */}
          <div
            className="border w-full max-w-[244px] border-border-base bg-[#F4F4F5] rounded-lg  p-4"
            style={{ boxShadow: "0px 12px 16px 0px #EBEBEB" }}
          >
            <h5 className="text-[#71717A] text-center text-[20px]  border-b border-[#D4D4D8] pb-2">
              Employment Type
            </h5>
            <h3 className="text-secondary-base text-2xl font-satoshi font-bold text-center mt-4">
              Full Time
            </h3>
          </div>
          {/* card 1  */}
          <div
            className="border w-full max-w-[244px] border-border-base bg-[#F4F4F5] rounded-lg  p-4"
            style={{ boxShadow: "0px 12px 16px 0px #EBEBEB" }}
          >
            <h5 className="text-[#71717A] text-center text-[20px]  border-b border-[#D4D4D8] pb-2">
              Employment Type
            </h5>
            <h3 className="text-secondary-base text-2xl font-satoshi font-bold text-center mt-4">
              Full Time
            </h3>
          </div>
          {/* card 1  */}
          <div
            className="border w-full max-w-[244px] border-border-base bg-[#F4F4F5] rounded-lg  p-4"
            style={{ boxShadow: "0px 12px 16px 0px #EBEBEB" }}
          >
            <h5 className="text-[#71717A] text-center text-[20px]  border-b border-[#D4D4D8] pb-2">
              Employment Type
            </h5>
            <h3 className="text-secondary-base text-2xl font-satoshi font-bold text-center mt-4">
              Full Time
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerDetailsHero;
