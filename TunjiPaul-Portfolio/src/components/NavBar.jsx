import { useState } from "react";
import { Link } from "react-router-dom";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <nav className="bg-orange-50 shadow-md fixed w-full z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="shrink-0">
            <img
              src="https://res.cloudinary.com/dbadkovof/image/upload/v1763293388/Gemini_Generated_Image_kskrlhkskrlhkskr-removebg-preview_kqycov.png"
              alt="Tunji Paul Logo"
              className="h-24 w-24 rounded-full object-cover"
            />
          </div>

          <div className="hidden md:flex space-x-6">
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="text-gray-700 hover:text-orange-600 cursor-pointer"
            >
              Home
            </button>

            <button
              onClick={() => scrollToSection("about")}
              className="text-gray-700 hover:text-orange-600 cursor-pointer"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="text-gray-700 hover:text-orange-600 cursor-pointer"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-gray-700 hover:text-orange-600 cursor-pointer"
            >
              Contact
            </button>
            <Link
              to="/admin"
              className="text-gray-700 hover:text-orange-600 cursor-pointer"
            >
              Admin
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 focus:outline-none"
            >
              {isOpen ? "✖" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-orange-100 px-4 py-2 space-y-2">
          <button
            onClick={() => scrollToSection("hero")}
            className="block text-gray-700 hover:text-orange-600 cursor-pointer"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="block text-gray-700 hover:text-orange-600 cursor-pointer"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("projects")}
            className="block text-gray-700 hover:text-orange-600 cursor-pointer"
          >
            Projects
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="block text-gray-700 hover:text-orange-600 cursor-pointer"
          >
            Contact
          </button>
          <Link
            to="/admin"
            className="block text-gray-700 hover:text-orange-600 cursor-pointer"
          >
            Admin
          </Link>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
