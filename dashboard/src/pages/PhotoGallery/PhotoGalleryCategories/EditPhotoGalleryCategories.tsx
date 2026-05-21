/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Save } from "lucide-react";

import {
  useGetSinglePhotoGalleryCategoryQuery,
  useUpdatePhotoGalleryCategoryMutation,
} from "../../../redux/api/photoGalleryCategoryApi";

import type { ApiError } from "../../../types/authType";
import type { PhotoGalleryCategory } from "../../../types/photoGalleryCategory.types";
import PageHeader from "../../../components/common/PageHeader";
import Input from "../../../components/ui/forms/Input";
import Textarea from "../../../components/ui/forms/Textarea";
import GradientButton from "../../../components/ui/buttons/GradientButton";

interface EditPhotoGalleryCategoryFormValues {
  title: string;
  slug: string;
  event_place?: string;
  description: string;
  image?: FileList;
  is_active?: boolean;
}

const EditPhotoGalleryCategory: React.FC = () => {
    const { id } = useParams<"id">();
    const navigate = useNavigate();

  

  // Fetch category by slug
  const { data: categoryData, isLoading: isFetching } =
    useGetSinglePhotoGalleryCategoryQuery(id as string, { skip: !id });

    console.log(categoryData,"categoryData")

  const [updateCategory, { isLoading }] = useUpdatePhotoGalleryCategoryMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditPhotoGalleryCategoryFormValues>({
    defaultValues: {
      title: "",
      slug: "",
      event_place: "",
      description: "",
      is_active: true,
    },
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Populate form when category data is fetched
  useEffect(() => {
    if (!categoryData?.data) return;
    const c: PhotoGalleryCategory = categoryData.data;

    reset({
      title: c.title || "",
      slug: c.slug || "",
      event_place: c.event_place || "",
      description: c.description || "",
      is_active: c.is_active ?? true,
    });

    setPreviewImage(
      c.image
        ? `${import.meta.env.VITE_PUBLIC_IMAGE_PATH}${c.image}?v=${new Date().getTime()}`
        : null
    );
  }, [categoryData, reset]);

 const onSubmit: SubmitHandler<EditPhotoGalleryCategoryFormValues> = async (formData) => {
  if (!categoryData?.data?.id) return; // ✅ Use the ID inside `data`

  const categoryId = categoryData.data.id;

  try {
    const payload = new FormData();
    payload.append("title", formData.title);
    payload.append("slug", formData.slug);
    payload.append("description", formData.description);
    if (formData.event_place) payload.append("event_place", formData.event_place);
    if (formData.is_active !== undefined) payload.append("is_active", String(formData.is_active));
    if (formData.image?.[0]) payload.append("image", formData.image[0]);

    await updateCategory({ id: categoryId, data: payload }).unwrap();

    toast.success("Photo gallery category updated successfully!");
    navigate(-1);
  } catch (err) {
    const error = err as ApiError;
    Swal.fire({
      title: "Update Failed",
      text:
        Array.isArray(error.data?.message)
          ? error.data.message.join(", ")
          : error.data?.message || "Something went wrong.",
      icon: "error",
      confirmButtonColor: "#3085d6",
    });
  }
};

  if (isFetching) return <p className="text-center mt-10">Loading category...</p>;

  return (
    <div className="border bg-black-base border-gray-base rounded-lg overflow-hidden p-6 mb-6">
      <PageHeader
        title="Edit Photo Gallery Category"
        breadcrumbs={[
          { title: "Dashboard", link: "/" },
          { title: "Photo Gallery Categories", link: "/photo-gallery-categories" },
          { title: "Edit Category" },
        ]}
      />

      <form
        key={categoryData?.data?.slug}
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Title"
            text="title"
            register={register("title", { required: "Title is required" })}
            errors={errors}
          />

          <Input
            label="Slug"
            text="slug"
            register={register("slug", { required: "Slug is required" })}
            errors={errors}
              readOnly
          />

          <Input
            label="Event Place"
            text="event_place"
            register={register("event_place")}
            errors={errors}
          />

          <div className="col-span-full">
            <label className="block mb-2 font-semibold text-sm">Thumbnail Image</label>
            <div className="w-48 h-48 border-2 border-dashed rounded-lg overflow-hidden flex items-center justify-center mb-2 relative border-gray-600 hover:border-blue-500 transition-colors bg-gray-900">
              <img
                src={previewImage || "/images/default-image.png"}
                alt="Thumbnail Preview"
                className="w-full h-full object-cover pointer-events-none"
              />
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                {...register("image", {
                  onChange: (e) => {
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
            <p className="text-gray-400 text-sm">
              {previewImage ? "Click to change image" : "Click to upload a thumbnail"}
            </p>
          </div>

          <div className="col-span-full">
            <Textarea<EditPhotoGalleryCategoryFormValues>
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
            text={isLoading ? "Updating..." : "Update Category"}
            icon={Save}
            disabled={isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default EditPhotoGalleryCategory;