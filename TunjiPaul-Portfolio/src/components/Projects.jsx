import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import API_URL from "../config";
function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/projects`);
      if (!response.ok) throw new Error("Failed to fetch projects");
      const data = await response.json();
      setProjects(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching projects:", err);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="projects" className="py-20 bg-black">
        <div className="max-w-6xl mx-auto px-6 text-center text-gray-400">
          Loading projects...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="py-20 bg-black">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center text-red-400">
            Failed to load projects. Please try again later.
          </div>
        </div>
      </section>
    );
  }

  const displayProjects = projects;

  return (
    <section id="projects" className="py-20 bg-black">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12 text-center text-orange-600">
          Projects
        </h2>

        {projects.length === 0 ? (
          <div className="text-center text-gray-400">
            No projects available yet.
          </div>
        ) : (
          <>
            <div className="overflow-x-hidden w-full ">
              <div className="animate-infinite-scroll space-x-6 pb-2 ">
                {displayProjects.map((project, index) => (
                  <div
                    key={index}
                    className="min-w-[300px] bg-white p-6 rounded-xl shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-xl flex-col items-center"
                  >
                    <h3 className="text-2xl font-semibold mb-3 text-orange-600 flex-col items-center ">
                      {project.title}
                    </h3>

                    <p className=" w-132 flex-col items-center text-gray-600 text-sm leading-relaxed mb-4 wrap-break-word">
                      {project.desc}
                    </p>

                    <div className="flex gap-3 justify-center">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="font-bold px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 text-sm"
                        >
                          GitHub
                        </a>
                      )}

                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="px-4 py-2 bg-orange-600 text-white rounded-lg font-bold hover:bg-orange-500 text-sm"
                        >
                          Demo
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center mt-10">
              <Link
                to="/moreprojects"
                className="font-bold px-8 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-500 transition duration-500"
              >
                See More
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Projects;
