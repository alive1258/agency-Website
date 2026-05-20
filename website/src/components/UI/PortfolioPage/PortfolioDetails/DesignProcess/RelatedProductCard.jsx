import SlideUp from "@/utils/animations/SlideUp";
import Image from "next/image";
import React from "react";

const RelatedProductCard = ({ project, delay = 0 }) => {
  return (
    <>
      <SlideUp delay={delay}>
        <Image
          src={project.src}
          alt={project.alt}
          height={500}
          width={500}
          className="w-full h-full rounded-2xl"
        />
        <h3 className="text-[24px] hover:text-[#3B82F6] text-[#D4D4D8] font-satoshi font-bold mt-4">
          {project.title}
        </h3>
      </SlideUp>
    </>
  );
};

export default RelatedProductCard;
