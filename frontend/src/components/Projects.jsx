import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API_URL from "../config";
import ProjectCard from "./ProjectCard";

const FEATURED_COUNT = 6;

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
      if (!response.ok) throw new Error("Failed to load projects");
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
      <section
        id="projects"
        aria-labelledby="projects-heading"
        className="py-20 bg-black"
      >
        <div className="max-w-6xl mx-auto px-6 text-center text-gray-400">
          <h2 id="projects-heading" className="sr-only">
            Projects
          </h2>
          Loading projects...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        id="projects"
        aria-labelledby="projects-heading"
        className="py-20 bg-black"
      >
        <div className="max-w-6xl mx-auto px-6">
          <h2
            id="projects-heading"
            className="text-4xl font-bold mb-12 text-center text-orange-600"
          >
            Projects
          </h2>
          <p className="text-center text-red-400" role="alert">
            Failed to load projects. Please try again later.
          </p>
        </div>
      </section>
    );
  }

  const featured = projects.slice(0, FEATURED_COUNT);

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="py-20 bg-black"
    >
      <div className="max-w-6xl mx-auto px-6">
        <h2
          id="projects-heading"
          className="text-4xl font-bold mb-4 text-center text-orange-600"
        >
          Projects
        </h2>
        <p className="text-center text-gray-300 mb-12 max-w-2xl mx-auto">
          Selected AI and full-stack work. See GitHub and live demos, or browse
          the full archive.
        </p>

        {projects.length === 0 ? (
          <p className="text-center text-gray-400">
            No projects available yet.
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((project, index) => (
                <ProjectCard
                  key={project.id || project.title || index}
                  project={project}
                />
              ))}
            </div>

            <div className="flex justify-center mt-10">
              <Link
                to="/projects"
                className="font-bold px-8 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-500 transition duration-500 min-h-11 inline-flex items-center"
              >
                See all projects
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Projects;
