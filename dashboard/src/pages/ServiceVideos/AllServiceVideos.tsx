import React, { useState } from "react";
import Swal from "sweetalert2";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router";
import { useDebounce } from "../../utils/useDebounce";
import type { ApiError } from "../../types/authType";
import Pagination from "../../utils/Pagination";

import {
  useDeleteServiceVideoMutation,
  useGetAllServiceVideosQuery,
} from "../../redux/api/serviceVdeosApi";

import type { ServiceVideo } from "../../types/serviceVideo.types";

const LIMIT = 10;

const AllServiceVideos: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearch = useDebounce(searchValue, 500);

  const { data, isLoading, refetch, isFetching } =
    useGetAllServiceVideosQuery({
      search: debouncedSearch,
      page: currentPage,
      limit: LIMIT,
    });

  const [deleteServiceVideo] = useDeleteServiceVideoMutation();

  const videos: ServiceVideo[] = data?.data || [];
  const totalPages = data?.meta?.totalPages ?? 1;
  const totalItems = data?.meta?.total ?? 0;


  // delete
  const handleDeleteServiceVideo = async (video: ServiceVideo) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `Delete video "${video.title}"?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });

      if (!result.isConfirmed) return;

      await deleteServiceVideo(video.id).unwrap();

      await Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: `Video "${video.title}" has been deleted.`,
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

  // skeleton loader
  if (isLoading) {
    return (
      <div className="rounded-lg border border-gray-700 p-6 space-y-3">
        {[...Array(LIMIT)].map((_, i) => (
          <div key={i} className="h-12 w-full animate-pulse rounded-md bg-gray-800" />
        ))}
      </div>
    );
  }

  // error UI
  // if (error) {
  //   const err = error as ApiError;
  //   return (
  //     <div className="flex h-[70vh] flex-col items-center justify-center text-center">
  //       <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-8 max-w-md">
  //         <h2 className="text-lg font-semibold text-red-400 mb-2">
  //           Failed to load service videos
  //         </h2>
  //         <p className="text-sm text-gray-400 mb-4">
  //           {err.data?.message || "Server error. Please try again."}
  //         </p>
  //         <button
  //           onClick={() => refetch()}
  //           className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-md text-white"
  //         >
  //           Retry
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="rounded-lg border border-gray-base bg-black-base overflow-hidden">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-4 border-b border-gray-700">
        <div>
          <h1 className="text-xl font-semibold">Service Videos</h1>
          <p className="text-sm text-gray-400">Manage all service videos</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <input
            type="text"
            placeholder="Search videos..."
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full sm:w-64 px-3 py-2 rounded-md border border-gray-base bg-black-solid text-primary-muted placeholder-gray-400"
          />

          <Link to="/add-service-video">
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
              <th className="py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">Service</th>
              <th className="py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">Title</th>
              <th className="py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">Description</th>
              <th className="py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">Thumbnail</th>
              <th className="py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">Video</th>
              <th className="py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">Status</th>
              <th className="py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">Created</th>
              <th className="py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">Actions</th>
            </tr>
          </thead>

          <tbody>
            {videos.length > 0 ? (
              videos.map((video, index) => (
                <tr
                  key={video.id}
                  className={`${index % 2 !== 0 ? "bg-black-solid hover:bg-black-base" : ""}`}
                >
                  <td className="py-2 px-4  border-b border-gray-base">
                    {(currentPage - 1) * LIMIT + index + 1}
                  </td>

                  <td className="py-2 px-4 border-l border-b border-gray-base">
                    {video.service?.name || "-"}
                  </td>

                  <td className="py-2 px-4 border-l border-b border-gray-base">
                    {video.title}
                  </td>

                  <td className="py-2 px-4 border-l border-b border-gray-base">
                    {video.description || "-"}
                  </td>

                  <td className="py-2 px-4 border-l border-b border-gray-base">
                    {video.thumbnail ? (
                      <img
                        src={`${import.meta.env.VITE_PUBLIC_IMAGE_PATH}${video.thumbnail}`}
                        alt={video.title}
                        className="w-16 h-10 object-cover rounded"
                      />
                    ) : "-"}
                  </td>

                  <td className="py-2 px-4 border-l border-b border-gray-base">
                    {video.video_url ? (
                      <a href={video.video_url} target="_blank" rel="noreferrer" className="text-blue-500 underline">
                        Watch
                      </a>
                    ) : "-"}
                  </td>

                  <td className="py-2 px-4 border-l border-b border-gray-base">
                    {video.is_active ? "Active" : "Inactive"}
                  </td>

                  <td className="py-2 px-4 border-l border-b border-gray-base">
                    {new Date(video.created_at).toLocaleDateString()}
                  </td>

                  <td className="py-2 px-4 border-l border-b border-gray-base">
                    <div className="flex gap-2">
                      <Link to={`/edit-service-video/${video.id}`}>
                        <button className="p-2 rounded-md hover:bg-gray-800 text-green-400">
                          <Edit size={16} />
                        </button>
                      </Link>

                      <button
                        onClick={() => handleDeleteServiceVideo(video)}
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
                <td colSpan={9} className="py-8 text-center text-gray-500">
                  No service videos found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {videos.length > 0 && (
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

export default AllServiceVideos;
