import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Plus } from "lucide-react";
import GradientButton from "../../components/ui/buttons/GradientButton";
import Swal from "sweetalert2";
import type { ApiError } from "../../types/authType";
import PageHeader from "../../components/common/PageHeader";
import Input from "../../components/ui/forms/Input";
import { useCreatePricingFeatureMutation } from "../../redux/api/pricingFeaturesApi";


interface AddPricingFeatureFormValues {
  title: string;
}

interface ApiResponse {
  success: boolean;
  message?: string;
}

const AddPricingFeature: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddPricingFeatureFormValues>({
    defaultValues: {
      title: "",
    },
  });

  const [createPricingFeature, { isLoading }] = useCreatePricingFeatureMutation();
  const onSubmit: SubmitHandler<AddPricingFeatureFormValues> = async (data) => {
    const payload = {
      title: data.title.trim(),
    };

    try {
      const response = (await createPricingFeature(payload).unwrap()) as ApiResponse;

      if (response.success) {
        toast.success("Pricing feature added successfully");
        reset();
        navigate(-1);
      } else {
        toast.error(response.message || "Failed to add pricing feature");
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
      <div  className={`rounded-lg border bg-black-base border-gray-base overflow-hidden p-6 mb-6`}>
      {/* Header */}
      <PageHeader
        title="Add New Pricing Feature"
        breadcrumbs={[
          { title: "Dashboard", link: "/" },
          { title: "Pricing Features", link: "/pricing-features" },
          { title: "Add Pricing Feature" },
        ]}
      />

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input
          label="Title"
          text="title"
          placeholder="Enter pricing feature title"
          register={register("title", {
            required: "Title is required",
            minLength: { value: 2, message: "Minimum 2 characters required" },
            maxLength: { value: 150, message: "Maximum 150 characters allowed" },
          })}
          errors={errors}
        />
        {/* Actions */}
        <div className="flex justify-end gap-3">
          <GradientButton
            type="submit"
            text={isLoading ? "Saving..." : "Submit"}
            icon={Plus}
            disabled={isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default AddPricingFeature;
