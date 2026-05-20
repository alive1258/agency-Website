import SlideRight from "@/utils/animations/SlideRight";
import {
  RiAddLine,
  RiArrowDownLongLine,
  RiArrowUpLongLine,
  RiSubtractLine,
} from "@remixicon/react";

const QuestionDetails = ({
  accordion,
  isActive,
  onClick,
  index,
  delay = 0,
}) => {
  return (
    <SlideRight
      delay={delay}
      className="flex items-center space-x-4  justify-baseline w-full"
    >
      <div
        className={`max-w-[805px] w-full border-b border-[#D4D4D8] duration-300 transition-all ease-in-out hover:bg-[#F4F4F5]  py-6 px-2`}
      >
        <div
          className={` font-medium cursor-pointer  rounded-lg duration-150 `}
          onClick={onClick}
        >
          <div className="flex items-center justify-between">
            <h1
              className={`text-tertiary-base font-satoshi font-bold text-[18px] md:text-2xl`}
            >
              <span className="mr-1">0{index + 1}.</span>
              <span>{accordion?.question}</span>
            </h1>

            <div
              className={`${
                isActive ? "bg-[#2154FF] text-white" : "bg-[#F4F4F5] text-black"
              } md:flex hidden cursor-pointer border w-14 aspect-square flex-shrink-0 justify-center items-center border-border-base rounded-full`}
            >
              {isActive ? <RiArrowUpLongLine /> : <RiArrowDownLongLine />}
            </div>
          </div>
        </div>
        {isActive && (
          <div className="flex gap-1.5 md:gap-3 pt-4 ">
            <h6 className="text-[16px] text-tertiary-base pr-4">
              {accordion?.answer}
            </h6>
          </div>
        )}
      </div>
    </SlideRight>
  );
};

export default QuestionDetails;
