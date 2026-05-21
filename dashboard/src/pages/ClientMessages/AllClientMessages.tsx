import React, { useState } from "react";
import { X } from "lucide-react";
import { useDebounce } from "../../utils/useDebounce";
import { useGetAllSendMessagesQuery } from "../../redux/api/clientMassage";
import type { SendMessage } from "../../types/sendMessageTypes";
import Pagination from "../../utils/Pagination";
import { Link } from "react-router";

const LIMIT = 10;

interface ModalState {
  title: string;
  content: string;
}

const AllClientMessages: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [modalData, setModalData] = useState<ModalState | null>(null);

  const debouncedSearch = useDebounce(searchValue, 500);

  const { data, isLoading, isFetching } = useGetAllSendMessagesQuery({
    search: debouncedSearch,
    page: currentPage,
    limit: LIMIT,
  });

  const messages: SendMessage[] = data?.data || [];
  const totalPages = data?.meta?.totalPages ?? 1;
  const totalItems = data?.meta?.total ?? 0;

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
          <h1 className="text-xl font-semibold">Client Messages</h1>
          <p className="text-sm text-gray-400">Manage all client messages</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <input
            type="text"
            placeholder="Search messages..."
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full sm:w-64 px-3 py-2 rounded-md border border-gray-base bg-black-solid text-primary-muted placeholder-gray-400"
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-200 sm:min-w-full">
          <thead>
            <tr className="bg-black-solid">
              <th className="py-1 px-4 text-left border-l border-b border-gray-base text-sm">#</th>
              <th className="py-1 px-4 text-left border-l border-b border-gray-base text-sm">Name</th>
              <th className="py-1 px-4 text-left border-l border-b border-gray-base text-sm">Email</th>
              <th className="py-1 px-4 text-left border-l border-b border-gray-base text-sm">Message</th>
              <th className="py-1 px-4 text-left border-l border-b border-gray-base text-sm">Created At</th>
              <th className="py-1 px-4 text-left border-l border-b border-gray-base text-sm">Actions</th>
            </tr>
          </thead>

          <tbody>
            {messages.length > 0 ? (
              messages.map((msg, index) => (
                <tr
                  key={msg.id}
                  className={index % 2 !== 0 ? "bg-black-solid hover:bg-black-base" : ""}
                >
                  <td className="py-2 px-4 border-b border-gray-base">
                    {(currentPage - 1) * LIMIT + index + 1}
                  </td>

                  <td className="py-2 px-4 border-l border-b border-gray-base">
                    {msg.name}
                  </td>

                  <td className="py-2 px-4 border-l border-b border-gray-base">
                    {msg.email}
                  </td>

                  {/* MESSAGE WITH MODAL */}
                  <td className="py-2 px-4 border-l border-b border-gray-base">
                    {msg.description && msg.description.length > 50 ? (
                      <div>
                        <span>{truncateText(msg.description, 50)}</span>

                        <button
                          onClick={() =>
                            setModalData({
                              title: "Full Message",
                              content: msg.description || "",
                            })
                          }
                          className="block text-blue-500 underline text-xs mt-1"
                        >
                          See more
                        </button>
                      </div>
                    ) : (
                      msg.description || "-"
                    )}
                  </td>

                  <td className="py-2 px-4 border-l border-b border-gray-base">
                    {new Date(msg.created_at).toLocaleDateString()}
                  </td>

                  <td className="py-2 px-4 border-l border-b border-gray-base">
                    <Link to={`/send-message/reply/${msg.id}`}>
                      <button className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 rounded text-white">
                        Reply
                      </button>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-8 text-center text-gray-500">
                  No messages found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {messages.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalResults={totalItems}
          limit={LIMIT}
          isFetching={isFetching}
        />
      )}

      {/* ================= MODAL ================= */}
      {modalData && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          onClick={() => setModalData(null)}
        >
          <div
            className="bg-black-base w-full max-w-xl rounded-lg border border-gray-base relative"
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

export default AllClientMessages;