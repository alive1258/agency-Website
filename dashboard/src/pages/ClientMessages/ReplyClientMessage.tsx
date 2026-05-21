

import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  useReplySendMessageMutation,
  useGetSingleSendMessageQuery,
} from "../../redux/api/clientMassage";

const ReplyClientMessage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // ✅ GET SINGLE MESSAGE
  const {
    data: messageData,
    isLoading: loadingMessage,
  } = useGetSingleSendMessageQuery(id!, {
    skip: !id,
  });

  const messageInfo = messageData?.data;

  console.log(messageData,"messageData")

  const [replySendMessage, { isLoading }] =
    useReplySendMessageMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id) return setError("Invalid ID");
    if (!subject || !message)
      return setError("All fields required");

    try {
      setError("");

      await replySendMessage({
        id,
        subject,
        message,
      }).unwrap();

      alert("Reply sent successfully ✅");
      navigate("/send-message");
    } catch {
      setError("Failed to send reply ❌");
    }
  };

  if (loadingMessage) {
    return <p className="text-center p-6">Loading...</p>;
  }

  return (
    <div className="bg-black-base border border-gray-base p-4 rounded-lg">
      <h1 className="text-xl font-semibold mb-4">
        Reply to Client
      </h1>

      {/* ✅ CLIENT INFO */}
      <div className="mb-4 bg-black-base border border-gray-base p-4 rounded-lg">
        <p><b>Name:</b> {messageInfo?.name || "-"}</p>
        <p><b>Email:</b> {messageInfo?.email || "-"}</p>

        <p className="mt-2">
          <b>Message:</b><br />giev cooret <code></code>
          {messageInfo?.description || "-"}
        </p>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 border border-gray-base p-6 rounded-lg"
      >
        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full px-3 py-2 bg-black-base border border-gray-base p-4 rounded-lg"
        />

        <textarea
          rows={6}
          placeholder="Write reply..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-3 py-2 bg-black-base border border-gray-base p-4 rounded-lg"
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-6 py-2 bg-blue-base rounded text-white"
        >
          {isLoading ? "Sending..." : "Send Reply"}
        </button>
      </form>
    </div>
  );
};

export default ReplyClientMessage;