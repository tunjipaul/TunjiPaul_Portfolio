import { useState, useRef, useEffect } from "react";
import API_URL from "../config";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm Tunji's AI assistant. Ask me about his skills, projects, or experience!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");

    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);



    try {
      const apiUrl = API_URL;
      
      const response = await fetch(`${apiUrl}/api/chatbot/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          conversation_id: conversationId,
        }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error("Too many requests. Please wait a moment.");
        }
        throw new Error("Failed to get response");
      }

      const data = await response.json();

      setConversationId(data.conversation_id);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response },
      ]);
    } catch (error) {
      console.error("Chat error:", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            error.message || "Sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: "assistant",
        content:
          "Hi! I'm Tunji's AI assistant. Ask me about his skills, projects, or experience!",
      },
    ]);
    setConversationId(null);
  };

  const renderMessageContent = (content) => {
    if (!content) return "";

    const urlRegex =
      /(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9.-]+\.(com|org|net|io|dev|app|vercel\.app)[^\s]*)/g;
    const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/g;

    let parts = content.split(urlRegex);

    return parts.map((part, index) => {
      if (!part) return null;
      
      if (part.match(urlRegex)) {
        let url = part;
        if (!url.startsWith("http")) {
          url = "https://" + url;
        }
        return (
          <a
            key={index}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-600 underline font-semibold hover:text-orange-700 transition-colors"
          >
            {part}
          </a>
        );
      }

      if (part.match(emailRegex)) {
        return (
          <a
            key={index}
            href={`mailto:${part}`}
            className="text-orange-600 underline font-semibold hover:text-orange-700 transition-colors"
          >
            {part}
          </a>
        );
      }

      return part;
    });
  };

  return (
    <>
      <div
        className={`fixed inset-0 md:inset-auto md:bottom-6 md:right-6 w-full md:w-96 h-full md:h-[550px] max-h-screen bg-white md:rounded-2xl shadow-2xl flex flex-col transition-all duration-300 z-[1000] overflow-hidden ${
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
        } md:origin-bottom-right origin-center`}
      >
        <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white p-3 md:p-4 flex justify-between items-center md:rounded-t-2xl">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl md:text-3xl">
              🤖
            </div>
            <div>
              <h3 className="font-semibold text-base md:text-lg">AI Assistant</h3>
              <p className="text-xs md:text-sm opacity-90">Ask me about Tunji</p>
            </div>
          </div>
          <div className="flex gap-1 md:gap-2">
            <button
              onClick={clearChat}
              className="w-8 h-8 md:w-8 md:h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors text-lg md:text-base"
              title="Clear chat"
            >
              🔄
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 md:w-8 md:h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors text-lg md:text-base"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3 md:p-4 bg-gray-50 flex flex-col gap-2 md:gap-3">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex animate-fade-in ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] md:max-w-[75%] px-3 md:px-4 py-2 md:py-3 rounded-2xl text-xs md:text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-br-sm"
                    : "bg-white text-gray-800 rounded-bl-sm shadow-sm"
                }`}
              >
                {msg.role === "user" ? (
                  <span className="text-white">{msg.content}</span>
                ) : (
                  renderMessageContent(msg.content)
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white px-3 md:px-4 py-3 md:py-4 rounded-2xl rounded-bl-sm shadow-sm flex gap-1">
                <span
                  className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></span>
                <span
                  className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></span>
                <span
                  className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form
          onSubmit={sendMessage}
          className="flex gap-2 p-3 md:p-4 bg-white border-t border-gray-200"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            maxLength={500}
            disabled={isLoading}
            className="flex-1 px-3 md:px-4 py-2 md:py-3 border border-gray-200 rounded-full text-xs md:text-sm outline-none focus:border-orange-600 transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-gradient-to-r from-orange-600 to-orange-700 text-white flex items-center justify-center text-base md:text-lg hover:scale-105 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            ➤
          </button>
        </form>
      </div>

      <button
        className={`fixed bottom-4 right-4 md:bottom-6 md:right-6 w-14 h-14 md:w-15 md:h-15 rounded-full bg-gradient-to-r from-orange-600 to-orange-700 shadow-lg flex items-center justify-center transition-all z-[999] hover:scale-110 hover:shadow-xl ${
          isOpen
            ? "scale-0 opacity-0 pointer-events-none"
            : "scale-100 opacity-100"
        }`}
        onClick={() => setIsOpen(true)}
        aria-label="Open chat"
      >
        <span className="text-2xl md:text-3xl drop-shadow-md">💬</span>
        <span className="absolute w-full h-full border-3 border-orange-600 rounded-full animate-ping opacity-75"></span>
      </button>
    </>
  );
};

export default ChatBot;
