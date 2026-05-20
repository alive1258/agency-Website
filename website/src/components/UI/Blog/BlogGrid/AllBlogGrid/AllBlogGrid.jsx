"use client";
import React, { useState } from "react";

import BlogCard from "@/components/UI/HomePage/Blog/BlogCard";
import SlideUp from "@/utils/animations/SlideUp";
import { blogPosts } from "@/utils/fakeData/blogData";
import { RiArrowDropLeftLine, RiArrowDropRightLine } from "@remixicon/react";
import BlogCategory from "../../BlogCategory/BlogCategory";

const AllBlogGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // ============ FILTERED BLOG DATA ================
  const filteredData =
    selectedCategory === "All"
      ? blogPosts
      : blogPosts.filter((item) => item.category === selectedCategory);

  // HANDLE CATEGORY CLICK
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="container md:my-14 my-12">
      {/* Section Header */}

      <SlideUp>
        <h1 className="animated-header">News, insights and more</h1>
      </SlideUp>

      <SlideUp>
        <p className="text-[16px]  text-[#71717A] mt-6 text-center">
          Stay updated with the latest trends, tips, and technologies in <br />
          web development and design.
        </p>
      </SlideUp>

      {/* ================= START CATEGORY FILTER BUTTONS =================== */}
      <BlogCategory
        handleCategoryClick={handleCategoryClick}
        selectedCategory={selectedCategory}
      />
      {/* ================= END CATEGORY FILTER BUTTONS =================== */}

      {/* ====================== START BLOG GRID ======================= */}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 mt-12">
        {filteredData?.slice(0, 6).map((blog, index) => (
          <BlogCard blog={blog} key={blog.id} delay={index * 0.4} />
        ))}
      </div>
      {/* ===================== END BLOG GRID ====================== */}

      {/* ==================== START PAGINATION ======================= */}
      <div className="mt-20 flex justify-center items-center">
        <div className="flex items-center space-x-4 text-lg ">
          {/* PREVIOUS PAGE BUTTON */}
          <div className="pagination">
            <RiArrowDropLeftLine size={30} />
          </div>

          {/* PAGE NUMBERS */}
          {[1, 2, 3, 4].map((num) => (
            <div key={num} className="pagination">
              <p>{num}</p>
            </div>
          ))}

          {/* NEXT PAGE BUTTON */}
          <div className="pagination">
            <RiArrowDropRightLine size={30} />
          </div>
        </div>
      </div>
      {/* ==================== END PAGINATION ======================= */}
    </div>
  );
};

export default AllBlogGrid;
