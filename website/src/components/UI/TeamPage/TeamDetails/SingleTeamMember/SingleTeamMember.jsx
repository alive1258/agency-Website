import React from "react";
import ShareSocialLink from "@/components/common/ShareSocialLink";
import Image from "next/image";

const SingleTeamMember = () => {
  // START: FEATURE SKILL LIST
  const features = [
    "User Interface Design",
    "User Experience Research",
    "Prototyping (Figma, Adobe XD)",
    "Wireframing & Interaction Design",
  ];
  // END: FEATURE SKILL LIST

  return (
    <div className="relative overflow-hidden w-full">
      {/* START: BACKGROUND SVG DECORATION */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="371"
        height="883"
        viewBox="0 0 371 683"
        fill="none"
        className="absolute hidden md:block"
        style={{
          width: "312px",
          height: "989px",
          transform: "rotate(5deg)",
          position: "absolute",
          right: "0px",
          top: "-250px",
          fill: "white",
          opacity: 0.3,
          zIndex: 0,
        }}
      >
        <path
          opacity="0.3"
          d="M306.5 -167L576.7 -11L0.564062 682.897L306.5 -167Z"
          fill="white"
        />
      </svg>
      {/* END: BACKGROUND SVG DECORATION */}

      {/* START: BLUR EFFECT BACKGROUND */}
      <div className="hidden md:block blue-blur-circle-team"></div>
      {/* END: BLUR EFFECT BACKGROUND */}

      {/* START: MAIN CONTAINER */}
      <div className="container py-14 grid md:grid-cols-2 grid-cols-1 gap-6">
        {/* START: TEAM MEMBER IMAGE WITH FRAME */}
        <div className="relative inline-block">
          {/* Background Frame Image */}
          <div
            className="absolute mt-4 left-4/12 top-4/12 -translate-x-1/2 -translate-y-1/2 w-[297px] h-[462px] bg-no-repeat bg-cover bg-center z-0"
            style={{ backgroundImage: "url('/images/team/frame.png')" }}
          ></div>

          {/* Actual Profile Image */}
          <Image
            className="rounded-2xl relative z-10"
            src="/images/team/singleTeam.png"
            alt="Team Member"
            width={536}
            height={598}
          />
        </div>
        {/* END: TEAM MEMBER IMAGE WITH FRAME */}

        {/* START: TEAM MEMBER INFO */}
        <div>
          {/* Name & Role */}
          <h1 className="text-[32px] font-satoshi font-bold text-primary-base">
            Sarah Lee
          </h1>
          <p className="text-lg  text-primary-base">Lead UI/UX Designer</p>

          {/* Bio */}
          <p className="text-[16px]  text-[#71717A] mt-8">
            Sarah is a creative powerhouse with over 6 years of experience in
            designing intuitive user interfaces and seamless user experiences.
            She specializes in turning complex ideas into clean, user-centric
            designs that drive engagement and conversions.
          </p>

          {/* START: SKILL FEATURES */}
          <div className="mt-12 space-y-7">
            {features?.map((title, index) => (
              <div key={index} className="flex items-center space-x-3">
                <Image
                  src="/images/footer/footerLogo.png"
                  alt="Check Icon"
                  width={13}
                  height={20}
                />
                <h1 className="text-primary-base text-lg font-satoshi font-bold">
                  {title}
                </h1>
              </div>
            ))}
          </div>
          {/* END: SKILL FEATURES */}

          {/* START: SOCIAL LINKS */}
          <div className="mt-16">
            <h2 className="text-lg font-satoshi font-bold text-primary-base">
              Social Link
            </h2>

            {/* Gradient Line */}
            <div
              className="absolute w-full mt-4 h-[2px] max-w-[617px]"
              style={{
                background:
                  "linear-gradient(85deg, #2154FF 0%, rgba(255, 255, 255, 0.00) 100%)",
              }}
            ></div>

            {/* Social Icons */}
            <div className="md:mt-8 mt-10">
              <ShareSocialLink />
            </div>
          </div>
          {/* END: SOCIAL LINKS */}
        </div>
        {/* END: TEAM MEMBER INFO */}
      </div>
      {/* END: MAIN CONTAINER */}
    </div>
  );
};

export default SingleTeamMember;
