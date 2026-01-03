import { useState, useEffect } from "react";
import API_URL from "../config";
function ManageProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newGithub, setNewGithub] = useState("");
  const [newDemo, setNewDemo] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editGithub, setEditGithub] = useState("");
  const [editDemo, setEditDemo] = useState("");

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
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!newTitle.trim() || !newDesc.trim()) {
      setError("Title and description cannot be empty");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTitle,
          desc: newDesc,
          github: newGithub || "",
          demo: newDemo || "",
        }),
      });

      if (!response.ok) throw new Error("Failed to create project");
      await response.json();
      setNewTitle("");
      setNewDesc("");
      setNewGithub("");
      setNewDemo("");
      setError(null);
      fetchProjects();
    } catch (err) {
      setError(err.message);
      console.error("Error adding project:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?"))
      return;

    try {
      const response = await fetch(`${API_URL}/api/projects/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete project");
      setProjects(projects.filter((p) => p.id !== id));
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("Error deleting project:", err);
    }
  };

  const handleEdit = (project) => {
    setEditingId(project.id);
    setEditTitle(project.title);
    setEditDesc(project.desc);
    setEditGithub(project.github || "");
    setEditDemo(project.demo || "");
  };

  const handleSave = async (id) => {
    if (!editTitle.trim() || !editDesc.trim()) {
      setError("Title and description cannot be empty");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/projects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editTitle,
          desc: editDesc,
          github: editGithub || "",
          demo: editDemo || "",
        }),
      });

      if (!response.ok) throw new Error("Failed to update project");
      const updatedProject = await response.json();
      setProjects(projects.map((p) => (p.id === id ? updatedProject : p)));
      setEditingId(null);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("Error updating project:", err);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-orange-600 mb-4">
        Manage Projects
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-lg">
          {error}
        </div>
      )}

      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Project Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="border-gray-300 border px-4 py-2 rounded-lg w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-orange-600"
        />
        <input
          type="text"
          placeholder="Project Description"
          value={newDesc}
          onChange={(e) => setNewDesc(e.target.value)}
          className="border-gray-300 border px-4 py-2 rounded-lg w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-orange-600"
        />
        <input
          type="text"
          placeholder="GitHub Link"
          value={newGithub}
          onChange={(e) => setNewGithub(e.target.value)}
          className="border-gray-300 border px-4 py-2 rounded-lg w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-orange-600"
        />
        <input
          type="text"
          placeholder="Demo Link"
          value={newDemo}
          onChange={(e) => setNewDemo(e.target.value)}
          className="border-gray-300 border px-4 py-2 rounded-lg w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-orange-600"
        />
        <button
          onClick={handleAdd}
          disabled={loading}
          className="font-bold bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-500 transition disabled:opacity-50"
        >
          Add Project
        </button>
      </div>

      {loading ? (
        <div className="text-center py-8 text-gray-600">
          Loading projects...
        </div>
      ) : (
        <div className="space-y-4">
          {projects.length === 0 ? (
            <div className="text-center py-8 text-gray-600">
              No projects yet. Create one to get started!
            </div>
          ) : (
            projects.map((project) => (
              <div
                key={project.id}
                className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-white rounded-lg shadow gap-4"
              >
                {editingId === project.id ? (
                  <div className="flex-1 flex flex-col md:flex-row gap-4">
                    <input
                      type="text"
                      value={editTitle}
                      placeholder="Project Title"
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="border px-4 py-2 rounded-lg w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-orange-600"
                    />
                    <input
                      type="text"
                      value={editDesc}
                      placeholder="Project Description"
                      onChange={(e) => setEditDesc(e.target.value)}
                      className="border px-4 py-2 rounded-lg w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-orange-600"
                    />
                    <input
                      type="text"
                      value={editGithub}
                      placeholder="GitHub Link"
                      onChange={(e) => setEditGithub(e.target.value)}
                      className="border px-4 py-2 rounded-lg w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-orange-600"
                    />
                    <input
                      type="text"
                      value={editDemo}
                      placeholder="Demo Link"
                      onChange={(e) => setEditDemo(e.target.value)}
                      className="border px-4 py-2 rounded-lg w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-orange-600"
                    />
                  </div>
                ) : (
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{project.title}</h3>
                    <p className="text-gray-600">{project.desc}</p>
                  </div>
                )}

                <div className="flex gap-2 mt-2 md:mt-0">
                  {editingId === project.id ? (
                    <>
                      <button
                        onClick={() => handleSave(project.id)}
                        className="font-bold bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500 transition"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="font-bold bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(project)}
                        className="font-bold bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="bg-red-800 text-white px-4 py-2 rounded-lg hover:bg-red-900 font-bold transition"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default ManageProjects;
