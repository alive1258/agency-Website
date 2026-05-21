/* eslint-disable react-hooks/incompatible-library */

import React, { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Save } from "lucide-react";

import GradientButton from "../../../components/ui/buttons/GradientButton";
import PageHeader from "../../../components/common/PageHeader";
import Input from "../../../components/ui/forms/Input";

import {
  useGetSinglePhotoGalleryAlbumQuery,
  useUpdatePhotoGalleryAlbumMutation,
} from "../../../redux/api/photoGalleryAlbumApi";

import { useGetAllPhotoGalleriesQuery } from "../../../redux/api/photoGallariesApi";
import type { ApiError } from "../../../types/authType";

/* ================= FORM TYPE ================= */
interface EditPhotoGalleryAlbumFormValues {
  title: string;
  photo_gallery_id: string;
  image?: FileList;
  is_active?: boolean;
}

/* ================= COMPONENT ================= */
const EditPhotoGalleryAlbum: React.FC = () => {
  const { id } = useParams<"id">();
  const navigate = useNavigate();

  /* ================= DATA ================= */
  const { data: galleriesData,} =
    useGetAllPhotoGalleriesQuery({ search: "" });

  const galleries = galleriesData?.data || [];

  const { data: albumData, isLoading: isFetching } =
    useGetSinglePhotoGalleryAlbumQuery(id as string, { skip: !id });

  const [updateAlbum, { isLoading }] = useUpdatePhotoGalleryAlbumMutation();

  /* ================= FORM ================= */
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<EditPhotoGalleryAlbumFormValues>({
    defaultValues: {
      title: "",
      photo_gallery_id: "",
      is_active: true,
    },
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const watchedGallery = watch("photo_gallery_id");

  /* ================= PREFILL FIX ================= */
  useEffect(() => {
    if (!albumData?.data) return;

    const a = albumData.data;

    reset({
      title: a.title || "",
      photo_gallery_id: a.photo_gallery_id || "", // ✅ FIXED (IMPORTANT)
      is_active: a.is_active ?? true,
    });

    setPreviewImage(
      a.image
        ? `${import.meta.env.VITE_PUBLIC_IMAGE_PATH}${a.image}?v=${Date.now()}`
        : null
    );
  }, [albumData, reset]);

  /* ================= SUBMIT ================= */
  const onSubmit: SubmitHandler<EditPhotoGalleryAlbumFormValues> = async (
    formData
  ) => {
    if (!id) return;

    try {
      const payload = new FormData();

      payload.append("title", formData.title);
      payload.append("photo_gallery_id", formData.photo_gallery_id);

      if (formData.is_active !== undefined) {
        payload.append("is_active", String(formData.is_active));
      }

      if (formData.image?.[0]) {
        payload.append("image", formData.image[0]);
      }

      await updateAlbum({ id, data: payload }).unwrap();

      toast.success("Album updated successfully!");
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

  if (isFetching) {
    return <p className="text-center mt-10">Loading album...</p>;
  }

  return (
    <div className="border bg-black-base border-gray-base rounded-lg p-6 mb-6">
      <PageHeader
        title="Edit Photo Gallery Album"
        breadcrumbs={[
          { title: "Dashboard", link: "/" },
          { title: "Albums", link: "/photo-gallery-albums" },
          { title: "Edit Album" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* ================= GALLERY SELECT ================= */}
          <div className="col-span-full md:col-span-2">
            <label className="block mb-2 text-sm font-semibold">
              Gallery
            </label>

            <select
              {...register("photo_gallery_id", {
                required: "Gallery is required",
              })}
              value={watchedGallery || ""}
              onChange={(e) =>
                setValue("photo_gallery_id", e.target.value)
              }
              className={`w-full px-3 py-2 border rounded-lg ${
                errors.photo_gallery_id ? "border-red-500" : "border-gray-800"
              }`}
            >
              

              {galleries.map((g) => (
                <option key={g.id} value={g.id} className="bg-black-base">
                  {g.title}
                </option>
              ))}
            </select>

            {errors.photo_gallery_id && (
              <p className="text-red-500 text-sm mt-1">
                {errors.photo_gallery_id.message}
              </p>
            )}
          </div>

          {/* ================= TITLE ================= */}
          <Input
            label="Title"
            text="title"
            register={register("title", {
              required: "Title is required",
            })}
            errors={errors}
          />

          {/* ================= IMAGE ================= */}
          <div className="col-span-full">
            <label className="block mb-2 text-sm font-semibold">
              Album Image
            </label>

            <div className="w-48 h-48 border rounded-lg overflow-hidden relative">
              <img
                src={previewImage || "/images/default-image.png"}
                className="w-full h-full object-cover"
              />

              <input
                type="file"
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

          {/* ================= ACTIVE ================= */}
          <div className="col-span-full flex items-center gap-3">
            <input type="checkbox" {...register("is_active")} />
            <label>Active</label>
          </div>
        </div>

        {/* ================= ACTION ================= */}
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
            text={isLoading ? "Updating..." : "Update Album"}
            icon={Save}
            disabled={isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default EditPhotoGalleryAlbum;