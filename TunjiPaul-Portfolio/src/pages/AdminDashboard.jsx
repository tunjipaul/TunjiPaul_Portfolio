import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import ManageHero from "./ManageHero";
import ManageProjects from "./ManageProjects";
import AboutSection from "./AboutSection";
import ManageSkills from "./ManageSkills";
import Messages from "./Messages";
import DashboardHome from "./DashboardHome";

function AdminDashboard() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [activeSection, setActiveSection] = useState("home");
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const storedEmail = localStorage.getItem("adminEmail");

    if (!isLoggedIn || !storedEmail) {
      navigate("/admin");
    } else {
      setEmail(storedEmail);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("adminEmail");
    navigate("/admin");
  };

  const renderSection = () => {
    switch (activeSection) {
      case "home":
        return <DashboardHome />;
      case "hero":
        return <ManageHero />;
      case "about":
        return <AboutSection />;
      case "skills":
        return <ManageSkills />;
      case "projects":
        return <ManageProjects />;
      case "messages":
        return <Messages />;
      default:
        return <DashboardHome />;
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
            onClick={() => {
              setActiveSection("hero");
              setOpen(false);
            }}
            className="font-bold block w-full text-left px-3 py-2 rounded-lg hover:bg-orange-100 text-gray-700"
          >
            Manage Hero
          </button>
          <button
            onClick={() => {
              setActiveSection("about");
              setOpen(false);
            }}
            className="font-bold block w-full text-left px-3 py-2 rounded-lg hover:bg-orange-100 text-gray-700"
          >
            About Section
          </button>
          <button
            onClick={() => {
              setActiveSection("skills");
              setOpen(false);
            }}
            className="font-bold block w-full text-left px-3 py-2 rounded-lg hover:bg-orange-100 text-gray-700"
          >
            Manage Skills
          </button>

          <button
            onClick={() => {
              setActiveSection("projects");
              setOpen(false);
            }}
            className="font-bold block w-full text-left px-3 py-2 rounded-lg hover:bg-orange-100 text-gray-700"
          >
            Manage Projects
          </button>

          <button
            onClick={() => {
              setActiveSection("messages");
              setOpen(false);
            }}
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
            Welcome <span className="text-orange-600">{email}</span>
          </p>
        </div>

        <div className="mt-6">{renderSection()}</div>
      </main>
    </div>
  );
}

export default AdminDashboard;
