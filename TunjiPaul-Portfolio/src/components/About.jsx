function About() {
  return (
    <section
      id="about"
      className="min-h-screen flex flex-col md:flex-row items-center bg-black px-6 md:px-20 py-20"
    >
      <div className="md:w-1/2 flex justify-center mb-10 md:mb-0">
        <img
          src="https://res.cloudinary.com/dbadkovof/image/upload/v1763236198/Gemini_Generated_Image_71u47471u47471u4_zqmm2d.png"
          alt="Profile"
          className="w-64 md:w-80 lg:w-96 rounded-lg shadow-lg"
        />
      </div>

      <div className="md:w-1/2">
        <h2 className="text-4xl font-bold text-orange-600 mb-4">About Me</h2>

        <p className="text-gray-100 text-lg md:text-xl mb-4">
          I'm an AI Developer with a strong foundation in building intelligent,
          scalable systems and modern frontend solutions. My work blends
          engineering, design, and problem-solving across multiple layers of
          technology.
        </p>

        <p className="text-gray-100 text-lg md:text-xl mb-4">
          Beyond tech, I have professional interests in Politics and Governance,
          often analyzing public systems, institutional effectiveness, and
          leadership.
        </p>

        <p className="text-orange-600 text-lg md:text-xl font-semibold mb-3">
          Skills
        </p>

        <div className="flex flex-wrap gap-3 mb-6">
          <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm md:text-base transition-all duration-700 transform hover:scale-105 hover:bg-orange-300">
            HTML
          </span>
          <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm md:text-base transition-all duration-700 transform hover:scale-105 hover:bg-orange-300">
            CSS
          </span>
          <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm md:text-base transition-all duration-700 transform hover:scale-105 hover:bg-orange-300">
            JavaScript
          </span>
          <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm md:text-base transition-all duration-700 transform hover:scale-105 hover:bg-orange-300">
            React
          </span>
          <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm md:text-base transition-all duration-700 transform hover:scale-105 hover:bg-orange-300">
            Tailwind CSS
          </span>
          <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm md:text-base transition-all duration-700 transform hover:scale-105 hover:bg-orange-300">
            Python
          </span>
          <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm md:text-base transition-all duration-700 transform hover:scale-105 hover:bg-orange-300">
            FastAPI
          </span>
          <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm md:text-base transition-all duration-700 transform hover:scale-105 hover:bg-orange-300">
            MySQL
          </span>
          <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm md:text-base transition-all duration-700 transform hover:scale-105 hover:bg-orange-300">
            Git
          </span>
          <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm md:text-base transition-all duration-700 transform hover:scale-105 hover:bg-orange-300">
            GitHub
          </span>
        </div>

        <p className="text-orange-600 text-lg md:text-xl font-semibold mb-3">
          Education
        </p>

        <p className="text-gray-100 text-lg md:text-xl">
          B.Eng, Mechatronics Engineering{" "}
          <span className="text-orange-300">(GMNSE)</span>
        </p>
      </div>
    </section>
  );
}

export default About;
