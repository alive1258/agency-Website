/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Plus } from "lucide-react";

import type { ApiError } from "../../../types/authType";
import PageHeader from "../../../components/common/PageHeader";
import Input from "../../../components/ui/forms/Input";
import Textarea from "../../../components/ui/forms/Textarea";
import GradientButton from "../../../components/ui/buttons/GradientButton";

import { useCreateVideoGalleryMutation } from "../../../redux/api/videoGallariesApi";
import { useGetAllVideoGalleryCategoriesQuery } from "../../../redux/api/videoGallaryCategoriesApi";

/* =======================
   Types
======================= */
interface AddVideoGalleryFormValues {
  badge_name: string;
  slug: string; // ✅ ADDED
  video_gallary_category_id: string;
  title: string;
  description: string;
  thumbnail?: FileList;
  video_url?: string;
}

interface Category {
  id: string;
  title: string;
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
const AddVideoGallery: React.FC = () => {
  const navigate = useNavigate();
  const [createVideo, { isLoading }] = useCreateVideoGalleryMutation();

  const { data, isLoading: isCategoryLoading } =
    useGetAllVideoGalleryCategoriesQuery({
      search: "",
      page: 1,
      limit: 100,
    });

  const categories: Category[] = data?.data || [];

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<AddVideoGalleryFormValues>({
    defaultValues: {
      badge_name: "",
      slug: "",
      video_gallary_category_id: "",
      title: "",
      description: "",
    },
  });

  /* =======================
     AUTO SLUG (from title)
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
  const onSubmit: SubmitHandler<AddVideoGalleryFormValues> = async (
    formData
  ) => {
    try {
      const payload = new FormData();

      payload.append("badge_name", formData.badge_name);
      payload.append(
        "video_gallary_category_id",
        formData.video_gallary_category_id
      );
      payload.append("title", formData.title);
      payload.append("slug", formData.slug); // ✅ IMPORTANT
      payload.append("description", formData.description);

      if (formData.video_url) {
        payload.append("video_url", formData.video_url);
      }

      if (formData.thumbnail?.[0]) {
        payload.append("image", formData.thumbnail[0]);
      }

      await createVideo(payload).unwrap();

      toast.success("Video created successfully!");
      reset();
      navigate("/video-gallery");
    } catch (err) {
      const error = err as ApiError;

      Swal.fire({
        title: "Submission Failed",
        text:
          (Array.isArray(error.data?.message)
            ? error.data?.message.join(", ")
            : error.data?.message) || "An unexpected error occurred",
        icon: "error",
      });
    }
  };

  return (
    <div className="rounded-lg border bg-black-base border-gray-base overflow-hidden p-6 mb-6">
      <PageHeader
        title="Create New Video Gallery"
        breadcrumbs={[
          { title: "Dashboard", link: "/" },
          { title: "Video Gallery", link: "/video-gallery" },
          { title: "Add Video" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* CATEGORY */}
          <div className="col-span-full relative group">
            <label className="block mb-2 font-semibold text-sm">
              Video Category
            </label>

            <select
              {...register("video_gallary_category_id", {
                required: "Category is required",
              })}
              className={`w-full px-3 py-2 border rounded-lg ${
                errors.video_gallary_category_id
                  ? "border-red-500"
                  : "border-gray-800"
              }`}
              defaultValue=""
            >
              <option value="" disabled hidden>
                {isCategoryLoading ? "Loading..." : "Select Video Category"}
              </option>

              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.title}
                </option>
              ))}
            </select>
          </div>
                {/* Title */}
          <Input
            label="Title"
            text="title"
            register={register("title", {
              required: "Title is required",
            })}
            errors={errors}
          />

          {/* SLUG (AUTO GENERATED) */}
          <Input
            label="Slug"
            text="slug"
            register={register("slug", {
              required: "Slug is required",
            })}
            readOnly
            errors={errors}
          />

          {/* Badge */}
          <Input
            label="Badge Name"
            text="badge_name"
            register={register("badge_name", {
              required: "Badge name is required",
            })}
            errors={errors}
          />

    

          {/* Thumbnail */}
          <div className="col-span-full border-2 border-dashed rounded-lg p-4">
            <label className="block mb-2 font-semibold text-sm">
              Thumbnail Image
            </label>

            <input
              type="file"
              accept="image/*"
              {...register("thumbnail")}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 
              file:rounded-full file:border-0 file:font-semibold file:bg-blue-50 
              file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          {/* Video URL */}
          <Input
            label="Video URL"
            text="video_url"
            register={register("video_url")}
            errors={errors}
          />

          {/* Description */}
          <div className="col-span-full">
            <Textarea<AddVideoGalleryFormValues>
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
            className="px-4 py-2 rounded-md border"
          >
            Cancel
          </button>

          <GradientButton
            type="submit"
            text={isLoading ? "Creating..." : "Create Video"}
            icon={Plus}
            disabled={isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default AddVideoGallery;