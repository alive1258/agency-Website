import React from "react";
import BadgeLabel from "../../BadgeLabel/BadgeLabel";
import Image from "next/image";
import Button from "../../Button/Button";
import FeatureCard from "./FeatureCard";
import SlideUp from "@/utils/animations/SlideUp";
import { features } from "@/utils/fakeData/featuresData";
import ZoomIn from "@/utils/animations/ZoomIn";
import Link from "next/link";

const WhoWeAre = () => {
  return (
    <div className="relative md:mt-14 mt-12 md:overflow-hidden">
      {/* BLURRED BLUE CIRCLE */}
      <div className="absolute md:block hidden blurred-blue-circle"></div>

      {/* BOTTOM GRADIENT LINE */}
      <div className="absolute md:block hidden bottom-gradient-line"></div>

      <div className="container md:px-20 px-5">
        <BadgeLabel text="Who We Are" />

        <SlideUp>
          <h1 className="animated-header">
            A Passionate Team of Innovators & Developers
          </h1>
        </SlideUp>

        <SlideUp>
          <p className="primary-paragraph">
            We are a team of dedicated professionals committed to building
            digital solutions that help businesses thrive. With years of
            experience, we deliver cutting-edge websites, applications, and
            UI/UX
          </p>
        </SlideUp>

        <div className="my-14 grid md:grid-cols-2 gap-x-6">
          {/* START TEAM IMAGE WITH ZOOM EFFECT */}
          <ZoomIn>
            <Image
              src="/images/workGallery/team.png"
              alt="workGallery1"
              width={1000}
              height={1100}
              quality={90}
              className="rounded-2xl md:h-[460px]"
            />
          </ZoomIn>
          {/* END TEAM IMAGE WITH ZOOM EFFECT */}

          <div className="grid md:mt-0 mt-10 md:grid-cols-2 grid-cols-1 gap-x-5 md:gap-y-5 gap-y-10">
            {/* MAPPING THROUGH FEATURES DATA */}
            {features?.map((feature, index) => (
              <FeatureCard
                key={feature.id}
                feature={feature}
                delay={index * 0.3}
              />
            ))}
            {/* END MAPPING THROUGH FEATURES DATA */}

            <SlideUp className="pt-1 uppercase md:block  flex  justify-center">
              <Link href="/contact">
                <Button content="get started now" />
              </Link>
            </SlideUp>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhoWeAre;
