
function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-r from-orange-100 to-orange-50 px-6 md:px-20"
    >
      <div className="md:w-1/2 flex flex-col justify-center mb-10 md:mb-0">
        <h1 className="text-4xl md:text-6xl font-bold text-orange-600 mb-4">
          Hello, I'm Tunji Paul.
        </h1>

        <p className="text-lg md:text-2xl text-gray-700 mb-6 max-w-xl">
          By day, I'm an AI Developer building intelligent, scalable solutions.
          By night, I'm an analyst of politics and governance, an occasional
          writer, and a public speaker on topics that matter. And if the world
          ever seems like it's coming to an end? Don't worry, that's when my
          sense of humor truly shines.
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
            View Projects
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
            Contact Me
          </a>
        </div>
      </div>

      {/* IMAGE + SPINNING BORDER */}
      <div className="md:w-1/2 flex justify-center relative">
        <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
          <img
            src="https://res.cloudinary.com/dbadkovof/image/upload/v1763236151/TUNJI_nemcvi.png"
            alt="Tunji Paul"
            className="w-full h-full rounded-full shadow-lg"
          />

          {/* Spinning border */}
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
