import React from "react";
import BlogGridBanner from "./BlogGridBanner/BlogGridBanner";
import DigitalFuture from "../../HomePage/DigitalFuture/DigitalFuture";
import AllBlogGrid from "./AllBlogGrid/AllBlogGrid";

export const BlogGrid = () => {
  return (
    <>
      <BlogGridBanner />
      <AllBlogGrid />
      <DigitalFuture status={true} />
    </>
  );
};
