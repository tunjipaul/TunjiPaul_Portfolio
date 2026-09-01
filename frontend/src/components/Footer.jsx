import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { SiMedium } from "react-icons/si";

function XIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.514l-5.106-6.681-5.829 6.681h-3.308l7.726-8.835L.424 2.25h6.679l4.882 6.268 5.259-6.268zM17.002 18.335h1.833L6.75 3.969H4.881l12.121 14.366z" />
    </svg>
  );
}

function Footer() {
  const year = new Date().getFullYear();

  const socials = [
    { name: "GitHub", icon: <FaGithub aria-hidden="true" />, url: "https://github.com/tunjipaul" },
    {
      name: "LinkedIn",
      icon: <FaLinkedin aria-hidden="true" />,
      url: "https://www.linkedin.com/in/paul-ogor-gmnse-9103601b1",
    },
    {
      name: "X (Twitter)",
      icon: <XIcon />,
      url: "https://x.com/tunji_paul_",
    },
    {
      name: "Medium",
      icon: <SiMedium aria-hidden="true" />,
      url: "https://medium.com/@tunji_paul_",
    },
    {
      name: "Instagram",
      icon: <FaInstagram aria-hidden="true" />,
      url: "https://www.instagram.com/_tunji_paul/",
    },
  ];

  const internal = [
    { label: "Home", to: "/" },
    { label: "About", to: "/#about" },
    { label: "Projects", to: "/projects" },
    { label: "Contact", to: "/#contact" },
  ];

  return (
    <footer className="bg-orange-50 py-8 border-t border-orange-200">
      <div className="max-w-6xl mx-auto px-6 flex flex-col gap-6 sm:flex-row sm:justify-between sm:items-center">
        <div>
          <p className="text-gray-700 font-medium">
            &copy; {year} Tunji Paul. All rights reserved.
          </p>
          <nav aria-label="Footer" className="mt-3 flex flex-wrap gap-4 text-sm">
            {internal.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-gray-600 hover:text-orange-600 underline-offset-2 hover:underline"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <ul className="flex space-x-6">
          {socials.map((s) => (
            <li key={s.name}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className="text-gray-700 text-xl transition-all duration-500 hover:text-orange-600 hover:scale-110 inline-flex min-h-11 min-w-11 items-center justify-center"
              >
                {s.icon}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
