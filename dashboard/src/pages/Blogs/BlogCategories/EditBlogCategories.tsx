/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { Save } from "lucide-react";
import Swal from "sweetalert2";

import {
  useGetSingleBlogCategoryQuery,
  useUpdateBlogCategoryMutation,
} from "../../../redux/api/blogCategoriesApi";

import type { ApiError } from "../../../types/authType";
import PageHeader from "../../../components/common/PageHeader";
import Input from "../../../components/ui/forms/Input";
import GradientButton from "../../../components/ui/buttons/GradientButton";

/* =======================
   Types
======================= */
interface EditBlogCategoryFormValues {
  name: string;
}

interface ApiResponse {
  success: boolean;
  message?: string;
}

/* =======================
   Component
======================= */
const EditBlogCategories: React.FC = () => {
  const { id } = useParams<"id">();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditBlogCategoryFormValues>({
    defaultValues: {
      name: "",
    },
  });

  // ✅ Fetch single blog category
  const { data, isLoading: isFetching } =
    useGetSingleBlogCategoryQuery(id as string, {
      skip: !id,
    });

  // ✅ Update mutation
  const [updateBlogCategory, { isLoading }] =
    useUpdateBlogCategoryMutation();

  /* =======================
     Load Data
  ======================= */
  useEffect(() => {
    if (data?.data) {
      reset({
        name: data.data.name,
      });
    }
  }, [data, reset]);

  /* =======================
     Submit
  ======================= */
  const onSubmit: SubmitHandler<EditBlogCategoryFormValues> =
    async (formData) => {
      if (!id) {
        Swal.fire("Error!", "Invalid category ID", "error");
        return;
      }

      try {
        const response = (await updateBlogCategory({
          id,
          data: formData,
        }).unwrap()) as ApiResponse;

        if (response?.success) {
          toast.success("Blog category updated successfully");
          navigate(-1);
        } else {
          toast.error(response?.message || "Failed to update category");
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

  /* =======================
     Loading
  ======================= */
  if (isFetching) {
    return (
      <p className="text-center mt-10">
        Loading blog category...
      </p>
    );
  }

  /* =======================
     UI
  ======================= */
  return (
    <div className="border bg-black-base border-gray-base rounded-lg overflow-hidden p-6 mb-6">
      <PageHeader
        title="Edit Blog Category"
        breadcrumbs={[
          { title: "Dashboard", link: "/" },
          { title: "Blog Categories", link: "/blog-categories" },
          { title: "Edit Blog Category" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <fieldset disabled={isFetching || isLoading} className="space-y-5">
          <Input
            label="Category Name"
            text="name"
            placeholder="Enter category name"
            register={register("name", {
              required: "Category name is required",
              minLength: {
                value: 2,
                message: "Minimum 2 characters required",
              },
            })}
            errors={errors}
          />
        </fieldset>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded-md text-sm border border-gray-base"
          >
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

export default EditBlogCategories;