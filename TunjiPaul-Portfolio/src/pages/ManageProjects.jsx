import { useState } from "react";

function ManageProjects() {
  const [projects, setProjects] = useState([
    { id: 1, title: "Contact Manager App", desc: "Fullstack app using FastAPI, MySQL, React" },
    { id: 2, title: "Task Manager", desc: "JWT auth tasks management app" },
    { id: 3, title: "Blog Platform", desc: "Simple blog with MySQL backend" },
  ]);

  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");

  const handleAdd = () => {
    if (!newTitle || !newDesc) return;
    const newProject = { id: Date.now(), title: newTitle, desc: newDesc };
    setProjects([...projects, newProject]);
    setNewTitle("");
    setNewDesc("");
  };

  const handleDelete = (id) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  const handleEdit = (project) => {
    setEditingId(project.id);
    setEditTitle(project.title);
    setEditDesc(project.desc);
  };

  const handleSave = (id) => {
    setProjects(
      projects.map((p) =>
        p.id === id ? { ...p, title: editTitle, desc: editDesc } : p
      )
    );
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-orange-600 mb-4">Manage Projects</h2>

      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Project Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className=" border-gray-300 border px-4 py-2 rounded-lg w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-orange-600"
        />
        <input
          type="text"
          placeholder="Project Description"
          value={newDesc}
          onChange={(e) => setNewDesc(e.target.value)}
          className="border-gray-300 border px-4 py-2 rounded-lg w-full md:w-2/3 focus:outline-none focus:ring-2 focus:ring-orange-600"
        />
        <button
          onClick={handleAdd}
          className=" font-bold bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-500 transition"
        >
          Add Project
        </button>
      </div>

      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-white rounded-lg shadow gap-4"
          >
            {editingId === project.id ? (
              <div className="flex-1 flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="border px-4 py-2 rounded-lg w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-orange-600"
                />
                <input
                  type="text"
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  className="border px-4 py-2 rounded-lg w-full md:w-2/3 focus:outline-none focus:ring-2 focus:ring-orange-600"
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
                    className=" font-bold bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-300 transition"
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
        ))}
      </div>
    </div>
  );
}

export default ManageProjects;
