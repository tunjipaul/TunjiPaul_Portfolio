import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUsername = localStorage.getItem("adminUsername");
    const savedEmail = localStorage.getItem("adminEmail");
    const savedPassword = localStorage.getItem("adminPassword");

    if (savedUsername) setUsername(savedUsername);
    if (savedEmail) setEmail(savedEmail);
    if (savedPassword) setPassword(savedPassword);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem("adminUsername", username);
    localStorage.setItem("adminEmail", email);
    localStorage.setItem("adminPassword", password);

    navigate("/dashboard");
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
          className="w-full py-2 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-500 transition cursor-pointer hover:text-black"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
