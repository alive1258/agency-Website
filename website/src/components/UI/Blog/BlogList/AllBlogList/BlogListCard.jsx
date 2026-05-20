import SlideUp from "@/utils/animations/SlideUp";
import { RiTimeLine } from "@remixicon/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogListCard = ({ post, delay = 0, idx }) => {
  return (
    <SlideUp delay={delay}>
      <div className="border hover:shadow-xl transition-all duration-300 ease-in-out group grid md:grid-cols-2 grid-cols-1 gap-x-8   cursor-pointer  border-border-base bg-white p-4 rounded-2xl">
        <div
          className={`relative overflow-hidden rounded-2xl ${
            idx % 2 !== 0 ? "md:order-2" : "md:order-1"
          }`}
        >
          <Image
            className="w-full rounded-2xl shadow-lg hover:scale-105 duration-500 overflow-hidden ease-[cubic-bezier(0.4,0,0.2,1)] transition-transform object-cover h-full"
            src={post.image}
            alt={post.title}
            height={240}
            width={500}
          />
        </div>

        <div className={`${idx % 2 !== 0 ? "md:order-1" : "md:order-2"}`}>
          <div className="flex flex-col h-full justify-between">
            <div>
              {/* Top Content */}
              <div className="md:mt-6 mt-4 flex justify-between items-center">
                {/* Category */}
                <div
                  className={`border rounded-[99px] w-fit px-3 py-1.5 ${post.categoryColor}`}
                >
                  <p className="text-sm ">{post.category}</p>
                </div>
                {/* Date */}
                <div className="flex items-center space-x-3">
                  <div className="bg-[#F4F4F5] rounded-lg flex justify-center items-center p-2">
                    {/* Clock Icon */}
                    <RiTimeLine size={20} />
                  </div>
                  <p className="text-[#71717A] text-[16px] ">{post.date}</p>
                </div>
              </div>

              {/* Title & Excerpt */}
              <div className="md:mt-16 mt-8">
                <Link href={`blog-list/${post.id}`}>
                  <h1 className="text-secondary-base group-hover:text-[#3B82F6] font-satoshi font-bold text-xl md:text-2xl">
                    {post.title}
                  </h1>
                </Link>

                <p className="mt-7 text-[#71717A] text-[16px] ">
                  {post.excerpt}
                </p>
              </div>
            </div>

            {/* Author Section at Bottom */}
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Image
                    className="rounded-full size-12"
                    src={post.author.image}
                    alt={post.author.name}
                    height={48}
                    width={48}
                  />
                  <div>
                    <h4 className="font-satoshi font-bold text-lg text-tertiary-base">
                      {post.author.name}
                    </h4>
                    <p className=" text-sm text-[#71717A]">
                      {post.author.role}
                    </p>
                  </div>
                </div>
                <div className="bg-[#F4F4F5] px-4 py-2 rounded-lg">
                  <p className="text-[#71717A] text-sm ">{post.readTime}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideUp>
  );
};

export default BlogListCard;
