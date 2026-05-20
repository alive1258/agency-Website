import SlideUp from "@/utils/animations/SlideUp";
import React from "react";

const ChooseCard = ({ card, delay = 0 }) => {
  return (
    <SlideUp delay={delay}>
      <div className="relative flex w-full max-w-[312px] py-8 px-4 flex-col items-center gap-6 rounded-lg border border-[#27272A] bg-[rgba(39,39,42,0.3)] text-white-base">
        {/* Top & Bottom Gradient Lines */}
        <div
          className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-1/2 h-[2px] bg-gradient-to-r ${card.gradient}`}
        />
        <div
          className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-[2px] bg-gradient-to-r ${card.gradient}`}
        />

        {/* Number Circle */}
        <div
          style={{
            background: card.bgColor,
            borderColor: card.borderColor,
          }}
          className="border rounded-full size-16 flex justify-center items-center"
        >
          <span
            style={{ color: card.color }}
            className="text-2xl font-satoshi font-bold"
          >
            {card.number}
          </span>
        </div>

        {/* Title & Description */}
        <h2 className="text-2xl font-satoshi font-bold text-white">
          {card.title}
        </h2>
        <p className="text-center text-[16px] font-medium text-[#D4D4D8]">
          {card.description}
        </p>
      </div>
    </SlideUp>
  );
};

export default ChooseCard;
