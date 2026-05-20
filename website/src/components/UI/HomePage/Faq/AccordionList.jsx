"use client";
import React, { useState } from "react";
import Accordion from "./Accordion";
import { faqs } from "@/utils/fakeData/faqData";

const AccordionList = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const handleAccordionClick = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="space-y-4 ">
      {faqs?.length &&
        faqs?.map((accordion, index) => (
          <Accordion
            key={index}
            delay={index * 0.4}
            accordion={accordion}
            isActive={activeIndex === index}
            onClick={() => handleAccordionClick(index)}
          />
        ))}
    </div>
  );
};

export default AccordionList;
