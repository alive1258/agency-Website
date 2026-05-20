"use client";
import { successRateData } from "@/utils/fakeData/successRateData";
import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const SuccessRate = () => {
  const [ref, inView] = useInView({ triggerOnce: true });

  return (
    <div className="bg-[#FAFAFA] relative" ref={ref}>
      {/* Bottom Gradient Line */}
      <div
        className="absolute md:block hidden"
        style={{
          width: "594px",
          height: "4px",
          left: "0px",
          bottom: "0px",
          background:
            "linear-gradient(85deg, rgba(255, 255, 255, 0.00) 0%, #2154FF 100%)",
        }}
      ></div>

      <div className="container py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-4 md:px-0">
          {successRateData?.map((card, index) => (
            <div
              key={card.id}
              className={`px-4 text-center md:text-left ${
                index !== successRateData?.length - 1 ? "md:border-r-[3px]" : ""
              }`}
              style={
                index !== successRateData?.length - 1
                  ? {
                      borderImage:
                        "linear-gradient(180deg, #3B82F6 -2.76%, rgba(255,255,255,0) 103.04%) 1",
                    }
                  : {}
              }
            >
              <h3 className="text-[48px] text-[#3B82F6] font-satoshi font-bold">
                {inView ? (
                  <>
                    <CountUp end={parseInt(card.count)} duration={4} />{" "}
                    <span>+</span>
                  </>
                ) : (
                  0
                )}
              </h3>
              <h5 className="text-[20px] uppercase font-satoshi font-bold mt-4 text-secondary-base">
                {card?.title}
              </h5>
              <p className="text-sm  mt-4 text-[#71717A]">
                {card?.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuccessRate;
