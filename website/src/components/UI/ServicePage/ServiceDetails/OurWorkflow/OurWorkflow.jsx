import React from "react";
import WorkFlowCard from "./WorkFlowCard";
import { workflowData } from "@/utils/fakeData/workFlowData";

const OurWorkflow = () => {
  return (
    <div className="container py-14">
      <h1 className="md:text-[40px] text-[32px] font-satoshi font-bold md:text-start text-center text-secondary-base">
        Our Web Development Workflow
      </h1>
      <div className="grid lg:grid-cols-3 mt-12 md:grid-cols-2 grid-cols-1 md:gap-10">
        {workflowData?.map((step, index) => (
          <WorkFlowCard
            key={index}
            delay={index * 0.4}
            step={step}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default OurWorkflow;
