import { useState, useEffect } from "react";
import { Trash2, Plus, Edit2 } from "lucide-react";
import API_URL from "../config";

export default function ManageSkills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "Frontend",
    icon: "",
  });
  const [editingId, setEditingId] = useState(null);

  const categories = ["Frontend", "Backend", "Tools, Version Control & AI"];

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/skills`);
      if (!response.ok) throw new Error("Failed to fetch skills");
      const data = await response.json();
      setSkills(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching skills:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setError("Skill name is required");
      return;
    }

    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId
        ? `${API_URL}/api/skills/${editingId}`
        : `${API_URL}/api/skills`;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Backend error:", errorData);
        throw new Error(errorData.detail || "Failed to save skill");
      }

      setFormData({ name: "", category: "Frontend", icon: "" });
      setEditingId(null);
      fetchSkills();
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("Error saving skill:", err);
    }
  };

  const handleEdit = (skill) => {
    setFormData({
      name: skill.name,
      category: skill.category || "Frontend",
      icon: skill.icon || "",
    });
    setEditingId(skill.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this skill?")) return;

    try {
      const response = await fetch(`${API_URL}/api/skills/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete skill");
      fetchSkills();
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("Error deleting skill:", err);
    }
  };

  const handleCancel = () => {
    setFormData({ name: "", category: "Frontend", icon: "" });
    setEditingId(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-gray-400">Loading skills...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black px-6 md:px-20 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-orange-600 mb-8">
          Manage Skills
        </h1>

        {error && (
          <div className="mb-6 p-4 bg-red-900 text-red-100 rounded-lg">
            {error}
          </div>
        )}

        {/* Add/Edit Form */}
        <div className="bg-orange-50 p-8 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            {editingId ? "Edit Skill" : "Add New Skill"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Skill Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g., React, Python, MySQL"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-600"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-600"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Icon (Optional)
              </label>
              <input
                type="text"
                name="icon"
                value={formData.icon}
                onChange={handleInputChange}
                placeholder="e.g., FaReact, SiTailwindcss, FaPython"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-600"
              />
              <p className="text-sm text-gray-600 mt-2">
                Leave empty to use default icon mapping. Common icons:
              </p>
              <div className="text-xs text-gray-500 mt-1 space-y-1">
                <p>
                  •{" "}
                  <span className="font-mono bg-gray-200 px-1 rounded">
                    FaReact
                  </span>
                  ,{" "}
                  <span className="font-mono bg-gray-200 px-1 rounded">
                    FaPython
                  </span>
                  ,{" "}
                  <span className="font-mono bg-gray-200 px-1 rounded">
                    FaNodeJs
                  </span>
                  ,{" "}
                  <span className="font-mono bg-gray-200 px-1 rounded">
                    FaDocker
                  </span>
                </p>
                <p>
                  •{" "}
                  <span className="font-mono bg-gray-200 px-1 rounded">
                    SiTailwindcss
                  </span>
                  ,{" "}
                  <span className="font-mono bg-gray-200 px-1 rounded">
                    SiTypescript
                  </span>
                  ,{" "}
                  <span className="font-mono bg-gray-200 px-1 rounded">
                    SiMongodb
                  </span>
                  ,{" "}
                  <span className="font-mono bg-gray-200 px-1 rounded">
                    SiPostgresql
                  </span>
                </p>
                <p className="text-blue-600">
                  Browse all icons at:{" "}
                  <a
                    href="https://react-icons.github.io/react-icons/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-blue-700"
                  >
                    react-icons.github.io
                  </a>
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-500 transition font-semibold"
              >
                <Plus size={20} />
                {editingId ? "Update Skill" : "Add Skill"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition font-semibold"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Skills List */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-orange-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left font-semibold">
                  Skill Name
                </th>
                <th className="px-6 py-4 text-left font-semibold">Category</th>
                <th className="px-6 py-4 text-left font-semibold">Icon</th>
                <th className="px-6 py-4 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {skills.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No skills added yet. Create one to get started!
                  </td>
                </tr>
              ) : (
                skills.map((skill) => (
                  <tr
                    key={skill.id}
                    className="border-b hover:bg-orange-50 transition"
                  >
                    <td className="px-6 py-4 font-semibold text-gray-800">
                      {skill.name}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium">
                        {skill.category || "Frontend"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {skill.icon ? (
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-mono">
                          {skill.icon}
                        </span>
                      ) : (
                        <span className="text-gray-400 text-sm italic">
                          Default
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 flex gap-3">
                      <button
                        onClick={() => handleEdit(skill)}
                        className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm"
                      >
                        <Edit2 size={16} />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(skill.id)}
                        className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
