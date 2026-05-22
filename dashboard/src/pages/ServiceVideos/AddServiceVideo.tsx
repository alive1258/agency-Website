import React, { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Plus } from "lucide-react";
import GradientButton from "../../components/ui/buttons/GradientButton";
import PageHeader from "../../components/common/PageHeader";
import Input from "../../components/ui/forms/Input";
import Textarea from "../../components/ui/forms/Textarea";
import type { ApiError } from "../../types/authType";
import { useGetAllServicesQuery } from "../../redux/api/servicesApi";
import type { Service } from "../../types/service.types";
import { useCreateServiceVideoMutation } from "../../redux/api/serviceVdeosApi";

interface AddServiceVideoFormValues {
  service_id: string;
  title: string;
  description: string;
  video_url?: string;
  thumbnail?: FileList;
}

const AddServiceVideo: React.FC = () => {
  const navigate = useNavigate();


  const [createServiceVideo, { isLoading }] = useCreateServiceVideoMutation();

  // We need services to select which service this video belongs to
  const { data: serviceData, isLoading: serviceLoading } =
    useGetAllServicesQuery({ search: "" });

  const services: Service[] = serviceData?.data || [];

  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm<AddServiceVideoFormValues>();

  useEffect(() => {
    register("service_id", { required: "Service is required" });
  }, [register]);

  const onSubmit: SubmitHandler<AddServiceVideoFormValues> = async (
    formData,
  ) => {
    try {
      const payload = new FormData();

      payload.append("service_id", formData.service_id);
      payload.append("title", formData.title);
      payload.append("description", formData.description);
      if (formData.video_url) payload.append("video_url", formData.video_url);
      if (formData.thumbnail?.[0]) {
        payload.append("thumbnail", formData.thumbnail[0]);
      }

      await createServiceVideo(payload).unwrap();

      toast.success("Service video created successfully!");
      reset();
      navigate("/service-videos");
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
    <div
       className='rounded-lg border bg-black-base border-gray-base overflow-hidden p-6 mb-6'
    >
      <PageHeader
        title="Add Service Video"
        breadcrumbs={[
          { title: "Dashboard", link: "/" },
          { title: "Service Videos", link: "/service-videos" },
          { title: "Add Video" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Service Select */}
   
          <div className="col-span-full md:col-span-2 relative group">
          <label className="block mb-2 font-semibold text-sm">
            Service  Category
          </label>
          <select
            {...register("service_id", { required: "Category is required" })}
            className={`w-full px-3 py-2 pr-10 border rounded-lg bg-black-base  focus:outline-none  appearance-none ${
              errors.service_id ? "border-red-500" : "border-gray-700"
            }`}
            defaultValue=""
          >
            <option value="" disabled hidden className="bg-black-base ">
              {serviceLoading ? "Loading..." : "Select a category"}
            </option>
            {services.map((cat) => (
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

          {errors.service_id && (
            <p className="text-red-500 text-sm mt-1">
              {errors.service_id.message}
            </p>
          )}
        </div>

          {/* Title */}
          <Input
            label="Video Title"
            text="title"
            placeholder="e.g. How to use POS system"
            register={register("title", { required: "Title is required" })}
            errors={errors}
          />

          {/* Video URL */}
          <Input
            label="Video URL (YouTube/Vimeo)"
            text="video_url"
            placeholder="https://youtube.com/watch?v=xxxxx"
            register={register("video_url")}
            errors={errors}
          />

          {/* Thumbnail Upload */}
          <div className="col-span-full border-2 border-dashed rounded-lg p-4 transition-colors hover:border-blue-400">
            <label className="block mb-2 font-semibold text-sm">
              Thumbnail Image
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("thumbnail")}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
          </div>

          {/* Description */}
          <div className="col-span-full">
            <Textarea<AddServiceVideoFormValues>
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
          <GradientButton
            type="submit"
            text={isLoading ? "Creating..." : "Create Video"}
            icon={Plus}
            disabled={isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default AddServiceVideo;
