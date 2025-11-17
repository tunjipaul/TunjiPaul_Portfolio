import { Link } from "react-router-dom";

function Projects() {
  const projects = [
    {
      title: "Contact Manager App",
      desc: "A fullstack contact management system using FastAPI, MySQL, and React.",
      github: "https://github.com/yourrepo/contact-manager",
      demo: "https://contact-manager-demo.com",
    },
    {
      title: "Task Manager",
      desc: "Create, update, and track tasks with JWT auth using FastAPI.",
      github: "https://github.com/yourrepo/task-manager",
      demo: "https://task-manager-demo.com",
    },
    {
      title: "Blog Platform",
      desc: "A simple blog with admin panel and MySQL storage.",
      github: "https://github.com/yourrepo/blog-platform",
      demo: "https://blog-platform-demo.com",
    },
    {
      title: "Expense Tracker",
      desc: "Track expenses, categories, and totals with charts.",
      github: "https://github.com/yourrepo/expense-tracker",
      demo: "https://expense-tracker-demo.com",
    },
    {
      title: "Portfolio Website",
      desc: "My personal portfolio built with React and Tailwind CSS.",
      github: "https://github.com/yourrepo/portfolio",
      demo: "https://your-portfolio-demo.com",
    },
  ];

  return (
    <section id="projects" className="py-20 bg-black">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12 text-center text-orange-600">
          Projects
        </h2>

        <div className="overflow-x-hidden w-full">
          <div className="animate-infinite-scroll space-x-6 pb-2">
            {[...projects, ...projects].map((project, index) => (
              <div
                key={index}
                className="min-w-[300px] bg-white p-6 rounded-xl shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
              >
                <h3 className="text-2xl font-semibold mb-3 text-orange-600">
                  {project.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {project.desc}
                </p>

                <div className="flex gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    onClick={(e) => e.stopPropagation()}
                    className="font-bold px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 text-sm"
                  >
                    GitHub
                  </a>

                  <a
                    href={project.demo}
                    target="_blank"
                    onClick={(e) => e.stopPropagation()}
                    className="px-4 py-2 bg-orange-600 text-white rounded-lg font-bold hover:bg-orange-500 text-sm"
                  >
                    Demo
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <Link
            to="/projects"
            className="font-bold px-8 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-500 transition duration-500"
          >
            See More
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Projects;
