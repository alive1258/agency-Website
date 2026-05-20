import React from "react";
import SlideLeft from "@/utils/animations/SlideLeft";
import SlideRight from "@/utils/animations/SlideRight";
import Image from "next/image";

const ChooseCard = ({ feature, index, delay = 0 }) => {
  const SlideComponent = index % 2 === 0 ? SlideLeft : SlideRight;
  return (
    <SlideComponent
      delay={delay}
      className={`${index % 2 === 0 ? "md:border-r" : ""} ${
        index < 4 ? "border-b" : ""
      } border-[#27272A] p-6`}
    >
      <div className="flex items-center space-x-3">
        <Image
          src="/images/footer/footerLogo.png"
          alt="logo"
          width={13}
          height={20}
        />
        <h1 className="text-[#FAFAFA] text-lg font-satoshi font-bold">
          {feature.title}
        </h1>
      </div>
      <div
        style={{
          background:
            "linear-gradient(90deg, #818181 -0.2%, rgba(0, 0, 0, 0.00) 101.03%)",
        }}
        className="h-1 w-2/4 mt-4"
      ></div>
      <p className="text-white mt-4">{feature.description}</p>
    </SlideComponent>
  );
};

export default ChooseCard;
