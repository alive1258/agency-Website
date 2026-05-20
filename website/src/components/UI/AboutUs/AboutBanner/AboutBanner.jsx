"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiArrowRightSLine } from "@remixicon/react";

const formatSegment = (segment) => {
  return segment
    .replaceAll("-", " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const AboutBanner = () => {
  const pathname = usePathname();

  // SPLIT PATH INTO SEGMENTS (e.g. /about/team => ['about', 'team'])
  const pathSegments = pathname.split("/").filter(Boolean);

  return (
    <div className="about-us-section-bg h-[150px] md:h-[338px]">
      {/* OVERLAY */}
      <div className="bg-[#000] opacity-70 w-full h-full">
        <div className="container flex justify-center items-center h-full">
          <div className="z-50 text-center text-white">
            {/* ========== PAGE TITLE START ========== */}
            <h1 className="text-[#FAFAFA] text-center uppercase font-extrabold text-[28px] md:text-[48px]">
              {formatSegment(pathSegments[pathSegments.length - 1] || "Home")}
            </h1>
            {/* ========== PAGE TITLE END ========== */}

            {/* ========== BREADCRUMB START ========== */}
            <div className="flex justify-center items-center mt-3">
              <div className="bg-[#27272A] px-4 py-2 rounded-3xl flex items-center space-x-2 w-fit">
                {/* HOME LINK */}
                <Link href="/">
                  <span className="text-[#A1A1AA] text-[16px] ">Home</span>
                </Link>

                {/* DYNAMIC PATH LINKS */}
                {pathSegments?.map((segment, index) => {
                  const href = "/" + pathSegments.slice(0, index + 1).join("/");
                  const isLast = index === pathSegments.length - 1;

                  return (
                    <div key={index} className="flex items-center space-x-2">
                      <RiArrowRightSLine size={22} />

                      {isLast ? (
                        <span className="text-[#FAFAFA] text-[16px] ">
                          {formatSegment(segment)}
                        </span>
                      ) : (
                        <Link href={href}>
                          <span className="text-[#A1A1AA] text-[16px]  hover:underline">
                            {formatSegment(segment)}
                          </span>
                        </Link>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            {/* ========== BREADCRUMB END ========== */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutBanner;
