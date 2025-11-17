import { Link } from "react-router-dom";

function Projects() {
  const projects = [
    {
      title: "Contact Manager App",
      desc: "A fullstack contact management system using FastAPI, MySQL, and React.",
      link: "/projects/contact-manager",
    },
    {
      title: "Task Manager",
      desc: "Create, update, and track tasks with JWT auth using FastAPI.",
      link: "/projects/task-manager",
    },
    {
      title: "Blog Platform",
      desc: "A simple blog with admin panel and MySQL storage.",
      link: "/projects/blog-platform",
    },
    {
      title: "Expense Tracker",
      desc: "Track expenses, categories, and totals with charts.",
      link: "/projects/expense-tracker",
    },
    {
      title: "Portfolio Website",
      desc: "My personal portfolio built with React and Tailwind CSS.",
      link: "/projects/portfolio-website",
    },
  ];

  return (
    <section id="projects" className="py-20 bg-black">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12 text-center text-orange-600">
          Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <a
              key={index}
              href={project.link}
              target="_blank"
              className="block p-6 bg-white rounded-xl shadow-md transition-all duration-700 hover:-translate-y-2 hover:shadow-xl"
            >
              <h3 className="text-2xl font-semibold mb-3 transition duration-700 hover:text-orange-600">
                {project.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {project.desc}
              </p>
            </a>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Link
            to="/projects"
            className="px-8 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-500 transition duration-500"
          >
            See More
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Projects;
