import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Plus } from "lucide-react";
import GradientButton from "../../components/ui/buttons/GradientButton";
import PageHeader from "../../components/common/PageHeader";
import type { ApiError } from "../../types/authType";
import { useCreateAssigenPricingFeatureMutation } from "../../redux/api/assigenPricingFeatures";
import { useGetAllPricingsQuery } from "../../redux/api/pricingsApi";
import { useGetAllPricingFeaturesQuery } from "../../redux/api/pricingFeaturesApi";
import type { CreateAssignedPricingFeatureRequest } from "../../types/assigenPricingFeature.types";


interface AddAssignedPricingFeatureFormValues {
  pricing_id: string;
  pricing_features_id: string;
}

interface ApiResponse {
  success: boolean;
  message?: string;
}

const AddAssigenPricingFeatures: React.FC = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors, isValid },
  } = useForm<AddAssignedPricingFeatureFormValues>({
    mode: "onChange",
  });

  //  API Calls
  const { data: pricingsData, isLoading: isPricingsLoading } =
    useGetAllPricingsQuery({ search: "" });
      const pricings = pricingsData?.data || [];

        const { data: featuresData, isLoading: isFeaturesLoading } =
    useGetAllPricingFeaturesQuery({ 
      search: "", 
      limit: 100 
    });
 
  const [createAssignedFeature, { isLoading }] =
    useCreateAssigenPricingFeatureMutation();


  const features = featuresData?.data || [];


  const onSubmit: SubmitHandler<AddAssignedPricingFeatureFormValues> = async (
    data,
  ) => {
    const payload: CreateAssignedPricingFeatureRequest = {
      pricing_id: data.pricing_id,
      pricing_features_id: data.pricing_features_id,
    };

    try {
      const response = (await createAssignedFeature(
        payload,
      ).unwrap()) as ApiResponse;

      if (response.success) {
        toast.success("Feature assigned successfully!");
        reset();
        navigate("/assigen-pricing-features");
      } else {
        toast.error(response.message || "Failed to assign feature");
      }
    } catch (err: unknown) {
      const error = err as ApiError;
      if (Array.isArray(error.data?.message)) {
        error.data.message.forEach((msg: string) => toast.error(msg));
      } else {
        Swal.fire(
          "Error",
          error.data?.message || error.message || "Something went wrong.",
          "error",
        );
      }
    }
  };

  return (
    <div
       className='rounded-lg border bg-black-base border-gray-base overflow-hidden p-6 mb-6'
    >
      <PageHeader
        title="Assign Pricing Feature"
        breadcrumbs={[
          { title: "Dashboard", link: "/" },
          { title: "Pricing Features", link: "/assigen-pricing-features" },
          { title: "Assign Feature" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Pricing Select */}
       



         <div className="col-span-full md:col-span-2 relative group">
          <label className="block mb-2 font-semibold text-sm">
            Pricing Category
          </label>
          <select
            {...register("pricing_id", { required: "Category is required" })}
            className={`w-full px-3 py-2 pr-10 border rounded-lg bg-black-base  focus:outline-none  appearance-none ${
              errors.pricing_id ? "border-red-500" : "border-gray-700"
            }`}
            defaultValue=""
          >
            <option value="" disabled hidden className="bg-black-base ">
              {isFeaturesLoading ? "Loading..." : "Select a category"}
            </option>
            {pricings.map((pricing) => (
              <option key={pricing.id} value={pricing.id} className="bg-black-base ">
             {pricing.pricingCategory?.title} ({pricing?.billing_cycle})
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

          {errors.pricing_id && (
            <p className="text-red-500 text-sm mt-1">
              {errors.pricing_id.message}
            </p>
          )}
        </div>

        {/* Feature Select */}

        <div className="col-span-full md:col-span-2 relative group">
          <label className="block mb-2 font-semibold text-sm">
            Pricings features
          </label>

         <select
            {...register("pricing_features_id", { required: "Category is required" })}
            className={`w-full px-3 py-2 pr-10 border rounded-lg bg-black-base  focus:outline-none  appearance-none ${
              errors.pricing_features_id ? "border-red-500" : "border-gray-700"
            }`}
            defaultValue=""
          >
              <option value="" disabled hidden className="bg-black-base ">
              {isFeaturesLoading ? "Loading..." : "Select Pricing category"}
            </option>
            {features?.map((service) => (
              <option
                key={service.id}
                value={service.id}
                className="bg-black-base h-32 overflow-y-scroll text-white"
              >
                {service.title}
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
          {errors.pricing_features_id && (
            <p className="text-red-500 text-sm mt-1">
              {errors.pricing_features_id.message}
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
      
          <GradientButton
            type="submit"
            text={isLoading ? "Saving..." : "Assign Feature"}
            icon={Plus}
            disabled={
              isLoading || !isValid || isPricingsLoading || isFeaturesLoading
            }
          />
        </div>
      </form>
    </div>
  );
};

export default AddAssigenPricingFeatures;
