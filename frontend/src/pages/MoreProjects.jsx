import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import ProjectCard from "../components/ProjectCard";
import Seo from "../seo/Seo";
import {
  PAGES,
  breadcrumbJsonLd,
  projectListJsonLd,
  SITE,
} from "../seo/site";
import API_URL from "../config";

function MoreProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch(`${API_URL}/api/projects`);
        if (!response.ok) throw new Error("Failed to load projects");
        setProjects(await response.json());
        setError(null);
      } catch (err) {
        setError(err.message);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Projects", path: "/projects" },
      ]),
      projectListJsonLd(projects),
    ].filter(Boolean),
  };

  return (
    <div className="w-full min-h-screen bg-black">
      <Seo
        title={PAGES.projects.title}
        description={PAGES.projects.description}
        path={PAGES.projects.path}
        jsonLd={jsonLd}
      />
      <NavBar />
      <main id="main-content" className="pt-24 pb-20 px-6">
        <nav
          aria-label="Breadcrumb"
          className="max-w-6xl mx-auto mb-8 text-sm text-gray-400"
        >
          <ol className="flex flex-wrap gap-2">
            <li>
              <Link to="/" className="hover:text-orange-400">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-orange-400" aria-current="page">
              Projects
            </li>
          </ol>
        </nav>

        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-orange-600 mb-4 text-center">
            All Projects
          </h1>
          <p className="text-gray-300 text-center max-w-2xl mx-auto mb-12">
            A complete look at {SITE.name}&apos;s AI and full-stack work —
            product demos, GitHub repositories, and systems built with React,
            Python, and FastAPI.
          </p>

          {loading && (
            <p className="text-center text-gray-400">Loading projects...</p>
          )}

          {error && (
            <p className="text-center text-red-400" role="alert">
              Failed to load projects. Please try again later.
            </p>
          )}

          {!loading && !error && projects.length === 0 && (
            <p className="text-center text-gray-400">
              No projects published yet. Check back soon.
            </p>
          )}

          {projects.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.id || project.title || index}
                  project={project}
                />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default MoreProjects;
