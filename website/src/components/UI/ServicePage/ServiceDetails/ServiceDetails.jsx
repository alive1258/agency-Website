import React from "react";

import CustomSolutions from "./CustomSolutions/CustomSolutions";
import OurSolutions from "./OurSolutions/OurSolutions";
import DigitalFuture from "../../HomePage/DigitalFuture/DigitalFuture";
import PricingPlans from "../../HomePage/PricingPlans/PricingPlans";
import ChooseSolves from "./ChooseSolves/ChooseSolves";
import OurWorkflow from "./OurWorkflow/OurWorkflow";
import Technologies from "./Technologies/Technologies";
import ServiceDetailsBanner from "./ServiceDetailsBanner/ServiceDetailsBanner";

const ServiceDetails = () => {
  return (
    <>
      <ServiceDetailsBanner />
      <CustomSolutions />
      <OurSolutions />
      <ChooseSolves />
      <OurWorkflow />
      <Technologies />
      <PricingPlans />
      <DigitalFuture />
    </>
  );
};

export default ServiceDetails;
