/* eslint-disable react-hooks/incompatible-library */
import React, { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Plus } from "lucide-react";
import GradientButton from "../../components/ui/buttons/GradientButton";
import PageHeader from "../../components/common/PageHeader";
import { useThemeColors } from "../../redux/features/useThemeColors";
import type { ApiError } from "../../types/authType";
import {
  useGetSingleAssigenPricingFeatureQuery,
  useUpdateAssigenPricingFeatureMutation,
} from "../../redux/api/assigenPricingFeatures";
import { useGetAllPricingsQuery } from "../../redux/api/pricingsApi";
import { useGetAllPricingFeaturesQuery } from "../../redux/api/pricingFeaturesApi";
import type { Pricing } from "../../types/pricing.types";
import type { PricingFeature } from "../../types/pricingFeature.types";
import type { CreateAssignedPricingFeatureRequest } from "../../types/assigenPricingFeature.types";

interface EditAssignedPricingFeatureFormValues {
  pricing_id: string;
  pricing_features_id: string;
}

const EditAssigenPricingFeatures: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {  borderColor, cardBg } = useThemeColors();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<EditAssignedPricingFeatureFormValues>({
    defaultValues: {
      pricing_id: "",
      pricing_features_id: "",
    },
    mode: "onChange",
  });

  // ================= API =================
  const { data: assignedData, isLoading: isAssignedLoading } =
    useGetSingleAssigenPricingFeatureQuery(id || "");

  const { data: pricingsData, isLoading: isPricingsLoading } =
    useGetAllPricingsQuery({ search: "" });

  const { data: featuresData, isLoading: isFeaturesLoading } =
    useGetAllPricingFeaturesQuery({ search: "", limit: 100 });

  const [updateAssignedFeature, { isLoading }] =
    useUpdateAssigenPricingFeatureMutation();

  // ================= PREFILL =================
  useEffect(() => {
    if (assignedData?.data) {
      const assigned = assignedData.data;

      setValue(
        "pricing_id",
        String(assigned.pricing_id || assigned.pricing?.id || "")
      );

      setValue(
        "pricing_features_id",
        String(
          assigned.pricing_features_id || assigned.pricing_feature?.id || ""
        )
      );
    }
  }, [assignedData, setValue]);

  const pricings: Pricing[] = pricingsData?.data || [];
  const features: PricingFeature[] = featuresData?.data || [];

  const watchedPricingId = watch("pricing_id");
  const watchedFeatureId = watch("pricing_features_id");

  // ================= SUBMIT =================
  const onSubmit: SubmitHandler<EditAssignedPricingFeatureFormValues> = async (
    values
  ) => {
    const payload: CreateAssignedPricingFeatureRequest = {
      pricing_id: values.pricing_id,
      pricing_features_id: values.pricing_features_id,
    };

    try {
      await updateAssignedFeature({ id: id!, data: payload }).unwrap();
      toast.success("Assigned feature updated successfully!");
      navigate(-1);
    } catch (err: unknown) {
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
  if (isAssignedLoading || isPricingsLoading || isFeaturesLoading) {
    return (
      <div className="flex items-center justify-center min-h-75">
        <p className="text-lg animate-pulse">Loading data...</p>
      </div>
    );
  }

  return (
    <div className={`${cardBg} rounded-lg ${borderColor} p-6 mb-6`}>
      <PageHeader
        title="Edit Assigned Pricing Feature"
        breadcrumbs={[
          { title: "Dashboard", link: "/" },
          { title: "Pricing Features", link: "/assigen-pricing-features" },
          { title: "Edit Assigned Feature" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">

        {/* ================= PRICING PLAN ================= */}
        <div className="relative group">
          <label className="block mb-2 font-semibold text-sm">
            Pricing Plan
          </label>

          <div className="relative">
            <select
              {...register("pricing_id", {
                required: "Pricing plan is required",
              })}
              value={watchedPricingId || ""}
              onChange={(e) => setValue("pricing_id", e.target.value)}
              className={`w-full px-3 py-2 pr-10 rounded-lg border appearance-none focus:outline-none focus:bg-black-base transition ${
                errors.pricing_id
                  ? "border-red-500"
                  : "border-gray-800 focus:border-blue-500"
              }`}
            >
              <option value="" disabled>
                {isPricingsLoading
                  ? "Loading..."
                  : ""}
              </option>

              {pricings.map((p) => (
                <option key={p.id} value={p.id} className="bg-black-base">
                  {p.pricingCategory?.title || "No Category"} (
                  {p.billing_cycle})
                </option>
              ))}
            </select>

            {/* Arrow */}
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
              <svg
                className="w-4 h-4 transition-transform duration-300 group-focus-within:rotate-180"
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
          </div>

          {errors.pricing_id && (
            <p className="text-red-500 text-sm mt-1">
              {errors.pricing_id.message}
            </p>
          )}
        </div>

        {/* ================= PRICING FEATURE ================= */}
        <div className="relative group">
          <label className="block mb-2 font-semibold text-sm">
            Pricing Feature
          </label>

          <div className="relative">
            <select
              {...register("pricing_features_id", {
                required: "Pricing feature is required",
              })}
              value={watchedFeatureId || ""}
              onChange={(e) =>
                setValue("pricing_features_id", e.target.value)
              }
              className={`w-full px-3 py-2 pr-10 rounded-lg border appearance-none focus:outline-none focus:bg-black-base transition ${
                errors.pricing_features_id
                  ? "border-red-500"
                  : "border-gray-800 focus:border-blue-500"
              }`}
            >
              <option value="" disabled hidden>
                {isFeaturesLoading
                  ? "Loading..."
                  : "Select Pricing Feature"}
              </option>

              {features.map((f) => (
                <option key={f.id} value={f.id} className="bg-black-base">
                  {f.title}
                </option>
              ))}
            </select>

            {/* Arrow */}
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
              <svg
                className="w-4 h-4 transition-transform duration-300 group-focus-within:rotate-180"
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
          </div>

          {errors.pricing_features_id && (
            <p className="text-red-500 text-sm mt-1">
              {errors.pricing_features_id.message}
            </p>
          )}
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
            text={isLoading ? "Updating..." : "Update Assignment"}
            icon={Plus}
            disabled={isLoading || !isValid}
          />
        </div>
      </form>
    </div>
  );
};

export default EditAssigenPricingFeatures;