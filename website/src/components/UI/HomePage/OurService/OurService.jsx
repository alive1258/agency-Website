import React from "react";
import BadgeLabel from "../../BadgeLabel/BadgeLabel";
import ServiceCard from "./ServiceCard";
import SlideUp from "@/utils/animations/SlideUp";
import { servicesData } from "@/utils/fakeData/servicesData";

const OurService = ({ status = false }) => {
  // decide how many services to show
  const displayedServices = status ? servicesData?.slice(0, 4) : servicesData;
  return (
    <section
      className={`bg-[#F4F4F5] overflow-hidden w-full ${
        status === true ? "md:mt-40 mt-20" : "mt-0"
      }   relative`}
    >
      <div className="bottom-gradient-line"></div>
      <div className="custom-gradient-line"></div>

      <div className="container md:py-16 py-12">
        {/* START: Badge and Animated Header */}
        <BadgeLabel text="Our Services" />

        <SlideUp>
          <h1 className="animated-header">Our Expertise in Web Development</h1>
        </SlideUp>
        {/* END: Badge and Animated Header */}

        <SlideUp>
          <p className="primary-paragraph">
            From responsive websites to complex web applications, we turn ideas
            into interactive digital experiences. We blend design and technology
            to deliver measurable results.
          </p>
        </SlideUp>

        {/* START: Services Grid */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-x-6 gap-y-8 mt-14 place-items-center">
          {displayedServices?.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              delay={index * 0.4}
            />
          ))}
        </div>
        {/* END: Services Grid */}
      </div>
    </section>
  );
};

export default OurService;
