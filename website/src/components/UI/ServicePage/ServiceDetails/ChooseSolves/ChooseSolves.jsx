import { cardData } from "@/utils/fakeData/ChooseSolvesCardData";
import React from "react";
import ChooseCard from "./ChooseCard";
import SlideUp from "@/utils/animations/SlideUp";

const ChooseSolves = () => {
  return (
    <div className="bg-[#18181B] mt-14">
      <div className="container py-14">
        <SlideUp>
          <h1 className="md:text-[40px] text-[34px] font-satoshi font-bold text-[#FFF] max-w-[550px] mx-auto text-center">
            Why Choose Solvex for Web Development
          </h1>
        </SlideUp>

        <div className="mt-14 flex flex-col items-center justify-center space-y-6 md:flex-row md:space-x-6 md:space-y-0 flex-wrap">
          {cardData?.map((card, index) => (
            <ChooseCard card={card} key={card.id} delay={index * 0.4} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChooseSolves;
