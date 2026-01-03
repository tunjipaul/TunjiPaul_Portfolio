import { useEffect, useState } from "react";
import API_URL from "../config";

function ManageHero() {
  const [hero, setHero] = useState(null);
  const [heroId, setHeroId] = useState(null);

  const defaultHero = {
    title: "Hi, I'm Tunji Paul",
    subtitle:
      "By day, I'm an AI Developer building intelligent, scalable solutions. By night, I'm an analyst of politics and governance, an occasional writer, and a public speaker on topics that matter. And if the world ever seems like it's coming to an end? Don't worry, that's when my sense of humor truly shines.",
    view_button_text: "View Projects",
    contact_button_text: "Contact Me",
    image_url: "",
  };

  useEffect(() => {
    async function fetchOrCreateHero() {
      try {
        const res = await fetch(`${API_URL}/api/hero`);
        const data = await res.json();

        if (data.length > 0) {
          setHero(data[0]);
          setHeroId(data[0].id);
        } else {
          const createRes = await fetch(`${API_URL}/api/hero`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(defaultHero),
          });
          const newHero = await createRes.json();
          setHero(newHero);
          setHeroId(newHero.id);
        }
      } catch (err) {
        console.error(err);
      }
    }

    fetchOrCreateHero();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHero((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!heroId) {
      alert("No hero exists to update!");
      return;
    }
    try {
      const res = await fetch(`${API_URL}/api/hero/${heroId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(hero),
      });
      if (!res.ok) throw new Error("Failed to update hero");
      const updatedHero = await res.json();
      setHero(updatedHero);
      alert("Hero section updated!");
    } catch (err) {
      console.error(err);
      alert(`Error updating hero: ${err.message}`);
    }
  };

  if (!hero) return <div>Loading...</div>;

  return (
    <div className="p-6 bg-white rounded-xl shadow-md max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-orange-600 mb-6">
        Manage Hero Section
      </h2>
      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Title</label>
          <input
            type="text"
            name="title"
            value={hero.title}
            onChange={handleChange}
            className="border-gray-300 border w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-orange-600 focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Subtitle</label>
          <textarea
            name="subtitle"
            value={hero.subtitle}
            onChange={handleChange}
            className="border-gray-300 border w-full px-4 py-2 rounded-lg resize-none focus:ring-2 focus:ring-orange-600 focus:outline-none"
            rows={4}
          />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold">
              View Projects Button Text
            </label>
            <input
              type="text"
              name="view_button_text"
              value={hero.view_button_text}
              onChange={handleChange}
              className="border-gray-300 border w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-orange-600 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">
              Contact Button Text
            </label>
            <input
              type="text"
              name="contact_button_text"
              value={hero.contact_button_text}
              onChange={handleChange}
              className="border-gray-300 border w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-orange-600 focus:outline-none"
              required
            />
          </div>
        </div>
        <div>
          <label className="block mb-1 font-semibold">Hero Image URL</label>
          <input
            type="text"
            name="image_url"
            value={hero.image_url}
            onChange={handleChange}
            className="border-gray-300 border w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-orange-600 focus:outline-none"
            placeholder="Paste image URL"
          />
        </div>
        {hero.image_url && (
          <div className="mt-4">
            <img
              src={hero.image_url}
              alt="Hero Preview"
              className="w-32 h-32 rounded-full object-cover"
            />
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
