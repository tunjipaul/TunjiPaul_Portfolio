import {
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaReact,
  FaPython,
  FaGit,
  FaGithub,
} from "react-icons/fa";
import { SiTailwindcss, SiFastapi, SiMysql } from "react-icons/si";

const skillsData = [
  {
    category: "Frontend",
    skills: [
      { name: "HTML", icon: FaHtml5 },
      { name: "CSS", icon: FaCss3Alt },
      { name: "JavaScript", icon: FaJsSquare },
      { name: "React", icon: FaReact },
      { name: "Tailwind CSS", icon: SiTailwindcss },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Python", icon: FaPython },
      { name: "FastAPI", icon: SiFastapi },
      { name: "MySQL", icon: SiMysql },
    ],
  },
  {
    category: "Tools & Version Control",
    skills: [
      { name: "Git", icon: FaGit },
      { name: "GitHub", icon: FaGithub },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-20 bg-orange-50 px-6 md:px-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-orange-600 mb-16">
          Skills & Technologies
        </h2>

        {skillsData.map((category, idx) => (
          <div key={idx} className="mb-12">
            <h3 className="text-2xl font-semibold text-orange-400 mb-8 text-center">
              {category.category}
            </h3>

            <div className="flex flex-wrap justify-center gap-6">
              {category.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="flex flex-col items-center justify-center w-40 h-48 bg-black rounded-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-110 hover:shadow-lg group "
                >
                  <div className="relative w-20 h-20 mb-3 flex items-center justify-center">
                    <div
                      className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-orange-600 border-t-transparent animate-spin"
                      style={{ animation: "spin 8s linear infinite" }}
                    ></div>

                    <skill.icon
                      className="relative z-10 text-orange-600 group-hover:text-orange-700 transition-colors"
                      style={{ fontSize: "40px" }}
                    />
                  </div>

                  <p className="text-center font-semibold text-white group-hover:text-orange-600 transition-colors px-2">
                    {skill.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
