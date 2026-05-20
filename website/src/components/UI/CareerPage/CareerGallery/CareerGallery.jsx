import React from "react";
import { careerGalleryData } from "@/utils/fakeData/careerGalleryData";
import Image from "next/image";
import SlideUp from "@/utils/animations/SlideUp";

const CareerGallery = () => {
  return (
    <div className="mt-14 overflow-hidden">
      {/* CONTAINER GRID WRAPPER */}
      <div className="grid md:grid-cols-2 grid-cols-1 gap-5 relative container">
        {/* GLOW EFFECTS */}
        <div className="blur-circle-green" />
        <div className="blur-circle-purple" />

        {/* LEFT IMAGE SECTION */}
        <div className="md:grid-cols-2 grid-cols-1 grid gap-5 z-50 overflow-hidden">
          {careerGalleryData?.left?.map((item, index) => (
            <SlideUp
              delay={index * 0.4}
              key={index}
              className={item.rowSpan === 2 ? "row-span-2" : ""}
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={500}
                height={200}
                className="w-full h-full max-h-[268px] md:max-h-[590px] object-cover rounded-lg"
              />
            </SlideUp>
          ))}
        </div>

        {/* RIGHT IMAGE SECTION */}
        <div className="md:grid-cols-2 grid-cols-1 grid gap-5 w-full z-50">
          {careerGalleryData?.right?.map((item, index) => (
            <SlideUp
              delay={index * 0.4}
              key={index}
              className={item.colSpan === 2 ? "md:col-span-2" : ""}
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={500}
                height={200}
                className="w-full h-full max-h-[268px] md:max-h-[296px] object-cover rounded-lg"
              />
            </SlideUp>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CareerGallery;
