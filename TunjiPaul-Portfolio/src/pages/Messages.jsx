import { useEffect, useState } from "react";

function Messages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const storedMessages = localStorage.getItem("messages");
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  const toggleRead = (id) => {
    const updated = messages.map((msg) =>
      msg.id === id ? { ...msg, read: !msg.read } : msg
    );
    setMessages(updated);
    localStorage.setItem("messages", JSON.stringify(updated));
  };

  const deleteMessage = (id) => {
    const updated = messages.filter((msg) => msg.id !== id);
    setMessages(updated);
    localStorage.setItem("messages", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen p-6 md:p-10 bg-gray-100">
      <h1 className="text-3xl font-bold text-orange-600 mb-6">Messages</h1>

      <div className="bg-white rounded-xl shadow p-6">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-center py-10">No messages received yet.</p>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-5 rounded-lg border ${
                  msg.read ? "bg-gray-50 border-gray-300" : "bg-orange-50 border-orange-300"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-orange-600">{msg.name}</h3>
                    <p className="text-sm text-gray-500">{msg.email}</p>
                    <p className="mt-2 text-gray-700">{msg.message}</p>
                    <p className="text-xs mt-3 text-gray-400">Date: {msg.date}</p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => toggleRead(msg.id)}
                      className="px-3 py-1 bg-black text-white rounded hover:bg-gray-800 text-sm"
                    >
                      {msg.read ? "Mark Unread" : "Mark Read"}
                    </button>

                    <button
                      onClick={() => deleteMessage(msg.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-500 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Messages;
