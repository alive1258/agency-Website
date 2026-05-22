import React, { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Plus } from "lucide-react";
import { useCreateServiceMutation } from "../../redux/api/servicesApi";
import GradientButton from "../../components/ui/buttons/GradientButton";
import PageHeader from "../../components/common/PageHeader";
import Input from "../../components/ui/forms/Input";
import type { ApiError } from "../../types/authType";
import { useGetAllCategoriesQuery } from "../../redux/api/categoriesApi";
import Textarea from "../../components/ui/forms/Textarea";

interface AddServiceFormValues {
  name: string;
  slug: string;
  description: string;
  category_id: string;
  key_features?: string;
  used_by_companies?: number;
  landing_page?: string;
  rating?: number;
  districts?: string;
  image?: FileList;
  video_url?: string;
}

export interface Category {
  id: string;
  name: string;
}

const AddService: React.FC = () => {
  const navigate = useNavigate();
  const [createService, { isLoading }] = useCreateServiceMutation();
  const { data, isLoading: isCategoryLoading } = useGetAllCategoriesQuery({
    search: "",
  });

  const categories: Category[] = data?.data || [];
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
  } = useForm<AddServiceFormValues>({
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      category_id: "",
      used_by_companies: 0,
      rating: 0,
    },
  });

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const nameValue = watch("name");

  useEffect(() => {
    if (nameValue) {
      const slug = generateSlug(nameValue);
      setValue("slug", slug);
    }
  }, [nameValue, setValue]);

  const onSubmit: SubmitHandler<AddServiceFormValues> = async (formData) => {
    try {
      const payload = new FormData();

      payload.append("name", formData.name);
      payload.append("slug", formData.slug);
      payload.append("description", formData.description);
      payload.append("category_id", String(formData.category_id));

      if (formData.key_features)
        payload.append("key_features", formData.key_features);
      if (formData.used_by_companies !== undefined)
        payload.append("used_by_companies", String(formData.used_by_companies));
      if (formData.landing_page)
        payload.append("landing_page", formData.landing_page);
      if (formData.rating !== undefined)
        payload.append("rating", String(formData.rating));
      if (formData.districts) payload.append("districts", formData.districts);
      if (formData.video_url) payload.append("video_url", formData.video_url);
      if (formData.image?.[0]) {
        payload.append("image", formData.image[0]);
      }

      await createService(payload).unwrap();
      toast.success("Service created successfully!");
      reset();
      navigate("/services");
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
        title="Create New Service"
        breadcrumbs={[
          { title: "Dashboard", link: "/" },
          { title: "Services", link: "/services" },
          { title: "Add Service" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/*  Native select using react-hook-form */}
          <div className="col-span-full md:col-span-2 relative group">
            <label className="block mb-2 font-semibold text-sm">
              Service Category
            </label>
            <select
              {...register("category_id", { required: "Category is required" })}
              className={`w-full px-3 py-2 pr-10 border rounded-lg bg-black-base  focus:outline-none  appearance-none ${
                errors.category_id ? "border-red-500" : "border-gray-700"
              }`}
              defaultValue=""
            >
              <option value="" disabled hidden className="bg-black-base ">
                {isCategoryLoading ? "Loading..." : "Select a category"}
              </option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id} className="bg-black-base ">
                  {cat.name}
                </option>
              ))}
            </select>

            {/* Down arrow icon */}
            <div className="pointer-events-none absolute inset-y-0 top-6 right-2 flex items-center text-gray-400">
              <svg
                className="w-4 h-4 transition-transform duration-200 group-focus-within:rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            {errors.category_id && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category_id.message}
              </p>
            )}
          </div>

          <Input
            label="Service Name"
            text="name"
            placeholder="e.g. Cloud Hosting"
            register={register("name", {
              required: "Service name is required",
            })}
            errors={errors}
          />
          <Input
            label="Slug"
            text="slug"
            register={register("slug", {
              required: "Slug is required",
            })}
            readOnly
            errors={errors}
          />

          <Input
            label="Key Features"
            text="key_features"
            register={register("key_features")}
            errors={errors}
          />

          <Input
            label="Used by Companies"
            text="used_by_companies"
            type="number"
            register={register("used_by_companies", { valueAsNumber: true })}
            errors={errors}
          />

          <Input
            label="Landing Page URL"
            text="landing_page"
            register={register("landing_page")}
            errors={errors}
          />

          <Input
            label="Rating (0-5)"
            text="rating"
            type="number"
            register={register("rating", {
              valueAsNumber: true,
              min: 0,
              max: 5,
            })}
            errors={errors}
          />

          <Input
            label="Districts Covered"
            text="districts"
            register={register("districts")}
            errors={errors}
          />

          <Input
            label="Video Demo URL"
            text="video_url"
            register={register("video_url")}
            errors={errors}
          />

          <div className="col-span-full border-2 border-dashed rounded-lg p-4 hover:border-blue-400">
            <label className="block mb-2 font-semibold text-sm">
              Service Thumbnail
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("image")}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          <div className="col-span-full">
            <Textarea<AddServiceFormValues>
              label="Description"
              text="description"
              register={register("description", {
                required: "Description is required",
              })}
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
            text={isLoading ? "Creating..." : "Create Service"}
            icon={Plus}
            disabled={isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default AddService;
