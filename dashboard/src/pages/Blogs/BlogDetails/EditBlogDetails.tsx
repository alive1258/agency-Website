/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Save } from "lucide-react";
import PageHeader from "../../../components/common/PageHeader";
import Input from "../../../components/ui/forms/Input";
import Textarea from "../../../components/ui/forms/Textarea";
import GradientButton from "../../../components/ui/buttons/GradientButton";

import { useGetSingleBlogDetailsQuery, useUpdateBlogDetailsMutation } from "../../../redux/api/blogDetailsApi";
import type { ApiError } from "../../../types/authType";
import type { BlogDetail } from "../../../types/blogDetail.types";
import { useGetAllBlogsQuery } from "../../../redux/api/blogsApi";

interface EditBlogDetailFormValues {
  title: string;
  description: string;
  blog_id: string;
  key_features?: string;
  image?: FileList;
}

const EditBlogDetails: React.FC = () => {
  const { id } = useParams<"id">();
  const navigate = useNavigate();

  const { data: blogsData, isLoading: isBlogsLoading } = useGetAllBlogsQuery({ search: "" });
  const blogs = blogsData?.data || [];

  const { data: blogDetailData, isLoading: isFetching } = useGetSingleBlogDetailsQuery(id as string, { skip: !id });

  const [updateBlogDetail, { isLoading }] = useUpdateBlogDetailsMutation();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<EditBlogDetailFormValues>({
    defaultValues: {
      title: "",
      description: "",
      blog_id: "",
    },
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Populate form with fetched data
  useEffect(() => {
    if (blogDetailData?.data) {
      const b: BlogDetail = blogDetailData.data;
      reset({
        title: b.title,
        description: b.description,
        blog_id: b.blog?.id || "",
        key_features: b.key_features,
      });
    }
  }, [blogDetailData, reset]);

  // Set initial image preview
  useEffect(() => {
    if (blogDetailData?.data?.image) {
      setPreviewImage(`${import.meta.env.VITE_PUBLIC_IMAGE_PATH}${blogDetailData.data.image}?v=${new Date().getTime()}`);
    } else {
      setPreviewImage(null);
    }
  }, [blogDetailData]);

  const onSubmit: SubmitHandler<EditBlogDetailFormValues> = async (formData) => {
    if (!id) return;

    try {
      const payload = new FormData();
      payload.append("title", formData.title);
      payload.append("description", formData.description);
      payload.append("blog_id", formData.blog_id);
      if (formData.key_features) payload.append("key_features", formData.key_features);
      if (formData.image?.[0]) payload.append("image", formData.image[0]);

      await updateBlogDetail({ id, data: payload }).unwrap();
      toast.success("Blog detail updated successfully!");
      navigate(-1);
    } catch (err) {
      const error = err as ApiError;
      Swal.fire({
        title: "Update Failed",
        text: Array.isArray(error.data?.message)
          ? error.data.message.join(", ")
          : error.data?.message || "Something went wrong.",
        icon: "error",
        confirmButtonColor: "#3085d6",
      });
    }
  };

  if (isFetching) return <p className="text-center mt-10">Loading blog detail...</p>;

  return (
    <div className='border bg-black-base border-gray-base rounded-lg overflow-hidden p-6 mb-6'>
      <PageHeader
        title="Edit Blog Detail"
        breadcrumbs={[
          { title: "Dashboard", link: "/" },
          { title: "Blog Details", link: "/blog-details" },
          { title: "Edit Detail" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Blog select */}
          <div className="col-span-full md:col-span-2 relative group">
            <label className="block mb-2 font-semibold text-sm">Blog</label>
            <select
              {...register("blog_id", { required: "Blog is required" })}
              className={`w-full px-3 py-2 pr-10 border border-gray-base rounded-lg  focus:outline-none focus:bg-black-base appearance-none ${errors.blog_id ? "border-red-500" : "border-gray-800"}`}
              defaultValue={blogDetailData?.data?.blog?.id || ""}
            >
              <option value="" disabled>{isBlogsLoading ? "Loading..." : "Select a blog"}</option>
              {blogs.map(b => (
                <option key={b.id} value={b.id} className="bg-black-base">{b.title}</option>
              ))}
            </select>
          </div>

          <Input
            label="Title"
            text="title"
            placeholder="Blog detail title"
            register={register("title", { required: "Title is required" })}
            errors={errors}
          />

          <Input
            label="Key Features"
            text="key_features"
            register={register("key_features")}
            errors={errors}
          />

          {/* Image upload with preview */}
          <div className="col-span-full">
            <label className="block mb-2 font-semibold text-sm">Image</label>
            <div className="w-48 h-48 border-2 border-dashed rounded-lg overflow-hidden flex items-center justify-center mb-2 relative border-gray-600 hover:border-blue-500 transition-colors bg-gray-900">
              <img
                src={previewImage || "/images/default-image.png"}
                alt="Blog Detail"
                className="w-full h-full object-cover pointer-events-none"
              />
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                {...register("image", {
                  onChange: e => {
                    const files = e.target.files;
                    if (files && files[0]) {
                      const newPreviewUrl = URL.createObjectURL(files[0]);
                      setPreviewImage(newPreviewUrl);
                      return () => URL.revokeObjectURL(newPreviewUrl);
                    }
                  },
                })}
              />
            </div>
            <p className="text-gray-400 text-sm">{previewImage ? "Click to change image" : "Click to upload an image"}</p>
          </div>

          <div className="col-span-full">
            <Textarea<EditBlogDetailFormValues>
              label="Description"
              text="description"
              register={register("description", { required: "Description is required" })}
              errors={errors}
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button type="button" onClick={() => navigate(-1)} className='px-4 py-2 rounded-md text-sm border border-gray-base'>
            Cancel
          </button>
          <GradientButton type="submit" text={isLoading ? "Updating..." : "Update Detail"} icon={Save} disabled={isLoading} />
        </div>
      </form>
    </div>
  );
};

export default EditBlogDetails;