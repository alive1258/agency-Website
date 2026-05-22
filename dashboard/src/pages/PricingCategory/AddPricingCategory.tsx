import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Plus } from "lucide-react";
import { useCreatePricingCategoryMutation } from "../../redux/api/pricingCategoryApi";
import GradientButton from "../../components/ui/buttons/GradientButton";
import Swal from "sweetalert2";
import type { ApiError } from "../../types/authType";
import PageHeader from "../../components/common/PageHeader";
import Input from "../../components/ui/forms/Input";


interface AddPricingCategoryFormValues {
  title: string;
  description?: string;
}

interface ApiResponse {
  success: boolean;
  message?: string;
}

const AddPricingCategory: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddPricingCategoryFormValues>({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const [createPricingCategory, { isLoading }] = useCreatePricingCategoryMutation();

  const onSubmit: SubmitHandler<AddPricingCategoryFormValues> = async (data) => {
    try {
      const response = (await createPricingCategory(data).unwrap()) as ApiResponse;

      if (response?.success) {
        toast.success("Pricing category added successfully");
        reset();
        navigate(-1);
      } else {
        toast.error(response?.message || "Failed to add pricing category");
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
        title="Add New Pricing Category"
        breadcrumbs={[
          { title: "Dashboard", link: "/" },
          { title: "Pricing Categories", link: "/pricing-categories" },
          { title: "Add Pricing Category" },
        ]}
      />

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Title */}
        <Input
          label="Title"
          type="text"
          text="title"
          placeholder="Enter category title"
          register={register("title", {
            required: "Title is required",
            maxLength: { value: 150, message: "Maximum 150 characters allowed" },
            minLength: { value: 2, message: "Minimum 2 characters required" },
          })}
          errors={errors}
        />

        {/* Description */}
        <Input
          label="Description"
          type="text"
          text="description"
          placeholder="Enter description (optional)"
          register={register("description", {
            maxLength: { value: 500, message: "Maximum 500 characters allowed" },
          })}
          errors={errors}
          required={false}
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

export default AddPricingCategory;
