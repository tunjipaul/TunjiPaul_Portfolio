import { useState } from "react";
import API_URL from "../config";
import { FaTwitter, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { SiMedium } from "react-icons/si";
import { 
  Mail, 
  MapPin, 
  Clock, 
  Download, 
  ChevronDown, 
  FileText, 
  File, 
  Check, 
  X, 
  Loader2 
} from "lucide-react";

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
                  <Mail className="w-6 h-6 mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-orange-100">ogorpaul877@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-6 h-6 mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold">Location</p>
                    <p className="text-orange-100">Lagos, Nigeria</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-6 h-6 mt-1 shrink-0" />
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
                  <Download className="w-5 h-5" />
                  Hire me!
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute w-full mt-2 bg-white rounded-lg shadow-2xl overflow-hidden z-10 animate-fadeIn">
                    <button
                      onClick={() => handleDownload("resume")}
                      className="w-full px-6 py-4 text-left hover:bg-orange-50 transition-colors duration-200 flex items-center gap-3 group"
                    >
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                        <FileText className="w-5 h-5 text-orange-600" />
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
                        <File className="w-5 h-5 text-orange-600" />
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

            {/* Social Links */}
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
                  href="https://www.linkedin.com/in/paul-ogor-gmnse-9103601b1"
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
                  <Check className="w-5 h-5" />
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}

              {error && (
                <div className="p-4 bg-red-100 text-red-800 rounded-lg flex items-center gap-2">
                  <X className="w-5 h-5" />
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
                    <Loader2 className="w-5 h-5 animate-spin" />
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