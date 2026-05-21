import React, { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Save } from "lucide-react";
import GradientButton from "../../components/ui/buttons/GradientButton";
import Input from "../../components/ui/forms/Input";
import PageHeader from "../../components/common/PageHeader";
import type { ApiError } from "../../types/authType";
import { useGetAllServicesQuery } from "../../redux/api/servicesApi";
import { useGetSingleWhyChooseUsQuery, useUpdateWhyChooseUsMutation } from "../../redux/api/whyChooseUsApi";

interface EditWhyChooseUsFormValues {
  headline: string;
  service_id: string;
}

interface ApiResponse {
  success: boolean;
  message?: string;
}

const EditWhyChooseUs: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditWhyChooseUsFormValues>({
    defaultValues: { headline: "", service_id: "" },
  });

  // Fetch WhyChooseUs data
  const { data: businessData, isLoading: isFetching } = useGetSingleWhyChooseUsQuery(id!, {
    skip: !id,
  });

  // Fetch all services for dropdown
  const { data: servicesData, isLoading: isServiceLoading } = useGetAllServicesQuery({ search: "" });
  const services = servicesData?.data || [];

  const [updateWhyChooseUs, { isLoading }] = useUpdateWhyChooseUsMutation();

    useEffect(() => {
      if (businessData?.data) {
        reset({
          headline: businessData.data.headline,
          service_id: businessData.data.service_id,
        });
      }
    }, [businessData, reset]);

  const onSubmit: SubmitHandler<EditWhyChooseUsFormValues> = async (formData) => {
    if (!id) return;

    try {
      //formData now contains the correct selected service_id
      const response = (await updateWhyChooseUs({ id, data: formData }).unwrap()) as ApiResponse;

      if (response.success) {
        toast.success("Updated successfully!");
        navigate("/why-choose-us");
      }
    } catch (err: unknown) {
      const error = err as ApiError;
      Swal.fire(
        "Error!",
        Array.isArray(error.data?.message)
          ? error.data.message.join(", ")
          : error.data?.message || error.message || "Something went wrong.",
        "error"
      );
    }
  };

  if (isFetching) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div  className={`border bg-black-base border-gray-base rounded-lg  overflow-hidden p-6 mb-6`}>
      <PageHeader
        title="Edit Why ChooseUs"
        breadcrumbs={[
          { title: "Dashboard", link: "/" },
          { title: "Why Choose Us", link: "/business-we-cover" },
          { title: "Edit WhyChooseUs" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Service Dropdown */}
        <div className="col-span-full md:col-span-2 relative group">
          <label className="block mb-2 font-semibold text-sm">Service Category</label>

          <select
            {...register("service_id", { required: "Service is required" })}
            className={`w-full px-3 py-2 pr-10 border border-gray-base rounded-lg  focus:outline-none focus:bg-black-base appearance-none ${
              errors.service_id ? "border-red-500" : "border-gray-800"
            }`}
            defaultValue={businessData?.data?.service_id || ""}
          >
            <option value="" disabled className="text-gray-400">
              {isServiceLoading ? "Loading services..." : "Select a service"}
            </option>
            {services.map((service) => (
              <option key={service.id} value={service.id} className="bg-black-base">
                {service.name}
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {errors.service_id && (
            <p className="text-red-500 text-sm mt-1">{errors.service_id.message}</p>
          )}
        </div>

        {/* Name input */}
        <fieldset className="space-y-5">
          <Input
            label="Business Name"
            text="headline"
            placeholder="Enter headline"
            register={register("headline", { required: "headline is required" })}
            errors={errors}
          />
        </fieldset>

        <div className="flex justify-end gap-3">
          <button type="button" onClick={() => navigate(-1)}   className='px-4 py-2 rounded-md text-sm border border-gray-base'>
            Cancel
          </button>
          <GradientButton
            type="submit"
            text={isLoading ? "Updating..." : "Update"}
            icon={Save}
            disabled={isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default EditWhyChooseUs;