import React, { useState } from "react";
import Swal from "sweetalert2";
import { Plus, Edit, Trash2, X } from "lucide-react";
import { Link } from "react-router";
import { useDebounce } from "../../../utils/useDebounce";
import {
  useDeletePortfolioMutation,
  useGetAllPortfoliosQuery,
} from "../../../redux/api/portfolioApi";
import type { Portfolio } from "../../../types/portfolio.types";
import type { ApiError } from "../../../types/authType";
import Pagination from "../../../utils/Pagination";

const LIMIT = 10;
interface ModalState {
  title: string;
  content: string;
}

const AllPortfolio: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [modalData, setModalData] = useState<ModalState | null>(null);
  const debouncedSearch = useDebounce(searchValue, 500);

  const { data, isLoading, error, refetch, isFetching } =
    useGetAllPortfoliosQuery({
      search: debouncedSearch,
      page: currentPage,
      limit: LIMIT,
    });

  const [deletePortfolio] = useDeletePortfolioMutation();

  const portfolios: Portfolio[] = data?.data || [];
  const totalPages = data?.meta?.totalPages ?? 1;
  const totalItems = data?.meta?.total ?? 0;

  /* =======================
     Delete
  ======================= */
  const handleDeletePortfolio = async (item: Portfolio) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `Delete portfolio "${item.title}"?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
      });

      if (!result.isConfirmed) return;

      await deletePortfolio(item.id).unwrap();

      await Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: `Portfolio "${item.title}" deleted.`,
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

  /* ================= SEE MORE ================= */
  const SeeMore = (title: string, value?: string) => {
    if (!value) return "-";

    const isLong = value.length > 40;

    return (
      <div>
        <span className="text-sm ">
          {isLong ? value.slice(0, 40) + "..." : value}
        </span>

        {isLong && (
          <button
            onClick={() => setModalData({ title, content: value })}
            className="block cursor-pointer text-xs text-blue-base hover:text-blue-700 underline mt-1"
          >
            See More
          </button>
        )}
      </div>
    );
  };

  /* ================= LOADING ================= */
  if (isLoading) {
    return (
      <div className="p-6 space-y-3 border border-gray-base rounded-lg">
        {[...Array(LIMIT)].map((_, i) => (
          <div
            key={i}
            className="h-10 bg-gray-800 animate-pulse rounded-md"
          />
        ))}
      </div>
    );
  }
  /* =======================
     Error
  ======================= */
  if (error) {
    const err = error as ApiError;

    return (
      <div className="flex h-[70vh] flex-col items-center justify-center text-center">
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-8 max-w-md">
          <h2 className="text-lg font-semibold text-red-400 mb-2">
            Failed to load portfolios
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

  /* =======================
     Render
  ======================= */
  return (
    <div className="rounded-lg border border-gray-base bg-black-base overflow-hidden">
      <div className="overflow-x-auto">
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-4 border-b border-gray-base">
          <div>
            <h1 className="text-xl font-semibold">Portfolios</h1>
            <p className="text-sm text-gray-400">Manage all portfolios</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <input
              type="text"
              placeholder="Search portfolio..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full sm:w-64 px-3 py-2 rounded-md border border-gray-base bg-black-base"
            />

            <Link to="/add-portfolio">
              <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition">
                <Plus size={16} /> Add New
              </button>
            </Link>
          </div>
        </div>

        {/* TABLE */}
        <table className="w-full min-w-200 sm:min-w-full">
          <thead>
            <tr className="bg-black-solid">
              <th className="py-2 px-4 border-b border-gray-base text-left text-sm">
                ID
              </th>
              <th className="py-2 px-4 border-l border-b border-gray-base text-left text-sm">
                Title
              </th>
              <th className="py-2 px-4 border-l border-b border-gray-base text-left text-sm">
                Slug
              </th>
              <th className="py-2 px-4 border-l border-b border-gray-base text-left text-sm">
                Category
              </th>
              <th className="py-2 px-4 border-l border-b border-gray-base text-left text-sm">
                Company
              </th>
              <th className="py-2 px-4 border-l border-b border-gray-base text-left text-sm">
                Description
              </th>
              <th className="py-2 px-4 border-l border-b border-gray-base text-left text-sm">
                meta_title
              </th>
              <th className="py-2 px-4 border-l border-b border-gray-base text-left text-sm">
                meta_keywords
              </th>
              <th className="py-2 px-4 border-l border-b border-gray-base text-left text-sm">
                meta_description
              </th>
              <th className="py-2 px-4 border-l border-b border-gray-base text-left text-sm">
                Image
              </th>
              <th className="py-2 px-4 border-l border-b border-gray-base text-left text-sm">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {portfolios.length > 0 ? (
              portfolios.map((item, index) => (
                <tr
                  key={item.id}
                  className={`${
                    index % 2 !== 0 ? "bg-black-solid hover:bg-black-base" : ""
                  }`}
                >
                  <td className="py-2 px-4 border-b border-gray-base">
                    {(currentPage - 1) * LIMIT + index + 1}
                  </td>

                  <td className="py-2 px-4 border-l border-b border-gray-base">
                    {item.title}
                  </td>
                  <td className="py-2 px-4 border-l border-b border-gray-base">
                    {item.slug}
                  </td>

                  <td className="py-2 px-4 border-l border-b border-gray-base">
                    {item?.portfolio_category?.name || "-"}
                  </td>

                  <td className="py-2 px-4 border-l border-b border-gray-base">
                    {item.company_name || "-"}
                  </td>

                  <td className="py-2 px-4 border-l border-b border-gray-base">
                    {SeeMore("Description", item.description)}
                  </td>
                  <td className="py-2 px-4 border-l border-b border-gray-base">
                    {item.meta_title?.slice(0, 50)}...
                  </td>
                  <td className="py-2 px-4 border-l border-b border-gray-base">
                     {SeeMore("Meta Keywords", item.meta_keywords)}
                  </td>
                  <td className="py-2 px-4 border-l border-b border-gray-base">
                    {SeeMore("Meta Description", item.meta_description)}
                  </td>

                  <td className="py-2 px-4 border-l border-b border-gray-base">
                    {item.image ? (
                      <img
                        src={`${import.meta.env.VITE_PUBLIC_IMAGE_PATH}${item.image}`}
                        alt={item.title}
                        className="w-16 h-12 object-cover rounded"
                      />
                    ) : (
                      "-"
                    )}
                  </td>

                  <td
                    className={`py-2 px-4 border-l border-b border-gray-base`}
                  >
                    <div className="flex gap-2">
                      <Link to={`/edit-portfolio/${item.id}`}>
                        <button
                          className="p-2 cursor-pointer rounded-md transition-colors hover:bg-gray-200 text-green-600 dark:hover:bg-gray-800 dark:text-green-400"
                          title="Edit Service"
                        >
                          <Edit size={16} />
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDeletePortfolio(item)}
                        className="flex cursor-pointer gap-2 w-fit p-2 rounded text-sm text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-500/10 transition"
                        title="Delete Service"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-8 text-center">
                  <span className="text-gray-500">No portfolios found</span>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* PAGINATION */}
        {portfolios.length > 0 && (
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

       {modalData && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
          onClick={() => setModalData(null)}
        >
          <div
            className="bg-black-base  border border-gray-base rounded-lg w-175 max-w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* HEADER */}
            <div className="flex justify-between p-4 border-b border-gray-base">
              <h2 className="font-semibold">{modalData.title}</h2>

              <button onClick={() => setModalData(null)}>
                <X />
              </button>
            </div>

            {/* CONTENT */}
         {/* CONTENT */}
{/* CONTENT */}
<div className="p-4 max-h-[70vh] overflow-y-auto 
  [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-gray-900
  [&::-webkit-scrollbar-thumb]:bg-blue-600
  [&::-webkit-scrollbar-thumb]:rounded-full
">
  {modalData.content}
</div>

            {/* FOOTER */}
            <div className="p-4 border-t border-gray-base text-right">
              <button
                onClick={() => setModalData(null)}
                className="px-4 py-2 bg-blue-base rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllPortfolio;
