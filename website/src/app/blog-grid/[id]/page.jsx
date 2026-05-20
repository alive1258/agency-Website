import BlogDetails from "@/components/UI/Blog/BlogDetails/BlogDetails";

const BlogDetail = async ({ params }) => {
  const id = await params;
  return (
    <>
      <BlogDetails id={id} />
    </>
  );
};

export default BlogDetail;
