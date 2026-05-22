import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Plus } from "lucide-react";
import { useCreateVideoGalleryCategoryMutation } from "../../../redux/api/videoGallaryCategoriesApi";
import type { ApiError } from "../../../types/authType";
import PageHeader from "../../../components/common/PageHeader";
import Input from "../../../components/ui/forms/Input";
import Textarea from "../../../components/ui/forms/Textarea";
import GradientButton from "../../../components/ui/buttons/GradientButton";


interface AddVideoGalleryCategoryFormValues {
  badge_name: string;
  slug: string;
  author_name?: string;
  title: string;
  description: string;
  thumbnail?: FileList;
  video_url?: string;
}

const AddVideoGalleryCategory: React.FC = () => {
  const navigate = useNavigate();
  const [createCategory, { isLoading }] = useCreateVideoGalleryCategoryMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddVideoGalleryCategoryFormValues>({
    defaultValues: {
      badge_name: "",
      slug: "",
      author_name: "",
      title: "",
      description: "",
    },
  });

  const onSubmit: SubmitHandler<AddVideoGalleryCategoryFormValues> = async (formData) => {
    try {
      const payload = new FormData();
      payload.append("badge_name", formData.badge_name);
      payload.append("slug", formData.slug);
      payload.append("title", formData.title);
      payload.append("description", formData.description);

      if (formData.author_name) payload.append("author_name", formData.author_name);
      if (formData.video_url) payload.append("video_url", formData.video_url);
      if (formData.thumbnail?.[0]) payload.append("thumbnail", formData.thumbnail[0]);

      await createCategory(payload).unwrap();
      toast.success("Video gallery category created successfully!");
      reset();
      navigate("/video-gallery-category");
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
        title="Create New Video Gallery Category"
        breadcrumbs={[
          { title: "Dashboard", link: "/" },
          { title: "Video Gallery Categories", link: "/video-gallery-categories" },
          { title: "Add Category" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
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

          <div className="col-span-full border-2 border-dashed rounded-lg p-4 hover:border-blue-400">
            <label className="block mb-2 font-semibold text-sm">Thumbnail Image</label>
            <input
              type="file"
              accept="image/*"
              {...register("thumbnail")}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          <Input
            label="Video URL"
            text="video_url"
            register={register("video_url")}
            errors={errors}
          />

          <div className="col-span-full">
            <Textarea<AddVideoGalleryCategoryFormValues>
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
            text={isLoading ? "Creating..." : "Create Category"}
            icon={Plus}
            disabled={isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default AddVideoGalleryCategory;