import SlideUp from "@/utils/animations/SlideUp";
import Image from "next/image";
import React from "react";

const TeamMemberCard = ({ member, delay = 0 }) => {
  return (
    <SlideUp delay={delay}>
      <div className="group relative w-full cursor-pointer">
        {/* Image with rounded corners */}
        <Image
          className="rounded-xl w-full"
          src={member?.image}
          alt={member?.name}
          height={375}
          width={312}
        />

        {/* Name and designation */}
        <div className="absolute inset-0 flex flex-row left-0 pb-6 pl-6 rounded-xl items-end opacity-0 group-hover:opacity-100 group-hover:bg-gradient-to-b group-hover:from-transparent group-hover:to-black group-hover:text-[#FAFAFA] transition-opacity duration-300">
          <div>
            <h3 className="text-2xl font-black uppercase text-[#FAFAFA]">
              {member?.name}
            </h3>
            <p className="text-[16px]  text-[#FAFAFA]">{member?.role}</p>
          </div>
        </div>
      </div>
    </SlideUp>
  );
};

export default TeamMemberCard;
