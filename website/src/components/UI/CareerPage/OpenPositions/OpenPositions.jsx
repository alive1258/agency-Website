import { jobData } from "@/utils/fakeData/jobData";
import React from "react";
import OpenPositionsCard from "./OpenPositionsCard";

const OpenPositions = () => {
  return (
    <section className="container my-14">
      <div
        style={{
          background:
            "linear-gradient(90deg, rgba(255, 255, 255, 0.00) 0.06%, #3B82F6 26.53%, #3B82F6 68.99%, rgba(255, 255, 255, 0.00) 99.96%)",
        }}
      >
        <h1 className="md:text-2xl text-[16px] font-satoshi font-bold text-[#FFF] py-3 text-center">
          Open Positions — Join Our Team at Solvex!
        </h1>
      </div>

      <div className="mt-16 grid md:grid-cols-2 grid-cols-1 gap-6">
        {jobData?.map((job, index) => (
          <OpenPositionsCard
            job={job}
            index={index}
            key={index}
            delay={index * 0.4}
          />
        ))}
      </div>
    </section>
  );
};

export default OpenPositions;
