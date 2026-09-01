import { FaGithub } from "react-icons/fa";
import { optimizeCloudinary } from "../utils/images";

function ProjectCard({ project }) {
  const imageSrc = project.image_url
    ? optimizeCloudinary(project.image_url, { width: 800, height: 480, crop: "fill" })
    : null;

  return (
    <article className="bg-white rounded-xl shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-xl overflow-hidden flex flex-col">
      {imageSrc && (
        <div className="w-full h-48 overflow-hidden bg-gray-100">
          <img
            src={imageSrc}
            alt={`${project.title} project screenshot`}
            width={400}
            height={192}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-2xl font-semibold mb-3 text-orange-600">
          {project.title}
        </h3>

        <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">
          {project.desc}
        </p>

        <div className="flex gap-3 justify-center mt-auto">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold px-4 flex justify-center items-center py-2 bg-black text-white rounded-lg hover:bg-gray-800 text-sm min-h-11"
            >
              <FaGithub className="mr-2" aria-hidden="true" />
              GitHub
              <span className="sr-only"> repository for {project.title}</span>
            </a>
          )}

          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-orange-600 text-white rounded-lg font-bold hover:bg-orange-500 text-sm min-h-11 inline-flex items-center"
            >
              Live demo
              <span className="sr-only"> of {project.title}</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;
