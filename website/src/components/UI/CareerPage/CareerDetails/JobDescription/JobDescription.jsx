import React from "react";
import Button from "@/components/UI/Button/Button";
import { jobDescriptionData } from "@/utils/fakeData/jobDescriptionData";
import JobDescriptionCard from "./JobDescriptionCard";
import SlideUp from "@/utils/animations/SlideUp";
import SlideRight from "@/utils/animations/SlideRight";

const JobDescription = () => {
  return (
    <section className="container my-16">
      {/* =================== JOB DESCRIPTION HEADER START =================== */}
      <div>
        <h1 className="text-2xl text-primary-base font-satoshi font-bold">
          Job Description
        </h1>
        <p className="text-[20px] font-medium text-tertiary-base mt-6">
          {jobDescriptionData?.intro}
        </p>
      </div>
      {/* =================== JOB DESCRIPTION HEADER END ===================== */}

      {/* =================== JOB DESCRIPTION SECTIONS START ================= */}
      <div>
        {jobDescriptionData?.sections?.map((section, index) => (
          <div className="mt-14" key={index}>
            {/* SECTION TITLE */}
            <SlideRight>
              <h1 className="text-2xl font-satoshi font-bold text-primary-base">
                {section?.title}
              </h1>
            </SlideRight>

            {/* SECTION ITEMS */}
            <div className="mt-6 space-y-4">
              {section?.items?.map((item, index) => (
                <JobDescriptionCard
                  item={item}
                  key={index}
                  delay={index * 0.4}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* =================== JOB DESCRIPTION SECTIONS END =================== */}

      {/* =================== APPLY BUTTON START ============================= */}
      <div className="mt-8">
        <SlideUp>
          <Button content="Apply Now" />
        </SlideUp>
      </div>
      {/* =================== APPLY BUTTON END =============================== */}
    </section>
  );
};

export default JobDescription;
