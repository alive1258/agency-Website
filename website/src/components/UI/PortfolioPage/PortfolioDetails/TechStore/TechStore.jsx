import React from "react";
import ZoomIn from "@/utils/animations/ZoomIn";
import Image from "next/image";
import TechStoreCard from "./TechStoreCard";
import { techData } from "@/utils/fakeData/techData";
import SlideUp from "@/utils/animations/SlideUp";

const TechStore = () => {
  return (
    <section className="container mt-14">
      {/* ================= START: HEADING ================= */}

      <SlideUp>
        <h1 className="text-primary-base md:text-[48px] text-[30px] font-satoshi font-bold text-center w-full max-w-[830px] mx-auto">
          Our Expertise in Web Development
        </h1>
      </SlideUp>
      {/* ================= END: HEADING ================= */}

      {/* ================= START: TECH PRODUCT CARDS ================= */}
      <div className="md:flex justify-center items-center space-x-24 md:space-y-0 space-y-5 md:mt-16 mt-10 flex-wrap gap-y-5">
        {techData?.map((tech, index) => (
          <TechStoreCard key={tech.id} tech={tech} delay={index * 0.4} />
        ))}
      </div>
      {/* ================= END: TECH PRODUCT CARDS ================= */}

      {/* ================= START: FEATURE BANNER IMAGE ================= */}
      <div className="md:mt-[72px] mt-10 group">
        <ZoomIn className="relative overflow-hidden rounded-2xl">
          <Image
            src="/images/portfolio/bannerDetail.png"
            alt="TechStore"
            width={1000} // real image width in px
            height={1100} // real image height in px
            quality={90} // good balance of quality and size
            layout="responsive" // responsive layout with aspect ratio maintained
            className="w-full rounded-2xl shadow-lg hover:scale-105 duration-500 overflow-hidden ease-[cubic-bezier(0.4,0,0.2,1)] transition-transform object-cover h-full"
          />
        </ZoomIn>
      </div>
      {/* ================= END: FEATURE BANNER IMAGE ================= */}
    </section>
  );
};

export default TechStore;
