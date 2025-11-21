import { useState, useEffect } from "react";

function AboutSection() {
  const [aboutId, setAboutId] = useState(null);
  const [aboutText, setAboutText] = useState("");
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [education, setEducation] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/api/about")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const about = data[0];
          setAboutId(about.id);
          setAboutText(about.content || "");
          setSkills(about.skills || []);
          setEducation(about.education || "");
          setImageUrl(about.image_url || "");
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const handleSave = () => {
    if (!aboutId) {
      alert("No About section found to update");
      return;
    }

    fetch(`http://localhost:8000/api/about/${aboutId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: aboutText,
        skills: skills,
        education: education,
        image_url: imageUrl,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(() => alert("About section updated!"))
      .catch((err) => {
        console.error(err);
        alert(`Error updating about: ${err.message}`);
      });
  };

  return (
    <div className="min-h-screen p-6 md:p-10 bg-gray-100">
      <h1 className="text-3xl font-bold text-orange-600 mb-6">
        Manage About Section
      </h1>

      <div className="bg-white rounded-xl shadow p-6 space-y-6">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Profile Image URL
          </label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full border rounded-lg border-gray-400 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-600"
            placeholder="Paste image URL"
          />
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Profile Preview"
              className="mt-3 w-64 md:w-80 lg:w-96 rounded-lg shadow-lg object-cover"
            />
          )}
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            About Me
          </label>
          <textarea
            value={aboutText}
            onChange={(e) => setAboutText(e.target.value)}
            className="w-full border border-gray-400 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-600 resize-none"
            rows={6}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Skills
          </label>
          <div className="flex gap-2 flex-wrap mb-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-bold cursor-pointer hover:bg-orange-300"
                onClick={() => handleRemoveSkill(skill)}
              >
                {skill} &times;
              </span>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="flex-1 border border-gray-400 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-600"
              placeholder="Add a skill"
            />
            <button
              onClick={handleAddSkill}
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-500"
            >
              Add
            </button>
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Education
          </label>
          <input
            type="text"
            value={education}
            onChange={(e) => setEducation(e.target.value)}
            className="w-full border-gray-400 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-600"
          />
        </div>

        <button
          onClick={handleSave}
          className="px-6 py-2 bg-orange-600 text-white rounded-lg font-bold hover:bg-orange-500"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default AboutSection;
