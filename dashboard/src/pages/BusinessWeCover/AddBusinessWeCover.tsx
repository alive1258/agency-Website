import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Plus } from "lucide-react";
import Swal from "sweetalert2";
import GradientButton from "../../components/ui/buttons/GradientButton";
import Input from "../../components/ui/forms/Input";
import PageHeader from "../../components/common/PageHeader";
import type { ApiError } from "../../types/authType";
import { useCreateBusinessWeCoverMutation } from "../../redux/api/businessWeCover";
import { useGetAllServicesQuery } from "../../redux/api/servicesApi";

interface AddBusinessWeCoverFormValues {
  name: string;
  service_id: string;
}

const AddBusinessWeCover: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm<AddBusinessWeCoverFormValues>({
    defaultValues: { name: "", service_id: "" },
  });

  const [createBusinessWeCover, { isLoading }] =
    useCreateBusinessWeCoverMutation();
  const { data: servicesData, isLoading: isServiceLoading } =
    useGetAllServicesQuery({ search: "" });
  const services = servicesData?.data || [];

  const onSubmit: SubmitHandler<AddBusinessWeCoverFormValues> = async (
    data,
  ) => {
    try {
      // Capture the API response
      const response = await createBusinessWeCover(data).unwrap();

      if (response.success) {
        toast.success("Business category added successfully!");
        reset();
        navigate("/business-we-cover");
      } else {
        toast.error(response.message || "Failed to add business category");
      }
    } catch (err: unknown) {
      const error = err as ApiError;
      Swal.fire(
        "Error!",
        error.data?.message || error.message || "Something went wrong.",
        "error",
      );
    }
  };

  return (
    <div
      className={`rounded-lg border bg-black-base border-gray-base overflow-hidden p-6 mb-6`}
    >
      {/* Header */}
      <PageHeader
        title="Add Business Category"
        breadcrumbs={[
          { title: "Dashboard", link: "/" },
          { title: "Business Categories", link: "/business-we-cover" },
          { title: "Add Business Category" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input
          label="Business Category Name"
          type="text"
          text="name"
          placeholder="Enter category name"
          register={register("name", { required: "Category name is required" })}
          errors={errors}
        />

        <div className="col-span-full md:col-span-2 relative group">
          <label className="block mb-2 font-semibold text-sm">
            Business Category
          </label>
          <select
            {...register("service_id", { required: "Category is required" })}
            className={`w-full px-3 py-2 pr-10 border rounded-lg bg-black-base  focus:outline-none  appearance-none ${
              errors.service_id ? "border-red-500" : "border-gray-700"
            }`}
            defaultValue=""
          >
            <option value="" disabled hidden className="bg-black-base ">
              {isServiceLoading ? "Loading..." : "Select a category"}
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

        <div className="flex justify-end gap-3">
          <GradientButton
            type="submit"
            text={isLoading ? "Saving..." : "Submit"}
            icon={Plus}
            disabled={isLoading || isServiceLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default AddBusinessWeCover;
