import { blogTrends } from "@/utils/fakeData/blogTrends";
import React from "react";
import TrendsCard from "./TrendsCard";

const BlogTrends = () => {
  return (
    <div className="container">
      {blogTrends?.map((trend, index) => (
        <TrendsCard
          trend={trend}
          key={index}
          index={index}
          delay={index * 0.4}
        />
      ))}
    </div>
  );
};

export default BlogTrends;
