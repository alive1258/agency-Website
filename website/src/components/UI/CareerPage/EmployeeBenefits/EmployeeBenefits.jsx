import React from "react";
import BadgeLabel from "../../BadgeLabel/BadgeLabel";
import { employeeBenefitsData } from "@/utils/fakeData/employeeBenefitsData";
import SlideUp from "@/utils/animations/SlideUp";

import BenefitCard from "./BenefitCard";

const EmployeeBenefits = () => {
  return (
    <section className="bg-[#F4F4F5] mt-14 w-full overflow-hidden relative">
      {/* =================== BACKGROUND GRADIENT LINES START =================== */}
      <div className="bottom-gradient-line"></div>
      <div className="custom-gradient-line"></div>
      {/* =================== BACKGROUND GRADIENT LINES END ===================== */}

      <div className="container py-12">
        {/* =================== START HEADER ============================= */}
        <BadgeLabel text="Employee Benefits" />

        <SlideUp>
          <h1 className="animated-header">
            Employee Benefits at Solvex Empowering You to Thrive
          </h1>
        </SlideUp>
        <SlideUp>
          <p className="text-[16px] w-full max-w-[560px] mx-auto text-[#71717A] mt-6 text-center">
            At Solvex, we believe that happy employees create exceptional work.
            That’s why we provide a competitive, flexible, and rewarding
            benefits package designed to support your growth, well-being, and
            work-life balance.
          </p>
        </SlideUp>
        {/* =================== SEND HEADER =============================== */}

        {/* =================== BENEFITS CARD GRID START ======================== */}
        <div className="mt-14 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-6">
          {employeeBenefitsData?.map((benefit, index) => (
            <BenefitCard benefit={benefit} key={index} delay={index * 0.4} />
          ))}
        </div>
        {/* =================== BENEFITS CARD GRID END ========================== */}
      </div>
    </section>
  );
};

export default EmployeeBenefits;
