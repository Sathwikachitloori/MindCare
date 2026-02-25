import { useState } from "react";
import "../styles/Resources.css";

const resourcesData = [
  {
    title: "Managing Exam Stress and Anxiety",
    category: "Articles",
    description: "Techniques to cope with academic pressure and exam stress.",
    tags: ["Stress", "Exams", "Coping"],
    time: "5 min"
  },
  {
    title: "Building Healthy Sleep Habits",
    category: "Wellness",
    description: "Improve sleep quality for better mental performance.",
    tags: ["Sleep", "Habits"],
    time: "7 min"
  },
  {
    title: "Understanding Depression in College",
    category: "Mental Health",
    description: "Recognizing symptoms and knowing when to seek help.",
    tags: ["Depression", "Support"],
    time: "10 min"
  },
  {
    title: "Social Anxiety and Making Friends",
    category: "Social",
    description: "Tips for building connections and managing social anxiety.",
    tags: ["Anxiety", "Relationships"],
    time: "8 min"
  },
  {
    title: "Mindfulness and Meditation for Students",
    category: "Coping Tools",
    description: "Quick mindfulness exercises you can do daily.",
    tags: ["Meditation", "Wellness"],
    time: "5 min"
  },
  {
    title: "Crisis Support & Helplines",
    category: "Emergency",
    description: "Contact local emergency services or trusted mental health helplines.",
    tags: ["Emergency", "Help"],
    time: "Important"
  }
];

export default function Resources() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredResources = resourcesData.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || item.category === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="resources-container">

      <h1>Mental Health Resources</h1>
      <p className="subtitle">
        Evidence-based tools and strategies for your well-being
      </p>

      {/* Search */}
      <input
        type="text"
        placeholder="Search resources..."
        className="search-input"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Filter Buttons */}
      <div className="filter-buttons">
        {["All", "Articles", "Wellness", "Mental Health", "Coping Tools", "Emergency"].map((cat) => (
          <button
            key={cat}
            className={filter === cat ? "active-filter" : ""}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Resource Cards */}
      <div className="resource-grid">
        {filteredResources.map((item, index) => (
          <div key={index} className="resource-card">
            <div className="resource-top">
              <span className="category-tag">{item.category}</span>
              <span className="read-time">{item.time}</span>
            </div>

            <h3>{item.title}</h3>
            <p>{item.description}</p>

            <div className="tags">
              {item.tags.map((tag, i) => (
                <span key={i} className="tag">{tag}</span>
              ))}
            </div>

            <button className="read-btn">Read Article</button>
          </div>
        ))}
      </div>

    </div>
  );
}