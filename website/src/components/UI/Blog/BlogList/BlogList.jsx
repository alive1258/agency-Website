import React from "react";
import BlogListBanner from "./BlogListBanner/BlogListBanner";
import DigitalFuture from "../../HomePage/DigitalFuture/DigitalFuture";
import AllBlogList from "./AllBlogList/AllBlogList";

const BlogList = () => {
  return (
    <>
      <BlogListBanner />
      <AllBlogList />
      <DigitalFuture status={true} />
    </>
  );
};

export default BlogList;
