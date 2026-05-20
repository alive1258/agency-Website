"use client";
import React, { useState } from "react";
import QuestionDetails from "./QuestionDetails";
import { serviceDetailsFaqs } from "@/utils/fakeData/serviceDetailsFaqsData";

const Questions = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const handleAccordionClick = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className=" ">
      {serviceDetailsFaqs?.length &&
        serviceDetailsFaqs?.map((accordion, index) => (
          <QuestionDetails
            key={index}
            delay={index * 0.4}
            index={index}
            accordion={accordion}
            isActive={activeIndex === index}
            onClick={() => handleAccordionClick(index)}
          />
        ))}
    </div>
  );
};

export default Questions;
