import React from "react";
import Image from "next/image";
import SlideUp from "@/utils/animations/SlideUp";
import Link from "next/link";
import { RiArrowRightLine } from "@remixicon/react";

const ServiceCard = ({ service, delay = 0 }) => {
  return (
    <SlideUp delay={delay} className="cursor-pointer  w-full max-w-[312px]">
      {/* END: Icon Wrapper */}
      <div
        className={`bg-white-base py-6 px-4 rounded-2xl group-hover:border border border-transparent  group-hover:border-[${service.borderColor}]`}
      >
        {/* START: Icon Wrapper */}
        <div
          style={{ backgroundColor: service.bgColor }}
          className=" w-fit p-7  rounded-tl-[8px] rounded-tr-[8px] rounded-bl-[8px]  rounded-br-[32px]"
        >
          <Image
            src={service.icon}
            alt={service.title}
            width={40}
            height={40}
          />
        </div>
        {/* END: Icon Wrapper */}

        <h4
          className={`text-lg  font-satoshi font-bold group-hover:text-[${service.borderColor}] mt-6`}
        >
          {service.title}
        </h4>
        <p className="text-[#71717A]  text-[16px] mt-6">
          {service.description}
        </p>
        {/* START: Link & Arrow */}
        <div className="group">
          <div className="service-card-link">
            <Link href={`/service/${service.id}`}>
              <span
                className={`text-[#71717A] group-hover:text-[#3B82F6] uppercase font-satoshi font-bold text-sm `}
              >
                get in touch
              </span>
            </Link>
            <RiArrowRightLine
              size={20}
              className={`text-[#71717A] group-hover:text-blue-base  transition-all duration-300 ease-in-out`}
            />
          </div>
        </div>
        {/* END: Link & Arrow */}
      </div>
      {/* END: Card Wrapper */}
    </SlideUp>
  );
};

export default ServiceCard;
