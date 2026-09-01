import { useState, useEffect } from "react";
import API_URL from "../config";
import { optimizeCloudinary } from "../utils/images";

const fallbackImage =
  "https://res.cloudinary.com/dbadkovof/image/upload/v1763236198/Gemini_Generated_Image_71u47471u47471u4_zqmm2d.png";

function About() {
  const [aboutData, setAboutData] = useState({
    content: "",
    education: [],
    image_url: "",
  });

  useEffect(() => {
    fetch(`${API_URL}/api/about`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const about = data[0];
          setAboutData({
            content: about.content || "",
            education: about.education || [],
            image_url: about.image_url || "",
          });
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const imageSrc = optimizeCloudinary(aboutData.image_url || fallbackImage, {
    width: 768,
    height: 960,
    crop: "fill",
  });

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="flex flex-col md:flex-row md:items-start items-center bg-black px-6 md:px-20 py-12 md:py-12 gap-8 md:gap-12"
    >
      <div className="w-full md:w-1/2 flex justify-start">
        <img
          src={imageSrc}
          alt="Tunji Paul working as an AI developer"
          width={384}
          height={480}
          loading="lazy"
          decoding="async"
          className="w-full max-w-xs md:w-80 lg:w-96 h-auto rounded-lg shadow-lg object-cover"
        />
      </div>

      <div className="w-full md:w-1/2">
        <h2
          id="about-heading"
          className="text-4xl font-bold text-orange-600 mb-4"
        >
          About Me
        </h2>

        <p className="text-gray-100 text-lg md:text-xl mb-6">
          {aboutData.content ||
            "I'm an AI Developer with a strong foundation in building intelligent, scalable systems and modern frontend solutions. My work blends engineering, design, and problem-solving across multiple layers of technology."}
        </p>

        <div>
          <h3 className="text-orange-600 text-lg md:text-xl font-semibold mb-3">
            Education
          </h3>

          {aboutData.education.length > 0 ? (
            <ul className="space-y-4">
              {aboutData.education.map((edu, index) => (
                <li key={index} className="text-gray-100">
                  <p className="text-lg md:text-xl font-semibold">
                    {edu.degree}
                    {edu.field && (
                      <span className="text-orange-300"> in {edu.field}</span>
                    )}
                  </p>
                  <p className="text-md md:text-lg text-gray-300">
                    {edu.institution}
                  </p>
                  <p className="text-sm md:text-md text-gray-400">
                    {edu.startYear} - {edu.endYear || "Present"}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-100 text-lg md:text-xl">
              B.Eng, Mechatronics Engineering{" "}
              <span className="text-orange-300">(GMNSE)</span>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default About;
