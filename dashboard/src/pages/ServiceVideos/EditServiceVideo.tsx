/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Save } from "lucide-react";
import GradientButton from "../../components/ui/buttons/GradientButton";
import Input from "../../components/ui/forms/Input";
import Textarea from "../../components/ui/forms/Textarea";
import PageHeader from "../../components/common/PageHeader";
import type { ApiError } from "../../types/authType";
import {
  useGetSingleServiceVideoQuery,
  useUpdateServiceVideoMutation,
} from "../../redux/api/serviceVdeosApi";
import { useGetAllServicesQuery } from "../../redux/api/servicesApi";
import type { ServiceVideo } from "../../types/serviceVideo.types";

interface EditServiceVideoFormValues {
  service_id: string;
  title: string;
  description: string;
  video_url: string | null;
  thumbnail?: FileList;
}

interface SelectOption {
  id: string;
  name: string;
}

interface ApiResponse {
  success: boolean;
  message?: string;
}

const EditServiceVideo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditServiceVideoFormValues>({
    defaultValues: {
      service_id: "",
      title: "",
      description: "",
      video_url: "",
    },
  });

  const [previewThumbnail, setPreviewThumbnail] = useState<string | null>(null);

  // Fetch the service video data
  const { data: videoData, isLoading: isFetching } =
    useGetSingleServiceVideoQuery(id!, { skip: !id });

  // Fetch all services for dropdown
  const { data: servicesData, isLoading: isServiceLoading } =
    useGetAllServicesQuery({ search: "" });

  const services: SelectOption[] =
    servicesData?.data.map((s) => ({ id: String(s.id), name: s.name })) || [];

  const [updateServiceVideo, { isLoading }] = useUpdateServiceVideoMutation();

  // Populate form when data loads
  useEffect(() => {
    if (videoData?.data) {
      const sv: ServiceVideo = videoData.data;
      reset({
        service_id: String(sv.service_id),
        title: sv.title,
        description: sv.description,
        video_url: sv.video_url,
      });
      if (sv.thumbnail) {
        setPreviewThumbnail(
          `${import.meta.env.VITE_PUBLIC_IMAGE_PATH}${sv.thumbnail}?v=${new Date().getTime()}`,
        );
      }
    }
  }, [videoData, reset]);

  // Handle form submission
  const onSubmit: SubmitHandler<EditServiceVideoFormValues> = async (
    formData,
  ) => {
    if (!id) return;

    try {
      const payload = new FormData();
      payload.append("service_id", formData.service_id);
      payload.append("title", formData.title);
      payload.append("description", formData.description);
      if (formData.video_url) payload.append("video_url", formData.video_url);
      if (formData.thumbnail?.[0])
        payload.append("thumbnail", formData.thumbnail[0]);

      const response = (await updateServiceVideo({
        id,
        data: payload,
      }).unwrap()) as ApiResponse;

      if (response.success) {
        toast.success("Service video updated successfully!");
        navigate("/service-videos");
      } else {
        toast.error(response.message || "Update failed");
      }
    } catch (err) {
      const error = err as ApiError;
      Swal.fire(
        "Error!",
        Array.isArray(error.data?.message)
          ? error.data.message.join(", ")
          : error.data?.message || "Something went wrong",
        "error",
      );
    }
  };

  if (isFetching) return <p className="text-center mt-10">Loading video...</p>;

  return (
    <div className="border bg-black-base border-gray-base rounded-lg  overflow-hidden p-6 mb-6">
      <PageHeader
        title="Edit Service Video"
        breadcrumbs={[
          { title: "Dashboard", link: "/" },
          { title: "Service Videos", link: "/service-videos" },
          { title: "Edit Video" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-6">
        {/* Service Dropdown */}
        <div className="col-span-full md:col-span-2 relative group">
          <label className="block mb-2 font-semibold text-sm">Service</label>
          <select
            {...register("service_id", { required: "Service is required" })}
            className={`w-full px-3 py-2 pr-10 border border-gray-base rounded-lg  focus:outline-none focus:bg-black-base appearance-none ${errors.service_id ? "border-red-500" : "border-gray-800"
              }`}
            defaultValue={videoData?.data?.service_id || ""}
          >
            <option value="" disabled className="text-gray-400">
              {isServiceLoading ? "Loading services..." : "Select a service"}
            </option>
            {services.map((service) => (
              <option
                key={service.id}
                value={service.id}
                className="bg-black-base"
              >
                {service.name}
              </option>
            ))}
          </select>

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

        {/* Video Title */}
        <Input
          label="Video Title"
          text="title"
          register={register("title", { required: "Title is required" })}
          errors={errors}
        />

        {/* Video URL */}
        <Input
          label="Video URL"
          text="video_url"
          register={register("video_url")}
          errors={errors}
        />

        {/* Description */}
        <Textarea<EditServiceVideoFormValues>
          label="Description"
          text="description"
          register={register("description", {
            required: "Description is required",
          })}
          errors={errors}
        />

        {/* Thumbnail */}
        <div>
          <label className="block mb-2 font-semibold text-sm">Thumbnail</label>
          <div className="w-48 h-48 border-2 border-dashed rounded-lg overflow-hidden flex items-center justify-center mb-2 relative border-gray-600 hover:border-blue-500 transition-colors bg-gray-900">
            <img
              src={previewThumbnail || "/images/default-image.png"}
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
                    setPreviewThumbnail(newPreviewUrl);

                    return () => URL.revokeObjectURL(newPreviewUrl);
                  }
                },
              })}
            />
          </div>
          <p className="text-gray-400 text-sm">
            {previewThumbnail
              ? "Click to change thumbnail"
              : "Click to upload a thumbnail"}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded-md text-sm border border-gray-base"
          >
            Cancel
          </button>

          <GradientButton
            type="submit"
            text={isLoading ? "Updating..." : "Update"}
            icon={Save}
            disabled={isLoading || isServiceLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default EditServiceVideo;
