/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Save } from "lucide-react";
import {
  useGetSingleVideoGalleryCategoryQuery,
  useUpdateVideoGalleryCategoryMutation,
} from "../../../redux/api/videoGallaryCategoriesApi";
import type { ApiError } from "../../../types/authType";
import PageHeader from "../../../components/common/PageHeader";
import Input from "../../../components/ui/forms/Input";
import Textarea from "../../../components/ui/forms/Textarea";
import GradientButton from "../../../components/ui/buttons/GradientButton";

interface EditVideoGalleryCategoryFormValues {
  badge_name: string;
  slug: string;
  author_name?: string;
  title: string;
  description: string;
  thumbnail?: FileList;
  video_url?: string;
}

const EditVideoGalleryCategory: React.FC = () => {
  const { slug } = useParams<"slug">(); // <-- Use slug from URL
  const navigate = useNavigate();

  // Fetch category by slug
  const { data: categoryData, isLoading: isFetching } =
    useGetSingleVideoGalleryCategoryQuery(slug as string, { skip: !slug });

  const [updateCategory, { isLoading }] = useUpdateVideoGalleryCategoryMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditVideoGalleryCategoryFormValues>({
    defaultValues: {
      badge_name: "",
      slug: "",
      author_name: "",
      title: "",
      description: "",
      video_url: "",
    },
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Populate form when data is fetched
  useEffect(() => {
    if (categoryData?.data) {
      const c = categoryData.data;

      reset({
        badge_name: c.badge_name || "",
        slug: c.slug || "",
        author_name: c.author_name || "",
        title: c.title || "",
        description: c.description || "",
        video_url: c.video_url || "",
      });

      if (c.thumbnail) {
        setPreviewImage(
          `${import.meta.env.VITE_PUBLIC_IMAGE_PATH}${c.thumbnail}?v=${new Date().getTime()}`
        );
      } else {
        setPreviewImage(null);
      }
    }
  }, [categoryData, reset]);

const onSubmit: SubmitHandler<EditVideoGalleryCategoryFormValues> = async (
  formData
) => {
  if (!categoryData?.data?.id) return; // <-- must use UUID from fetched data

  const categoryId = categoryData.data.id;

  try {
    const payload = new FormData();
    payload.append("badge_name", formData.badge_name);
    payload.append("slug", formData.slug);
    payload.append("title", formData.title);
    payload.append("description", formData.description);
    if (formData.author_name) payload.append("author_name", formData.author_name);
    if (formData.video_url) payload.append("video_url", formData.video_url);
    if (formData.thumbnail?.[0]) payload.append("thumbnail", formData.thumbnail[0]);

    // Use actual UUID for update
    await updateCategory({ id: categoryId, data: payload }).unwrap();
    toast.success("Video gallery category updated successfully!");
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
        title="Edit Video Gallery Category"
        breadcrumbs={[
          { title: "Dashboard", link: "/" },
          { title: "Video Gallery Categories", link: "/video-gallery-categories" },
          { title: "Edit Category" },
        ]}
      />

      <form
        key={categoryData?.data?.slug} // forces re-render when slug changes
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Badge Name"
            text="badge_name"
            register={register("badge_name", { required: "Badge name is required" })}
            errors={errors}
          />

          <Input
            label="Slug"
            text="slug"
            register={register("slug", { required: "Slug is required" })}
            errors={errors}
          />

          <Input
            label="Author Name"
            text="author_name"
            register={register("author_name")}
            errors={errors}
          />

          <Input
            label="Title"
            text="title"
            register={register("title", { required: "Title is required" })}
            errors={errors}
          />

          <Input
            label="Video URL"
            text="video_url"
            register={register("video_url")}
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
                {...register("thumbnail", {
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
            <Textarea<EditVideoGalleryCategoryFormValues>
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

export default EditVideoGalleryCategory;