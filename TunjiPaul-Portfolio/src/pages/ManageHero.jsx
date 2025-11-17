import { useState, useEffect } from "react";

function ManageHero() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [viewButtonText, setViewButtonText] = useState("View Projects");
  const [contactButtonText, setContactButtonText] = useState("Contact Me");
  const [image, setImage] = useState("");

  useEffect(() => {
    // Load hero data from localStorage if available
    const heroData = JSON.parse(localStorage.getItem("heroData"));
    if (heroData) {
      setName(heroData.name);
      setDescription(heroData.description);
      setViewButtonText(heroData.viewButtonText);
      setContactButtonText(heroData.contactButtonText);
      setImage(heroData.image);
    }
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    const heroData = { name, description, viewButtonText, contactButtonText, image };
    localStorage.setItem("heroData", JSON.stringify(heroData));
    alert("Hero section updated!");
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-orange-600 mb-6">Manage Hero Section</h2>
      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-gray-300 border w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-orange-600 focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border-gray-300 border w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-orange-600 focus:outline-none"
            rows={4}
            required
          />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold">View Projects Button Text</label>
            <input
              type="text"
              value={viewButtonText}
              onChange={(e) => setViewButtonText(e.target.value)}
              className="border-gray-300 border w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-orange-600 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Contact Button Text</label>
            <input
              type="text"
              value={contactButtonText}
              onChange={(e) => setContactButtonText(e.target.value)}
              className="border-gray-300 border w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-orange-600 focus:outline-none"
              required
            />
          </div>
        </div>
        <div>
          <label className="block mb-1 font-semibold">Hero Image URL</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="border-gray-300 border w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-orange-600 focus:outline-none"
            placeholder="Paste image URL"
          />
        </div>
        {image && (
          <div className="mt-4">
            <img src={image} alt="Hero Preview" className="w-32 h-32 rounded-full object-cover" />
          </div>
        )}
        <button
          type="submit"
          className="mt-4 w-full py-2 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-500 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default ManageHero;
