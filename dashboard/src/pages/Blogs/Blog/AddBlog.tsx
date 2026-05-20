/* eslint-disable react-hooks/incompatible-library */
import React, { useState, useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Plus } from "lucide-react";

import { useGetAllBlogCategoriesQuery } from "../../../redux/api/blogCategoriesApi";
import { useCreateBlogMutation } from "../../../redux/api/blogsApi";

import type { ApiError } from "../../../types/authType";

import PageHeader from "../../../components/common/PageHeader";
import Input from "../../../components/ui/forms/Input";
import Textarea from "../../../components/ui/forms/Textarea";
import GradientButton from "../../../components/ui/buttons/GradientButton";

/* =======================
   Types
======================= */
interface AddBlogFormValues {
  title: string;
  slug: string;
  blog_category_id: string;
  description: string;
  key_features?: string;
  rating?: number;
  image?: FileList;

  // ✅ SEO FIELDS ADD
  meta_title?: string;
  meta_keywords?: string;
  meta_description?: string;
}

/* =======================
   Slug Generator
======================= */
const generateSlug = (text: string) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

/* =======================
   Component
======================= */
const AddBlog: React.FC = () => {
  const navigate = useNavigate();
  const [, setPreviewImage] = useState<string | null>(null);

  const [createBlog, { isLoading }] = useCreateBlogMutation();

  const { data, isLoading: isCategoryLoading } = useGetAllBlogCategoriesQuery({
    page: 1,
    limit: 100,
  });

  const categories = data?.data || [];

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<AddBlogFormValues>({
    defaultValues: {
      title: "",
      slug: "",
      blog_category_id: "",
      description: "",
      key_features: "",
      rating: 0,

      // SEO
      meta_title: "",
      meta_keywords: "",
      meta_description: "",
    },
  });

  /* =======================
     Auto Slug
  ======================= */
  const titleValue = watch("title");

  useEffect(() => {
    if (titleValue) {
      const slug = generateSlug(titleValue);
      setValue("slug", slug);
    }
  }, [titleValue, setValue]);

  /* =======================
     Submit
  ======================= */
  const onSubmit: SubmitHandler<AddBlogFormValues> = async (formData) => {
    try {
      const payload = new FormData();

      payload.append("title", formData.title);
      payload.append("slug", formData.slug); // ✅ added
      payload.append("blog_category_id", formData.blog_category_id);
      payload.append("description", formData.description);
      if (formData.meta_title) {
        payload.append("meta_title", formData.meta_title);
      }

      if (formData.meta_keywords) {
        payload.append("meta_keywords", formData.meta_keywords);
      }

      if (formData.meta_description) {
        payload.append("meta_description", formData.meta_description);
      }

      if (formData.key_features) {
        payload.append("key_features", formData.key_features);
      }

      if (formData.rating !== undefined) {
        payload.append("rating", String(formData.rating));
      }

      if (formData.image?.[0]) {
        payload.append("image", formData.image[0]);
      }

      await createBlog(payload).unwrap();

      toast.success("Blog created successfully!");
      reset();
      setPreviewImage(null);
      navigate("/blogs");
    } catch (err) {
      const error = err as ApiError;

      Swal.fire({
        title: "Submission Failed",
        text:
          (Array.isArray(error.data?.message)
            ? error.data.message.join(", ")
            : error.data?.message) || "Something went wrong",
        icon: "error",
      });
    }
  };

  /* =======================
     Render
  ======================= */
  return (
    <div className="rounded-lg border bg-black-base border-gray-base overflow-hidden p-6 mb-6">
      <PageHeader
        title="Create Blog"
        breadcrumbs={[
          { title: "Dashboard", link: "/" },
          { title: "Blogs", link: "/blogs" },
          { title: "Add Blog" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Category */}
          <div className="col-span-full md:col-span-2">
            <label className="block mb-2 font-semibold text-sm">
              Blog Category
            </label>

            <select
              {...register("blog_category_id", {
                required: "Category is required",
              })}
              className={`w-full px-3 py-2 border border-gray-base rounded-lg  focus:outline-none focus:bg-black-base ${
                errors.blog_category_id ? "border-red-500" : "border-gray-base"
              }`}
              defaultValue=""
            >
              <option value="" disabled hidden className="bg-black-base ">
                {isCategoryLoading ? "Loading..." : "Select Blog Category"}
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
            register={register("title", {
              required: "Title is required",
            })}
            errors={errors}
          />

          {/* Slug */}
          <Input
            label="Slug"
            text="slug"
            register={register("slug", {
              required: "Slug is required",
            })}
            readOnly
            errors={errors}
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
            <Textarea<AddBlogFormValues>
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

          {/* Image Upload */}
          <div className="col-span-full border-2 border-dashed rounded-lg p-4 hover:border-blue-400">
            <label className="block mb-2 font-semibold text-sm">
              Blog Image
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("image")}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          {/* Description */}
          <div className="col-span-full">
            <Textarea<AddBlogFormValues>
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
            text={isLoading ? "Creating..." : "Create Blog"}
            icon={Plus}
            disabled={isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default AddBlog;
