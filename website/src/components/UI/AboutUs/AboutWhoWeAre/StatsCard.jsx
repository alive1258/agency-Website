import ScrollCountUp from "@/components/common/ScrollCountUp";
import React from "react";

const StatsCard = ({ stat, index, stats }) => {
  return (
    <>
      {/* ========== START STAT CARD ========== */}
      <div className="w-full md:text-start text-center md:ml-10">
        <ScrollCountUp
          numericCount={parseInt(stat?.count)}
          hasPlus={stat?.count.includes("+")}
        />

        <h3 className="text-secondary-base md:text-[20px] text-lg font-satoshi font-bold uppercase mt-4">
          {stat.title}
        </h3>
        <p className="text-[#71717A] text-sm  mt-4">{stat.description}</p>
      </div>
      {/* ========== END STAT CARD ========== */}

      {/* ========== GRADIENT DIVIDER (Except Last Card) ========== */}
      {index !== stats.length - 1 && (
        <div
          className="w-1 h-48 mt-4 md:block hidden"
          style={{
            background:
              "linear-gradient(180deg, #27272A 0%, rgba(0, 0, 0, 0) 100%)",
          }}
        ></div>
      )}
    </>
  );
};

export default StatsCard;
