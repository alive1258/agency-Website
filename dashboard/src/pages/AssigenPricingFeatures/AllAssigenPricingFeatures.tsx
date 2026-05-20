import React, { useState } from "react";
import Swal from "sweetalert2";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router";
import { useDebounce } from "../../utils/useDebounce";
import Pagination from "../../utils/Pagination";
import {
  useGetAllAssigenPricingFeaturesQuery,
  useDeleteAssigenPricingFeatureMutation,
} from "../../redux/api/assigenPricingFeatures";

import type { ApiError } from "../../types/authType";
import type { AssignedPricingFeature } from "../../types/assigenPricingFeature.types";

const LIMIT = 10;
const AllAssignedPricingFeatures: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearch = useDebounce(searchValue, 500);
  const { data, isLoading, error, refetch, isFetching } =
    useGetAllAssigenPricingFeaturesQuery({
      search: debouncedSearch,
      page: currentPage,
      limit: LIMIT,
    });

  const [deleteAssignedFeature] = useDeleteAssigenPricingFeatureMutation();
  const assignedFeatures: AssignedPricingFeature[] = data?.data || [];
  const totalPages = data?.meta?.totalPages ?? 1;
  const totalItems = data?.meta?.total ?? 0;

  const handleDelete = async (item: AssignedPricingFeature) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `Delete feature "${item?.pricing_feature?.title}"?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });
      if (!result.isConfirmed) return;
      await deleteAssignedFeature(item.id).unwrap();

      await Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Assigned feature deleted successfully.",
        timer: 1500,
        showConfirmButton: false,
      });

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
      <div className="rounded-lg border border-gray-700 p-6 space-y-3">
        {[...Array(LIMIT)].map((_, i) => (
          <div
            key={i}
            className="h-12 w-full animate-pulse rounded-md bg-gray-800"
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
            Failed to load assigned pricing features
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
    <div className="rounded-lg border border-gray-base bg-black-base overflow-hidden">

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-4 border-b border-gray-700">
        <div>
          <h1 className="text-xl font-semibold">Assigned Pricing Features</h1>
          <p className="text-sm text-gray-400">
            Manage all assigned pricing features
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <input
            type="text"
            placeholder="Search feature..."
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full sm:w-64 px-3 py-2 rounded-md border border-gray-base bg-black-solid text-primary-muted placeholder-gray-400"
          />

          <Link to="/add-assigen-pricing-feature">
            <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition">
              <Plus size={16} /> Add New
            </button>
          </Link>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-160 sm:min-w-full">
          <thead>
            <tr className="bg-black-solid">
              <th className="py-2.5 px-4 text-left border-l border-b border-gray-base font-semibold text-sm">#</th>
              <th className="py-1 px-4 text-left border-l border-b border-gray-base font-semibold text-sm">Pricing</th>
              <th className="py-1 px-4 text-left border-l border-b border-gray-base font-semibold text-sm">Feature</th>
              <th className="py-1 px-4 text-left border-l border-b border-gray-base font-semibold text-sm">Actions</th>
            </tr>
          </thead>

          <tbody>
            {assignedFeatures.length > 0 ? (
              assignedFeatures.map((item, index) => (
                <tr
                  key={item.id}
                  className={`${index % 2 !== 0 ? "bg-black-solid hover:bg-black-base" : ""}`}
                >
                  <td className="py-2 px-4 border-b border-gray-base">
                    {(currentPage - 1) * LIMIT + index + 1}
                  </td>

                  <td className="py-2 px-4 border-l border-b border-gray-base">
                    {item?.pricing?.pricingCategory?.title || "-"}
                  </td>

                  <td className="py-2 px-4 border-l border-b border-gray-base">
                    {item?.pricing_feature?.title || "-"}
                  </td>

                  <td className="py-2 px-4 border-l border-b border-gray-base">
                    <div className="flex gap-2">
                      <Link to={`/edit-assigen-pricing-feature/${item.id}`}>
                        <button
                          className="p-2 rounded-md hover:bg-gray-800 text-green-400"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                      </Link>

                      <button
                        onClick={() => handleDelete(item)}
                        className="p-2 rounded-md text-red-400 hover:bg-red-500/10"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-8 text-center text-gray-500">
                  No assigned pricing features found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {assignedFeatures.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalResults={totalItems}
          limit={LIMIT}
          isFetching={isFetching}
        />
      )}
    </div>
  );
};

export default AllAssignedPricingFeatures;
