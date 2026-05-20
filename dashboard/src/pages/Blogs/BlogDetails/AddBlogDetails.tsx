import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Plus } from "lucide-react";
import PageHeader from "../../../components/common/PageHeader";
import Input from "../../../components/ui/forms/Input";
import Textarea from "../../../components/ui/forms/Textarea";
import GradientButton from "../../../components/ui/buttons/GradientButton";
import { useCreateBlogDetailsMutation } from "../../../redux/api/blogDetailsApi";

import type { ApiError } from "../../../types/authType";
import { useGetAllBlogsQuery } from "../../../redux/api/blogsApi";

interface AddBlogDetailFormValues {
  title: string;
  description: string;
  blog_id: string;
  key_features?: string;
  image?: FileList;
}

const AddBlogDetails: React.FC = () => {
  const navigate = useNavigate();
  const [createBlogDetail, { isLoading }] = useCreateBlogDetailsMutation();
  const { data, isLoading: isBlogLoading } = useGetAllBlogsQuery({ search: "" });

  const blogs = data?.data || [];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddBlogDetailFormValues>({
    defaultValues: {
      title: "",
      description: "",
      blog_id: "",
    },
  });

  const onSubmit: SubmitHandler<AddBlogDetailFormValues> = async (formData) => {
    try {
      const payload = new FormData();
      payload.append("title", formData.title);
      payload.append("description", formData.description);
      payload.append("blog_id", formData.blog_id);

      if (formData.key_features) payload.append("key_features", formData.key_features);
      if (formData.image?.[0]) payload.append("image", formData.image[0]);

      await createBlogDetail(payload).unwrap();
      toast.success("Blog detail created successfully!");
      reset();
      navigate("/blog-details");
    } catch (err) {
      const error = err as ApiError;
      Swal.fire({
        title: "Submission Failed",
        text:
          (Array.isArray(error.data?.message)
            ? error.data?.message.join(", ")
            : error.data?.message) || "An unexpected error occurred",
        icon: "error",
        confirmButtonColor: "#3085d6",
      });
    }
  };

  return (
    <div className="rounded-lg border bg-black-base border-gray-base overflow-hidden p-6 mb-6">
      <PageHeader
        title="Add Blog Detail"
        breadcrumbs={[
          { title: "Dashboard", link: "/" },
          { title: "Blogs", link: "/blog" },
          { title: "Add Detail" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Blog Select */}
          <div className="col-span-full md:col-span-2 relative group">
            <label className="block mb-2 font-semibold text-sm">Blog</label>
            <select
              {...register("blog_id", { required: "Blog is required" })}
              className={`w-full px-3 py-2 pr-10 border border-gray-base rounded-lg  focus:outline-none focus:bg-black-base appearance-none ${
                errors.blog_id ? "border-red-500" : "border-gray-800"
              }`}
              defaultValue=""
            >
              <option value="" disabled hidden className="bg-black-base ">
              {isBlogLoading ? "Loading..." : "Select Blog"}
            </option>
              {blogs.map((blog) => (
                <option key={blog.id} value={blog.id} className="bg-black-base">
                  {blog.title}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Title"
            text="title"
            placeholder="e.g. Latest Tech Trends"
            register={register("title", { required: "Title is required" })}
            errors={errors}
          />

          <Input
            label="Key Features"
            text="key_features"
            register={register("key_features")}
            errors={errors}
          />

          <div className="col-span-full border-2 border-dashed rounded-lg p-4 hover:border-blue-400">
            <label className="block mb-2 font-semibold text-sm">Image</label>
            <input
              type="file"
              accept="image/*"
              {...register("image")}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          <div className="col-span-full">
            <Textarea<AddBlogDetailFormValues>
              label="Description"
              text="description"
              register={register("description", { required: "Description is required" })}
              errors={errors}
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded-md text-sm border border-gray-base"
          >
            Cancel
          </button>

          <GradientButton
            type="submit"
            text={isLoading ? "Creating..." : "Create Detail"}
            icon={Plus}
            disabled={isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default AddBlogDetails;