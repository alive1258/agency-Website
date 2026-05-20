import React from "react";
import { workGalleryImages } from "@/utils/fakeData/workGalleryData";
import Image from "next/image";
import Marquee from "react-fast-marquee";

const WorkGallery = () => {
  return (
    <section className="relative mt-5 ">
      {/* START MARQUEE GALLERY */}
      <Marquee speed={90} pauseOnHover={true} direction="left">
        {workGalleryImages?.map((src, index) => (
          <div
            key={index}
            className="border border-[#3B82F6] bg-[#DBEAFE] p-2 rounded-2xl mx-4"
          >
            <Image
              className="rounded-2xl md:w-full md:h-full h-[200px] w-[250px]"
              src={src}
              alt={`workGallery${index + 1}`}
              height={319}
              width={500}
            />
          </div>
        ))}
      </Marquee>
      {/* END MARQUEE GALLERY */}

      {/* START GRADIENT OVERLAY (LEFT & RIGHT) */}
      <div className="absolute hidden  z-50 top-0 left-0 w-full h-full md:flex justify-between pointer-events-none">
        <div className="h-full w-[250px] bg-gradient-to-r from-[#fff] from-[3%] to-transparent to-[99%]" />
        <div className="h-full w-[250px] bg-gradient-to-l from-[#fff] from-[3%] to-transparent to-[99%]" />
      </div>
      {/* END GRADIENT OVERLAY */}
    </section>
  );
};

export default WorkGallery;
