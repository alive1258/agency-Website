import React from "react";
import BadgeLabel from "../../BadgeLabel/BadgeLabel";
import SlideUp from "@/utils/animations/SlideUp";
import Image from "next/image";

const WorkProcess = () => {
  return (
    <section className="container md:mt-20 mt-12">
      <BadgeLabel text="Our Work Process" />

      {/* ANIMATED HEADER TEXT */}
      <SlideUp>
        <h1 className="animated-header">
          A Streamlined Approach For Delivering High-Quality Web Solutions
        </h1>
      </SlideUp>

      <div className="md:relative w-full md:max-w-[896px] md:mx-auto md:mt-40 mt-20">
        <div className="grid md:grid-cols-2 grid-cols-1 md:gap-x-20 md:gap-y-0 gap-y-8 md:place-items-start place-items-center">
          {/* card 1 */}
          <div className="glassmorphism md:absolute -top-20 left-44 z-10 p-3">
            <div className="bg-[#10B981] size-12 rounded-full flex justify-center items-center">
              <Image
                src="/images/works/work1.svg"
                height={32}
                width={32}
                alt="work"
              />
            </div>
            <h2 className="text-lg pt-6 text-secondary-base font-satoshi font-bold">
              Maintenance & Support
            </h2>
            <p className="text-sm text-tertiary-base   pt-4">
              Providing ongoing updates, bug fixes, and feature enhancements
              many more.
            </p>
          </div>
          {/* card 2 */}
          <div className="glassmorphism md:absolute top-[195px] z-10 p-3">
            <div className="bg-[#3B82F6] size-12 rounded-full flex justify-center items-center">
              <Image
                src="/images/works/work1.svg"
                height={32}
                width={32}
                alt="work"
              />
            </div>
            <h2 className="text-lg pt-6 text-secondary-base font-satoshi font-bold">
              Deployment & Launch
            </h2>
            <p className="text-sm text-tertiary-base   pt-4">
              Deploying the project with final optimizations and SEO
              configurations.
            </p>
          </div>
          {/* card 3 */}
          <div className="glassmorphism md:absolute right-44 -top-20  z-10 p-3">
            <div className="bg-[#EAB308] size-12 rounded-full flex justify-center items-center">
              <Image
                src="/images/works/work1.svg"
                height={32}
                width={32}
                alt="work"
              />
            </div>
            <h2 className="text-lg pt-6 text-secondary-base font-satoshi font-bold">
              Testing & Optimization
            </h2>
            <p className="text-sm text-tertiary-base   pt-4">
              Ensuring performance, security, and responsiveness across devices.
            </p>
          </div>
          {/* card 4 */}
          <div className="glassmorphism md:absolute -bottom-20 left-44 z-10 p-3">
            <div className="bg-[#F43F5E] size-12 rounded-full flex justify-center items-center">
              <Image
                src="/images/works/work1.svg"
                height={32}
                width={32}
                alt="work"
              />
            </div>
            <h2 className="text-lg pt-6 text-secondary-base font-satoshi font-bold">
              Development & Coding
            </h2>
            <p className="text-sm text-tertiary-base   pt-4">
              Turning designs into functional websites using the latest
              technologies.
            </p>
          </div>
          {/* card 5 */}
          <div className="glassmorphism md:absolute -right-1 bottom-[195px] z-10 p-3">
            <div className="bg-[#3ff4be]  size-12 rounded-full flex justify-center items-center">
              <Image
                src="/images/works/work1.svg"
                height={32}
                width={32}
                alt="work"
              />
            </div>
            <h2 className="text-lg pt-6 text-secondary-base font-satoshi font-bold">
              Discovery & Planning
            </h2>
            <p className="text-sm text-tertiary-base   pt-4">
              Understanding client needs, project goals, and creating a roadmap.
            </p>
          </div>
          {/* card 6 */}
          <div className="glassmorphism md:absolute right-44 -bottom-20 z-10 p-3">
            <div className="bg-[#8B5CF6] size-12 rounded-full flex justify-center items-center">
              <Image
                src="/images/works/work6.svg"
                height={32}
                width={32}
                alt="work"
              />
            </div>
            <h2 className="text-lg pt-6 text-secondary-base font-satoshi font-bold">
              Wireframing & Design
            </h2>
            <p className="text-sm text-tertiary-base  pt-4">
              Creating user-friendly wireframes and UI prototypes for approval.
            </p>
          </div>
        </div>
        {/* Outer Circle */}
        <div className=" w-full max-w-[700px] mx-auto flex justify-center items-center">
          <div className=" md:w-[636px] md:h-[636px] rounded-full border-0 md:border-4 border-[#3B82F6] flex justify-center items-center">
            {/* Middle Circle */}

            <div className=" md:w-[516px] md:h-[516px] rounded-full border-0 md:border border-[#3B82F6] flex justify-center items-center">
              {/* Inner Circle with Grid Content */}
              <div className=" md:w-[380px] hidden md:h-[380px] rounded-full border-0 md:border border-dotted border-[#3B82F6] md:flex justify-center items-center">
                <div className="md:w-[245.8px] md:h-[245.8px] md:bg-blue-100 border-0 md:border-[8px] border-[#56A1FF] rounded-full flex justify-center items-center">
                  <Image
                    src="/images/footer/footerLogo.png"
                    alt="logo"
                    width={44}
                    height={54}
                    className="object-contain md:block hidden"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkProcess;
