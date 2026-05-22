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

import type { ApiError } from "../../../types/authType";
import {
  useGetSinglePortfolioQuery,
  useUpdatePortfolioMutation,
} from "../../../redux/api/portfolioApi";

import { useGetAllPortfolioCategoriesQuery } from "../../../redux/api/portfolioCategoriesApi";

/* ================= TYPES ================= */
interface EditPortfolioFormValues {
  title: string;
  slug: string;
  description: string;
  portfolio_category_id: string;
  company_name?: string;
  image?: FileList;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
}

/* ================= SLUG GENERATOR ================= */
const generateSlug = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-")         // Replace spaces with -
    .replace(/-+/g, "-");         // Remove consecutive -

/* ================= COMPONENT ================= */
const EditPortfolio: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true); // Track initial data load

  const { data: categoriesData, isLoading: isCategoryLoading } =
    useGetAllPortfolioCategoriesQuery({ search: "" });

  const categories =
    categoriesData?.data?.map((c) => ({
      id: String(c.id),
      name: c.name,
    })) || [];

  const { data: portfolioData, isLoading: isFetching } =
    useGetSinglePortfolioQuery(id as string, { skip: !id });

  const [updatePortfolio, { isLoading }] = useUpdatePortfolioMutation();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<EditPortfolioFormValues>({
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      portfolio_category_id: "",
      company_name: "",
      meta_title: "",
      meta_description: "",
      meta_keywords: "",
    },
  });

  const watchedCategory = watch("portfolio_category_id");
  const titleValue = watch("title"); // Watch the title field

  /* ================= PREFILL ================= */
  useEffect(() => {
    if (!portfolioData?.data) return;

    const p = portfolioData.data;

    reset({
      title: p.title || "",
      slug: p.slug || "",
      description: p.description || "",
      portfolio_category_id: p.category?.id || p.portfolio_category?.id || "",
      company_name: p.company_name || "",
      meta_title: p.meta_title || "",
      meta_description: p.meta_description || "",
      meta_keywords: p.meta_keywords || "",
    });

    setPreviewImage(
      p.image
        ? `${import.meta.env.VITE_PUBLIC_IMAGE_PATH}${p.image}?v=${Date.now()}`
        : null
    );

    setIsInitialLoad(false); // Data is loaded, safe to start auto-slugging
  }, [portfolioData, reset]);

  /* ================= AUTO SLUG LOGIC ================= */
  useEffect(() => {
    // Only generate slug if it's not the initial load from API
    if (!isInitialLoad && titleValue) {
      setValue("slug", generateSlug(titleValue));
    }
  }, [titleValue, isInitialLoad, setValue]);

  /* ================= SUBMIT ================= */
  const onSubmit: SubmitHandler<EditPortfolioFormValues> = async (formData) => {
    if (!id) return;

    try {
      const payload = new FormData();
      payload.append("title", formData.title);
      payload.append("slug", formData.slug);
      payload.append("description", formData.description);
      payload.append("portfolio_category_id", formData.portfolio_category_id);

      if (formData.company_name) payload.append("company_name", formData.company_name);
      if (formData.meta_title) payload.append("meta_title", formData.meta_title);
      if (formData.meta_description) payload.append("meta_description", formData.meta_description);
      if (formData.meta_keywords) payload.append("meta_keywords", formData.meta_keywords);

      if (formData.image?.[0]) {
        payload.append("image", formData.image[0]);
      }

      await updatePortfolio({ id, data: payload }).unwrap();

      toast.success("Portfolio updated successfully!");
      navigate(-1);
    } catch (err) {
      const error = err as ApiError;
      Swal.fire({
        title: "Update Failed",
        text: Array.isArray(error.data?.message)
          ? error.data.message.join(", ")
          : error.data?.message || "Something went wrong.",
        icon: "error",
      });
    }
  };

  if (isFetching) return <p className="text-center mt-10">Loading portfolio...</p>;

  return (
    <div className="border bg-black-base border-gray-base rounded-lg overflow-hidden p-6 mb-6">
      <PageHeader
        title="Edit Portfolio"
        breadcrumbs={[
          { title: "Dashboard", link: "/" },
          { title: "Portfolios", link: "/portfolios" },
          { title: "Edit Portfolio" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* CATEGORY */}
          <div className="col-span-full md:col-span-2">
            <label className="block mb-2 font-semibold text-sm">Portfolio Category</label>
            <select
              {...register("portfolio_category_id", { required: "Category is required" })}
              value={watchedCategory || ""}
              onChange={(e) => setValue("portfolio_category_id", e.target.value)}
              className="w-full px-3 py-2 border rounded-lg bg-black-base border-gray-base"
            >
              <option value="">{isCategoryLoading ? "Loading..." : "Select Category"}</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            {errors.portfolio_category_id && (
              <p className="text-red-500 text-sm mt-1">{errors.portfolio_category_id.message}</p>
            )}
          </div>

          {/* TITLE */}
          <Input
            label="Title"
            text="title"
            register={register("title", { required: "Title is required" })}
            errors={errors}
          />

          {/* SLUG */}
          <Input
            label="Slug"
            text="slug"
            register={register("slug", { required: "Slug is required" })}
            errors={errors}
            readOnly // Keep as readOnly to prevent manual errors, or remove for manual edits
          />

          {/* ... Rest of your inputs remain the same ... */}
          <Input label="Company Name" text="company_name" register={register("company_name")} errors={errors} />
          <Input label="Meta Title" text="meta_title" register={register("meta_title")} errors={errors} />
          <Input label="Meta Keywords" text="meta_keywords" register={register("meta_keywords")} errors={errors} />
          
          <div className="col-span-full">
            <Textarea<EditPortfolioFormValues> label="Meta Description" text="meta_description" register={register("meta_description")} errors={errors} />
          </div>

          <div className="col-span-full">
            <label className="block mb-2 font-semibold text-sm">Thumbnail</label>
            <div className="w-48 h-48 border-2 border-dashed rounded-lg overflow-hidden relative bg-gray-900 border-gray-base">
              <img src={previewImage || "/images/default-image.png"} className="w-full h-full object-cover" />
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

          <div className="col-span-full">
            <Textarea<EditPortfolioFormValues>
              label="Description"
              text="description"
              register={register("description", { required: "Description is required" })}
              errors={errors}
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button type="button" onClick={() => navigate(-1)} className="px-4 py-2 border rounded-md border-gray-base">
            Cancel
          </button>
          <GradientButton
            type="submit"
            text={isLoading ? "Updating..." : "Update Portfolio"}
            icon={Save}
            disabled={isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default EditPortfolio;
