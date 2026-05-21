import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Plus } from "lucide-react";
import Swal from "sweetalert2";
import GradientButton from "../../components/ui/buttons/GradientButton";
import PageHeader from "../../components/common/PageHeader";
import Input from "../../components/ui/forms/Input";
import Textarea from "../../components/ui/forms/Textarea";
import type { ApiError } from "../../types/authType";
import { useCreateWhoWeAreFeatureMutation } from "../../redux/api/whoWeAreFeaturesApi";
import { useGetAllWhoWeAreQuery } from "../../redux/api/whoWeAreApi";


interface AddWhoWeAreFeatureFormValues {
  who_we_are_id: string;
  title: string;
  description: string;
}

interface ApiResponse {
  success: boolean;
  message?: string;
}


const AddWhoWeAreFeatures: React.FC = () => {
  const navigate = useNavigate();

  const [createFeature, { isLoading }] =
    useCreateWhoWeAreFeatureMutation();

     //  API Calls
      const { data: WhoWeAreData, isLoading: isPricingsLoading } =
        useGetAllWhoWeAreQuery({ search: "" });
          const whoWeAre = WhoWeAreData?.data || [];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddWhoWeAreFeatureFormValues>({
    defaultValues: {
      who_we_are_id: "",
      title: "",
      description: "",
    },
  });


  const onSubmit: SubmitHandler<AddWhoWeAreFeatureFormValues> = async (
    data
  ) => {
    try {
      const response = (await createFeature(data).unwrap()) as ApiResponse;

      if (response?.success) {
        toast.success("Feature added successfully");
        reset();
        navigate(-1);
      } else {
        toast.error(response?.message || "Failed to add feature");
      }
    } catch (err: unknown) {
      const error = err as ApiError;

      Swal.fire(
        "Error!",
        error.data?.message || error.message || "Something went wrong.",
        "error"
      );
    }
  };


  return (
    <div className="rounded-lg border bg-black-base border-gray-base overflow-hidden p-6 mb-6">
      {/* Header */}
      <PageHeader
        title="Add Who We Are Feature"
        breadcrumbs={[
          { title: "Dashboard", link: "/" },
          { title: "Who We Are Features", link: "/who-we-are-features" },
          { title: "Add Feature" },
        ]}
      />

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Pricing Select */}
        <div className="col-span-full md:col-span-2 relative group">
          <label className="block mb-2 font-semibold text-sm">
            Who we are
          </label>

          <select
            {...register("who_we_are_id", {
              required: "Who we are is required",
            })}
            className={`w-full px-3 py-2 pr-10 border border-gray-base rounded-lg  focus:outline-none focus:bg-black-base appearance-none ${
              errors.who_we_are_id ? "border-red-500" : "border-gray-800"
            }`}
            defaultValue=""
          >
            <option value="" disabled hidden className="bg-black-base ">
              {isPricingsLoading ? "Loading..." : "Select Who we are"}
            </option>
            {whoWeAre?.map((wwa) => (
              <option
                key={wwa.id}
                value={wwa.id}
                className="bg-black-base"
              >
                {wwa?.title}
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

          {errors.who_we_are_id && (
            <p className="text-red-500 text-sm mt-1">
              {errors.who_we_are_id.message}
            </p>
          )}
        </div>

  

        {/* Title */}
        <Input
          label="Title"
          type="text"
          text="title"
          placeholder="Enter feature title"
          register={register("title", {
            required: "Title is required",
            minLength: {
              value: 2,
              message: "Minimum 2 characters required",
            },
          })}
          errors={errors}
        />

        {/* Description */}
        <Textarea<AddWhoWeAreFeatureFormValues>
          label="Description"
          text="description"
          register={register("description", {
            required: "Description is required",
          })}
          errors={errors}
        />

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <GradientButton
            type="submit"
            text={isLoading ? "Saving..." : "Submit"}
            icon={Plus}
            disabled={
              isLoading  || isPricingsLoading 
            }
          />
        </div>
      </form>
    </div>
  );
};

export default AddWhoWeAreFeatures;