/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Save } from "lucide-react";

import GradientButton from "../../components/ui/buttons/GradientButton";
import PageHeader from "../../components/common/PageHeader";
import Input from "../../components/ui/forms/Input";
import Textarea from "../../components/ui/forms/Textarea";

import type { ApiError } from "../../types/authType";
import {
  useGetSingleServiceQuery,
  useUpdateServiceMutation,
} from "../../redux/api/servicesApi";
import { useGetAllCategoriesQuery } from "../../redux/api/categoriesApi";
import type { Service } from "../../types/service.types";

/* =======================
   Types
======================= */
interface EditServiceFormValues {
  name: string;
  slug: string; // ✅ ADDED
  description: string;
  category_id: string;
  key_features?: string;
  used_by_companies?: number;
  landing_page?: string;
  rating?: number;
  districts?: string;
  image?: FileList;
  video_url?: string;
}

interface Category {
  id: string;
  name: string;
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

/* =======================
   Component
======================= */
const EditService: React.FC = () => {
  const { id } = useParams<"id">();
  const navigate = useNavigate();

  const { data: categoriesData, isLoading: isCategoryLoading } =
    useGetAllCategoriesQuery({ search: "" });

  const categories: Category[] = categoriesData?.data || [];

  const { data: serviceData, isLoading: isFetching } =
    useGetSingleServiceQuery(id as string, { skip: !id });

  const [updateService, { isLoading }] = useUpdateServiceMutation();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<EditServiceFormValues>({
    defaultValues: {
      name: "",
      slug: "", // ✅ ADDED
      description: "",
      category_id: "",
      used_by_companies: 0,
      rating: 0,
    },
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  /* =======================
     Populate form
  ======================= */
  useEffect(() => {
    if (!serviceData?.data) return;

    const s: Service = serviceData.data;

    reset({
      name: s.name,
      slug: s.slug || "", // ✅ ADDED
      description: s.description,
      category_id: s.category?.id || "",
      key_features: s.key_features,
      used_by_companies: s.used_by_companies,
      landing_page: s.landing_page,
      rating: typeof s.rating === "string" ? parseFloat(s.rating) : s.rating,
      districts: s.districts,
      video_url: s.video_url,
    });

    setIsInitialLoad(false);
  }, [serviceData, reset]);

  /* =======================
     Image Preview
  ======================= */
  useEffect(() => {
    if (serviceData?.data?.image) {
      setPreviewImage(
        `${import.meta.env.VITE_PUBLIC_IMAGE_PATH}${serviceData.data.image}?v=${Date.now()}`
      );
    } else {
      setPreviewImage(null);
    }
  }, [serviceData]);

  /* =======================
     Auto Slug from Name
  ======================= */
  const nameValue = watch("name");

  useEffect(() => {
    if (!isInitialLoad && nameValue) {
      setValue("slug", generateSlug(nameValue));
    }
  }, [nameValue, isInitialLoad, setValue]);

  /* =======================
     Submit
  ======================= */
  const onSubmit: SubmitHandler<EditServiceFormValues> = async (formData) => {
    if (!id) return;

    try {
      const payload = new FormData();

      payload.append("name", formData.name);
      payload.append("slug", formData.slug); // ✅ ADDED
      payload.append("description", formData.description);
      payload.append("category_id", formData.category_id);

      if (formData.key_features)
        payload.append("key_features", formData.key_features);

      if (formData.used_by_companies !== undefined)
        payload.append("used_by_companies", String(formData.used_by_companies));

      if (formData.landing_page)
        payload.append("landing_page", formData.landing_page);

      if (formData.rating !== undefined)
        payload.append("rating", String(formData.rating));

      if (formData.districts)
        payload.append("districts", formData.districts);

      if (formData.video_url)
        payload.append("video_url", formData.video_url);

      if (formData.image?.[0])
        payload.append("image", formData.image[0]);

      await updateService({ id, data: payload }).unwrap();

      toast.success("Service updated successfully!");
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

  if (isFetching)
    return <p className="text-center mt-10">Loading service...</p>;

  return (
    <div className="border bg-black-base border-gray-base rounded-lg overflow-hidden p-6 mb-6">
      <PageHeader
        title="Edit Service"
        breadcrumbs={[
          { title: "Dashboard", link: "/" },
          { title: "Services", link: "/services" },
          { title: "Edit Service" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Category */}
          <div className="col-span-full md:col-span-2">
            <label className="block mb-2 font-semibold text-sm">
              Service Category
            </label>

            <select
              {...register("category_id", {
                required: "Category is required",
              })}
              className={`w-full px-3 py-2 border rounded-lg ${
                errors.category_id ? "border-red-500" : "border-gray-base"
              }`}
              defaultValue={serviceData?.data?.category?.id || ""}
            >
              <option value="">
                {isCategoryLoading ? "Loading..." : "Select a category"}
              </option>

              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Name */}
          <Input
            label="Service Name"
            text="name"
            register={register("name", {
              required: "Service name is required",
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
            errors={errors}
            readOnly
          />

          <Input
            label="Key Features"
            text="key_features"
            register={register("key_features")}
            errors={errors}
          />

          <Input
            label="Used by Companies"
            text="used_by_companies"
            type="number"
            register={register("used_by_companies", {
              valueAsNumber: true,
            })}
            errors={errors}
          />

          <Input
            label="Landing Page URL"
            text="landing_page"
            register={register("landing_page")}
            errors={errors}
          />

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

          <Input
            label="Districts Covered"
            text="districts"
            register={register("districts")}
            errors={errors}
          />

          <Input
            label="Video URL"
            text="video_url"
            register={register("video_url")}
            errors={errors}
          />

          {/* Image */}
          <div className="col-span-full">
            <label className="block mb-2 font-semibold text-sm">
              Service Thumbnail
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
                    if (file) {
                      setPreviewImage(URL.createObjectURL(file));
                    }
                  },
                })}
              />
            </div>
          </div>

          {/* Description */}
          <div className="col-span-full">
            <Textarea<EditServiceFormValues>
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
            text={isLoading ? "Updating..." : "Update Service"}
            icon={Save}
            disabled={isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default EditService;