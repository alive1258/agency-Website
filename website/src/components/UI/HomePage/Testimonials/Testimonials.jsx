import React from "react";
import BadgeLabel from "../../BadgeLabel/BadgeLabel";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { testimonials } from "@/utils/fakeData/testimonialsData";
import SlideUp from "@/utils/animations/SlideUp";

const Testimonials = () => {
  return (
    <div className="relative w-full overflow-hidden">
      <div className="py-14 md:px-0 px-5">
        <BadgeLabel text="Testimonials" />

        <SlideUp>
          <h1 className="animated-header">What Our Clients Say</h1>
        </SlideUp>

        <SlideUp>
          <p className="primary-paragraph">
            Our clients love working with us, and their words speak for our
            success. Here’s what they have to say!
          </p>
        </SlideUp>

        {/* section 1  */}

        <div className="mt-12">
          <Marquee speed={90} direction="left" pauseOnHover={true}>
            {testimonials?.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-[#F9FAFB] md:w-full w-[375px]  md:max-w-[424px] h-[228px] rounded-lg p-4 border border-border-base mx-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Image
                      className="rounded-full size-12"
                      src={testimonial?.image}
                      alt={testimonial?.name}
                      height={48}
                      width={48}
                    />

                    <div>
                      <h4 className="font-satoshi font-bold text-lg text-tertiary-base">
                        {testimonial?.name}
                      </h4>
                      <p className=" text-sm text-[#71717A]">
                        {testimonial?.position}
                      </p>
                    </div>
                  </div>
                  <div className="border border-border-base flex space-x-1 items-center px-2 py-1 rounded-2xl">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M9.99994 14.3916L13.4583 16.4833C14.0916 16.8666 14.8666 16.3 14.6999 15.5833L13.7833 11.65L16.8416 8.99997C17.3999 8.51663 17.0999 7.59997 16.3666 7.54163L12.3416 7.19997L10.7666 3.4833C10.4833 2.8083 9.51661 2.8083 9.23327 3.4833L7.65827 7.19163L3.63327 7.5333C2.89994 7.59163 2.59994 8.5083 3.15827 8.99163L6.21661 11.6416L5.29994 15.575C5.13327 16.2916 5.90827 16.8583 6.5416 16.475L9.99994 14.3916Z"
                        fill="#EAB308"
                      />
                    </svg>
                    <p className="text-[#71717A] text-sm ">
                      {testimonial?.rating}
                    </p>
                  </div>
                </div>

                <h4 className="font-satoshi font-bold mt-8 text-lg text-tertiary-base">
                  {testimonial?.title}
                </h4>
                <p>{testimonial?.feedback}</p>
              </div>
            ))}
          </Marquee>
        </div>
        {/* section 2  */}

        <div className="mt-8">
          <Marquee
            speed={100}
            direction="right"
            gradient={true}
            gradientColor={[255, 255, 255]}
            gradientWidth={250}
            pauseOnHover={true}
            style={{
              overflow: "hidden",
            }}
          >
            {testimonials?.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-[#F9FAFB] md:w-full w-[375px]  md:max-w-[424px] h-[228px] rounded-lg p-4 border border-border-base mx-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Image
                      className="rounded-full size-12"
                      src={testimonial?.image}
                      alt={testimonial?.name}
                      height={48}
                      width={48}
                    />
                    <div>
                      <h4 className="font-satoshi font-bold text-lg text-tertiary-base">
                        {testimonial?.name}
                      </h4>
                      <p className=" text-sm text-[#71717A]">
                        {testimonial?.position}
                      </p>
                    </div>
                  </div>
                  <div className="border border-border-base flex space-x-1 items-center px-2 py-1 rounded-2xl">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M9.99994 14.3916L13.4583 16.4833C14.0916 16.8666 14.8666 16.3 14.6999 15.5833L13.7833 11.65L16.8416 8.99997C17.3999 8.51663 17.0999 7.59997 16.3666 7.54163L12.3416 7.19997L10.7666 3.4833C10.4833 2.8083 9.51661 2.8083 9.23327 3.4833L7.65827 7.19163L3.63327 7.5333C2.89994 7.59163 2.59994 8.5083 3.15827 8.99163L6.21661 11.6416L5.29994 15.575C5.13327 16.2916 5.90827 16.8583 6.5416 16.475L9.99994 14.3916Z"
                        fill="#EAB308"
                      />
                    </svg>
                    <p className="text-[#71717A] text-sm ">
                      {testimonial?.rating}
                    </p>
                  </div>
                </div>

                <h4 className="font-satoshi font-bold mt-8 text-lg text-tertiary-base">
                  {testimonial?.title}
                </h4>
                <p>{testimonial?.feedback}</p>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
