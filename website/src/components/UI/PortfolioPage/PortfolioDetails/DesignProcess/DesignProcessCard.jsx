import SlideUp from "@/utils/animations/SlideUp";
import Image from "next/image";
import React from "react";

const DesignProcessCard = ({ feature, idx, delay = 0 }) => {
  return (
    <SlideUp
      delay={delay}
      className="grid lg:grid-cols-2 grid-cols-1 gap-10 items-center"
    >
      {/* Content Side */}
      <div className={`${idx % 2 !== 0 ? "md:order-2" : "md:order-1"}`}>
        <h1 className="text-2xl font-satoshi font-bold text-primary-base">
          {feature?.main_title}
        </h1>

        {feature?.steps?.map((step, i) => (
          <div key={i} className="flex gap-x-4 mt-6 items-start">
            <Image
              className="mt-2 "
              src="/images/footer/footerLogo.png"
              alt="logo"
              width={18} // fallback size
              height={20}
            />

            <div>
              <h5 className="text-[20px] font-satoshi font-bold text-primary-base">
                {step?.title}
              </h5>
              <p className="text-lg text-primary-base">{step?.description}</p>
            </div>
          </div>
        ))}

        {/* Tools */}
        <div
          style={{
            background:
              "linear-gradient(90deg, #3B82F6 0.04%, rgba(255, 255, 255, 0.00) 98.09%)",
          }}
          className="mt-12"
        >
          <h5 className="text-[20px]  text-white px-4 py-2">Tools Used:</h5>
        </div>

        <div className="mt-6 flex flex-wrap gap-6 items-center">
          {feature?.tools?.map((tool, idx) => (
            <div key={idx} className="flex items-center space-x-2">
              <Image
                height={24}
                width={24}
                src={tool?.icon}
                alt={tool?.name}
                className="w-6 h-6"
              />
              <span className="text-primary-base text-lg ">{tool?.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Image Side */}
      <div className={`group ${idx % 2 !== 0 ? "md:order-1" : "md:order-2"}`}>
        <div className="relative overflow-hidden rounded-2xl">
          <Image
            className="w-full   max-h-[550px] rounded-2xl shadow-lg hover:scale-105 duration-500 overflow-hidden ease-[cubic-bezier(0.4,0,0.2,1)] transition-transform object-cover h-full"
            src={feature?.image}
            alt={feature?.main_title}
            width={500}
            height={400}
          />
        </div>
      </div>
    </SlideUp>
  );
};

export default DesignProcessCard;
