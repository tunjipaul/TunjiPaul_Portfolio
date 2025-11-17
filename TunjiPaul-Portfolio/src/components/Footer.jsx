import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { SiMedium } from "react-icons/si";
function Footer() {
  const year = new Date().getFullYear();

  const socials = [
    { name: "GitHub", icon: <FaGithub />, url: "https://github.com/tunjipaul" },
    { name: "LinkedIn", icon: <FaLinkedin />, url: "https://www.linkedin.com/in/paul-ogor-9103601b1/" },
    { name: "Twitter / X", icon: <FaTwitter />, url: "https://x.com/tunji_paul_" },
    { name: "Email", icon: <IoMail />, url: "mailto:tunjipaul007@gmail.com" },
    { name: "Medium", icon: <SiMedium />, url: "https://medium.com/@tunji_paul_" },
  ];

  return (
    <footer className="bg-orange-50 py-6 border-t border-orange-200">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center">
        <p className="text-gray-700 font-medium mb-4 sm:mb-0">
          © {year} Tunji Paul. All rights reserved.
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
