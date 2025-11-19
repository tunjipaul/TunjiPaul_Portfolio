import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedUsername = localStorage.getItem("adminUsername");
    const savedEmail = localStorage.getItem("adminEmail");
    if (savedUsername) setUsername(savedUsername);
    if (savedEmail) setEmail(savedEmail);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Login failed");
      }

      // Save username from form or backend
      const nameToSave = data.username || username;

      localStorage.setItem("adminUsername", nameToSave);
      localStorage.setItem("adminEmail", data.email);

      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/dbadkovof/image/upload/v1763293025/Gemini_Generated_Image_kskrlhkskrlhkskr_ldpyun.png')",
      }}
    >
      <form
        className="bg-white/80 backdrop-blur-md p-8 rounded-xl shadow-md w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-orange-600">
          Admin Login
        </h2>

        {error && (
          <p className="mb-4 text-red-600 text-sm text-center">{error}</p>
        )}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 border-gray-300"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 border-gray-300"
          required
        />

        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 border-gray-300"
            required
          />
          <span
            className="absolute right-3 top-3 cursor-pointer text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <a
          href="#"
          className="text-right text-sm text-orange-600 cursor-pointer mb-6 block hover:underline"
        >
          Forgot Password?
        </a>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 font-semibold rounded-lg transition cursor-pointer ${
            loading
              ? "bg-gray-400 text-gray-200"
              : "bg-orange-600 text-white hover:bg-orange-500 hover:text-black"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
