import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import ManageHero from "./ManageHero";
import ManageProjects from "./ManageProjects";
// import AboutSection from "./AboutSection";
// import Messages from "./Messages";

function AdminDashboard() {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [activeSection, setActiveSection] = useState("hero");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("adminUsername");
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      navigate("/admin");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/admin");
  };

  const renderSection = () => {
    switch (activeSection) {
      case "hero":
        return <ManageHero />;
      case "projects":
        return <ManageProjects />;
      case "about":
        return <AboutSection />;
      case "messages":
        return <Messages />;
      default:
        return <ManageHero />;
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 left-4 z-20 text-3xl text-orange-600"
      >
        <FiMenu />
      </button>

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg p-6 transform transition-transform duration-500 md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-xl font-bold text-orange-600">Admin Panel</h2>
          <button
            onClick={() => setOpen(false)}
            className="md:hidden text-2xl text-gray-700"
          >
            <FiX />
          </button>
        </div>

        <nav className="space-y-4">
          <button
            onClick={() => setActiveSection("hero")}
            className="font-bold block w-full text-left px-3 py-2 rounded-lg hover:bg-orange-100 text-gray-700"
          >
            Manage Hero
          </button>
          <button
            onClick={() => setActiveSection("projects")}
            className="font-bold block w-full text-left px-3 py-2 rounded-lg hover:bg-orange-100 text-gray-700"
          >
            Manage Projects
          </button>
          <button
            onClick={() => setActiveSection("about")}
            className="font-bold block w-full text-left px-3 py-2 rounded-lg hover:bg-orange-100 text-gray-700"
          >
            About Section
          </button>
          <button
            onClick={() => setActiveSection("messages")}
            className="font-bold block w-full text-left px-3 py-2 rounded-lg hover:bg-orange-100 text-gray-700"
          >
            Messages
          </button>
          <button
            onClick={handleLogout}
            className="bg-orange-600 block w-full text-left px-3 py-2 rounded-lg hover:bg-orange-700 text-white font-bold"
          >
            Logout
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-6 md:ml-64">
        <h1 className="text-3xl font-bold text-orange-600 mb-6">Dashboard</h1>
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-700 font-bold">
            Welcome <span className="text-orange-600">{username}</span>
          </p>
        </div>

        <div className="mt-6">{renderSection()}</div>
      </main>
    </div>
  );
}

export default AdminDashboard;
