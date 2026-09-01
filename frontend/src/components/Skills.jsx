import { useState, useEffect } from "react";
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
import API_URL from "../config";

const DefaultIcon = ({ className, style }) => (
  <div
    className={`w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xl ${className}`}
    style={style}
    aria-hidden="true"
  >
    ?
  </div>
);

const iconMap = {
  HTML: FaHtml5,
  CSS: FaCss3Alt,
  JavaScript: FaJsSquare,
  React: FaReact,
  "Tailwind CSS": SiTailwindcss,
  Python: FaPython,
  FastAPI: SiFastapi,
  MySQL: SiMysql,
  Git: FaGit,
  GitHub: FaGithub,
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaReact,
  FaPython,
  FaGit,
  FaGithub,
  SiTailwindcss,
  SiFastapi,
  SiMysql,
};

const fallbackSkillsData = [
  {
    category: "FrontEnd",
    skills: [
      { name: "HTML", icon: FaHtml5, proficiency: 90 },
      { name: "CSS", icon: FaCss3Alt, proficiency: 85 },
      { name: "JavaScript", icon: FaJsSquare, proficiency: 80 },
      { name: "React", icon: FaReact, proficiency: 75 },
      { name: "Tailwind CSS", icon: SiTailwindcss, proficiency: 80 },
    ],
  },
  {
    category: "BackEnd",
    skills: [
      { name: "Python", icon: FaPython, proficiency: 85 },
      { name: "FastAPI", icon: SiFastapi, proficiency: 75 },
      { name: "MySQL", icon: SiMysql, proficiency: 70 },
    ],
  },
  {
    category: "Tools, Version Control & AI",
    skills: [
      { name: "Git", icon: FaGit, proficiency: 80 },
      { name: "GitHub", icon: FaGithub, proficiency: 85 },
    ],
  },
];

const getIcon = (skillName, iconFromDB) => {
  if (iconFromDB) {
    if (iconMap[iconFromDB]) return iconMap[iconFromDB];

    return ({ className, style }) => (
      <span
        className={`${className} flex items-center justify-center`}
        style={{ ...style, fontSize: "40px", lineHeight: "1" }}
        role="img"
        aria-label={skillName}
      >
        {iconFromDB}
      </span>
    );
  }

  if (iconMap[skillName]) {
    return iconMap[skillName];
  }

  return DefaultIcon;
};

export default function Skills() {
  const [skillsData, setSkillsData] = useState(fallbackSkillsData);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await fetch(`${API_URL}/api/skills`);
      if (!response.ok) throw new Error("Failed to fetch skills");

      const data = await response.json();

      const groupedSkills = data.reduce((acc, skill) => {
        const category = skill.category || "Other";
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push({
          name: skill.name,
          iconName: skill.icon,
          proficiency: skill.proficiency || 50,
        });
        return acc;
      }, {});

      const formattedSkills = Object.keys(groupedSkills).map((category) => ({
        category,
        skills: groupedSkills[category].map((skill) => ({
          name: skill.name,
          icon: getIcon(skill.name, skill.iconName),
          proficiency: skill.proficiency,
        })),
      }));

      if (formattedSkills.length > 0) {
        setSkillsData(formattedSkills);
      }
    } catch (err) {
      console.error("Error fetching skills:", err);
    }
  };

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="pt-20 pb-20 bg-orange-50 px-6 md:px-20"
    >
      <div className="max-w-6xl mx-auto">
        <h2
          id="skills-heading"
          className="text-4xl font-bold text-center text-orange-600 mb-16"
        >
          Skills & Technologies
        </h2>

        {skillsData.map((category, idx) => (
          <div key={idx} className="mb-12">
            <h3 className="text-2xl font-semibold text-orange-400 mb-8 text-center font-agraham">
              {category.category}
            </h3>

            <ul className="flex flex-wrap justify-center gap-6">
              {category.skills.map((skill) => {
                const IconComponent = skill.icon;
                const proficiency = skill.proficiency || 50;
                return (
                  <li
                    key={skill.name}
                    className="flex flex-col items-center justify-between w-40 h-56 bg-black rounded-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 hover:shadow-lg group p-4"
                  >
                    <div className="flex items-center justify-center w-20 h-20 mb-2">
                      <IconComponent
                        className="transition-transform group-hover:scale-110 text-orange-600"
                        style={{ fontSize: "48px" }}
                        aria-hidden="true"
                      />
                    </div>

                    <p className="text-center font-semibold text-white group-hover:text-orange-400 transition-colors px-2 mb-2">
                      {skill.name}
                    </p>

                    <div className="w-full">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-gray-400">
                          Proficiency
                        </span>
                        <span className="text-sm font-bold text-orange-400">
                          {proficiency}%
                        </span>
                      </div>
                      <div
                        className="w-full bg-gray-700 rounded-full h-2"
                        role="progressbar"
                        aria-valuenow={proficiency}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`${skill.name} proficiency ${proficiency} percent`}
                      >
                        <div
                          className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${proficiency}%` }}
                        ></div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
