import React from "react";
import BlogDetailsBanner from "./BlogDetailsBanner/BlogDetailsBanner";
import DigitalFuture from "../../HomePage/DigitalFuture/DigitalFuture";
import BlogDetailSection from "./BlogDetailSection/BlogDetailSection";
import TagSection from "./TagSection/TagSection";
import BlogTrends from "./BlogTrends/BlogTrends";

const BlogDetails = () => {
  return (
    <>
      <BlogDetailsBanner />
      <BlogDetailSection />
      <BlogTrends />
      <TagSection />
      <DigitalFuture status={true} />
    </>
  );
};

export default BlogDetails;
