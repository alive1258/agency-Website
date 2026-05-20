import React from "react";
import AboutBanner from "../AboutUs/AboutBanner/AboutBanner";
import OurService from "../HomePage/OurService/OurService";
import DigitalFuture from "../HomePage/DigitalFuture/DigitalFuture";
import TrustedBrands from "../HomePage/TrustedBrands/TrustedBrands";
import WhyChoose from "../AboutUs/WhyChoose/WhyChoose";

const ServicePage = () => {
  return (
    <div>
      <AboutBanner />
      <OurService />
      <WhyChoose />
      <TrustedBrands />
      <DigitalFuture status={true} />
    </div>
  );
};

export default ServicePage;
