import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { SiMedium } from "react-icons/si";

function XIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.514l-5.106-6.681-5.829 6.681h-3.308l7.726-8.835L.424 2.25h6.679l4.882 6.268 5.259-6.268zM17.002 18.335h1.833L6.75 3.969H4.881l12.121 14.366z" />
    </svg>
  );
}

function Footer() {
  const year = new Date().getFullYear();

  const socials = [
    { name: "GitHub", icon: <FaGithub />, url: "https://github.com/tunjipaul" },
    {
      name: "LinkedIn",
      icon: <FaLinkedin />,
      url: "https://www.linkedin.com/in/paul-ogor-9103601b1/",
    },
    {
      name: "Twitter / X",
      icon: <XIcon />,
      url: "https://x.com/tunji_paul_",
    },
    {
      name: "Medium",
      icon: <SiMedium />,
      url: "https://medium.com/@tunji_paul_",
    },
    {
      name: "Instagram",
      icon: <FaInstagram />,
      url: "https://www.instagram.com/_tunji_paul/",
    },
  ];

  return (
    <footer className="bg-orange-50 py-6 border-t border-orange-200">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center">
        <p className="text-gray-700 font-medium mb-4 sm:mb-0">
          &copy; {year} Tunji Paul. All rights reserved.
        </p>

        <div className="flex space-x-6">
          {socials.map((s, i) => (
            <a
              key={i}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              className="text-gray-700 text-xl transition-all duration-500 hover:text-orange-600 hover:scale-110"
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
