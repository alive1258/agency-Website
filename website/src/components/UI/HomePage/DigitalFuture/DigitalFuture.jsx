import React from "react";
import Image from "next/image";
import SlideUp from "@/utils/animations/SlideUp";
import { RiArrowRightUpLine } from "@remixicon/react";
import Link from "next/link";

const DigitalFuture = ({ status = true }) => {
  // === ANIMATION DELAY TIMINGS ===
  const titleDelay = 0.1;
  const paragraphDelay = 0.3;
  const buttonDelay = 0.6;

  return (
    <div className="bg-[#EFF6FF] relative overflow-hidden w-full">
      {/* GRADIENT LINE DECORATION */}
      <div className="custom-gradient-line"></div>

      {/* =======================START MAIN CONTENT AREA ======================= */}

      <div className="py-12 container mx-auto">
        {/* CTA CARD */}
        <div
          className="md:p-8 px-6 overflow-hidden text-white relative"
          style={{
            borderRadius: "16px",
            background: "linear-gradient(85deg, #2154FF 0%, #5079FF 100%)",
          }}
        >
          {/* DECORATIVE IMAGE (HIDDEN ON SMALL SCREENS) */}
          <div className="absolute md:block hidden top-0 right-0">
            <Image
              className="rounded-2xl"
              src="/images/digitalFuture/decorativeElements.png"
              alt="Decorative Elements"
              height={455}
              width={402}
            />
          </div>

          <div className="flex justify-center md:py-20 py-16">
            <div className="text-white-base text-center">
              {/* === START TITLE SECTION === */}
              <SlideUp delay={titleDelay}>
                <div className="md:text-[32px] text-2xl font-black">
                  {status ? (
                    <SlideUp>
                      <h1 className="text-[#FAFAFA] md:text-[32px] text-[28px] font-black">
                        Work With Solvex – Let’s Build Your Digital Future!
                      </h1>
                    </SlideUp>
                  ) : (
                    <SlideUp>
                      <h1 className="text-[#FAFAFA] text-[32px] font-black">
                        Your Vision + Our Team = Digital Magic
                      </h1>
                    </SlideUp>
                  )}
                </div>
              </SlideUp>
              {/* === END TITLE SECTION === */}

              {/* === START PARAGRAPH TEXT === */}
              <SlideUp
                delay={paragraphDelay}
                className="mt-5  text-[16px] w-full max-w-[430px] mx-auto"
              >
                <p>
                  {status
                    ? "Your business deserves a winning digital solution. Let's collaborate and create something extraordinary."
                    : "Let’s connect and create something groundbreaking. Join forces with Solvex today."}
                </p>
              </SlideUp>
              {/* === END PARAGRAPH TEXT === */}

              <SlideUp
                delay={buttonDelay}
                className="mt-12 flex justify-center items-center"
              >
                <Link href="/contact">
                  <button className="flex space-x-2 group uppercase  text-[16px] cursor-pointer h-14 px-6 py-4 justify-center items-center gap-1 rounded-full hover:bg-[#131313] bg-[#000] text-white-base hover:opacity-90">
                    <span>Free Consultation</span>
                    <RiArrowRightUpLine
                      className="transform transition-all duration-300 ease-in-out group-hover:rotate-45"
                      size={24}
                    />
                  </button>
                </Link>
              </SlideUp>
            </div>
          </div>
        </div>
      </div>

      {/* ======================= END MAIN CONTAINER ======================= */}
    </div>
  );
};

export default DigitalFuture;
