/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Save } from "lucide-react";
import { useGetAllVideoGalleryCategoriesQuery } from "../../../redux/api/videoGallaryCategoriesApi";
import { useGetSingleVideoGalleryQuery, useUpdateVideoGalleryMutation } from "../../../redux/api/videoGallariesApi";
import type { VideoGallery } from "../../../types/videoGallery.types";
import type { ApiError } from "../../../types/authType";
import PageHeader from "../../../components/common/PageHeader";
import Input from "../../../components/ui/forms/Input";
import Textarea from "../../../components/ui/forms/Textarea";
import GradientButton from "../../../components/ui/buttons/GradientButton";

interface EditVideoGalleryFormValues {
  badge_name: string;
  title: string;
  description: string;
  video_gallary_category_id: string;
  video_url?: string;
  thumbnail?: FileList;
}

interface Category {
  id: string;
  title: string;
}

const EditVideoGallery: React.FC = () => {
  const { id } = useParams<"id">();
  const navigate = useNavigate();

  const { data: categoriesData, isLoading: isCategoryLoading } =
    useGetAllVideoGalleryCategoriesQuery({ search: "", page: 1, limit: 100 });
  const categories: Category[] = categoriesData?.data || [];

  const { data: galleryData, isLoading: isFetching } =
    useGetSingleVideoGalleryQuery(id as string, { skip: !id });

  const [updateGallery, { isLoading }] = useUpdateVideoGalleryMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditVideoGalleryFormValues>({
    defaultValues: {
      badge_name: "",
      title: "",
      description: "",
      video_gallary_category_id: "",
    },
  });

  // Populate form when gallery data is fetched
  useEffect(() => {
    if (galleryData?.data) {
      const g: VideoGallery = galleryData.data;
      reset({
        badge_name: g.badge_name,
        title: g.title,
        description: g.description,
        video_gallary_category_id: g.video_gallary_category_id || "",
        video_url: g.video_url,
      });
    }
  }, [galleryData, reset]);

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    if (galleryData?.data?.thumbnail) {
      setPreviewImage(
        `${import.meta.env.VITE_PUBLIC_IMAGE_PATH}${galleryData.data.thumbnail}?v=${new Date().getTime()}`
      );
    } else {
      setPreviewImage(null);
    }
  }, [galleryData]);

  const onSubmit: SubmitHandler<EditVideoGalleryFormValues> = async (formData) => {
    if (!id) return;

    try {
      const payload = new FormData();
      payload.append("badge_name", formData.badge_name);
      payload.append("title", formData.title);
      payload.append("description", formData.description);
      payload.append("video_gallary_category_id", formData.video_gallary_category_id);
      if (formData.video_url) payload.append("video_url", formData.video_url);
      if (formData.thumbnail?.[0]) payload.append("image", formData.thumbnail[0]); // backend expects 'image'

      await updateGallery({ id, data: payload }).unwrap();
      toast.success("Video gallery updated successfully!");
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

  if (isFetching) return <p className="text-center mt-10">Loading gallery...</p>;

  return (
    <div className="border bg-black-base border-gray-base rounded-lg overflow-hidden p-6 mb-6">
      <PageHeader
        title="Edit Video Gallery"
        breadcrumbs={[
          { title: "Dashboard", link: "/" },
          { title: "Video Gallery", link: "/video-gallery" },
          { title: "Edit Video" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Category */}
          <div className="col-span-full md:col-span-2 relative group">
            <label className="block mb-2 font-semibold text-sm">Category</label>
            <select
              {...register("video_gallary_category_id", { required: "Category is required" })}
              className={`w-full px-3 py-2 pr-10 border border-gray-base rounded-lg  focus:outline-none focus:bg-black-base appearance-none ${
                errors.video_gallary_category_id ? "border-red-500" : "border-gray-800"
              }`}
              defaultValue={galleryData?.data?.video_gallary_category_id || ""}
            >
              <option value="" disabled>
                {isCategoryLoading ? "Loading..." : "Select a category"}
              </option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.title}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Badge Name"
            text="badge_name"
            register={register("badge_name", { required: "Badge name is required" })}
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

          {/* Thumbnail */}
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
                      const file = files[0];
                      const newPreviewUrl = URL.createObjectURL(file);
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
            <Textarea<EditVideoGalleryFormValues>
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
            text={isLoading ? "Updating..." : "Update Video"}
            icon={Save}
            disabled={isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default EditVideoGallery;