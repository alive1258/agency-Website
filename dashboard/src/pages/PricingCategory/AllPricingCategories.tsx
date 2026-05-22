import React, { useState } from "react";
import Swal from "sweetalert2";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router";
import { useDebounce } from "../../utils/useDebounce";
import Pagination from "../../utils/Pagination";
import {
  useGetAllPricingCategoriesQuery,
  useDeletePricingCategoryMutation,
} from "../../redux/api/pricingCategoryApi";
import type { ApiError } from "../../types/authType";

export interface PricingCategory {
  id: string;
  title: string;
  description?: string;
}

const LIMIT = 10;

const AllPricingCategories: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const debouncedSearch = useDebounce(searchValue, 500);

  const { data, error, isLoading, refetch, isFetching } =
    useGetAllPricingCategoriesQuery({
      search: debouncedSearch,
      page: currentPage,
      limit: LIMIT,
    });

  const [deleteCategory] = useDeletePricingCategoryMutation();

  const categories: PricingCategory[] = data?.data || [];
  const totalPages = data?.meta?.totalPages ?? 1;
  const totalItems = data?.meta?.total ?? 0;

  const handleDeleteCategory = async (category: PricingCategory) => {
  try {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Delete pricing category "${category.title}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    // Delete the category
    await deleteCategory(category.id).unwrap();

    // Show success toast with timer
    await Swal.fire({
      icon: "success",
      title: "Deleted!",
      text: `Pricing Category "${category.title}" has been deleted.`,
      timer: 1500,
      showConfirmButton: false,
    });

    // Refetch data after deletion
    refetch();
  } catch (err: unknown) {
    const apiError = err as ApiError;

    Swal.fire({
      icon: "error",
      title: "Error!",
      text: apiError.data?.message || apiError.message || "Delete failed",
    });
  }
};


  if (isLoading) {
    return (
      <div className="rounded-lg border border-gray-base p-6 space-y-3">
        {[...Array(LIMIT)].map((_, i) => (
          <div
            key={i}
            className="h-12 w-full animate-pulse rounded-md bg-neutral-800"
          />
        ))}
      </div>
    );
  }

  if (error) {
    const err = error as ApiError;
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center text-center">
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-8 max-w-md">
          <h2 className="text-lg font-semibold text-red-400 mb-2">
            Failed to load data
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            {err.data?.message || "Server error. Please try again."}
          </p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-md text-white"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }
  return (
    <div
      className={`rounded-lg border border-gray-base bg-black-base overflow-hidden`}
    >
      <div className="overflow-x-auto">
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-4 border-b border-gray-base">
          <div>
            <h1 className="text-xl font-semibold">Pricing Categories</h1>
            <p className="text-sm text-gray-400">
              Manage all Pricing Categories
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <input
              type="text"
              placeholder="Search Pricing Categories..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className={`w-full sm:w-64 px-3 py-2 rounded-md border border-gray-base 
              bg-black-solid text-primary-muted 
              placeholder-gray-400 dark:placeholder-gray-300 
              `}
            />

            <Link to="/add-pricing-category">
              <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition">
                <Plus size={16} /> Add New
              </button>
            </Link>
          </div>
        </div>
        {/* Table */}
        <table className="w-full min-w-160 sm:min-w-full">
          <thead>
            <tr className="bg-black-solid">
              <th className="py-1 px-4 sm:py-2.5 sm:px-5 text-left border-b border-gray-base font-semibold text-sm">
                #
              </th>
              <th className="py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">
                Title
              </th>
              <th className="py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">
                Description
              </th>
              <th className="py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              categories.map((cat, index) => (
                <tr
                  key={cat.id}
                  className={`${index % 2 !== 0 ? "bg-black-solid hover:bg-black-base" : ""}`}
                >
                  <td className="py-1 px-4 sm:py-1.5 sm:px-5 border-b border-gray-base">
                    {(currentPage - 1) * LIMIT + index + 1}
                  </td>
                  <td className="py-1 px-4 sm:py-1.5 sm:px-5 border-l border-b border-gray-base">
                    {cat.title}
                  </td>
                  <td className="py-1 px-4 sm:py-1.5 sm:px-5 border-l border-b border-gray-base">
                    {cat.description || "-"}
                  </td>
                  <td className="py-1 px-4 sm:py-1.5 sm:px-5 border-l border-b border-gray-base">
                    <div className="flex gap-2">
                      <Link to={`/edit-pricing-category/${cat.id}`}>
                        <button
                          className="p-2 cursor-pointer rounded-md transition-colors hover:bg-gray-200 text-green-600 dark:hover:bg-gray-800 dark:text-green-400"
                          title="Edit Category"
                        >
                          <Edit size={16} />
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDeleteCategory(cat)}
                        className="flex cursor-pointer gap-2 w-fit p-2 rounded text-sm text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-500/10 transition"
                        title="Delete Category"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-8 text-center">
                  <div className="inline-block bg-black-solid px-6 py-4 rounded-2xl">
                    <p className="text-gray-400 text-5xl mb-3">✨</p>
                    <span className="text-gray-500 text-sm font-medium">
                      No Data Found
                    </span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {categories.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
            totalResults={totalItems}
            limit={LIMIT}
            isFetching={isFetching}
          />
        )}
      </div>
    </div>
  );
};

export default AllPricingCategories;
