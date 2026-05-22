/* eslint-disable react-hooks/incompatible-library */
import React, { useState, useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Plus } from "lucide-react";

import { useCreatePortfolioMutation } from "../../../redux/api/portfolioApi";
import { useGetAllPortfolioCategoriesQuery } from "../../../redux/api/portfolioCategoriesApi";

import type { ApiError } from "../../../types/authType";

import PageHeader from "../../../components/common/PageHeader";
import Input from "../../../components/ui/forms/Input";
import Textarea from "../../../components/ui/forms/Textarea";
import GradientButton from "../../../components/ui/buttons/GradientButton";

/* =======================
   Types
======================= */
interface AddPortfolioFormValues {
  title: string;
  slug: string;
  portfolio_category_id: string;
  description: string;
  company_name?: string;
  image?: FileList;

  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
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
const AddPortfolio: React.FC = () => {
  const navigate = useNavigate();
  const [, setPreviewImage] = useState<string | null>(null);

  const [createPortfolio, { isLoading }] = useCreatePortfolioMutation();

  const { data, isLoading: isCategoryLoading } =
    useGetAllPortfolioCategoriesQuery({
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
  } = useForm<AddPortfolioFormValues>({
    defaultValues: {
      title: "",
      slug: "",
      portfolio_category_id: "",
      description: "",
      company_name: "",
      meta_title: "",
      meta_description: "",
      meta_keywords: "",
    },
  });

  /* =======================
     AUTO SLUG
  ======================= */
  const titleValue = watch("title");

  useEffect(() => {
    if (titleValue) {
      const slug = generateSlug(titleValue);
      setValue("slug", slug);
    }
  }, [titleValue, setValue]);

  /* =======================
     SUBMIT
  ======================= */
  const onSubmit: SubmitHandler<AddPortfolioFormValues> = async (formData) => {
    try {
      const payload = new FormData();

      payload.append("title", formData.title);
      payload.append("slug", formData.slug);

      payload.append("portfolio_category_id", formData.portfolio_category_id);
      payload.append("description", formData.description);

      if (formData.company_name) {
        payload.append("company_name", formData.company_name);
      }

      // SEO fields
      if (formData.meta_title) {
        payload.append("meta_title", formData.meta_title);
      }
      if (formData.meta_description) {
        payload.append("meta_description", formData.meta_description);
      }
      if (formData.meta_keywords) {
        payload.append("meta_keywords", formData.meta_keywords);
      }

      if (formData.image?.[0]) {
        payload.append("image", formData.image[0]);
      }

      await createPortfolio(payload).unwrap();

      toast.success("Portfolio created successfully!");
      reset();
      setPreviewImage(null);
      navigate("/portfolio");
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
     UI
  ======================= */
  return (
    <div className="rounded-lg border bg-black-base border-gray-base overflow-hidden p-6 mb-6">
      <PageHeader
        title="Create Portfolio"
        breadcrumbs={[
          { title: "Dashboard", link: "/" },
          { title: "Portfolios", link: "/portfolios" },
          { title: "Add Portfolio" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ✅ CATEGORY DROPDOWN */}
          <div className="col-span-full relative group">
            <label className="block mb-2 font-semibold text-sm">
              Portfolio Category
            </label>

            <select
              {...register("portfolio_category_id", {
                required: "Portfolio Category is required",
              })}
              className={`w-full px-3 py-2 pr-10 border border-gray-base rounded-lg  focus:outline-none focus:bg-black-base appearance-none ${
                errors.portfolio_category_id
                  ? "border-red-500"
                  : "border-gray-800"
              }`}
              defaultValue=""
            >
              <option value="" disabled hidden className="bg-black-base ">
                {isCategoryLoading ? "Loading..." : "Select Portfolio Category"}
              </option>

              {categories.map((cat) => (
                <option key={cat.id} value={cat.id} className="bg-black-base">
                  {cat.name}
                </option>
              ))}
            </select>

            {/* Arrow */}
            <div className="pointer-events-none absolute inset-y-0 top-6 right-2 flex items-center text-gray-400">
              <svg
                className="w-4 h-4 transition-transform duration-200 group-focus-within:rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            {errors.portfolio_category_id && (
              <p className="text-red-500 text-sm mt-1">
                {errors.portfolio_category_id.message}
              </p>
            )}
          </div>

          {/* TITLE */}
          <Input
            label="Title"
            text="title"
            register={register("title", { required: "Title is required" })}
            errors={errors}
          />

          {/* SLUG (READ ONLY) */}
          <Input
            label="Slug"
            text="slug"
            register={register("slug")}
            errors={errors}
            readOnly
          />

          {/* COMPANY */}
          <Input
            label="Company Name"
            text="company_name"
            register={register("company_name")}
            errors={errors}
          />

          {/* SEO FIELDS */}
          <Input
            label="Meta Title"
            text="meta_title"
            register={register("meta_title")}
            errors={errors}
          />

          {/* META DESCRIPTION */}
          <div className="col-span-full">
            <Input
              label="Meta Keywords"
              text="meta_keywords"
              register={register("meta_keywords")}
              errors={errors}
            />
          </div>
          {/* META DESCRIPTION */}
          <div className="col-span-full">
            <Textarea<AddPortfolioFormValues>
              label="Meta Description"
              text="meta_description"
              register={register("meta_description")}
              errors={errors}
            />
          </div>

          {/* IMAGE */}
          <div className="col-span-full border-2 border-dashed rounded-lg p-4 hover:border-blue-400">
            <label className="block mb-2 font-semibold text-sm">
              Thumbnail Image
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("image")}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 
              file:rounded-full file:border-0 file:font-semibold file:bg-blue-50 
              file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          {/* DESCRIPTION */}
          <div className="col-span-full">
            <Textarea<AddPortfolioFormValues>
              label="Description"
              text="description"
              register={register("description", {
                required: "Description is required",
              })}
              errors={errors}
            />
          </div>
        </div>

        {/* ACTIONS */}
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
            text={isLoading ? "Creating..." : "Create Portfolio"}
            icon={Plus}
            disabled={isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default AddPortfolio;
