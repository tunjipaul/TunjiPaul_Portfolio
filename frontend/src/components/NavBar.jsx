import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/#about" },
  { label: "Skills", to: "/#skills" },
  { label: "Projects", to: "/#projects" },
  { label: "FAQ", to: "/#faq" },
  { label: "Contact", to: "/#contact" },
];

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const handleNav = (event, to) => {
    if (to === "/") {
      if (location.pathname === "/") {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      setIsOpen(false);
      return;
    }

    if (to.startsWith("/#") && location.pathname === "/") {
      event.preventDefault();
      const id = to.slice(2);
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <header className="bg-orange-50 shadow-md fixed w-full z-50">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-orange-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
      >
        Skip to content
      </a>
      <nav className="max-w-6xl mx-auto px-4" aria-label="Primary">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/"
            className="shrink-0"
            onClick={(event) => handleNav(event, "/")}
            aria-label="Tunji Paul home"
          >
            <img
              src="https://res.cloudinary.com/dbadkovof/image/upload/f_auto,q_auto,w_192,h_192,c_fill/v1763293388/Gemini_Generated_Image_kskrlhkskrlhkskr-removebg-preview_kqycov.png"
              alt="Tunji Paul"
              width={96}
              height={96}
              className="h-24 w-24 rounded-full object-cover"
            />
          </Link>

          <ul className="hidden md:flex space-x-6 items-center">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  onClick={(event) => handleNav(event, link.to)}
                  className="text-gray-700 hover:text-orange-600 cursor-pointer min-h-11 inline-flex items-center"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 min-h-11 min-w-11 inline-flex items-center justify-center"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? "✖" : "☰"}
            </button>
          </div>
        </div>
      </nav>

      {isOpen && (
        <ul
          id="mobile-menu"
          className="md:hidden bg-orange-100 px-4 py-4 space-y-4 flex flex-col items-center text-center"
        >
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                onClick={(event) => handleNav(event, link.to)}
                className="text-gray-700 hover:text-orange-600 cursor-pointer min-h-11 inline-flex items-center"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}

export default NavBar;
