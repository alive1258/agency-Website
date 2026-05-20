import React from "react";
import Image from "next/image";
import SlideUp from "@/utils/animations/SlideUp";
import Link from "next/link";
import { RiArrowRightLine } from "@remixicon/react";

const PortfolioCard = ({ item, idx, delay = 0 }) => {
  return (
    <SlideUp delay={delay}>
      <div className="bg-[#F5F5F4] hover:shadow-xl transition-all duration-300 ease-in-out p-6 my-8 grid md:grid-cols-2 grid-cols-1 gap-8 rounded-2xl">
        {/* START IMAGE SECTION */}
        <div className={`${idx % 2 !== 0 ? "md:order-2" : "md:order-1"}`}>
          <div className="relative overflow-hidden rounded-2xl">
            <Image
              className="w-full h-full object-cover rounded-2xl hover:scale-105 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
              src={item?.image}
              alt={item?.company}
              height={384}
              width={500}
            />
          </div>
        </div>
        {/* END IMAGE SECTION */}

        {/* START TEXT SECTION */}
        <div className={`${idx % 2 !== 0 ? "md:order-1" : "md:order-2"}`}>
          {/* Company Logo and Name */}
          <div className="flex items-center gap-x-4 md:mt-8 mt-4">
            <Image
              className="md:size-10 size-7"
              src="/images/caseStudies/logo1.png"
              alt="logo"
              height={40}
              width={40}
            />
            <h4 className="text-secondary-base md:text-2xl text-[20px] font-satoshi font-bold">
              {item?.company}
            </h4>
          </div>

          {/* Project Title */}
          <h1 className="md:text-[32px] text-[20px] md:mt-10 mt-4 font-satoshi font-bold">
            <Link
              href={`/portfolio/${item.id}`}
              className="text-primary-base hover:text-blue-base"
            >
              {item?.title}
            </Link>
          </h1>

          {/* Project Description */}
          <p className="text-[#71717A] text-[16px] mt-6 ">
            {item?.description}
          </p>

          {/* Tags */}
          <div className="md:mt-6 mt-4 flex flex-wrap gap-3">
            {item?.tags?.map((tag, idx) => (
              <span
                key={idx}
                className="border border-[#71717A] text-tertiary-base hover:text-[#3B82F6] hover:border-[#3B82F6] cursor-pointer rounded-3xl px-4 py-2 text-sm transition-all duration-300 ease-in-out"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* View Live Project Link */}
          <div className="group md:mt-9 mt-5 w-fit">
            <div className="flex items-center gap-x-2 border-b border-[#71717A] group-hover:border-[#3B82F6] transition-transform duration-300 ease-in-out group-hover:translate-x-2">
              <Link href={`/portfolio/${item.id}`}>
                <span className="text-[#71717A] text-sm font-satoshi font-bold uppercase cursor-pointer group-hover:text-[#3B82F6]">
                  View Live Project
                </span>
              </Link>
              <RiArrowRightLine
                size={20}
                className="text-[#71717A] group-hover:text-blue-base transition-all duration-300 ease-in-out"
              />
            </div>
          </div>
        </div>
        {/* END TEXT SECTION */}
      </div>
    </SlideUp>
  );
};

export default PortfolioCard;
