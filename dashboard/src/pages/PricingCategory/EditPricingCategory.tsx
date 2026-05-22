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
  useGetSinglePricingCategoryQuery,
  useUpdatePricingCategoryMutation,
} from "../../redux/api/pricingCategoryApi";
import { useNavigate, useParams } from "react-router";

interface EditPricingCategoryFormValues {
  title: string;
  description?: string;
}

const EditPricingCategory: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditPricingCategoryFormValues>({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  //  Fetch single category
  const { data, isLoading: isFetching } = useGetSinglePricingCategoryQuery(
    id!,
    {
      skip: !id,
    },
  );

  //  Mutation
  const [updatePricingCategory, { isLoading: isUpdating }] =
    useUpdatePricingCategoryMutation();

  //  Fill form when data loads
  useEffect(() => {
    if (data?.data) {
      reset({
        title: data.data.title,
        description: data.data.description ?? "",
      });
    }
  }, [data, reset]);

  //  Submit handler
  const onSubmit: SubmitHandler<EditPricingCategoryFormValues> = async (
    formData,
  ) => {
    if (!id) {
      Swal.fire("Error!", "Invalid category ID", "error");
      return;
    }

    try {
      const response = await updatePricingCategory({
        id,
        data: formData,
      }).unwrap();

      if (response.success) {
        toast.success("Pricing category updated successfully");
        navigate("/pricing-categories");
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

  // Loading UI
  if (isFetching) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading pricing category...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`border bg-black-base border-gray-base rounded-lg  overflow-hidden p-6 mb-6`}
    >
      <PageHeader
        title="Edit Pricing Category"
        breadcrumbs={[
          { title: "Dashboard", link: "/" },
          { title: "Pricing Categories", link: "/pricing-categories" },
          { title: "Edit Pricing Category" },
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
              maxLength: {
                value: 150,
                message: "Maximum 150 characters allowed",
              },
            })}
            errors={errors}
          />

          <Input
            label="Description"
            type="text"
            text="description"
            placeholder="Enter description (optional)"
            register={register("description", {
              maxLength: {
                value: 500,
                message: "Maximum 500 characters allowed",
              },
            })}
            errors={errors}
            required={false}
          />
        </fieldset>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate("/pricing-categories")}
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

export default EditPricingCategory;
