import React from "react";
import AboutBanner from "./AboutBanner/AboutBanner";
import AboutWhoWeAre from "./AboutWhoWeAre/AboutWhoWeAre";
import Testimonials from "../HomePage/Testimonials/Testimonials";
import DigitalFuture from "../HomePage/DigitalFuture/DigitalFuture";
import WhyChoose from "./WhyChoose/WhyChoose";
import MeetOurTeam from "./MeetOurTeam/MeetOurTeam";

const AboutUs = () => {
  return (
    <>
      <AboutBanner />
      <AboutWhoWeAre />
      <WhyChoose />
      <MeetOurTeam status={true} />
      <Testimonials />
      <DigitalFuture />
    </>
  );
};

export default AboutUs;
