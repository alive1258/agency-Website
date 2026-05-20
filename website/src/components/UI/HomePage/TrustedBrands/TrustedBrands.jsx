import React from "react";
import Button from "../../Button/Button";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import Link from "next/link";
import { brands } from "@/utils/fakeData/brands";

const TrustedBrands = ({ status = false }) => {
  return (
    <div className="bg-[#F4F4F5] md:h-[550px] w-full relative overflow-hidden">
      <div
        className={`bottom-gradient-line ${
          status === true ? "md:block" : "hidden"
        }`}
      ></div>
      <div
        className={`custom-gradient-line  ${
          status === true ? "md:block" : "hidden"
        }`}
      ></div>

      <div
        className="container relative mx-auto md:px-32 lg:px-40   md:flex md:py-0 pt-8 w-full md:pb-12"
        style={{ display: "relative" }}
      >
        <div className=" grid grid-cols-1 md:grid-cols-2 mt-4 md:mt-0 gap-x-[140px] ">
          <div className="md:relative md:top-1/6">
            <div className=" w-full">
              <p className="text-[#3B82F6] text-sm md:text-start text-center ">
                We Work With the Best
              </p>
              <h1 className="md:text-start text-center text-tertiary-base mt-6 text-2xl font-satoshi font-bold">
                Trusted by Leading Brands & Businesses
              </h1>
              <p className="text-[#71717A] md:text-start text-center mt-6 text-[16px] ">
                We’ve had the privilege of working with some of the world’s most
                innovative companies, helping them scale with cutting-edge
                digital solutions.
              </p>
              <div className="md:mt-14 my-14 w-full flex md:justify-start justify-center md:items-start items-center uppercase">
                <Link href="/contact">
                  <Button content="Get a Free Consultation" />
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute top-1 -left-72  md:left-72 md:flex md:flex-row md:space-x-5 w-full">
            <div className="md:block hidden   w-full md:w-[240px]  ">
              <Marquee direction="down" speed={100} scrollamount="1">
                <div className="space-y-3.5">
                  {brands?.map((brand, index) => (
                    <div
                      key={index}
                      className="bg-[#FFF] my-2 w-full max-w-[224px] rounded-lg flex items-center space-x-2 border border-border-base p-[17px]"
                    >
                      <Image
                        src={brand?.img}
                        alt={brand?.name}
                        height={32}
                        width={32}
                      />
                      <h5 className="text-tertiary-base font-satoshi font-bold md:text-[28px] text-[18px]">
                        {brand?.name}
                      </h5>
                    </div>
                  ))}
                </div>
              </Marquee>
            </div>
            <div
              className="w-full pr-[-40px] md:w-[240px] md:block hidden my-2"
              style={{ paddingRight: "-40px" }}
            >
              <Marquee direction="down" speed={100}>
                <div className="space-y-3.5">
                  {brands?.map((brand, index) => (
                    <div
                      key={index}
                      className="bg-[#FFF] my-2 w-full max-w-[224px] space-y-2.5 rounded-lg flex items-center space-x-2 border border-border-base p-[17px]"
                    >
                      <Image
                        src={brand?.img}
                        alt={brand?.name}
                        height={32}
                        width={32}
                      />
                      <h5 className="text-tertiary-base font-satoshi font-bold md:text-[28px] text-[18px]">
                        {brand?.name}
                      </h5>
                    </div>
                  ))}
                </div>
              </Marquee>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustedBrands;
