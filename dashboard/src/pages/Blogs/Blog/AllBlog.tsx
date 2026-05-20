import React, { useState } from "react";
import Swal from "sweetalert2";
import { Plus, Edit, Trash2, X } from "lucide-react";
import { Link } from "react-router";
import { useDebounce } from "../../../utils/useDebounce";

import type { Blog } from "../../../types/blog.types";
import type { ApiError } from "../../../types/authType";
import Pagination from "../../../utils/Pagination";
import {
  useDeleteBlogMutation,
  useGetAllBlogsQuery,
} from "../../../redux/api/blogsApi";

const LIMIT = 10;

interface ModalState {
  title: string;
  content: string;
}

const AllBlog: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [modalData, setModalData] = useState<ModalState | null>(null);

  const debouncedSearch = useDebounce(searchValue, 500);

  const { data, isLoading, refetch, isFetching } = useGetAllBlogsQuery({
    search: debouncedSearch,
    page: currentPage,
    limit: LIMIT,
  });

  const [deleteBlog] = useDeleteBlogMutation();

  const blogs: Blog[] = data?.data || [];
  const totalPages = data?.meta?.totalPages ?? 1;
  const totalItems = data?.meta?.total ?? 0;

  /* ================= DELETE ================= */
  const handleDeleteBlog = async (item: Blog) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `Delete blog "${item.title}"?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
      });

      if (!result.isConfirmed) return;

      await deleteBlog(item.id).unwrap();

      await Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: `Blog "${item.title}" deleted.`,
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
        <span className="text-sm text-gray-300">
          {isLong ? value.slice(0, 40) + "..." : value}
        </span>

        {isLong && (
          <button
            onClick={() => setModalData({ title, content: value })}
            className="block cursor-pointer text-xs text-blue-500 hover:text-blue-400 underline mt-1"
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

  /* ================= RENDER ================= */
  return (
    <div className="rounded-lg border border-gray-base bg-black-base overflow-hidden">
      <div className="overflow-x-auto">
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-4 border-b border-gray-base">
          <div>
            <h1 className="text-xl font-semibold">Blogs</h1>
            <p className="text-sm text-gray-400">Manage all blogs</p>
          </div>

          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Search blog..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="px-3 py-2 rounded-md border border-gray-base bg-black-base"
            />

            <Link to="/add-blog">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
                <Plus size={16} /> Add New
              </button>
            </Link>
          </div>
        </div>

        {/* TABLE */}
       <table className="w-full min-w-200 sm:min-w-full">
          <thead>
            <tr className="bg-black-solid">
              <th className="py-2 px-4 border-b border-gray-base text-left text-sm">ID</th>
              <th className="py-2 px-4 border-l border-b border-gray-base text-left text-sm">Title</th>
              <th className="py-2 px-4 border-l border-b border-gray-base text-left text-sm">Slug</th>
              <th className="py-2 px-4 border-l border-b border-gray-base text-left text-sm">Category</th>
              <th className="py-2 px-4 border-l border-b border-gray-base text-left text-sm">Description</th>
              <th className="py-2 px-4 border-l border-b border-gray-base text-left text-sm">Image</th>
              <th className="py-2 px-4 border-l border-b border-gray-base text-left text-sm">Actions</th>
            </tr>
          </thead>

          <tbody>
            {blogs.map((item, index) => (
              <tr     key={item.id}
                  className={`${
                    index % 2 !== 0 ? "bg-black-solid hover:bg-black-base" : ""
                  }`}>
                <td className="py-2 px-4 border-b border-gray-base">
                  {(currentPage - 1) * LIMIT + index + 1}
                </td>

                <td className="py-2 px-4 border-l border-b border-gray-base">{item.title}</td>

                <td className="py-2 px-4 border-l border-b border-gray-base">{item.slug}</td>

                <td className="py-2 px-4 border-l border-b border-gray-base">
                  {item?.blog_category?.name || "-"}
                </td>

                <td className="py-2 px-4 border-l border-b border-gray-base">
                  {SeeMore("Description", item.description)}
                </td>

                <td className="py-2 px-4 border-l border-b border-gray-base">
                  {item.image ? (
                    <img
                      src={`${import.meta.env.VITE_PUBLIC_IMAGE_PATH}${item.image}`}
                      className="w-16 h-12 object-cover rounded"
                    />
                  ) : (
                    "-"
                  )}
                </td>

                <td className="py-2 px-4 border-l border-b border-gray-base">
                  <div className="flex gap-2">
                    <Link to={`/edit-blog/${item.id}`}>
                      <button className="p-2 text-green-400 hover:bg-green-500/10 rounded">
                        <Edit size={16} />
                      </button>
                    </Link>

                    <button
                      onClick={() => handleDeleteBlog(item)}
                      className="p-2 text-red-400 hover:bg-red-500/10 rounded"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINATION */}
        {blogs.length > 0 && (
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

      {/* ================= MODAL ================= */}
      {modalData && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
          onClick={() => setModalData(null)}
        >
          <div
            className="bg-black-base border border-gray-base rounded-lg w-150 max-w-full"
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
            <div
              className="p-4 max-h-[70vh] overflow-y-auto text-gray-300
              [&::-webkit-scrollbar]:w-2
              [&::-webkit-scrollbar-track]:bg-gray-900
              [&::-webkit-scrollbar-thumb]:bg-blue-600
              [&::-webkit-scrollbar-thumb]:rounded-full"
            >
              {modalData.content}
            </div>

            {/* FOOTER */}
            <div className="p-4 border-t border-gray-base text-right">
              <button
                onClick={() => setModalData(null)}
                className="px-4 py-2 bg-blue-600 rounded-md"
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

export default AllBlog;