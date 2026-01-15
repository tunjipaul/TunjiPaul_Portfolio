import { useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";
import API_URL from "../config";

const DefaultIcon = ({ className, style }) => (
  <div
    className={`w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xl ${className}`}
    style={style}
  >
    ?
  </div>
);

const iconMap = {
  HTML: FaIcons.FaHtml5,
  CSS: FaIcons.FaCss3Alt,
  JavaScript: FaIcons.FaJsSquare,
  React: FaIcons.FaReact,
  "Tailwind CSS": SiIcons.SiTailwindcss,
  Python: FaIcons.FaPython,
  FastAPI: SiIcons.SiFastapi,
  MySQL: SiIcons.SiMysql,
  Git: FaIcons.FaGit,
  GitHub: FaIcons.FaGithub,
};

const fallbackSkillsData = [
  {
    category: "Frontend",
    skills: [
      { name: "HTML", icon: FaIcons.FaHtml5 },
      { name: "CSS", icon: FaIcons.FaCss3Alt },
      { name: "JavaScript", icon: FaIcons.FaJsSquare },
      { name: "React", icon: FaIcons.FaReact },
      { name: "Tailwind CSS", icon: SiIcons.SiTailwindcss },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Python", icon: FaIcons.FaPython },
      { name: "FastAPI", icon: SiIcons.SiFastapi },
      { name: "MySQL", icon: SiIcons.SiMysql },
    ],
  },
  {
    category: "Tools, Version Control & AI",
    skills: [
      { name: "Git", icon: FaIcons.FaGit },
      { name: "GitHub", icon: FaIcons.FaGithub },
    ],
  },
];

const getIcon = (skillName, iconFromDB) => {
  if (iconFromDB) {
    const dbIcon = FaIcons[iconFromDB] || SiIcons[iconFromDB];
    if (dbIcon) return dbIcon;
  }

  if (iconMap[skillName]) {
    return iconMap[skillName];
  }

  return DefaultIcon;
};

export default function Skills() {
  const [skillsData, setSkillsData] = useState(fallbackSkillsData);
  const [loading, setLoading] = useState(true);

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
        });
        return acc;
      }, {});

      const formattedSkills = Object.keys(groupedSkills).map((category) => ({
        category,
        skills: groupedSkills[category].map((skill) => ({
          name: skill.name,
          icon: getIcon(skill.name, skill.iconName),
        })),
      }));

      if (formattedSkills.length > 0) {
        setSkillsData(formattedSkills);
      }
    } catch (err) {
      console.error("Error fetching skills:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="skills" className="pt-30 pb-20 bg-orange-50 px-6 md:px-20">
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
              {category.skills.map((skill) => {
                const IconComponent = skill.icon;
                return (
                  <div
                    key={skill.name}
                    className="flex flex-col items-center justify-center w-40 h-48 bg-black rounded-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-110 hover:shadow-lg group"
                  >
                    <div className="relative w-20 h-20 mb-3 flex items-center justify-center">
                      <div
                        className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-orange-600 border-t-transparent animate-spin"
                        style={{ animation: "spin 8s linear infinite" }}
                      ></div>

                      <IconComponent
                        className="relative z-10 text-orange-600 group-hover:text-orange-700 transition-colors"
                        style={{ fontSize: "40px" }}
                      />
                    </div>

                    <p className="text-center font-semibold text-white group-hover:text-orange-600 transition-colors px-2">
                      {skill.name}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
