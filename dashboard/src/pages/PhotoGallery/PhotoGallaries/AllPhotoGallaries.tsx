// pages/photo-gallery/AllPhotoGalleries.tsx
import React, { useState } from "react";
import Swal from "sweetalert2";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router";
import { useDebounce } from "../../../utils/useDebounce";

import type { PhotoGallery } from "../../../types/photoGallery.types";
import type { ApiError } from "../../../types/authType";
import Pagination from "../../../utils/Pagination";
import { useDeletePhotoGalleryMutation, useGetAllPhotoGalleriesQuery } from "../../../redux/api/photoGallariesApi";


const LIMIT = 10;

const AllPhotoGalleries: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const debouncedSearch = useDebounce(searchValue, 500);

  const { data, isLoading, refetch, isFetching } = useGetAllPhotoGalleriesQuery({
    search: debouncedSearch,
    page: currentPage,
    limit: LIMIT,
  });

  const [deletePhotoGallery] = useDeletePhotoGalleryMutation();

  const galleries: PhotoGallery[] = data?.data || [];
  const totalPages = data?.meta?.totalPages ?? 1;
  const totalItems = data?.meta?.total ?? 0;


  const handleDelete = async (gallery: PhotoGallery) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `Delete "${gallery.title}"?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });

      if (!result.isConfirmed) return;

      await deletePhotoGallery(gallery.id).unwrap();

      await Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: `"${gallery.title}" has been deleted.`,
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
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-4 border-b border-gray-700">
          <div>
            <h1 className="text-xl font-semibold">Photo Galleries</h1>
            <p className="text-sm text-gray-400">Manage all photo galleries</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <input
              type="text"
              placeholder="Search Galleries..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full sm:w-64 px-3 py-2 rounded-md border border-gray-base 
                bg-black-solid text-primary-muted placeholder-gray-400"
            />

            <Link to="/add-photo-gallery">
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
                <th className="py-1 px-4 border-b border-gray-base text-left text-sm">#</th>
                <th className="py-1 px-4 border-l border-b border-gray-base text-left text-sm">Category</th>
                <th className="py-1 px-4 border-l border-b border-gray-base text-left text-sm">Title</th>
                <th className="py-1 px-4 border-l border-b border-gray-base text-left text-sm">Description</th>
                <th className="py-1 px-4 border-l border-b border-gray-base text-left text-sm">Thumbnail</th>
                <th className="py-1 px-4 border-l border-b border-gray-base text-left text-sm">Status</th>
                <th className="py-1 px-4 border-l border-b border-gray-base text-left text-sm">Actions</th>
              </tr>
            </thead>

            <tbody>
              {galleries.length > 0 ? (
                galleries.map((gallery, index) => (
                  <tr
                    key={gallery.id}
                    className={`${index % 2 !== 0 ? "bg-black-solid hover:bg-black-base" : ""}`}
                  >
                    <td className="py-2 px-4 border-b border-gray-base">{index + 1}</td>
                    <td className="py-2 px-4 border-l border-b border-gray-base">
                      {gallery.photoGalleryCategory?.title || "-"}
                    </td>
                    <td className="py-2 px-4 border-l border-b border-gray-base">{gallery.title}</td>
                    <td className="py-2 px-4 border-l border-b border-gray-base">{gallery.description}</td>
                    <td className="py-2 px-4 border-l border-b border-gray-base">
                      {gallery.image ? (
                        <img
                          src={`${import.meta.env.VITE_PUBLIC_IMAGE_PATH}${gallery.image}?v=${new Date().getTime()}`}
                          alt={gallery.title}
                          className="w-16 h-12 object-cover rounded"
                        />
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="py-2 px-4 border-l border-b border-gray-base">
                      {gallery.is_active ? "Active" : "Inactive"}
                    </td>
                    <td className="py-2 px-4 border-l border-b border-gray-base">
                      <div className="flex gap-2">
                        <Link to={`/edit-photo-gallery/${gallery.id}`}>
                          <button className="p-2 rounded-md hover:bg-gray-200 text-green-600 dark:hover:bg-gray-800">
                            <Edit size={16} />
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDelete(gallery)}
                          className="p-2 rounded text-red-600 hover:bg-red-100 dark:hover:bg-red-500/10"
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
                    No photo galleries found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        {galleries.length > 0 && (
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

export default AllPhotoGalleries;