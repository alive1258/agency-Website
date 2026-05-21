import React, { useState } from "react";
import Swal from "sweetalert2";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router";
import { useDebounce } from "../../../utils/useDebounce";

import type { PhotoGalleryCategory } from "../../../types/photoGalleryCategory.types";
import type { ApiError } from "../../../types/authType";
import Pagination from "../../../utils/Pagination";
import { useDeletePhotoGalleryCategoryMutation, useGetAllPhotoGalleryCategoriesQuery } from "../../../redux/api/photoGalleryCategoryApi";

const LIMIT = 10;

const AllPhotoGalleryCategories: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const debouncedSearch = useDebounce(searchValue, 500);

  const { data, isLoading, refetch, isFetching } =
    useGetAllPhotoGalleryCategoriesQuery({
      search: debouncedSearch,
      page: currentPage,
      limit: LIMIT,
    });

  const [deleteCategory] = useDeletePhotoGalleryCategoryMutation();

  const categories: PhotoGalleryCategory[] = data?.data || [];
  const totalPages = data?.meta?.totalPages ?? 1;
  const totalItems = data?.meta?.total ?? 0;


  console.log(categories,"categories")


  const handleDeleteCategory = async (category: PhotoGalleryCategory) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `Delete category "${category.title}"?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });

      if (!result.isConfirmed) return;

      await deleteCategory(category.id).unwrap();

      await Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: `Category "${category.title}" has been deleted.`,
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
      <div className="overflow-x-auto">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-4 border-b border-gray-700">
          <div>
            <h1 className="text-xl font-semibold">Photo Gallery Categories</h1>
            <p className="text-sm text-gray-400">Manage all categories</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <input
              type="text"
              placeholder="Search Categories..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full sm:w-64 px-3 py-2 rounded-md border border-gray-base 
                bg-black-solid text-primary-muted placeholder-gray-400"
            />
            <Link to="/add-photo-gallery-category">
              <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition">
                <Plus size={16} /> Add New
              </button>
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-200 sm:min-w-full">
            <thead>
              <tr className="bg-black-solid">
                <th className="py-1 px-4 border-l border-b border-gray-base text-left font-semibold text-sm">
                  ID
                </th>
                <th className="py-1 px-4 border-l border-b border-gray-base text-left font-semibold text-sm">
                  Title
                </th>
                <th className="py-1 px-4 border-l border-b border-gray-base text-left font-semibold text-sm">
                  Slug
                </th>
                <th className="py-1 px-4 border-l border-b border-gray-base text-left font-semibold text-sm">
                  Event Place
                </th>
                <th className="py-1 px-4 border-l border-b border-gray-base text-left font-semibold text-sm">
                  Description
                </th>
                <th className="py-1 px-4 border-l border-b border-gray-base text-left font-semibold text-sm">
                  Thumbnail
                </th>
                <th className="py-1 px-4 border-l border-b border-gray-base text-left font-semibold text-sm">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 ? (
                categories.map((category, index) => (
                  <tr
                    key={category.id}
                    className={`${index % 2 !== 0 ? "bg-black-solid hover:bg-black-base" : ""}`}
                  >
                    <td className="py-2 px-4 border-b border-gray-base">{index + 1}</td>
                    <td className="py-2 px-4 border-l border-b border-gray-base">{category.title}</td>
                    <td className="py-2 px-4 border-l border-b border-gray-base">{category.slug}</td>
                    <td className="py-2 px-4 border-l border-b border-gray-base">{category.event_place || "-"}</td>
                    <td className="py-2 px-4 border-l border-b border-gray-base">{category.description}</td>
                    <td className="py-2 px-4 border-l border-b border-gray-base">
                      {category.image ? (
                        <img
                          src={`${import.meta.env.VITE_PUBLIC_IMAGE_PATH}${category.image}?v=${new Date().getTime()}`}
                          alt={category.title}
                          className="w-16 h-12 object-cover rounded"
                        />
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="py-2 px-4 border-l border-b border-gray-base">
                      <div className="flex gap-2">
                        <Link to={`/edit-photo-gallery-category/${category.id}`}>
                          <button
                            className="p-2 cursor-pointer rounded-md transition-colors hover:bg-gray-200 text-green-600 dark:hover:bg-gray-800 dark:text-green-400"
                            title="Edit Category"
                          >
                            <Edit size={16} />
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDeleteCategory(category)}
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
                  <td colSpan={7} className="py-8 text-center text-gray-500">
                    No categories found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        {categories.length > 0 && (
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
    </div>
  );
};

export default AllPhotoGalleryCategories;