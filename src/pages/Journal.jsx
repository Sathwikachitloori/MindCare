import { useState, useEffect } from "react";
import "../styles/Journal.css";


export default function Journal() {
  const today = new Date().toISOString().split("T")[0];

  const [date, setDate] = useState(today);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [mood, setMood] = useState("");
  const [entries, setEntries] = useState([]);

  /* ==============================
     Load Saved Entries
  ============================== */
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("journalEntries")) || [];
    setEntries(saved);
  }, []);

  /* ==============================
     Save Entry
  ============================== */
  const saveEntry = () => {
    if (!text.trim()) return alert("Write something first.");

    const moodScoreMap = {
      Great: 9,
      Good: 7,
      Okay: 5,
      Low: 3,
      Struggling: 1
    };

    const newEntry = {
      date,
      title,
      text,
      mood,
      moodScore: moodScoreMap[mood] || 0,
      createdAt: new Date().toLocaleString()
    };

    const updated = [newEntry, ...entries];
    setEntries(updated);
    localStorage.setItem("journalEntries", JSON.stringify(updated));

    setTitle("");
    setText("");
    setMood("");
  };

  /* ==============================
     STATS
  ============================== */

  const totalEntries = entries.length;

  const thisMonth = entries.filter(
    (e) => e.date.slice(0, 7) === today.slice(0, 7)
  ).length;

  const avgMood =
    entries.length > 0
      ? (
          entries.reduce((sum, e) => sum + (e.moodScore || 0), 0) /
          entries.length
        ).toFixed(1)
      : 0;

  /* -------- Real Streak -------- */
  const calculateStreak = () => {
    if (entries.length === 0) return 0;

    const uniqueDates = [
      ...new Set(entries.map((e) => e.date))
    ].sort((a, b) => new Date(b) - new Date(a));

    let streak = 0;
    let currentDate = new Date();

    for (let i = 0; i < uniqueDates.length; i++) {
      const entryDate = new Date(uniqueDates[i]);
      const diff =
        Math.floor(
          (currentDate - entryDate) / (1000 * 60 * 60 * 24)
        );

      if (diff === 0) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else if (diff === 1) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }

    return streak;
  };

  const currentStreak = calculateStreak();

  const todayEntries = entries.filter((e) => e.date === date);

  /* ==============================
     UI (YOUR GOOD DESIGN KEPT)
  ============================== */

  return (
    <div className="journal-container">

      <h1 className="journal-title">📖 My Journal</h1>
      <p className="journal-subtitle">
        A private space to reflect on your thoughts and feelings
      </p>

      {/* Top Stats */}
      <div className="stats-grid">
        <div className="stat-card purple">
          <h4>Total Entries</h4>
          <h2>{totalEntries}</h2>
        </div>

        <div className="stat-card pink">
          <h4>This Month</h4>
          <h2>{thisMonth}</h2>
        </div>

        <div className="stat-card blue">
          <h4>Current Streak</h4>
          <h2>{currentStreak} days</h2>
        </div>

        <div className="stat-card green">
          <h4>Avg Mood</h4>
          <h2>{avgMood}/10</h2>
        </div>
      </div>

      <div className="journal-grid">

        {/* LEFT SIDE */}
        <div className="journal-card">

          <h3>✏ Write Your Thoughts</h3>

          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <label>Title</label>
          <input
            type="text"
            placeholder="Give your entry a title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label>What's on your mind?</label>
          <textarea
            placeholder="Write freely about your day..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <div className="char-count">
            {text.length} characters
          </div>

          <label>How are you feeling?</label>

          <div className="mood-row">
            {["Great", "Good", "Okay", "Low", "Struggling"].map((m) => (
              <div
                key={m}
                className={`mood ${mood === m ? "active-mood" : ""}`}
                onClick={() => setMood(m)}
              >
                {m}
              </div>
            ))}
          </div>

          <button className="primary-btn full-width" onClick={saveEntry}>
            🔒 Save Entry (Private)
          </button>

        </div>

        {/* RIGHT SIDE */}
        <div>

          <div className="card">
            <h3>Today's Entries</h3>

            {todayEntries.length === 0 ? (
              <div className="empty-state">
                No entries for this date
              </div>
            ) : (
              todayEntries.map((item, index) => (
                <div key={index} className="entry-card">
                  <strong>{item.title || "Untitled"}</strong>
                  <p>{item.text}</p>
                  <span className="entry-meta">
                    {item.mood} • {item.createdAt}
                  </span>
                </div>
              ))
            )}
          </div>

          <div className="privacy-card">
            🔒 Your Privacy Matters
            <p>
              Your journal entries are completely private and stored securely
              on your device.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}