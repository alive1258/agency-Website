/* eslint-disable react-hooks/set-state-in-effect */
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
import Textarea from "../../../components/ui/forms/Textarea";
import type { ApiError } from "../../../types/authType";
import { useGetAllPhotoGalleryCategoriesQuery } from "../../../redux/api/photoGalleryCategoryApi";
import {
  useGetSinglePhotoGalleryQuery,
  useUpdatePhotoGalleryMutation,
} from "../../../redux/api/photoGallariesApi";

interface EditPhotoGalleryFormValues {
  photo_gallery_category_id: string;
  title: string;
  description: string;
  image?: FileList;
  is_active?: boolean;
}

interface Category {
  id: string;
  title: string;
}

const EditPhotoGallaries: React.FC = () => {
  const { id } = useParams<"id">();
  const navigate = useNavigate();

  // ================= API =================
  const { data: categoriesData, isLoading: isCategoryLoading } =
    useGetAllPhotoGalleryCategoriesQuery({
      search: "",
      page: 1,
      limit: 100,
    });

  const categories: Category[] = categoriesData?.data || [];
  console.log(categories, "categories");

  const { data: galleryData, isLoading: isFetching } =
    useGetSinglePhotoGalleryQuery(id as string, { skip: !id });

    console.log(galleryData,"galleryData")

  const [updatePhotoGallery, { isLoading }] = useUpdatePhotoGalleryMutation();

  // ================= FORM =================
  const {
    register,
    handleSubmit,
    reset,

    setValue,
    formState: { errors },
  } = useForm<EditPhotoGalleryFormValues>({
    defaultValues: {
      title: "",
      description: "",
      photo_gallery_category_id: "",
      is_active: true,
    },
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);



  // ================= PREFILL =================
  useEffect(() => {
    if (!galleryData?.data) return;

    const g = galleryData.data;

    reset({
      photo_gallery_category_id: g.photo_gallery_category_id || "", // ✅ FIXED
      title: g.title || "",
      description: g.description || "",
      is_active: g.is_active ?? true,
    });

    setPreviewImage(
      g.image
        ? `${import.meta.env.VITE_PUBLIC_IMAGE_PATH}${g.image}?v=${Date.now()}`
        : null,
    );
  }, [galleryData, reset]);

  // ================= SUBMIT =================
  const onSubmit: SubmitHandler<EditPhotoGalleryFormValues> = async (
    formData,
  ) => {
    if (!id) return;

    try {
      const payload = new FormData();
      payload.append(
        "photo_gallery_category_id",
        formData.photo_gallery_category_id,
      );
      payload.append("title", formData.title);
      payload.append("description", formData.description);

      if (formData.is_active !== undefined) {
        payload.append("is_active", String(formData.is_active));
      }

      if (formData.image?.[0]) {
        payload.append("image", formData.image[0]);
      }

      await updatePhotoGallery({ id, data: payload }).unwrap();

      toast.success("Photo gallery updated successfully!");
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

  // ================= LOADING =================
  if (isFetching)
    return <p className="text-center mt-10">Loading photo gallery...</p>;

  return (
    <div className="border bg-black-base border-gray-base rounded-lg p-6 mb-6">
      <PageHeader
        title="Edit Photo Gallery"
        breadcrumbs={[
          { title: "Dashboard", link: "/" },
          { title: "Photo Galleries", link: "/photo-galleries" },
          { title: "Edit Photo Gallery" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ================= CATEGORY ================= */}
          <div className="col-span-full md:col-span-2 relative group">
            <label className="block mb-2 font-semibold text-sm">
              Photo Gallery Category
            </label>

            <div className="relative">
              <select
                {...register("photo_gallery_category_id", {
                  required: "Category is required",
                })}
                defaultValue={galleryData?.data?.photo_gallery_category || ""}
                onChange={(e) =>
                  setValue("photo_gallery_category_id", e.target.value)
                }
                className={`w-full px-3 py-2 pr-10 rounded-lg border ${
                  errors.photo_gallery_category_id
                    ? "border-red-500"
                    : "border-gray-800"
                }`}
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

            {errors.photo_gallery_category_id && (
              <p className="text-red-500 text-sm mt-1">
                {errors.photo_gallery_category_id.message}
              </p>
            )}
          </div>

          {/* ================= TITLE ================= */}
          <Input
            label="Title"
            text="title"
            placeholder="Enter gallery title"
            register={register("title", { required: "Title is required" })}
            errors={errors}
          />

          {/* ================= IMAGE ================= */}
          <div className="col-span-full">
            <label className="block mb-2 font-semibold text-sm">
              Gallery Image
            </label>

            <div className="w-48 h-48 border-2 border-dashed rounded-lg overflow-hidden flex items-center justify-center mb-2 relative border-gray-600 hover:border-blue-500 transition bg-gray-900">
              <img
                src={previewImage || "/images/default-image.png"}
                alt="Preview"
                className="w-full h-full object-cover pointer-events-none"
              />

              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                {...register("image", {
                  onChange: (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const url = URL.createObjectURL(file);
                      setPreviewImage(url);
                    }
                  },
                })}
              />
            </div>
          </div>

          {/* ================= DESCRIPTION ================= */}
          <div className="col-span-full">
            <Textarea<EditPhotoGalleryFormValues>
              label="Description"
              text="description"
              register={register("description", {
                required: "Description is required",
              })}
              errors={errors}
            />
          </div>
        </div>

        {/* ================= ACTION ================= */}
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
            text={isLoading ? "Updating..." : "Update Gallery"}
            icon={Save}
            disabled={isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default EditPhotoGallaries;
