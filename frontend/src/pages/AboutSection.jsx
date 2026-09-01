import { useState, useEffect } from "react";
import API_URL from "../config";
import apiRequest from "../utils/api";

function AboutSection() {
  const [aboutId, setAboutId] = useState(null);
  const [aboutText, setAboutText] = useState("");
  const [education, setEducation] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [newEducation, setNewEducation] = useState({
    institution: "",
    degree: "",
    field: "",
    startYear: "",
    endYear: "",
  });

  useEffect(() => {
    // GET might be public, but using apiRequest gives us consistent error handling and type safety if needed.
    // However, if it's public, apiRequest will still work (headers are optional/ignored by backend if not needed).
    // Let's use apiRequest for consistency.
    apiRequest("/api/about")
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const about = data[0];
          setAboutId(about.id);
          setAboutText(about.content || "");
          setEducation(about.education || []);
          setImageUrl(about.image_url || "");
        }
      })
      .catch((err) => console.error("Error fetching about:", err));
  }, []);

  const handleAddEducation = () => {
    if (!newEducation.institution || !newEducation.degree) {
      alert("Please fill in at least institution and degree");
      return;
    }

    setEducation([...education, { ...newEducation }]);
    setNewEducation({
      institution: "",
      degree: "",
      field: "",
      startYear: "",
      endYear: "",
    });
  };

  const handleRemoveEducation = (index) => {
    setEducation(education.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    const payload = {
      content: aboutText,
      education: education,
      image_url: imageUrl,
    };

    try {
      if (!aboutId) {
        const newAbout = await apiRequest("/api/about", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        setAboutId(newAbout.id);
        alert("About section created!");
      } else {
        await apiRequest(`/api/about/${aboutId}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
        alert("About section updated!");
      }
    } catch (err) {
      console.error(err);
      alert(`Error saving about section: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen p-6 md:p-10 bg-gray-100">
      <h1 className="text-3xl font-bold text-orange-600 mb-6">
        Manage About Section
      </h1>

      <div className="bg-white rounded-xl shadow p-6 space-y-6">
        {/* Profile Image */}
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

        {/* About Me */}
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

        {/* Education Section */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Education
          </label>

          {/* Existing Education List */}
          {education.length > 0 && (
            <div className="space-y-3 mb-4">
              {education.map((edu, index) => (
                <div
                  key={index}
                  className="border border-gray-300 rounded-lg p-4 bg-gray-50"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-lg">{edu.degree}</p>
                      {edu.field && (
                        <p className="text-gray-600">{edu.field}</p>
                      )}
                      <p className="text-gray-700">{edu.institution}</p>
                      <p className="text-gray-500 text-sm">
                        {edu.startYear} - {edu.endYear || "Present"}
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemoveEducation(index)}
                      className="text-red-600 hover:text-red-800 font-bold"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add New Education Form */}
          <div className="border border-gray-300 rounded-lg p-4 space-y-3">
            <h3 className="font-semibold text-gray-700">Add New Education</h3>

            <input
              type="text"
              value={newEducation.institution}
              onChange={(e) =>
                setNewEducation({
                  ...newEducation,
                  institution: e.target.value,
                })
              }
              className="w-full border border-gray-400 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-600"
              placeholder="Institution (e.g., Harvard University)"
            />

            <input
              type="text"
              value={newEducation.degree}
              onChange={(e) =>
                setNewEducation({ ...newEducation, degree: e.target.value })
              }
              className="w-full border border-gray-400 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-600"
              placeholder="Degree (e.g., Bachelor of Science)"
            />

            <input
              type="text"
              value={newEducation.field}
              onChange={(e) =>
                setNewEducation({ ...newEducation, field: e.target.value })
              }
              className="w-full border border-gray-400 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-600"
              placeholder="Field of Study (e.g., Computer Science)"
            />

            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                value={newEducation.startYear}
                onChange={(e) =>
                  setNewEducation({
                    ...newEducation,
                    startYear: e.target.value,
                  })
                }
                className="border border-gray-400 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-600"
                placeholder="Start Year (e.g., 2018)"
              />

              <input
                type="text"
                value={newEducation.endYear}
                onChange={(e) =>
                  setNewEducation({ ...newEducation, endYear: e.target.value })
                }
                className="border border-gray-400 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-600"
                placeholder="End Year (or leave blank)"
              />
            </div>

            <button
              onClick={handleAddEducation}
              className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-500"
            >
              Add Education
            </button>
          </div>
        </div>

        {/* Save Button */}
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
