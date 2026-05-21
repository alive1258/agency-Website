import React, { useState } from "react";
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
import { useCreatePhotoGalleryMutation } from "../../../redux/api/photoGallariesApi";
import { useGetAllPhotoGalleryCategoriesQuery } from "../../../redux/api/photoGalleryCategoryApi";


interface AddPhotoGalleryFormValues {
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

const AddPhotoGallaries: React.FC = () => {
  const navigate = useNavigate();
  const [createPhotoGallery, { isLoading }] = useCreatePhotoGalleryMutation();

  const { data, isLoading: isCategoryLoading } = useGetAllPhotoGalleryCategoriesQuery({
    search: "",
    page: 1,
    limit: 100,
  });

  const categories: Category[] = data?.data || [];

  const { register, handleSubmit, reset, formState: { errors } } = useForm<AddPhotoGalleryFormValues>({
    defaultValues: {
      photo_gallery_category_id: "",
      title: "",
      description: "",
      is_active: true,
    },
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const onSubmit: SubmitHandler<AddPhotoGalleryFormValues> = async (formData) => {
    try {
      const payload = new FormData();
      payload.append("photo_gallery_category_id", formData.photo_gallery_category_id);
      payload.append("title", formData.title);
      payload.append("description", formData.description);
      if (formData.is_active !== undefined) payload.append("is_active", String(formData.is_active));
      if (formData.image?.[0]) payload.append("image", formData.image[0]);

      await createPhotoGallery(payload).unwrap();

      toast.success("Photo gallery created successfully!");
      reset();
      navigate("/photo-gallery");
    } catch (err) {
      const error = err as ApiError;
      Swal.fire({
        title: "Submission Failed",
        text:
          Array.isArray(error.data?.message)
            ? error.data?.message.join(", ")
            : error.data?.message || "An unexpected error occurred",
        icon: "error",
        confirmButtonColor: "#3085d6",
      });
    }
  };

  return (
    <div className="rounded-lg border bg-black-base border-gray-base overflow-hidden p-6 mb-6">
      <PageHeader
        title="Create New Photo Gallery"
        breadcrumbs={[
          { title: "Dashboard", link: "/" },
          { title: "Photo Galleries", link: "/photo-galleries" },
          { title: "Add Photo Gallery" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* CATEGORY DROPDOWN */}
          <div className="col-span-full relative group">
            <label className="block mb-2 font-semibold text-sm">Photo Gallery Category</label>
            <select
              {...register("photo_gallery_category_id", { required: "Category is required" })}
              className={`w-full px-3 py-2 pr-10 border border-gray-base rounded-lg  focus:outline-none focus:bg-black-base appearance-none ${
                errors.photo_gallery_category_id ? "border-red-500" : "border-gray-800"
              }`}
              defaultValue=""
            >
               <option value="" disabled hidden className="bg-black-base ">
              {isCategoryLoading ? "Loading..." : "Select Photo Gallery Category"}
            </option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.title}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Title"
            text="title"
            register={register("title", { required: "Title is required" })}
            errors={errors}
          />

          <div className="col-span-full border-2 border-dashed rounded-lg p-4 hover:border-blue-400">
            <label className="block mb-2 font-semibold text-sm">Thumbnail Image</label>
            <input
              type="file"
              accept="image/*"
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
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {previewImage && (
              <img src={previewImage} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded" />
            )}
          </div>

          <div className="col-span-full">
            <Textarea<AddPhotoGalleryFormValues>
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
            text={isLoading ? "Creating..." : "Create Gallery"}
            icon={Plus}
            disabled={isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default AddPhotoGallaries;