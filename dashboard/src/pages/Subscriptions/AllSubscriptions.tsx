import React, { useState } from "react";
import { useDebounce } from "../../utils/useDebounce";
import Pagination from "../../utils/Pagination";

import type { Subscription } from "../../types/subscription.types";
import { useGetAllSubscriptionsQuery } from "../../redux/api/subscriptionsApi";

const LIMIT = 10;

const AllSubscriptions: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const debouncedSearch = useDebounce(searchValue, 500);

  const { data, isLoading, isFetching } =
    useGetAllSubscriptionsQuery({
      search: debouncedSearch,
      page: currentPage,
      limit: LIMIT,
    });

  const subscriptions: Subscription[] = data?.data || [];
  const totalPages = data?.meta?.totalPages ?? 1;
  const totalItems = data?.meta?.total ?? 0;

  /* ---------------- LOADING (SKELETON) ---------------- */
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

  /* ---------------- ERROR ---------------- */
  // if (error) {
  //   const err = error as ApiError;
  //   return (
  //     <div className="flex h-[70vh] flex-col items-center justify-center text-center">
  //       <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-8 max-w-md">
  //         <h2 className="text-lg font-semibold text-red-400 mb-2">
  //           Failed to load data
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
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-4 border-b border-gray-base">
        <div>
          <h1 className="text-xl font-semibold">Subscriptions</h1>
          <p className="text-sm text-gray-400">Manage all subscriptions</p>
        </div>

        <input
          type="text"
          placeholder="Search subscriptions..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full sm:w-64 px-3 py-2 rounded-md border border-gray-base 
                     bg-black-solid text-primary-muted 
                     placeholder-gray-400"
        />
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-160 sm:min-w-full">
          <thead>
            <tr className="bg-black-solid">
              <th className="py-2 px-4 text-left border-b border-gray-base font-semibold text-sm">#</th>
              <th className="py-2 px-4 text-left border-l border-gray-base border-b font-semibold text-sm">Service</th>
              <th className="py-2 px-4 text-left border-l border-gray-base border-b font-semibold text-sm">Client</th>
              <th className="py-2 px-4 text-left border-l border-gray-base border-b font-semibold text-sm">Mobile</th>
              <th className="py-2 px-4 text-left border-l border-gray-base border-b font-semibold text-sm">Email</th>
              <th className="py-2 px-4 text-left border-l border-gray-base border-b font-semibold text-sm">Price</th>
              <th className="py-2 px-4 text-left border-l border-gray-base border-b font-semibold text-sm">Billing Cycle</th>
              <th className="py-2 px-4 text-left border-l border-gray-base border-b font-semibold text-sm">Status</th>
              <th className="py-2 px-4 text-left border-l border-gray-base border-b font-semibold text-sm">Started At</th>
              <th className="py-2 px-4 text-left border-l border-gray-base border-b font-semibold text-sm">Expires At</th>
            </tr>
          </thead>

          <tbody>
            {subscriptions.length > 0 ? (
              subscriptions.map((sub, index) => (
                <tr
                  key={sub.id}
                  className={`${index % 2 !== 0 ? "bg-black-solid hover:bg-black-base" : ""}`}
                >
                  <td className="py-2 px-4 border-b border-gray-base">
                    {(currentPage - 1) * LIMIT + index + 1}
                  </td>

                  <td className="py-2 px-4 border-l border-gray-base border-b">
                    {sub.service?.name || "N/A"}
                  </td>

                  <td className="py-2 px-4 border-l border-gray-base border-b">
                    {sub.added_by_user?.name || "N/A"}
                  </td>

                  <td className="py-2 px-4 border-l border-gray-base border-b">
                    {sub.added_by_user?.mobile || "N/A"}
                  </td>

                  <td className="py-2 px-4 border-l border-gray-base border-b">
                    {sub.added_by_user?.email || "N/A"}
                  </td>

                  <td className="py-2 px-4 border-l border-gray-base border-b">
                    {sub.price}
                  </td>

                  <td className="py-2 px-4 border-l border-gray-base border-b capitalize">
                    {sub.billing_cycle}
                  </td>

                  <td className="py-2 px-4 border-l border-gray-base border-b">
                    <span
                      className={`font-medium ${
                        sub.status === "ACTIVE"
                          ? "text-green-400"
                          : sub.status === "EXPIRED"
                          ? "text-red-400"
                          : "text-yellow-400"
                      }`}
                    >
                      {sub.status}
                    </span>
                  </td>

                  <td className="py-2 px-4 border-l border-gray-base border-b">
                    {new Date(sub.started_at).toLocaleDateString()}
                  </td>

                  <td className="py-2 px-4 border-l border-gray-base border-b">
                    {new Date(sub.expired_at).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={10} className="py-8 text-center text-gray-500">
                  No subscriptions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* PAGINATION */}
        {subscriptions.length > 0 && (
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

export default AllSubscriptions;
