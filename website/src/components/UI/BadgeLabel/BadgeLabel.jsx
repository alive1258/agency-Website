import SlideUp from "@/utils/animations/SlideUp";
import Image from "next/image";

const BadgeLabel = ({ text }) => {
  return (
    <SlideUp className="border border-[#D4D4D8] bg-white py-2 pl-2 pr-4 rounded-full w-fit mx-auto">
      <div className="flex items-center gap-x-2">
        <div className="border border-[#3B82F6] bg-[#BFDBFE] flex justify-center items-center rounded-full size-7">
          <Image
            className=""
            src="/images/footer/footerLogo.png"
            height={14}
            width={9}
            alt="logo"
          />
        </div>
        <p className="text-[#71717A] text-sm uppercase ">{text}</p>
      </div>
    </SlideUp>
  );
};

export default BadgeLabel;
