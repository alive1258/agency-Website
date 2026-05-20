import SlideRight from "@/utils/animations/SlideRight";
import { RiAddLine, RiSubtractLine } from "@remixicon/react";

const Accordion = ({ accordion, isActive, onClick, delay = 0 }) => {
  return (
    <SlideRight
      delay={delay}
      className="flex md:items-center gap-y-2 md:gap-y-0 gap-x-2 w-full"
    >
      {/* Content Section */}
      <div
        className={`rounded-lg w-full bg-[#F4F4F5] p-4 ${
          isActive
            ? "border-2 border-[#2154FF]"
            : "border-2 border-transparent hover:border-[#2154FF]"
        }`}
      >
        <div
          className={`font-medium cursor-pointer rounded-lg duration-150 ${
            isActive ? "" : "text-secondary-base group"
          }`}
          onClick={onClick}
        >
          <h1
            className={`md:text-[20px] text-[18px] ${
              isActive ? "border-b pb-1 border-[#D4D4D8]" : ""
            } font-satoshi font-bold text-secondary-base`}
          >
            {accordion?.question}
          </h1>
        </div>
        {isActive && (
          <div className="flex gap-1.5 md:gap-3 pt-4">
            <h6 className="text-[16px] text-tertiary-base pr-4">
              {accordion?.answer}
            </h6>
          </div>
        )}
      </div>

      {/* Icon Button  */}
      <div
        className="bg-[#F4F4F5] md:flex hidden cursor-pointer border w-14 aspect-square flex-shrink-0 justify-center items-center border-border-base rounded-full"
        onClick={onClick}
      >
        {!isActive ? <RiAddLine /> : <RiSubtractLine />}
      </div>
    </SlideRight>
  );
};

export default Accordion;
