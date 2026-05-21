import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Plus } from "lucide-react";
import GradientButton from "../../../components/ui/buttons/GradientButton";
import PageHeader from "../../../components/common/PageHeader";
import Input from "../../../components/ui/forms/Input";
import { useCreatePhotoGalleryAlbumMutation } from "../../../redux/api/photoGalleryAlbumApi";

import type { ApiError } from "../../../types/authType";
import { useGetAllPhotoGalleriesQuery } from "../../../redux/api/photoGallariesApi";

interface AddPhotoGalleryAlbumFormValues {
  title: string;
  photo_gallery_id: string;
  image?: FileList;
  is_active?: boolean;
}

const AddPhotoGalleryAlbum: React.FC = () => {
  const navigate = useNavigate();
  const [createAlbum, { isLoading }] = useCreatePhotoGalleryAlbumMutation();
  const { data, isLoading: isGalleryLoading } = useGetAllPhotoGalleriesQuery({ search: "" });

  const galleries = data?.data || [];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddPhotoGalleryAlbumFormValues>({
    defaultValues: {
      title: "",
      photo_gallery_id: "",
      is_active: true,
    },
  });

  const onSubmit: SubmitHandler<AddPhotoGalleryAlbumFormValues> = async (formData) => {
    try {
      const payload = new FormData();
      payload.append("title", formData.title);
      payload.append("photo_gallery_id", formData.photo_gallery_id);
      if (formData.image?.[0]) payload.append("image", formData.image[0]);
      if (formData.is_active !== undefined) payload.append("is_active", String(formData.is_active));

      await createAlbum(payload).unwrap();
      toast.success("Photo Gallery Album created successfully!");
      reset();
      navigate("/photo-gallery-album");
    } catch (err) {
      const error = err as ApiError;
      Swal.fire({
        title: "Submission Failed",
        text:
          (Array.isArray(error.data?.message)
            ? error.data?.message.join(", ")
            : error.data?.message) || "An unexpected error occurred",
        icon: "error",
        confirmButtonColor: "#3085d6",
      });
    }
  };

  return (
    <div className="rounded-lg border bg-black-base border-gray-base overflow-hidden p-6 mb-6">
      <PageHeader
        title="Add Photo Gallery Album"
        breadcrumbs={[
          { title: "Dashboard", link: "/" },
          { title: "Photo Galleries", link: "/photo-gallery-albums" },
          { title: "Add Album" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Gallery Select */}
          <div className="col-span-full md:col-span-2 relative group">
            <label className="block mb-2 font-semibold text-sm">Select Gallery</label>
            <select
              {...register("photo_gallery_id", { required: "Gallery is required" })}
              className={`w-full px-3 py-2 pr-10 border border-gray-base rounded-lg  focus:outline-none focus:bg-black-base appearance-none ${
                errors.photo_gallery_id ? "border-red-500" : "border-gray-800"
              }`}
              defaultValue=""
            >
               <option value="" disabled hidden className="bg-black-base ">
              {isGalleryLoading ? "Loading..." : "Select Photo Gallery"}
            </option>
              {galleries.map((gallery) => (
                <option key={gallery.id} value={gallery.id}>
                  {gallery.title}
                </option>
              ))}
            </select>
            {errors.photo_gallery_id && (
              <p className="text-red-500 text-sm mt-1">{errors.photo_gallery_id.message}</p>
            )}
          </div>

          {/* Album Title */}
          <Input
            label="Album Title"
            text="title"
            placeholder="e.g. Office Event 2025"
            register={register("title", { required: "Title is required" })}
            errors={errors}
          />

          {/* Thumbnail */}
          <div className="col-span-full border-2 border-dashed rounded-lg p-4 hover:border-blue-400">
            <label className="block mb-2 font-semibold text-sm">Album Thumbnail</label>
            <input
              type="file"
              accept="image/*"
              {...register("image")}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          {/* Active Toggle */}
          <div className="col-span-full flex items-center gap-3">
            <input type="checkbox" {...register("is_active")} className="w-4 h-4" defaultChecked />
            <label className="text-sm font-medium text-white">Active</label>
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
            text={isLoading ? "Creating..." : "Create Album"}
            icon={Plus}
            disabled={isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default AddPhotoGalleryAlbum;