import React from "react";
import SlideLeft from "@/utils/animations/SlideLeft";
import SlideRight from "@/utils/animations/SlideRight";
import SlideUp from "@/utils/animations/SlideUp";
import Image from "next/image";
import Points from "./Points";

const TrendsCard = ({ index, delay = 0, trend }) => {
  return (
    <section key={trend?.id} className={`mt-${index === 0 ? "24" : "14"}`}>
      {/* ========== START: IMAGE LAYOUT ==========
           REVERSES ORDER BASED ON trend.reverse */}
      <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
        {!trend?.reverse ? (
          <>
            <SlideUp delay={delay} className="md:col-span-2">
              <Image
                className="w-full h-full md:max-h-[480px] rounded-2xl"
                src={trend?.images[0]}
                alt="TREND IMAGE 1"
                width={500}
                height={500}
              />
            </SlideUp>
            <SlideUp delay={delay} className="md:col-span-1">
              <Image
                className="w-full h-full md:max-h-[480px] rounded-2xl"
                src={trend?.images[1]}
                alt="TREND IMAGE 2"
                width={500}
                height={500}
              />
            </SlideUp>
          </>
        ) : (
          <>
            <SlideUp delay={delay} className="md:col-span-1">
              <Image
                className="w-full h-full md:max-h-[480px] rounded-2xl"
                src={trend?.images[0]}
                alt="TREND IMAGE 1"
                width={500}
                height={500}
              />
            </SlideUp>
            <SlideUp delay={delay} className="md:col-span-2">
              <Image
                className="w-full h-full md:max-h-[480px] rounded-2xl"
                src={trend?.images[1]}
                alt="TREND IMAGE 2"
                width={500}
                height={500}
              />
            </SlideUp>
          </>
        )}
      </div>
      {/* ========== END: IMAGE LAYOUT ========== */}

      {/* ========== START: TEXT CONTENT ========== */}
      <div className="mt-11">
        <SlideRight>
          <h1 className="text-2xl text-primary-base font-satoshi font-bold">
            {trend?.title}
          </h1>
        </SlideRight>

        <div className="mt-6 space-y-4">
          {trend?.points?.map((point, index) => (
            <Points point={point} key={index} delay={index * 0.4} />
          ))}
        </div>

        <div className="mt-14">
          <SlideUp>
            <p className="text-[20px]  text-tertiary-base">
              {trend?.description}
            </p>
          </SlideUp>
        </div>
      </div>
      {/* ========== END: TEXT CONTENT ========== */}
    </section>
  );
};

export default TrendsCard;
