/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router";

import { Save } from "lucide-react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

import PageHeader from "../../../components/common/PageHeader";
import Input from "../../../components/ui/forms/Input";
import Textarea from "../../../components/ui/forms/Textarea";
import GradientButton from "../../../components/ui/buttons/GradientButton";

import { useGetAllBlogCategoriesQuery } from "../../../redux/api/blogCategoriesApi";
import {
  useGetBlogByIdQuery,
  useUpdateBlogMutation,
} from "../../../redux/api/blogsApi";

import type { Blog } from "../../../types/blog.types";
import type { ApiError } from "../../../types/authType";

/* =======================
   Form Values
======================= */
interface EditBlogFormValues {
  title: string;
  slug: string;
  description: string;
  blog_category_id: string;
  key_features?: string;
  rating?: number;
  image?: FileList;

  // ✅ SEO FIELDS
  meta_title?: string;
  meta_keywords?: string;
  meta_description?: string;
}
/* =======================
   Slug Generator
======================= */
const generateSlug = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const EditBlog: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // <-- get slug from route
  const navigate = useNavigate();

  // Fetch categories
  const { data: categoriesData, isLoading: isCategoryLoading } =
    useGetAllBlogCategoriesQuery({ search: "" });
  const categories = categoriesData?.data || [];

  // Fetch single blog by slug
  const { data: blogData, isLoading: isFetching } = useGetBlogByIdQuery(id!, {
    skip: !id,
  });

  // Update mutation
  const [updateBlog, { isLoading: isUpdating }] = useUpdateBlogMutation();

  // Form setup
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<EditBlogFormValues>({
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      blog_category_id: "",
      key_features: "",
      rating: 0,

      // SEO
      meta_title: "",
      meta_keywords: "",
      meta_description: "",
    },
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  /* =======================
     Populate form when blog is loaded
  ======================== */
  useEffect(() => {
    if (!blogData?.data || categories.length === 0) return;

    const blog: Blog = blogData.data;

    reset({
      title: blog.title || "",
      slug: blog.slug || "",
      description: blog.description || "",
      blog_category_id: blog.blog_category?.id || "",
      key_features: blog.key_features || "",
      rating: blog.rating || 0,

      // ✅ SEO
      meta_title: blog.meta_title || "",
      meta_keywords: blog.meta_keywords || "",
      meta_description: blog.meta_description || "",
    });

    setPreviewImage(
      blog.image
        ? `${import.meta.env.VITE_PUBLIC_IMAGE_PATH}${blog.image}?v=${Date.now()}`
        : null,
    );

    setIsInitialLoad(false);
  }, [blogData, categories, reset]);

  /* =======================
     Auto Slug when title changes
  ======================== */
  const titleValue = watch("title");
  useEffect(() => {
    if (!isInitialLoad && titleValue) {
      setValue("slug", generateSlug(titleValue));
    }
  }, [titleValue, isInitialLoad, setValue]);

  /* =======================
     Submit Handler
  ======================== */
  const onSubmit: SubmitHandler<EditBlogFormValues> = async (formData) => {
    if (!blogData?.data.id) return;

    try {
      const payload = new FormData();
      payload.append("title", formData.title);
      payload.append("slug", formData.slug || "");
      payload.append("description", formData.description);
      payload.append("blog_category_id", formData.blog_category_id);

      if (formData.meta_title) {
        payload.append("meta_title", formData.meta_title);
      }

      if (formData.meta_keywords) {
        payload.append("meta_keywords", formData.meta_keywords);
      }

      if (formData.meta_description) {
        payload.append("meta_description", formData.meta_description);
      }

      if (formData.key_features)
        payload.append("key_features", formData.key_features);
      if (formData.rating !== undefined)
        payload.append("rating", String(formData.rating));
      if (formData.image?.[0]) payload.append("image", formData.image[0]);

      await updateBlog({ id: blogData.data.id, data: payload }).unwrap();

      toast.success("Blog updated successfully!");
      navigate("/blogs"); // Navigate back to list
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

  if (isFetching || isCategoryLoading)
    return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="border bg-black-base border-gray-base rounded-lg overflow-hidden p-6 mb-6">
      <PageHeader
        title="Edit Blog"
        breadcrumbs={[
          { title: "Dashboard", link: "/" },
          { title: "Blogs", link: "/blogs" },
          { title: "Edit Blog" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Blog Category */}
          <div className="col-span-full md:col-span-2 relative group">
            <label className="block mb-2 font-semibold text-sm">
              Service Category
            </label>
            <select
              {...register("blog_category_id", {
                required: "Category is required",
              })}
              className={`w-full px-3 py-2 pr-10 border border-gray-base rounded-lg  focus:outline-none focus:bg-black-base appearance-none ${errors.blog_category_id ? "border-red-500" : "border-gray-800"}`}
              defaultValue={blogData?.data?.blog_category?.id || ""}
            >
              <option value="" disabled>
                {isCategoryLoading ? "Loading..." : "Select a category"}
              </option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Title */}
          <Input
            label="Blog Title"
            text="title"
            register={register("title", { required: "Title is required" })}
            errors={errors}
          />
          {/* Slug */}
             <Input
            label="Slug"
            text="slug"
            register={register("slug", { required: "Slug is required" })}
            errors={errors}
            readOnly
          />
          {/* SEO FIELDS */}
          <Input
            label="Meta Title"
            text="meta_title"
            register={register("meta_title")}
            errors={errors}
          />

          <Input
            label="Meta Keywords"
            text="meta_keywords"
            register={register("meta_keywords")}
            errors={errors}
          />

          <div className="col-span-full">
            <Textarea<EditBlogFormValues>
              label="Meta Description"
              text="meta_description"
              register={register("meta_description")}
              errors={errors}
            />
          </div>
       
          {/* Rating */}
          <Input
            label="Rating (0-5)"
            text="rating"
            type="number"
            register={register("rating", {
              valueAsNumber: true,
              min: 0,
              max: 5,
            })}
            errors={errors}
          />
          {/* Key Features */}
          <Input
            label="Key Features"
            text="key_features"
            register={register("key_features")}
            errors={errors}
          />

          {/* Image */}
          <div className="col-span-full">
            <label className="block mb-2 font-semibold text-sm">
              Blog Image
            </label>
            <div className="w-48 h-48 border-2 border-dashed rounded-lg overflow-hidden relative">
              <img
                src={previewImage || "/images/default-image.png"}
                className="w-full h-full object-cover"
              />
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                {...register("image", {
                  onChange: (e) => {
                    const file = e.target.files?.[0];
                    if (file) setPreviewImage(URL.createObjectURL(file));
                  },
                })}
              />
            </div>
          </div>

          {/* Description */}
          <div className="col-span-full">
            <Textarea<EditBlogFormValues>
              label="Description"
              text="description"
              register={register("description", {
                required: "Description is required",
              })}
              errors={errors}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 border rounded-md"
          >
            Cancel
          </button>
          <GradientButton
            type="submit"
            text={isUpdating ? "Updating..." : "Update Blog"}
            icon={Save}
            disabled={isUpdating}
          />
        </div>
      </form>
    </div>
  );
};

export default EditBlog;
