import React from "react";
import Button from "../../Button/Button";
import WorkGallery from "../WorkGallery/WorkGallery";
import SlideUp from "@/utils/animations/SlideUp";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="mobile-hero-section-bg  ">
      {/* <section className="mobile-hero-section-bg  md:relative  overflow-hidden"> */}
      <div className="hero-section-bg">
        {/* BLURRED BLUE EFFECT SHAPE 1 */}
        {/* <div className="blurred-blue-shape-1" /> */}

        {/* BLURRED BLUE EFFECT SHAPE 2  */}
        {/* <div className="blurred-blue-shape-2" /> */}

        {/* START HERO  CONTENT  */}
        <div className="pt-12 container ">
          <SlideUp>
            <h1 className="text-secondary-base text-center font-satoshi font-bold uppercase w-full  mx-auto  md:text-[64px] text-[20px]">
              We Build Scalable & High Performance <br /> Websites That Convert
            </h1>
          </SlideUp>
          <SlideUp>
            <p className="text-center w-full max-w-[900px] mx-auto pt-12 md:text-2xl text-[16px] font-satoshi font-medium text-primary-base">
              We specialize in designing and developing fast, secure, and
              user-friendly websites that drive business growth. From startups
              to enterprises, we create web solutions that make an impact.
            </p>
          </SlideUp>

          <SlideUp>
            <div className="py-10 flex justify-center uppercase">
              <Link href="/portfolio">
                <Button content="View Our Work" />
              </Link>
            </div>
          </SlideUp>
        </div>
        {/* END HERO  CONTENT */}

        {/* WORK GALLERY SECTION */}
        <WorkGallery />
      </div>
    </section>
  );
};

export default HeroSection;
