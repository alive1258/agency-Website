import React, { useState } from "react";
import { Plus, Edit, Trash2, X } from "lucide-react"; // X for modal close
import { Link } from "react-router";
import { useDebounce } from "../../../utils/useDebounce";
import {
  useDeleteBlogDetailsMutation,
  useGetAllBlogDetailsQuery,
} from "../../../redux/api/blogDetailsApi";
import type { BlogDetail } from "../../../types/blogDetail.types";
import type { ApiError } from "../../../types/authType";
import Pagination from "../../../utils/Pagination";
import Swal from "sweetalert2";

const LIMIT = 10;

const AllBlogDetails: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [modalContent, setModalContent] = useState<string | null>(null);

  const debouncedSearch = useDebounce(searchValue, 500);

  const { data, isLoading, refetch, isFetching } = useGetAllBlogDetailsQuery({
    search: debouncedSearch,
    page: currentPage,
    limit: LIMIT,
  });

  const [deleteBlogDetail] = useDeleteBlogDetailsMutation();

  const blogDetails: BlogDetail[] = data?.data || [];
  const totalPages = data?.meta?.totalPages ?? 1;
  const totalItems = data?.meta?.total ?? 0;

const handleDeleteBlogDetail = async (detail: BlogDetail) => {
  try {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Delete blog detail "${detail.title}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    await deleteBlogDetail(detail.id).unwrap();

    await Swal.fire({
      icon: "success",
      title: "Deleted!",
      text: `Blog detail "${detail.title}" deleted.`,
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

  const truncateText = (text: string, maxLength = 50) => {
    if (!text) return "-";
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
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
    <div className="rounded-lg border border-gray-base bg-black-base overflow-hidden relative">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-4 border-b border-gray-700">
        <div>
          <h1 className="text-xl font-semibold">Blog Details</h1>
          <p className="text-sm text-gray-400">Manage all blog details</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <input
            type="text"
            placeholder="Search blog details..."
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full sm:w-64 px-3 py-2 rounded-md border border-gray-base bg-black-solid text-primary-muted placeholder-gray-400"
          />

          <Link to="/add-blog-details">
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
              <th className="py-1 px-4 text-left border-l border-b border-gray-base font-semibold text-sm">#</th>
              <th className="py-1 px-4 text-left border-l border-b border-gray-base font-semibold text-sm">Blog</th>
              <th className="py-1 px-4 text-left border-l border-b border-gray-base font-semibold text-sm">Title</th>
              <th className="py-1 px-4 text-left border-l border-b border-gray-base font-semibold text-sm">Description</th>
              <th className="py-1 px-4 text-left border-l border-b border-gray-base font-semibold text-sm">Key Features</th>
              <th className="py-1 px-4 text-left border-l border-b border-gray-base font-semibold text-sm">Image</th>
              <th className="py-1 px-4 text-left border-l border-b border-gray-base font-semibold text-sm">Created</th>
              <th className="py-1 px-4 text-left border-l border-b border-gray-base font-semibold text-sm">Actions</th>
            </tr>
          </thead>

          <tbody>
            {blogDetails.length > 0 ? (
              blogDetails.map((detail, index) => (
                <tr key={detail.id} className={index % 2 !== 0 ? "bg-black-solid hover:bg-black-base" : ""}>
                  <td className="py-2 px-4 border-b border-gray-base">{(currentPage - 1) * LIMIT + index + 1}</td>
                  <td className="py-2 px-4 border-l border-b border-gray-base">{detail.blog?.title || "-"}</td>
                  <td className="py-2 px-4 border-l border-b border-gray-base">{detail.title}</td>
                  
                  {/* Description with truncate & dark modal */}
                  <td className="py-2 px-4 border-l border-b border-gray-base">
                    {detail.description && detail.description.length > 50 ? (
                      <>
                        {truncateText(detail.description, 50)}{" "}
                        <button
                          onClick={() => setModalContent(detail.description!)}
                          className="text-blue-400 underline text-sm"
                        >
                          See more
                        </button>
                      </>
                    ) : (
                      detail.description || "-"
                    )}
                  </td>

                  <td className="py-2 px-4 border-l border-b border-gray-base">{detail.key_features || "-"}</td>
                  <td className="py-2 px-4 border-l border-b border-gray-base">
                    {detail.image ? (
                      <img
                        src={`${import.meta.env.VITE_PUBLIC_IMAGE_PATH}${detail.image}`}
                        alt={detail.title}
                        className="w-16 h-10 object-cover rounded"
                      />
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="py-2 px-4 border-l border-b border-gray-base">{new Date(detail.created_at).toLocaleDateString()}</td>
                  <td className="py-2 px-4 border-l border-b border-gray-base">
                    <div className="flex gap-2">
                      <Link to={`/edit-blog-details/${detail.id}`}>
                        <button className="p-2 rounded-md hover:bg-gray-800 text-green-400">
                          <Edit size={16} />
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDeleteBlogDetail(detail)}
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
                  No blog details found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {blogDetails.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalResults={totalItems}
          limit={LIMIT}
          isFetching={isFetching}
        />
      )}

      {/* DARK MODAL */}
  {modalContent && (
  <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
    <div className="bg-gray-900 h-3/4 max-w-lg w-full p-6 relative rounded-lg overflow-y-scroll
                scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-blue-900">
      {/* Close Button */}
      <button
        className="absolute top-4 right-4 text-gray-400 hover:text-white"
        onClick={() => setModalContent(null)}
      >
        <X size={20} />
      </button>

      <h2 className="text-lg font-semibold mb-4">Full Description</h2>
      <p className="whitespace-pre-line">{modalContent}</p>
    </div>
  </div>
)}
    </div>
  );
};

export default AllBlogDetails;