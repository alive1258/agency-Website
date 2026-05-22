import React, { useState } from "react";
import Swal from "sweetalert2";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router";
import { useDebounce } from "../../../utils/useDebounce";
import { useDeletePortfolioDetailsMutation, useGetAllPortfolioDetailsQuery } from "../../../redux/api/portfolioDetailsApi";
import type { PortfolioDetail } from "../../../types/portfolioDetail.types";
import type { ApiError } from "../../../types/authType";
import Pagination from "../../../utils/Pagination";


const LIMIT = 10;

const AllPortfolioDetails: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearch = useDebounce(searchValue, 500);

  const { data, isLoading, refetch, isFetching } =
    useGetAllPortfolioDetailsQuery({
      search: debouncedSearch,
      page: currentPage,
      limit: LIMIT,
    });

  const [deletePortfolioDetail] = useDeletePortfolioDetailsMutation();

  const details: PortfolioDetail[] = data?.data || [];
  const totalPages = data?.meta?.totalPages ?? 1;
  const totalItems = data?.meta?.total ?? 0;


  const handleDeletePortfolioDetail = async (detail: PortfolioDetail) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `Delete portfolio detail "${detail.title}"?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });

      if (!result.isConfirmed) return;

      await deletePortfolioDetail(detail.id).unwrap();

      await Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: `Portfolio detail "${detail.title}" has been deleted.`,
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

  return (
    <div className="rounded-lg border border-gray-base bg-black-base overflow-hidden">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-4 border-b border-gray-700">
        <div>
          <h1 className="text-xl font-semibold">Portfolio Details</h1>
          <p className="text-sm text-gray-400">Manage all portfolio details</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <input
            type="text"
            placeholder="Search portfolio details..."
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full sm:w-64 px-3 py-2 rounded-md border border-gray-base bg-black-solid text-primary-muted placeholder-gray-400"
          />

          <Link to="/add-portfolio-details">
            <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition">
              <Plus size={16} /> Add New
            </button>
          </Link>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-200 sm:min-w-full">
          <thead>
            <tr className="bg-black-solid">
              <th className="py-1 px-4 sm:py-2.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">#</th>
              <th className="py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">Portfolio</th>
              <th className="py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">Title</th>
              <th className="py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">Description</th>
              <th className="py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">Key Features</th>
              <th className="py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">Image</th>
              <th className="py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">Created</th>
              <th className="py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">Actions</th>
            </tr>
          </thead>

          <tbody>
            {details.length > 0 ? (
              details.map((detail, index) => (
                <tr
                  key={detail.id}
                  className={`${index % 2 !== 0 ? "bg-black-solid hover:bg-black-base" : ""}`}
                >
                  <td className="py-2 px-4 border-b border-gray-base">
                    {(currentPage - 1) * LIMIT + index + 1}
                  </td>

                  <td className="py-2 px-4 border-l border-b border-gray-base">
                    {detail.portfolio?.title || "-"}
                  </td>

                  <td className="py-2 px-4 border-l border-b border-gray-base">
                    {detail.title}
                  </td>

                  <td className="py-2 px-4 border-l border-b border-gray-base">
                    {detail.description || "-"}
                  </td>

                  <td className="py-2 px-4 border-l border-b border-gray-base">
                    {detail.key_features || "-"}
                  </td>

                  <td className="py-2 px-4 border-l border-b border-gray-base">
                    {detail.image ? (
                      <img
                        src={`${import.meta.env.VITE_PUBLIC_IMAGE_PATH}${detail.image}`}
                        alt={detail.title}
                        className="w-16 h-10 object-cover rounded"
                      />
                    ) : "-"}
                  </td>

                  <td className="py-2 px-4 border-l border-b border-gray-base">
                    {new Date(detail.created_at).toLocaleDateString()}
                  </td>

                  <td className="py-2 px-4 border-l border-b border-gray-base">
                    <div className="flex gap-2">
                      <Link to={`/edit-portfolio-details/${detail.id}`}>
                        <button className="p-2 rounded-md hover:bg-gray-800 text-green-400">
                          <Edit size={16} />
                        </button>
                      </Link>

                      <button
                        onClick={() => handleDeletePortfolioDetail(detail)}
                        className="p-2 rounded-md text-red-400 hover:bg-red-500/10"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="py-8 text-center text-gray-500">
                  No portfolio details found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {details.length > 0 && (
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

export default AllPortfolioDetails;