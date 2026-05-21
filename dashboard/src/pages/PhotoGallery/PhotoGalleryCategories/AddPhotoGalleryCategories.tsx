/* eslint-disable react-hooks/incompatible-library */

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
import { useCreatePhotoGalleryCategoryMutation } from "../../../redux/api/photoGalleryCategoryApi";

interface AddPhotoGalleryCategoryFormValues {
  title: string;
  slug: string;
  description: string;
  event_place?: string;
  thumbnail?: FileList;
  is_active?: boolean;
}

// ✅ Slug Generator Function
const generateSlug = (text: string) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // remove special chars
    .replace(/\s+/g, "-") // spaces → dash
    .replace(/-+/g, "-"); // remove duplicate dash
};

const AddPhotoGalleryCategory: React.FC = () => {
  const navigate = useNavigate();
  const [createCategory, { isLoading }] = useCreatePhotoGalleryCategoryMutation();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<AddPhotoGalleryCategoryFormValues>({
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      event_place: "",
      is_active: true,
    },
  });

  // ✅ Watch title & slug
  const titleValue = watch("title");


  // ✅ Auto-generate slug from title
  useEffect(() => {
    if (titleValue) {
      const slug = generateSlug(titleValue);
      setValue("slug", slug);
    }
  }, [titleValue, setValue]);

  const onSubmit: SubmitHandler<AddPhotoGalleryCategoryFormValues> = async (formData) => {
    try {
      const payload = new FormData();

      payload.append("title", formData.title);
      payload.append("slug", formData.slug);
      payload.append("description", formData.description);

      if (formData.event_place) {
        payload.append("event_place", formData.event_place);
      }

      if (formData.thumbnail?.[0]) {
        payload.append("image", formData.thumbnail[0]);
      }

      payload.append("is_active", String(formData.is_active ?? true));

      await createCategory(payload).unwrap();

      toast.success("Photo gallery category created successfully!");
      reset();
      navigate("/photo-gallery-category");
    } catch (err) {
      const error = err as ApiError;

      Swal.fire({
        title: "Submission Failed",
        text:
          (Array.isArray(error.data?.message)
            ? error.data?.message.join(", ")
            : error.data?.message) ||
          "An unexpected error occurred",
        icon: "error",
        confirmButtonColor: "#3085d6",
      });
    }
  };

  return (
    <div className="rounded-lg border bg-black-base border-gray-base overflow-hidden p-6 mb-6">
      <PageHeader
        title="Create New Photo Gallery Category"
        breadcrumbs={[
          { title: "Dashboard", link: "/" },
          { title: "Photo Gallery Categories", link: "/photo-gallery-categories" },
          { title: "Add Category" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ✅ Title */}
          <Input
            label="Title"
            text="title"
            register={register("title", { required: "Title is required" })}
            errors={errors}
          />

          {/* ✅ Slug (auto generated) */}
          <Input
            label="Slug"
            text="slug"
            register={register("slug", { required: "Slug is required" })}
            readOnly
            errors={errors}
          />

          {/* Event Place */}
          <Input
            label="Event Place"
            text="event_place"
            register={register("event_place")}
            errors={errors}
          />

          {/* Thumbnail */}
          <div className="col-span-full border-2 border-dashed rounded-lg p-4 hover:border-blue-400">
            <label className="block mb-2 font-semibold text-sm">
              Thumbnail Image
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("thumbnail")}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          {/* Description */}
          <div className="col-span-full">
            <Textarea<AddPhotoGalleryCategoryFormValues>
              label="Description"
              text="description"
              register={register("description", {
                required: "Description is required",
              })}
              errors={errors}
            />
          </div>

          {/* Active */}
          <div className="col-span-full flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              {...register("is_active")}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              defaultChecked
            />
            <label className="text-sm text-gray-400">Active</label>
          </div>
        </div>

        {/* Buttons */}
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
            text={isLoading ? "Creating..." : "Create Category"}
            icon={Plus}
            disabled={isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default AddPhotoGalleryCategory;