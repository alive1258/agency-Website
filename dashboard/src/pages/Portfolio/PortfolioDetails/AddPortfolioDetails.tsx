import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Plus } from "lucide-react";
import { useCreatePortfolioDetailsMutation } from "../../../redux/api/portfolioDetailsApi";
import { useGetAllPortfoliosQuery } from "../../../redux/api/portfolioApi";
import type { ApiError } from "../../../types/authType";
import PageHeader from "../../../components/common/PageHeader";
import Input from "../../../components/ui/forms/Input";
import Textarea from "../../../components/ui/forms/Textarea";
import GradientButton from "../../../components/ui/buttons/GradientButton";


interface AddPortfolioDetailFormValues {
  title: string;
  description: string;
  portfolio_id: string;
  key_features?: string;
  image?: FileList;
}

const AddPortfolioDetails: React.FC = () => {
  const navigate = useNavigate();
  const [createPortfolioDetail, { isLoading }] = useCreatePortfolioDetailsMutation();
  const { data, isLoading: isPortfolioLoading } = useGetAllPortfoliosQuery({ search: "" });

  const portfolios = data?.data || [];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddPortfolioDetailFormValues>({
    defaultValues: {
      title: "",
      description: "",
      portfolio_id: "",
    },
  });

  const onSubmit: SubmitHandler<AddPortfolioDetailFormValues> = async (formData) => {
    try {
      const payload = new FormData();
      payload.append("title", formData.title);
      payload.append("description", formData.description);
      payload.append("portfolio_id", formData.portfolio_id);

      if (formData.key_features) payload.append("key_features", formData.key_features);
      if (formData.image?.[0]) payload.append("image", formData.image[0]);

      await createPortfolioDetail(payload).unwrap();
      toast.success("Portfolio detail created successfully!");
      reset();
      navigate("/portfolio-details");
    } catch (err) {
      const error = err as ApiError;
      Swal.fire({
        title: "Submission Failed",
        text:
          (Array.isArray(error.data?.message)
            ? error.data?.message.join(", ")
            : error.data?.message) || "An unexpected error occurred",
        icon: "error",
        confirmButtonColor: "#3085d6",
      });
    }
  };

  return (
    <div className="rounded-lg border bg-black-base border-gray-base overflow-hidden p-6 mb-6">
      <PageHeader
        title="Add Portfolio Detail"
        breadcrumbs={[
          { title: "Dashboard", link: "/" },
          { title: "Portfolios", link: "/portfolio" },
          { title: "Add Detail" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Portfolio Select */}
          <div className="col-span-full md:col-span-2 relative group">
            <label className="block mb-2 font-semibold text-sm">Portfolio</label>
            <select
              {...register("portfolio_id", { required: "Portfolio is required" })}
              className={`w-full px-3 py-2 pr-10 border border-gray-base rounded-lg  focus:outline-none focus:bg-black-base appearance-none ${
                errors.portfolio_id ? "border-red-500" : "border-gray-800"
              }`}
              defaultValue=""
            >
               <option value="" disabled hidden className="bg-black-base ">
              {isPortfolioLoading ? "Loading..." : "Select Portfolio"}
            </option>
              {portfolios.map((p) => (
                <option key={p.id} value={p.id} className="bg-black-base">
                  {p.title}
                </option>
              ))}
            </select>
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
            {errors.portfolio_id && <p className="text-red-500 text-sm mt-1">{errors.portfolio_id.message}</p>}
          </div>

          <Input
            label="Title"
            text="title"
            placeholder="e.g. Web Development Service"
            register={register("title", { required: "Title is required" })}
            errors={errors}
          />

          <Input
            label="Key Features"
            text="key_features"
            register={register("key_features")}
            errors={errors}
          />

          <div className="col-span-full border-2 border-dashed rounded-lg p-4 hover:border-blue-400">
            <label className="block mb-2 font-semibold text-sm">Image</label>
            <input
              type="file"
              accept="image/*"
              {...register("image")}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          <div className="col-span-full">
            <Textarea<AddPortfolioDetailFormValues>
              label="Description"
              text="description"
              register={register("description", { required: "Description is required" })}
              errors={errors}
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded-md text-sm border border-gray-base"
          >
            Cancel
          </button>

          <GradientButton type="submit" text={isLoading ? "Creating..." : "Create Detail"} icon={Plus} disabled={isLoading} />
        </div>
      </form>
    </div>
  );
};

export default AddPortfolioDetails;