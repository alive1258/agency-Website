import SlideRight from "@/utils/animations/SlideRight";
import Image from "next/image";
import React from "react";

const Points = ({ point, delay = 0 }) => {
  return (
    <>
      <SlideRight delay={delay} className="flex items-center space-x-4">
        <div className="flex flex-row sm:items-start gap-2 sm:gap-4 w-full">
          <div className="shrink-0">
            <Image
              src="/images/career/icons/checkBox.svg"
              alt="check"
              width={24}
              height={24}
              className="w-6 h-6 "
            />
          </div>
          <p className="text-base sm:text-lg lg:text-xl text-tertiary-base">
            {point}
          </p>
        </div>
      </SlideRight>
    </>
  );
};

export default Points;
