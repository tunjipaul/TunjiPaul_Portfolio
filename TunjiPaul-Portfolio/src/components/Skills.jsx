import { FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaPython, FaGit, FaGithub } from 'react-icons/fa';
import { SiTailwindcss, SiFastapi, SiMysql } from 'react-icons/si';

const skillsData = [
  {
    category: 'Frontend',
    skills: [
      { name: 'HTML', icon: FaHtml5 },
      { name: 'CSS', icon: FaCss3Alt },
      { name: 'JavaScript', icon: FaJsSquare },
      { name: 'React', icon: FaReact },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
    ]
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Python', icon: FaPython },
      { name: 'FastAPI', icon: SiFastapi },
      { name: 'MySQL', icon: SiMysql },
    ]
  },
  {
    category: 'Tools & Version Control',
    skills: [
      { name: 'Git', icon: FaGit },
      { name: 'GitHub', icon: FaGithub },
    ]
  }
];

export default function Skills() {
  return (
    <section id="skills" className="py-20 bg-orange-100 px-6 md:px-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-orange-600 mb-16">
          Skills & Technologies
        </h2>

        {skillsData.map((category, idx) => (
          <div key={idx} className="mb-12">
            <h3 className="text-2xl font-semibold text-orange-400 mb-8 text-center">
              {category.category}
            </h3>
            
            <div className="flex justify-center">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {category.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="flex flex-col items-center justify-center p-6 bg-orange-50 rounded-lg hover:bg-orange-100 transition-all duration-300 transform hover:scale-110 hover:shadow-lg group animate-spin"
                  style={{ animationDuration: '6s' }}
                >
                  <skill.icon
                    className="mb-3 text-orange-600 group-hover:text-orange-700 transition-colors"
                    style={{ fontSize: '48px' }}
                  />
                  <p className="text-center font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">
                    {skill.name}
                  </p>
                </div>
              ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
