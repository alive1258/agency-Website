import React from "react";
import BadgeLabel from "../../BadgeLabel/BadgeLabel";
import Button from "../../Button/Button";
import Link from "next/link";
import { teamMembers } from "@/utils/fakeData/teamMembers";
import TeamMemberCard from "./TeamMemberCard";
import SlideUp from "@/utils/animations/SlideUp";

const MeetOurTeam = ({ status = false }) => {
  return (
    <section className="bg-[#FAFAFA] relative">
      {/* ========================== START: CONTAINER ========================== */}
      <div className="container py-14">
        <BadgeLabel text="Meet Our Team" />

        {/* ========================== START: HEADER TEXT SUBTITLE ========================== */}

        <SlideUp>
          <h1 className="animated-header">The Creative Minds Behind Solvex</h1>
        </SlideUp>

        <SlideUp>
          <p className="text-[16px] font-medium text-[#71717A] mt-6 text-center w-full max-w-[520px] mx-auto">
            We are a diverse group of designers, strategists, and developers,
            united by a shared passion for building transformative digital
            experiences.
          </p>
        </SlideUp>
        {/* ========================== END: SUBTITLE & SUBTITLE ========================== */}

        {/* ========================== START: TEAM GRID ========================== */}
        <div className="mt-14 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-6">
          {(status ? teamMembers?.slice(0, 8) : teamMembers).map(
            (member, index) => (
              <TeamMemberCard
                key={index}
                member={member}
                delay={index * 0.4} // STAGGERED ANIMATION DELAY
              />
            )
          )}
        </div>
        {/* ========================== END: TEAM GRID ========================== */}

        {/* ========================== START: CTA BUTTON ========================== */}
        <div className="mt-14 flex justify-center uppercase">
          {status === true ? (
            <Link href="/team">
              <Button content="View All Team Members" />
            </Link>
          ) : (
            <Button content="See More Team Members" />
          )}
        </div>
        {/* ========================== END: CTA BUTTON ========================== */}
      </div>
      {/* ========================== END: CONTAINER ========================== */}
    </section>
  );
};

export default MeetOurTeam;
