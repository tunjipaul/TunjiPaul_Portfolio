import { useEffect, useState } from "react";
import API_URL from "../config";

const defaultHero = {
  title: "Hello, I'm TunjiPaul!",
  subtitle:
    "By day, I'm an AI Developer building intelligent, scalable solutions. By night, I'm an analyst of politics and governance, an occasional writer, and a public speaker on topics that matter. And if the world ever seems like it's coming to an end? Don't worry, that's when my sense of humor truly shines.",
  image_url:
    "https://res.cloudinary.com/dbadkovof/image/upload/v1763236151/TUNJI_nemcvi.png",
  view_button_text: "View Projects",
  contact_button_text: "Contact Me",
};

function Hero() {
  const [hero, setHero] = useState(defaultHero);

  useEffect(() => {
    async function fetchHero() {
      try {
        const res = await fetch(`${API_URL}/api/hero`);
        const data = await res.json();
        if (data.length > 0) {
          setHero(data[0]);
        } else {
          setHero(defaultHero);
        }
      } catch (err) {
        console.error("Failed to fetch hero:", err);
        setHero(defaultHero);
      }
    }
    fetchHero();
  }, []);

  if (!hero) return <div>Loading...</div>;

  return (
    <section
      id="hero"
      className="min-h-screen pt-20 pb-12 md:pb-20 flex flex-col md:flex-row items-center justify-center bg-gradient-to-r from-orange-100 to-orange-50 px-6 md:px-20"
    >
      <div className="md:w-1/2 flex justify-center order-1 md:order-2 mb-10 md:mb-0">
        <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
          <img
            src={hero.image_url}
            alt={hero.title}
            className="w-full h-full rounded-full shadow-lg "
          />

          <div
            className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-orange-600 border-t-transparent animate-spin"
            style={{ animation: "spin 8s linear infinite" }}
          ></div>
        </div>
      </div>

      <div className="md:w-1/2 flex flex-col justify-center order-2 md:order-1">
        <h1 className="text-4xl md:text-6xl font-bold text-orange-600 mb-4">
          {hero.title}
        </h1>

        <p className="text-lg md:text-2xl text-gray-700 mb-6 max-w-xl">
          {hero.subtitle}
        </p>

        <div className="flex space-x-4">
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("projects")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
            className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-500 transition"
          >
            {hero.view_button_text}
          </a>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
            className="px-6 py-3 border border-orange-600 text-orange-600 rounded-lg hover:bg-orange-50 transition"
          >
            {hero.contact_button_text}
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
