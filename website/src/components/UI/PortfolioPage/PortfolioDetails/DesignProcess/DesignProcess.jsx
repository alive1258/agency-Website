import BadgeLabel from "@/components/UI/BadgeLabel/BadgeLabel";
import SlideUp from "@/utils/animations/SlideUp";
import { designProcessData } from "@/utils/fakeData/designPorcessData";
import React from "react";
import DesignProcessCard from "./DesignProcessCard";

const DesignProcess = () => {
  return (
    <div className="container mt-24">
      <BadgeLabel text="design process " />

      <SlideUp>
        <h1 className="animated-header">
          From Concept to Conversion — A Strategic Design Journey
        </h1>
      </SlideUp>
      <SlideUp>
        <p className="text-[16px] font-medium text-[#71717A] mt-6 text-center w-full max-w-[420px] mx-auto">
          Our design process blends creativity, data, and user insights —
          crafting a seamless shopping experience for TechStore Inc.’s
          e-commerce platform.
        </p>
      </SlideUp>

      <div className="mt-16 space-y-24 ">
        {designProcessData?.map((feature, idx) => (
          <DesignProcessCard
            key={feature.id}
            feature={feature}
            idx={idx}
            delay={idx * 0.4}
          />
        ))}
      </div>
    </div>
  );
};

export default DesignProcess;
