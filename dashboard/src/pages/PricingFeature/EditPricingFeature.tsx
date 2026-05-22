import React, { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { Save } from "lucide-react";
import Swal from "sweetalert2";
import GradientButton from "../../components/ui/buttons/GradientButton";
import PageHeader from "../../components/common/PageHeader";
import Input from "../../components/ui/forms/Input";
import type { ApiError } from "../../types/authType";

import {
  useGetSinglePricingFeatureQuery,
  useUpdatePricingFeatureMutation,
} from "../../redux/api/pricingFeaturesApi";
import { useNavigate, useParams } from "react-router";

/* =======================
   Types
======================= */
interface EditPricingFeatureFormValues {
  title: string;
}

/* =======================
   Component
======================= */
const EditPricingFeature: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // ✅ safer typing
  const navigate = useNavigate();


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditPricingFeatureFormValues>({
    defaultValues: { title: "" },
  });

  // ✅ Fetch single feature
  const { data, isLoading: isFetching } =
    useGetSinglePricingFeatureQuery(id!, { skip: !id });

  // ✅ Update mutation
  const [updatePricingFeature, { isLoading: isUpdating }] =
    useUpdatePricingFeatureMutation();

  // ✅ Populate form when API loads
  useEffect(() => {
    if (data?.data) {
      reset({ title: data.data.title });
    }
  }, [data, reset]);

  // ✅ Submit handler
  const onSubmit: SubmitHandler<EditPricingFeatureFormValues> = async (
    formData,
  ) => {
    if (!id) {
      Swal.fire("Error!", "Invalid feature ID", "error");
      return;
    }

    try {
      const response = await updatePricingFeature({
        id,
        data: { title: formData.title.trim() },
      }).unwrap();

      if (response.success) {
        toast.success(response.message || "Pricing feature updated successfully");
        navigate("/pricing-feature");
      } else {
        toast.error(response.message || "Update failed");
      }
    } catch (err) {
      const error = err as ApiError;
      Swal.fire(
        "Error!",
        error?.data?.message || error.message || "Something went wrong.",
        "error",
      );
    }
  };

  // ✅ Loading state
  if (isFetching) {
    return <p className="text-center mt-10">Loading pricing feature...</p>;
  }

  return (
    <div className='border bg-black-base border-gray-base rounded-lg  overflow-hidden p-6 mb-6'>
      <PageHeader
        title="Edit Pricing Feature"
        breadcrumbs={[
          { title: "Dashboard", link: "/" },
          { title: "Pricing Features", link: "/pricing-feature" },
          { title: "Edit Pricing Feature" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <fieldset disabled={isFetching || isUpdating} className="space-y-5">
          <Input
            label="Title"
            type="text"
            text="title"
            placeholder="Enter category title"
            register={register("title", {
              required: "Title is required",
              minLength: { value: 2, message: "Minimum 2 characters required" },
              maxLength: { value: 150, message: "Maximum 150 characters allowed" },
            })}
            errors={errors}
          />
        </fieldset>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate("/pricing-feature")}
            className='px-4 py-2 rounded-md text-sm border border-gray-base'
          >
            Cancel
          </button>

          <GradientButton
            type="submit"
            text={isUpdating ? "Updating..." : "Update"}
            icon={Save}
            disabled={isUpdating}
          />
        </div>
      </form>
    </div>
  );
};

export default EditPricingFeature;
