import { useEffect, useState } from "react";
import API_URL from "../config";

function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [sendingReply, setSendingReply] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/messages`);
      if (!response.ok) throw new Error("Failed to fetch messages");
      const data = await response.json();
      setMessages(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching messages:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleRead = async (id, isRead) => {
    try {
      const response = await fetch(`${API_URL}/api/messages/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_read: !isRead }),
      });

      if (!response.ok) throw new Error("Failed to update message");
      await response.json();
      setMessages(
        messages.map((msg) =>
          msg.id === id ? { ...msg, is_read: !isRead } : msg
        )
      );
    } catch (err) {
      setError(err.message);
      console.error("Error updating message:", err);
    }
  };

  const deleteMessage = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?"))
      return;

    try {
      const response = await fetch(`${API_URL}/api/messages/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete message");
      setMessages(messages.filter((msg) => msg.id !== id));
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("Error deleting message:", err);
    }
  };

  const handleReplySubmit = async (e, messageId, recipientEmail) => {
    e.preventDefault();

    if (!replyText.trim()) {
      alert("Reply cannot be empty");
      return;
    }

    setSendingReply(true);
    try {
      const response = await fetch(`${API_URL}/api/messages/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message_id: messageId,
          recipient_email: recipientEmail,
          reply_text: replyText,
        }),
      });

      if (!response.ok) throw new Error("Failed to send reply");

      alert("Reply sent successfully!");
      setReplyingTo(null);
      setReplyText("");
    } catch (err) {
      setError(err.message);
      console.error("Error sending reply:", err);
    } finally {
      setSendingReply(false);
    }
  };

  return (
    <div className="min-h-screen p-6 md:p-10 bg-gray-100">
      <h1 className="text-3xl font-bold text-orange-600 mb-6">Messages</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-lg">
          {error}
        </div>
      )}

      <div className="bg-white rounded-xl shadow p-6">
        {loading ? (
          <p className="text-gray-500 text-center py-10">Loading messages...</p>
        ) : messages.length === 0 ? (
          <p className="text-gray-500 text-center py-10">
            No messages received yet.
          </p>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-5 rounded-lg border ${
                  msg.is_read
                    ? "bg-gray-50 border-gray-300"
                    : "bg-orange-50 border-orange-300"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-orange-600">
                      {msg.name}
                    </h3>
                    <p className="text-sm text-gray-500">{msg.email}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      <span className="font-semibold">Subject:</span>{" "}
                      {msg.subject}
                    </p>
                    <p className="mt-3 text-gray-700">{msg.message}</p>
                    <p className="text-xs mt-3 text-gray-400">
                      {new Date(msg.created_at).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 ml-4">
                    <button
                      onClick={() => toggleRead(msg.id, msg.is_read)}
                      className={`px-3 py-1 rounded text-sm font-semibold transition ${
                        msg.is_read
                          ? "bg-gray-400 text-white hover:bg-gray-500"
                          : "bg-black text-white hover:bg-gray-800"
                      }`}
                    >
                      {msg.is_read ? "Mark Unread" : "Mark Read"}
                    </button>

                    <button
                      onClick={() => setReplyingTo(msg.id)}
                      className="px-3 py-1 bg-blue-600 text-white rounded text-sm font-semibold text-center hover:bg-blue-500 transition"
                    >
                      Reply
                    </button>

                    <button
                      onClick={() => deleteMessage(msg.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-500 text-sm font-semibold transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {replyingTo === msg.id && (
                  <div className="mt-4 pt-4 border-t">
                    <form
                      onSubmit={(e) => handleReplySubmit(e, msg.id, msg.email)}
                    >
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        rows="4"
                        placeholder="Write your reply..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
                        required
                      ></textarea>
                      <div className="flex gap-2 mt-2">
                        <button
                          type="submit"
                          disabled={sendingReply}
                          className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-500 transition disabled:opacity-50"
                        >
                          {sendingReply ? "Sending..." : "Send Reply"}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setReplyingTo(null);
                            setReplyText("");
                          }}
                          className="bg-gray-400 text-white px-4 py-2 rounded font-semibold hover:bg-gray-500 transition"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Messages;
