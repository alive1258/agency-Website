"use client";
import React from "react";
import Image from "next/image";
import BadgeLabel from "../../BadgeLabel/BadgeLabel";
import SlideUp from "@/utils/animations/SlideUp";
import StatsCard from "./StatsCard";
import { stats } from "@/utils/fakeData/starsData";

const AboutWhoWeAre = () => {
  return (
    <section className="container my-14">
      <BadgeLabel text="Who We Are" />

      {/* ========== START HEADER TEXT ========== */}

      <SlideUp>
        <h1 className="animated-header">
          A Passionate Team of Innovators & Developers.
        </h1>
      </SlideUp>
      <SlideUp>
        <p className="text-[16px] font-medium text-[#71717A] mt-6 text-center max-w-[520px] mx-auto">
          We are a team of dedicated professionals committed to building digital
          solutions that help businesses thrive. With years of experience, we
          deliver cutting-edge websites, applications, and UI/UX designs
          tailored to our clients' needs.
        </p>
      </SlideUp>
      {/* ========== END HEADER TEXT ========== */}

      {/* ========== START TEAM IMAGE ========== */}
      <div className="mt-14">
        <Image
          src="/images/workGallery/team.png"
          alt="Our Team"
          width={1000}
          height={1100}
          quality={90}
          className="object-cover rounded-2xl md:h-[550px] w-full"
        />
      </div>
      {/* ========== END TEAM IMAGE ========== */}

      {/* ========== START STATS SECTION ========== */}
      <div className="md:flex items-start mt-14 space-x-6 md:space-y-0 space-y-12">
        {stats?.map((stat, index) => (
          <StatsCard key={stat.id} stat={stat} index={index} stats={stats} />
        ))}
      </div>
      {/* ========== START STATS SECTION ========== */}
    </section>
  );
};

export default AboutWhoWeAre;
