import React from "react";
import BadgeLabel from "../../BadgeLabel/BadgeLabel";
import Button from "../../Button/Button";
import BlogCard from "./BlogCard";
import SlideUp from "@/utils/animations/SlideUp";
import { blogPosts } from "@/utils/fakeData/blogData";
import Link from "next/link";

const Blog = () => {
  return (
    <section className="container md:my-14 my-12">
      <BadgeLabel text="Blog" />

      <SlideUp>
        <h1 className="animated-header">News, insights and more</h1>
      </SlideUp>

      <SlideUp>
        <p className="primary-paragraph">
          Stay updated with the latest trends, tips, and technologies in web
          development and design.
        </p>
      </SlideUp>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1  gap-6 mt-12">
        {blogPosts?.slice(0, 3).map((blog, index) => (
          <BlogCard blog={blog} key={blog.id} delay={index * 0.4} />
        ))}
      </div>
      <SlideUp className="py-10 flex justify-center uppercase">
        <Link href="/blog-grid">
          <Button content="More Blogs" />
        </Link>
      </SlideUp>
    </section>
  );
};

export default Blog;
