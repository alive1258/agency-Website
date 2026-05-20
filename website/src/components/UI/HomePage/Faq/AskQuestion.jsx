import React from "react";
import Button from "../../Button/Button";
import ZoomIn from "@/utils/animations/ZoomIn";
import Image from "next/image";
import Link from "next/link";

const AskQuestion = () => {
  return (
    <ZoomIn className="h-fit  border border-border-base rounded-lg bg-[#F4F4F5] px-4 py-6 w-full ">
      <div className="flex justify-center ">
        <div className="flex  md:w-[172px] md:h-[172px] h-[168px]  w-[168px] p-[14px] items-center gap-[8px] rounded-full bg-[linear-gradient(357deg,_#FFF_2.79%,_#D9E2FF_97.39%)]">
          <div className="flex animate-[floatPulse_2s_ease-in-out_infinite] md:w-[144px] w-[136px] md:h-[144px] h-[136px] py-[48px] justify-center items-center shrink-0 rounded-full border border-white bg-[linear-gradient(85deg,_#2154FF_0%,_#5079FF_100%)]">
            <Image
              src="/images/footer/serviceIcon.png"
              alt="logo"
              width={31}
              height={48}
            />
          </div>
        </div>
      </div>

      <h3 className="text-secondary-base mt-8 font-satoshi font-bold text-2xl text-center">
        Ask Any Questions
      </h3>
      <p className="text-tertiary-base mt-8  text-[16px] text-center">
        Have questions about our services? Find quick answers below! If you need
        further assistance, feel free to contact us.
      </p>
      <div className="mt-8 flex justify-center uppercase">
        <Link href="/contact">
          <Button content="ask any question" />
        </Link>
      </div>
    </ZoomIn>
  );
};

export default AskQuestion;
