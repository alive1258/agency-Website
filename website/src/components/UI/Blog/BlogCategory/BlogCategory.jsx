import React from "react";
import { blogGridCategories } from "@/utils/fakeData/blogGridCategories";

const BlogCategory = ({ selectedCategory, handleCategoryClick }) => {
  return (
    <>
      <div className="my-10 flex justify-center flex-wrap gap-3">
        {blogGridCategories?.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            className={`border cursor-pointer text-sm rounded-3xl px-6 py-2 font-medium transition-all duration-300 ease-in-out 
                 ${
                   selectedCategory === cat
                     ? "text-white-base  bg-[#3B82F6] border-[#3B82F6]"
                     : "text-tertiary-base border-[#71717A] hover:text-[#3B82F6] hover:border-[#3B82F6]"
                 }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </>
  );
};

export default BlogCategory;
