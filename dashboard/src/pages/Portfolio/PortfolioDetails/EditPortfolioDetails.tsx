/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Save } from "lucide-react";
import { useGetAllPortfoliosQuery } from "../../../redux/api/portfolioApi";
import { useGetSinglePortfolioDetailsQuery, useUpdatePortfolioDetailsMutation } from "../../../redux/api/portfolioDetailsApi";
import type { PortfolioDetail } from "../../../types/portfolioDetail.types";
import type { ApiError } from "../../../types/authType";
import PageHeader from "../../../components/common/PageHeader";
import Input from "../../../components/ui/forms/Input";
import Textarea from "../../../components/ui/forms/Textarea";
import GradientButton from "../../../components/ui/buttons/GradientButton";


interface EditPortfolioDetailFormValues {
  title: string;
  description: string;
  portfolio_id: string;
  key_features?: string;
  image?: FileList;
}

const EditPortfolioDetails: React.FC = () => {
  const { id } = useParams<"id">();
  const navigate = useNavigate();

  // Fetch all portfolios for the dropdown
  const { data: portfoliosData, isLoading: isPortfolioLoading } = useGetAllPortfoliosQuery({ search: "" });
  const portfolios = portfoliosData?.data || [];

  // Fetch single portfolio detail
  const { data: portfolioDetailData, isLoading: isFetching } = useGetSinglePortfolioDetailsQuery(id as string, { skip: !id });


  const [updatePortfolioDetail, { isLoading }] = useUpdatePortfolioDetailsMutation();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<EditPortfolioDetailFormValues>({
    defaultValues: {
      title: "",
      description: "",
      portfolio_id: "",
    },
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Populate form with fetched data
  useEffect(() => {
    if (portfolioDetailData?.data) {
      const p: PortfolioDetail = portfolioDetailData.data;
      reset({
        title: p.title,
        description: p.description,
        portfolio_id: p.portfolio?.id || "",
        key_features: p.key_features,
      });
    }
  }, [portfolioDetailData, reset]);

  // Set initial image preview
  useEffect(() => {
    if (portfolioDetailData?.data?.image) {
      setPreviewImage(`${import.meta.env.VITE_PUBLIC_IMAGE_PATH}${portfolioDetailData.data.image}?v=${new Date().getTime()}`);
    } else {
      setPreviewImage(null);
    }
  }, [portfolioDetailData]);

  const onSubmit: SubmitHandler<EditPortfolioDetailFormValues> = async (formData) => {
    if (!id) return;


    try {
      const payload = new FormData();
      payload.append("title", formData.title);
      payload.append("description", formData.description);
      payload.append("portfolio_id", formData.portfolio_id);
      if (formData.key_features) payload.append("key_features", formData.key_features);
      if (formData.image?.[0]) payload.append("image", formData.image[0]);

      await updatePortfolioDetail({ id, data: payload }).unwrap();
      toast.success("Portfolio detail updated successfully!");
      navigate(-1);
    } catch (err) {
      const error = err as ApiError;
      Swal.fire({
        title: "Update Failed",
        text: Array.isArray(error.data?.message)
          ? error.data.message.join(", ")
          : error.data?.message || "Something went wrong.",
        icon: "error",
        confirmButtonColor: "#3085d6",
      });
    }
  };

  if (isFetching) return <p className="text-center mt-10">Loading portfolio detail...</p>;

  return (
    <div className='border bg-black-base border-gray-base rounded-lg overflow-hidden p-6 mb-6'>
      <PageHeader
        title="Edit Portfolio Detail"
        breadcrumbs={[
          { title: "Dashboard", link: "/" },
          { title: "Portfolio Details", link: "/portfolio-details" },
          { title: "Edit Detail" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Portfolio select */}
          <div className="col-span-full md:col-span-2 relative group">
            <label className="block mb-2 font-semibold text-sm">Portfolio</label>
            <select
              {...register("portfolio_id", { required: "Portfolio is required" })}
              className={`w-full px-3 py-2 pr-10 border border-gray-base rounded-lg  focus:outline-none focus:bg-black-base appearance-none ${errors.portfolio_id ? "border-red-500" : "border-gray-800"}`}
              defaultValue={portfolioDetailData?.data?.portfolio?.id || ""}
            >
              <option value="" disabled>{isPortfolioLoading ? "Loading..." : "Select a portfolio"}</option>
              {portfolios.map(p => (
                <option key={p.id} value={p.id} className="bg-black-base">{p.title}</option>
              ))}
            </select>
          </div>

          <Input
            label="Title"
            text="title"
            placeholder="Portfolio detail title"
            register={register("title", { required: "Title is required" })}
            errors={errors}
          />

          <Input
            label="Key Features"
            text="key_features"
            register={register("key_features")}
            errors={errors}
          />

          {/* Image upload with preview */}
          <div className="col-span-full">
            <label className="block mb-2 font-semibold text-sm">Image</label>
            <div className="w-48 h-48 border-2 border-dashed rounded-lg overflow-hidden flex items-center justify-center mb-2 relative border-gray-600 hover:border-blue-500 transition-colors bg-gray-900">
              <img
                src={previewImage || "/images/default-image.png"}
                alt="Portfolio Detail"
                className="w-full h-full object-cover pointer-events-none"
              />
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                {...register("image", {
                  onChange: e => {
                    const files = e.target.files;
                    if (files && files[0]) {
                      const newPreviewUrl = URL.createObjectURL(files[0]);
                      setPreviewImage(newPreviewUrl);
                      return () => URL.revokeObjectURL(newPreviewUrl);
                    }
                  },
                })}
              />
            </div>
            <p className="text-gray-400 text-sm">{previewImage ? "Click to change image" : "Click to upload an image"}</p>
          </div>

          <div className="col-span-full">
            <Textarea<EditPortfolioDetailFormValues>
              label="Description"
              text="description"
              register={register("description", { required: "Description is required" })}
              errors={errors}
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button type="button" onClick={() => navigate(-1)} className='px-4 py-2 rounded-md text-sm border border-gray-base'>
            Cancel
          </button>
          <GradientButton type="submit" text={isLoading ? "Updating..." : "Update Detail"} icon={Save} disabled={isLoading} />
        </div>
      </form>
    </div>
  );
};

export default EditPortfolioDetails;