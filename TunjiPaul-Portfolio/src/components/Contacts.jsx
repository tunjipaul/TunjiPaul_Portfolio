import { useState } from "react";
import API_URL from "../config";
import { FaTwitter, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { SiMedium } from "react-icons/si";

function Contacts() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.subject.trim() ||
      !form.message.trim()
    ) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to send message");
      }

      setForm({ name: "", email: "", subject: "", message: "" });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(err.message);
      console.error("Error sending message:", err);
    } finally {
      setLoading(false);
    }
  }

  const handleDownload = async (type) => {
    try {
      const response = await fetch(`${API_URL}/api/resume/download/${type}`);
      if (!response.ok) throw new Error("Resume not available");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Tunji_Paul_${type.toUpperCase()}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      setDropdownOpen(false);
    } catch (err) {
      alert("Failed to download resume. Please try again.");
      console.error("Download error:", err);
    }
  };

  return (
    <section id="contact" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-orange-600">
          Get In Touch
        </h2>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left Side - Contact Info & Download */}
          <div className="space-y-6">
            {/* Contact Info Card */}
            <div className="bg-linear-to-br from-orange-600 to-orange-700 p-8 rounded-xl shadow-xl text-white">
              <h3 className="text-2xl font-bold mb-6">Let's Connect!</h3>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 mt-1 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-orange-100">ogorpaul877@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 mt-1 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <div>
                    <p className="font-semibold">Location</p>
                    <p className="text-orange-100">Lagos, Nigeria</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 mt-1 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <p className="font-semibold">Contact</p>
                    <p className="text-orange-100">+2349019978821</p>
                  </div>
                </div>
              </div>

              {/* Download Resume Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-full bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Download My Documents
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute w-full mt-2 bg-white rounded-lg shadow-2xl overflow-hidden z-10 animate-fadeIn">
                    <button
                      onClick={() => handleDownload("resume")}
                      className="w-full px-6 py-4 text-left hover:bg-orange-50 transition-colors duration-200 flex items-center gap-3 group"
                    >
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                        <svg
                          className="w-5 h-5 text-orange-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">Resume</p>
                        <p className="text-xs text-gray-500">
                          Download full resume (PDF)
                        </p>
                      </div>
                    </button>

                    <button
                      onClick={() => handleDownload("cv")}
                      className="w-full px-6 py-4 text-left hover:bg-orange-50 transition-colors duration-200 flex items-center gap-3 group border-t"
                    >
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                        <svg
                          className="w-5 h-5 text-orange-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">
                          Curriculum Vitae
                        </p>
                        <p className="text-xs text-gray-500">
                          Download detailed CV (PDF)
                        </p>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Social Links (Optional) */}
            <div className="bg-orange-50 p-6 rounded-xl">
              <h4 className="font-semibold text-gray-800 mb-3">
                Connect on Social Media
              </h4>
              <div className="flex gap-3">
                <a
                  href="https://x.com/tunji_paul_"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors"
                >
                  <FaTwitter className="w-5 h-5" />
                </a>
                <a
                  href="https://www.instagram.com/_tunji_paul/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors"
                >
                  <FaInstagram className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/paul-ogor-9103601b1/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors"
                >
                  <FaLinkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://github.com/tunjipaul"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors"
                >
                  <FaGithub className="w-5 h-5" />
                </a>
                <a
                  href="https://medium.com/@tunji_paul_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors"
                >
                  <SiMedium className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div>
            <form
              onSubmit={handleSubmit}
              className="bg-orange-50 p-8 rounded-xl shadow-xl space-y-6"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Send Me a Message
              </h3>

              {success && (
                <div className="p-4 bg-green-100 text-green-800 rounded-lg flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}

              {error && (
                <div className="p-4 bg-red-100 text-red-800 rounded-lg flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  {error}
                </div>
              )}

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-300 outline-none transition duration-300"
                  placeholder="Your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-300 outline-none transition duration-300"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-300 outline-none transition duration-300"
                  placeholder="What's this about?"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-300 outline-none transition duration-300 resize-none"
                  placeholder="Tell me more about your project or inquiry..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-orange-600 text-white rounded-lg hover:bg-orange-500 transition-all duration-300 disabled:opacity-50 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </section>
  );
}

export default Contacts;
