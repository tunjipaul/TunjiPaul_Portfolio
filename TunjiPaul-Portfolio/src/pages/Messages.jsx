import { useEffect, useState } from "react";
import API_URL from "../config";
import {
  RefreshCw,
  CheckCircle,
  Trash2,
  Eye,
  FileText,
  Mail,
  User,
  Calendar,
  MessageSquare,
} from "lucide-react";

function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [sendingReply, setSendingReply] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [cvFile, setCvFile] = useState(null);
  const [uploadingResume, setUploadingResume] = useState(false);
  const [uploadingCV, setUploadingCV] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(null);
  const [currentFiles, setCurrentFiles] = useState({ resume: null, cv: null });
  const [deletingType, setDeletingType] = useState(null);

  useEffect(() => {
    fetchMessages();
    fetchCurrentFiles();
  }, []);

  const handleRefreshAll = () => {
    fetchMessages();
    fetchCurrentFiles();
  };

  const fetchCurrentFiles = async () => {
    try {
      const response = await fetch(`${API_URL}/api/resume/current`);
      if (response.ok) {
        const data = await response.json();
        setCurrentFiles(data);
      }
    } catch (err) {
      console.error("Error fetching files:", err);
    }
  };

  const handleUpload = async (type, file) => {
    if (!file) return alert("Please select a file first");
    if (file.type !== "application/pdf") return alert("Only PDF files allowed");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);

    type === "resume" ? setUploadingResume(true) : setUploadingCV(true);

    try {
      const response = await fetch(`${API_URL}/api/resume/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to upload file");

      setUploadSuccess(`${type.toUpperCase()} updated successfully!`);
      setTimeout(() => setUploadSuccess(null), 3000);

      await fetchCurrentFiles();
      type === "resume" ? setResumeFile(null) : setCvFile(null);
    } catch (err) {
      setError(err.message);
    } finally {
      type === "resume" ? setUploadingResume(false) : setUploadingCV(false);
    }
  };

  const handleDeleteFile = async (type) => {
    if (!window.confirm(`Delete the current ${type.toUpperCase()}?`)) return;
    setDeletingType(type);
    try {
      const response = await fetch(`${API_URL}/api/resume/delete/${type}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete file");
      await fetchCurrentFiles();
      setUploadSuccess(`${type.toUpperCase()} removed.`);
      setTimeout(() => setUploadSuccess(null), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setDeletingType(null);
    }
  };

  const handlePreviewFile = async (type) => {
    try {
      const response = await fetch(`${API_URL}/api/resume/download/${type}`);
      if (!response.ok) throw new Error("File not available");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      window.open(url, "_blank");
    } catch (err) {
      alert("Failed to preview file");
    }
  };

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
    } finally {
      setLoading(false);
    }
  };

  const toggleRead = async (id, isRead) => {
    try {
      console.log(`Toggling message ${id} from ${isRead} to ${!isRead}`);

      const response = await fetch(`${API_URL}/api/messages/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_read: !isRead }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Backend error:", errorData);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedMessage = await response.json();
      console.log("Updated message:", updatedMessage);

      setMessages(
        messages.map((msg) => (msg.id === id ? updatedMessage : msg))
      );
    } catch (err) {
      console.error("Toggle read error:", err);
      alert(`Failed to update message: ${err.message}`);
    }
  };

  const deleteMessage = async (id) => {
    if (!window.confirm("Delete this message?")) return;
    try {
      const response = await fetch(`${API_URL}/api/messages/${id}`, {
        method: "DELETE",
      });
      if (response.ok) setMessages(messages.filter((msg) => msg.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleReplySubmit = async (e, messageId, recipientEmail) => {
    e.preventDefault();
    if (!replyText.trim()) return;
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
      alert("Reply sent!");
      setReplyingTo(null);
      setReplyText("");
    } catch (err) {
      setError(err.message);
    } finally {
      setSendingReply(false);
    }
  };

  return (
    <div className="min-h-screen p-6 md:p-10 bg-gray-50 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* --- HEADER SECTION --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900">
              Admin Dashboard
            </h1>
            <p className="text-gray-500">
              Manage your documents and incoming inquiries.
            </p>
          </div>
          <button
            onClick={handleRefreshAll}
            className="flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-xl hover:bg-orange-500 shadow-lg transition-all active:scale-95"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
            Refresh Data
          </button>
        </div>

        {/* --- DOCUMENT MANAGEMENT CARD --- */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-10">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <FileText className="text-orange-600" /> Professional Documents
          </h2>

          {uploadSuccess && (
            <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-xl border border-green-200 flex items-center gap-3 animate-fade-in">
              <CheckCircle className="w-5 h-5" /> {uploadSuccess}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {["resume", "cv"].map((type) => (
              <div
                key={type}
                className="flex items-center justify-between p-5 bg-gray-50 rounded-2xl border border-gray-200"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                      {type}
                    </p>
                    <p className="text-sm font-semibold text-gray-700">
                      {currentFiles[type] ? currentFiles[type] : "Not Uploaded"}
                    </p>
                  </div>
                </div>
                {currentFiles[type] && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handlePreviewFile(type)}
                      className="p-2 text-gray-600 hover:bg-white hover:shadow-sm rounded-lg transition"
                      title="Preview"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteFile(type)}
                      disabled={deletingType === type}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition disabled:opacity-50"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-sm font-bold text-gray-600">
                Update Resume (PDF)
              </label>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setResumeFile(e.target.files[0])}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
              />
              <button
                onClick={() => handleUpload("resume", resumeFile)}
                disabled={!resumeFile || uploadingResume}
                className="w-full py-2 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 disabled:opacity-30 transition"
              >
                {uploadingResume ? "Processing..." : "Push New Resume"}
              </button>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-gray-600">
                Update CV (PDF)
              </label>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setCvFile(e.target.files[0])}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
              />
              <button
                onClick={() => handleUpload("cv", cvFile)}
                disabled={!cvFile || uploadingCV}
                className="w-full py-2 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 disabled:opacity-30 transition"
              >
                {uploadingCV ? "Processing..." : "Push New CV"}
              </button>
            </div>
          </div>
        </div>

        {/* --- MESSAGES SECTION --- */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Mail className="text-orange-600" /> Inbox
        </h2>

        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-xl border border-red-100">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto text-gray-300 mb-2" />
              <p className="text-gray-400">Syncing messages...</p>
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
              <p className="text-gray-400 font-medium">No messages found.</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`group transition-all duration-300 bg-white rounded-2xl p-6 border ${
                  msg.is_read
                    ? "border-gray-100"
                    : "border-orange-200 bg-orange-50/30"
                }`}
              >
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="flex-1">
                    {/* --- USER ICON INTEGRATED HERE --- */}
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">
                          {msg.name}
                        </h3>
                        {!msg.is_read && (
                          <span className="bg-orange-600 text-white text-[10px] px-2 py-0.5 rounded-full uppercase font-black">
                            New
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4 ml-13 md:ml-13">
                      <div className="flex items-center gap-1">
                        <Mail className="w-4 h-4" /> {msg.email}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />{" "}
                        {new Date(msg.created_at).toLocaleDateString()}
                      </div>
                    </div>

                    {/* --- MESSAGESQUARE ICON INTEGRATED HERE --- */}
                    <div className="bg-white/50 rounded-xl p-4 border border-gray-100 mb-4 ml-0 md:ml-13 shadow-sm">
                      <div className="flex items-start gap-3">
                        <MessageSquare className="w-5 h-5 text-orange-60 shrink-0" />
                        <div>
                          <p className="text-xs font-bold text-orange-600 uppercase mb-1 tracking-tight">
                            Subject: {msg.subject}
                          </p>
                          <p className="text-gray-700 leading-relaxed">
                            {msg.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex md:flex-col gap-2">
                    <button
                      onClick={() => toggleRead(msg.id, msg.is_read)}
                      className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                        msg.is_read
                          ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          : "bg-gray-900 text-white hover:text-gray-200"
                      }`}
                    >
                      {msg.is_read ? "Mark Unread" : "Mark Read"}
                    </button>
                    <button
                      onClick={() => setReplyingTo(msg.id)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition-all"
                    >
                      Reply
                    </button>
                    <button
                      onClick={() => deleteMessage(msg.id)}
                      className="px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg text-xs font-bold transition-all"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {replyingTo === msg.id && (
                  <div className="mt-6 pt-6 border-t border-gray-100 animate-slide-down">
                    <form
                      onSubmit={(e) => handleReplySubmit(e, msg.id, msg.email)}
                    >
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        rows="4"
                        placeholder={`Write your reply to ${msg.name}...`}
                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        required
                      />
                      <div className="flex gap-3 mt-4">
                        <button
                          type="submit"
                          disabled={sendingReply}
                          className="px-6 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 disabled:opacity-50"
                        >
                          {sendingReply ? "Sending..." : "Send Message"}
                        </button>
                        <button
                          type="button"
                          onClick={() => setReplyingTo(null)}
                          className="px-6 py-2 bg-gray-200 text-gray-600 rounded-xl font-bold hover:bg-gray-300"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Messages;
