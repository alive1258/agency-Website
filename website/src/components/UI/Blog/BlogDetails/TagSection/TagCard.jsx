import React from "react";
import SlideUp from "@/utils/animations/SlideUp";
import Image from "next/image";
import Link from "next/link";

const TagCard = ({ blog, delay = 0 }) => {
  return (
    <SlideUp delay={delay}>
      <div className="border border-border-base bg-white-base p-4 rounded-2xl flex flex-col h-full group cursor-pointer transition-all duration-300 ease-in-out hover:shadow-xl">
        {/* ========== START: BLOG IMAGE ========== */}
        <div className="relative overflow-hidden rounded-2xl">
          <Image
            className="w-full h-full rounded-2xl shadow-lg object-cover transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-105"
            src={blog?.image}
            alt={blog?.title}
            width={500}
            height={240}
          />
        </div>
        {/* ========== END: BLOG IMAGE ========== */}

        <div
          className={`mt-6 w-fit px-3 py-1.5 border text-sm  rounded-[99px] ${blog?.categoryColor}`}
        >
          <p className="text-sm ">{blog?.category}</p>
        </div>

        {/* ========== START: TITLE AND EXCERPT ========== */}
        <div className="mt-6">
          <Link href={`blog-grid/${blog.id}`}>
            <h1 className="text-2xl font-satoshi font-bold text-secondary-base group-hover:text-[#3B82F6]">
              {blog?.title}
            </h1>
          </Link>
          <p className="mt-6 text-[16px]  text-[#71717A]">{blog?.excerpt}</p>
        </div>
        {/* ========== END: TITLE AND EXCERPT ========== */}
      </div>
    </SlideUp>
  );
};

export default TagCard;
