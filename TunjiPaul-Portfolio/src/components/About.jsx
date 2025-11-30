import { useState, useEffect } from "react";
import API_URL from '../config';

function About() {
  const [aboutData, setAboutData] = useState({
    content: "",
    skills: [],
    education: "",
    image_url: "",
  });

  useEffect(() => {
    fetch(`${API_URL}/api/about`) // match your FastAPI route
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const about = data[0]; // take the first About section
          setAboutData({
            content: about.content || "",
            skills: about.skills || [],
            education: about.education || "",
            image_url: about.image_url || "",
          });
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <section
      id="about"
      className="min-h-screen flex flex-col md:flex-row items-center bg-black px-6 md:px-20 py-20"
    >
      <div className="md:w-1/2 flex justify-center mb-10 md:mb-0">
        <img
          src={
            aboutData.image_url ||
            "https://res.cloudinary.com/dbadkovof/image/upload/v1763236198/Gemini_Generated_Image_71u47471u47471u4_zqmm2d.png"
          }
          alt="Profile"
          className="w-64 md:w-80 lg:w-96 rounded-lg shadow-lg"
        />
      </div>

      <div className="md:w-1/2">
        <h2 className="text-4xl font-bold text-orange-600 mb-4">About Me</h2>

        <p className="text-gray-100 text-lg md:text-xl mb-4">
          {aboutData.content ||
            "I'm an AI Developer with a strong foundation in building intelligent, scalable systems and modern frontend solutions. My work blends engineering, design, and problem-solving across multiple layers of technology."}
        </p>

        <p className="text-orange-600 text-lg md:text-xl font-semibold mb-3">
          Skills
        </p>

        <div className="flex flex-wrap gap-3 mb-6">
          {aboutData.skills.length > 0
            ? aboutData.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm md:text-base transition-all duration-700 transform hover:scale-105 hover:bg-orange-300 font-bold"
                >
                  {skill}
                </span>
              ))
            : [
                "HTML",
                "CSS",
                "JavaScript",
                "React",
                "Tailwind CSS",
                "Python",
                "FastAPI",
                "MySQL",
                "Git",
                "GitHub",
              ].map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm md:text-base transition-all duration-700 transform hover:scale-105 hover:bg-orange-300 font-bold"
                >
                  {skill}
                </span>
              ))}
        </div>

        <p className="text-orange-600 text-lg md:text-xl font-semibold mb-3">
          Education
        </p>

        <p className="text-gray-100 text-lg md:text-xl">
          {aboutData.education || "B.Eng, Mechatronics Engineering "}
          <span className="text-orange-300">(GMNSE)</span>
        </p>
      </div>
    </section>
  );
}

export default About;
