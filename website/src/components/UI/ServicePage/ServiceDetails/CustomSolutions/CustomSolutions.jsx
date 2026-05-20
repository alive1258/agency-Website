import React from "react";
import Button from "@/components/UI/Button/Button";
import WorkGallery from "@/components/UI/HomePage/WorkGallery/WorkGallery";
import SlideUp from "@/utils/animations/SlideUp";

const CustomSolutions = () => {
  return (
    <div>
      <div className="relative bg-[#FAFAFA] w-full md:h-[924px] overflow-hidden">
        {/* BOTTOM GRADIENT LINE */}
        <div className="absolute md:block hidden bottom-gradient-line"></div>
        {/* BLUE BLURRED CIRCLE BACKGROUND (LEFT) */}
        <div className=" service-detail-blurred-circle"></div>

        {/* EMERALD BLURRED CIRCLE BACKGROUND (RIGHT) */}
        <div className="green-blur-circle"></div>

        {/* WHITE TRIANGLE SHAPE USING SVG (CENTERED) */}
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1225"
            height="924"
            viewBox="0 0 1225 924"
            fill="none"
            className="absolute left-1/2 -translate-x-1/2"
          >
            <path d="M0 0H1225L612.5 924L0 0Z" fill="white" />
          </svg>
        </div>

        {/* TEXTUAL CONTENT */}
        <div className="relative z-10 md:mt-14 mt-12 h-full">
          <div className="flex justify-center">
            <SlideUp>
              <h1 className="md:text-[56px] text-[30px] font-extrabold max-w-[1054px] w-full text-center text-gray-900">
                Custom Web Development Solutions <br /> For Modern Businesses
              </h1>
            </SlideUp>
          </div>
          <SlideUp>
            <p className="max-w-[600px] mx-auto mt-10 w-full text-center ">
              From dynamic websites to complex web applications — we develop
              solutions that scale with your growth.
            </p>
          </SlideUp>
          <SlideUp delay={0.6}>
            <div className="md:mt-20 mt-12 flex justify-center uppercase">
              <Button content=" Let’s Build Your Website" />
            </div>
          </SlideUp>

          {/* GALLERY COMPONENT SHOWING RECENT WORKS */}
          <div className="md:mt-[120px] mt-10">
            <WorkGallery />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomSolutions;
