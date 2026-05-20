import React from "react";
import { RiArrowRightLine } from "@remixicon/react";

const FooterLinkSection = ({ title, links }) => {
  return (
    <div className="md:col-span-1 mt-10 md:mt-0">
      {/* ========== SECTION TITLE START ========== */}
      <h2 className="text-[#FAFAFA] font-satoshi font-bold text-lg border-b border-[#3B82F6] pb-1 uppercase w-3/4">
        {title}
      </h2>
      {/* ========== SECTION TITLE END ========== */}

      {/* ========== LINK LIST START ========== */}
      <ul className="mt-10 space-y-4">
        {links?.map((text, index) => (
          <li
            key={index}
            className="group flex items-center gap-2 cursor-pointer"
          >
            {/* ICON WITH HOVER ANIMATION */}
            <RiArrowRightLine
              size={18}
              className="fill-[#D4D4D8] group-hover:fill-[#3B82F6] transition-transform duration-300 ease-in-out group-hover:translate-x-1"
            />

            {/* LINK TEXT WITH HOVER EFFECT */}
            <span className="text-[#D4D4D8] group-hover:text-[#3B82F6] text-[16px] font-medium">
              {text}
            </span>
          </li>
        ))}
      </ul>
      {/* ========== LINK LIST END ========== */}
    </div>
  );
};

export default FooterLinkSection;
