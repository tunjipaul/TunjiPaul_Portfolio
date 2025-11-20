import { useEffect, useState } from "react";

function Hero() {
  const [hero, setHero] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/hero/1")
      .then((res) => res.json())
      .then((data) => setHero(data));
  }, []);

  if (!hero) return null;

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-r from-orange-100 to-orange-50 px-6 md:px-20"
    >
      <div className="md:w-1/2 flex flex-col justify-center mb-10 md:mb-0">
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
              document.getElementById("projects").scrollIntoView({
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
              document.getElementById("contact").scrollIntoView({
                behavior: "smooth",
              });
            }}
            className="px-6 py-3 border border-orange-600 text-orange-600 rounded-lg hover:bg-orange-50 transition"
          >
            {hero.contact_button_text}
          </a>
        </div>
      </div>

      <div className="md:w-1/2 flex justify-center relative">
        <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
          <img
            src={hero.image_url}
            alt={hero.title}
            className="w-full h-full rounded-full shadow-lg"
          />

          <div
            className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-orange-600 border-t-transparent animate-spin"
            style={{ animation: "spin 8s linear infinite" }}
          ></div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
