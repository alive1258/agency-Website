import React from "react";
import ShareSocialLink from "@/components/common/ShareSocialLink";
import Button from "@/components/UI/Button/Button";
import SlideUp from "@/utils/animations/SlideUp";
import Image from "next/image";

const Tags = () => {
  return (
    <div>
      <SlideUp
        style={{
          boxShadow: "0px 0px 96px 0px rgba(59, 130, 246, 0.16)",
        }}
        className="p-6  rounded-2xl border border-border-base bg-white"
      >
        <div className="flex items-center space-x-4">
          <Image
            className="rounded-full size-20"
            src="/images/blogs/author4.png"
            alt="author"
            height={88}
            width={88}
          />
          <div>
            <h4 className="font-satoshi font-bold text-2xl text-secondary-base">
              Ethan Carter
            </h4>
            <p className=" text-lg text-[#71717A]">Senior Web Developer</p>
          </div>
        </div>
        <p className=" text-lg mt-8 text-primary-base">
          Ethan Carter is a Senior Web Developer at Solvex with over 8 years of
          experience in front-end and back-end technologies. Passionate about
          AI-driven web development, he specializes in creating
          high-performance, user-friendly websites. When he's not coding, Ethan
          enjoys mentoring junior developers and exploring the latest tech
          innovations.
        </p>

        <div className="mt-8">
          <ShareSocialLink />
        </div>
      </SlideUp>

      <div className="mt-20">
        <h2 className="text-[#3B82F6] text-2xl font-satoshi font-bold border-b border-[#D4D4D8] pb-4">
          2 Comments
        </h2>

        <div className="mt-8 pb-8 border-b border-[#D4D4D8]">
          <SlideUp className="flex   space-x-4">
            <Image
              className="rounded-full mt-1 size-12"
              src="/images/blogs/author5.png"
              alt="author1"
              height={48}
              width={48}
            />
            <div>
              <h4 className="font-satoshi font-bold text-[20px] text-secondary-base">
                John Doe
              </h4>
              <p className=" text-sm text-[#71717A]">12 July 2025</p>

              <p className="text-primary-base text-lg mt-6">
                I totally agree! AI-powered coding assistants will definitely
                revolutionize web development. Great insights!
              </p>
              <div className="flex mt-6 items-center space-x-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <path
                    d="M7.50024 12H3.75024V15.75M10.5002 6H14.2502V2.25M3.4375 6.75255C3.85801 5.71175 4.56207 4.80978 5.46966 4.14917C6.37724 3.48856 7.45289 3.09564 8.57256 3.01538C9.69223 2.93512 10.8113 3.17055 11.8038 3.69496C12.7963 4.21937 13.6212 5.0119 14.1858 5.98209M14.5634 11.2478C14.1429 12.2886 13.4388 13.1906 12.5313 13.8512C11.6237 14.5118 10.5491 14.9042 9.42944 14.9845C8.30977 15.0647 7.18979 14.8293 6.19727 14.3049C5.20474 13.7805 4.37936 12.9881 3.8147 12.0179"
                    stroke="#3B82F6"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="text-[#3B82F6] text-lg ">Reply</p>
              </div>
              <div className="mt-10 border-b-2 border-dashed border-[#D4D4D8] w-full"></div>
            </div>
          </SlideUp>
          {/* reply section  */}
          <SlideUp className="flex ml-20 mt-8  space-x-4">
            <Image
              className="rounded-full mt-1 size-12"
              src="/images/blogs/author3.png"
              alt="author1"
              height={48}
              width={48}
            />
            <div>
              <h4 className="font-satoshi font-bold text-[20px] text-secondary-base">
                John Doe
              </h4>
              <p className=" text-sm text-[#71717A]">12 July 2025</p>

              <p className="text-primary-base text-lg mt-6">
                I totally agree! AI-powered coding assistants will definitely
                revolutionize web development. Great insights!
              </p>
            </div>
          </SlideUp>
        </div>

        <div className="mt-20">
          <h2 className="text-[#3B82F6] uppercase text-2xl font-satoshi font-bold">
            leave a comment
          </h2>
          <SlideUp className="bg-white-base mt-12 p-7  rounded-xl border border-border-base">
            <div className=" mt-3 ">
              <form>
                <div className="grid md:grid-cols-2 gap-4 mt-3">
                  <div>
                    <label
                      htmlFor="fname"
                      className="text-secondary-base text-lg "
                    >
                      Full name:
                    </label>
                    <br />
                    <input
                      type="text"
                      id="fname"
                      name="fname"
                      placeholder="Enter Full Name"
                      className="border border-border-base p-4 w-full mt-1 mb-3 rounded-lg"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="fname"
                      className="text-secondary-base text-lg "
                    >
                      Email Address *
                    </label>
                    <br />
                    <input
                      type="text"
                      id="fname"
                      name="fname"
                      placeholder="Enter Email Address "
                      className="border border-border-base p-4 w-full mt-1 mb-3 rounded-lg"
                    />
                  </div>
                </div>

                <div className="mt-3">
                  <label
                    htmlFor="Massage"
                    className="text-secondary-base text-lg "
                  >
                    Massage:
                  </label>
                  <br />
                  <textarea
                    id="Massage"
                    name="Massage"
                    placeholder="Enter Massage"
                    className="border border-border-base p-4 w-full mt-1 mb-3 rounded-lg"
                    rows={4}
                  />
                </div>

                <div className="mt-2">
                  <Button content="Submit now" />
                </div>
              </form>
            </div>
          </SlideUp>
        </div>
      </div>
    </div>
  );
};

export default Tags;
