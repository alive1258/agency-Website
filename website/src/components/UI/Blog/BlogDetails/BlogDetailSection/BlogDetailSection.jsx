"use client";
import React from "react";
import ZoomIn from "@/utils/animations/ZoomIn";
import Image from "next/image";

const BlogDetailSection = () => {
  return (
    <section className="container my-20">
      {/* ========== START: BLOG HERO SECTION ========== */}
      <ZoomIn>
        <div
          className="relative w-full h-[550px] md:h-[700px] rounded-2xl overflow-hidden bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/blogDetails/blogD1.png')",
          }}
        >
          {/* GRADIENT OVERLAY FOR DARKENING THE BACKGROUND */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-80"></div>

          {/* TEXT CONTENT OVERLAYED ON BACKGROUND */}
          <div className="absolute md:bottom-14 bottom-10 md:left-14 left-4 md:right-14 z-10">
            <div>
              {/* CATEGORY TAG */}
              <div className="flex w-fit items-center justify-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-zinc-800/20 backdrop-blur-sm">
                <p className="text-white text-sm">WEB DEVELOPER</p>
              </div>

              {/* BLOG TITLE */}
              <h1 className="text-[28px] mt-10 md:text-[40px] font-satoshi font-bold text-white leading-tight">
                TOP 5 WEB DEVELOPMENT TRENDS IN 2025
              </h1>

              {/* ========== START: AUTHOR INFO, DATE, READING TIME ========== */}
              <div className="mt-10 md:flex items-center space-x-11 md:space-y-0 space-y-3">
                {/* AUTHOR IMAGE & NAME */}
                <div className="flex items-center space-x-4">
                  <Image
                    className="rounded-full size-12"
                    src="/images/blogs/author4.png"
                    alt="AUTHOR IMAGE"
                    height={48}
                    width={48}
                  />
                  <div>
                    <h4 className="font-satoshi font-bold text-lg text-white-base">
                      JANE COOPER
                    </h4>
                    <p className=" text-sm text-[#A1A1AA]">WEB DEVELOPER</p>
                  </div>
                </div>

                {/* DATE & READING TIME */}
                <div className="flex md:mt-0 mt-4 space-x-8">
                  <div>
                    <h4 className="font-satoshi font-bold text-lg text-white-base">
                      FEBRUARY 18, 2025
                    </h4>
                    <p className=" text-sm text-[#A1A1AA]">DATE PUBLISHED</p>
                  </div>
                  <div>
                    <h4 className="font-satoshi font-bold text-lg text-white-base">
                      5 MIN READ
                    </h4>
                    <p className=" text-sm text-[#A1A1AA]">READING TIME</p>
                  </div>
                </div>
              </div>
              {/* ========== END: AUTHOR INFO, DATE, READING TIME ========== */}
            </div>
          </div>
        </div>
      </ZoomIn>
      {/* ========== END: BLOG HERO SECTION ========== */}
    </section>
  );
};

export default BlogDetailSection;
