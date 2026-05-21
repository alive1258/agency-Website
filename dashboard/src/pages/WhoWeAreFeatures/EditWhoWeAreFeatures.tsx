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
  useGetSingleWhoWeAreFeatureQuery,
  useUpdateWhoWeAreFeatureMutation,
} from "../../redux/api/whoWeAreFeaturesApi";

import { useGetAllWhoWeAreQuery } from "../../redux/api/whoWeAreApi";

import type { WhoWeAreFeature } from "../../types/whoWeAreFeature.types";
import type { WhoWeAre } from "../../types/whoWeAre.types";
import Input from "../../components/ui/forms/Input";
import Textarea from "../../components/ui/forms/Textarea";

/* =======================
   Types
======================= */
interface EditWhoWeAreFeatureFormValues {
  who_we_are_id: string;
  title: string;
  description: string;
}

/* =======================
   Component
======================= */
const EditWhoWeAreFeatures: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { theme, borderColor, cardBg } = useThemeColors();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<EditWhoWeAreFeatureFormValues>({
    defaultValues: {
      who_we_are_id: "",
      title: "",
      description: "",
    },
    mode: "onChange",
  });

  /* =======================
     API Calls
  ======================= */
  const { data, isLoading: isFetching } =
    useGetSingleWhoWeAreFeatureQuery(id || "");

  const { data: whoWeAreData, isLoading: isWhoWeAreLoading } =
    useGetAllWhoWeAreQuery({ page: 1, limit: 1000 });

  const [updateFeature, { isLoading }] =
    useUpdateWhoWeAreFeatureMutation();

  const whoWeAre: WhoWeAre[] = whoWeAreData?.data || [];

  /* =======================
     PREFILL
  ======================= */
  useEffect(() => {
    if (data?.data) {
      const feature: WhoWeAreFeature = data.data;

      setValue("who_we_are_id", feature.who_we_are_id, {
        shouldValidate: true,
      });

      setValue("title", feature.title, {
        shouldValidate: true,
      });

      setValue("description", feature.description, {
        shouldValidate: true,
      });
    }
  }, [data, setValue]);

  /* =======================
     Submit
  ======================= */
  const onSubmit: SubmitHandler<EditWhoWeAreFeatureFormValues> = async (
    values
  ) => {
    try {
      await updateFeature({
        id: id!,
        data: values,
      }).unwrap();

      toast.success("Feature updated successfully!");
      navigate("/who-we-are-features");
    } catch (err: unknown) {
      const error = err as ApiError;

      if (Array.isArray(error.data?.message)) {
        error.data.message.forEach((msg: string) => toast.error(msg));
      } else {
        Swal.fire(
          "Error",
          error.data?.message || "Something went wrong.",
          "error"
        );
      }
    }
  };

  /* =======================
     Loading State
  ======================= */
  if (isFetching || isWhoWeAreLoading) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <p className="text-lg animate-pulse">Loading data...</p>
      </div>
    );
  }

  /* =======================
     Render
  ======================= */
  return (
    <div className={`${cardBg} rounded-lg ${borderColor} overflow-hidden p-6 mb-6`}>
      <PageHeader
        title="Edit Who We Are Feature"
        breadcrumbs={[
          { title: "Dashboard", link: "/" },
          { title: "Who We Are Features", link: "/who-we-are-features" },
          { title: "Edit Feature" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-6">

        {/* WHO WE ARE SELECT */}
        <div className="col-span-full md:col-span-2 relative group">
          <label className="block mb-2 font-semibold text-sm">
            Who We Are
          </label>

          <select
            {...register("who_we_are_id", {
              required: "Who we are is required",
            })}
            disabled={isWhoWeAreLoading}
            className={`w-full px-3 py-2 pr-10 border border-gray-base rounded-lg  focus:outline-none focus:bg-black-base appearance-none ${
              errors.who_we_are_id ? "border-red-500" : "border-gray-800"
            }`}
          >
            <option value="" disabled>
              {isWhoWeAreLoading
                ? "Loading..."
                : whoWeAre.length === 0
                ? "No data found"
                : "Select Who we are"}
            </option>

            {whoWeAre.map((wwa) => (
              <option key={wwa.id} value={wwa.id}>
                {wwa.title}
              </option>
            ))}
          </select>

          {/* Arrow */}
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

        {/* TITLE */}
        <Input
          label="Title"
          type="text"
          text="title"
          register={register("title", {
            required: "Title is required",
          })}
          errors={errors}
        />

        {/* DESCRIPTION */}
        <Textarea<EditWhoWeAreFeatureFormValues>
          label="Description"
          text="description"
          register={register("description", {
            required: "Description is required",
          })}
          errors={errors}
        />

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 mt-8">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className={`px-4 py-2 rounded-md text-sm border ${
              theme === "dark"
                ? "border-gray-700 text-gray-300 hover:bg-gray-800"
                : "border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
          >
            Cancel
          </button>

          <GradientButton
            type="submit"
            text={isLoading ? "Saving..." : "Update Feature"}
            icon={Plus}
            disabled={isLoading || !isValid}
          />
        </div>
      </form>
    </div>
  );
};

export default EditWhoWeAreFeatures;