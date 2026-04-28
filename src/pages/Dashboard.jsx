import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();

  const [streak, setStreak] = useState(0);
  const [sessions] = useState(1); // demo static
  const [resourcesRead, setResourcesRead] = useState(0);
  const [avgMood, setAvgMood] = useState(0);
  const [selectedMood, setSelectedMood] = useState(null);

  /* =========================
     Load Data on Mount
  ========================= */
  useEffect(() => {
    const savedMoods = JSON.parse(localStorage.getItem("moods")) || [];
    const readCount = parseInt(localStorage.getItem("resourcesRead")) || 0;

    setResourcesRead(readCount);

    if (savedMoods.length > 0) {
      const total = savedMoods.reduce((a, b) => a + b, 0);
      setAvgMood((total / savedMoods.length).toFixed(1));
      setStreak(savedMoods.length);
    }
  }, []);

  /* =========================
     Log Mood
  ========================= */
  const logMood = () => {
    if (!selectedMood) return alert("Please select a mood first.");

    const previous = JSON.parse(localStorage.getItem("moods")) || [];
    const updated = [...previous, selectedMood];

    localStorage.setItem("moods", JSON.stringify(updated));

    const total = updated.reduce((a, b) => a + b, 0);
    setAvgMood((total / updated.length).toFixed(1));
    setStreak(updated.length);

    setSelectedMood(null);
  };
  

  return (
    <div className="dashboard-container">

      {/* Welcome */}
      <h1 className="welcome">Welcome back, User 👋</h1>
      <p className="subtitle">
        Here's your mental wellness overview for today
      </p>

      {/* Top Stats */}
      <div className="stats-grid">

        <div className="stat-card purple">
          <h4>Check-in Streak</h4>
          <h2>{streak} days</h2>
        </div>

        <div className="stat-card pink">
          <h4>Sessions This Month</h4>
          <h2>{sessions}</h2>
        </div>

        <div className="stat-card blue">
          <h4>Resources Read</h4>
          <h2>{resourcesRead}</h2>
        </div>

        <div className="stat-card green">
          <h4>Avg. Mood Score</h4>
          <h2>{avgMood}</h2>
        </div>

      </div>

      {/* Main Layout */}
      <div className="main-grid">

        {/* LEFT COLUMN */}
        <div>

          {/* Mood Check */}
          <div className="card">
            <h3>Daily Mood Check-In</h3>
            <p className="small-text">How are you feeling today?</p>

            <div className="mood-row">
              {[
                { label: "Great", value: 9 },
                { label: "Good", value: 7 },
                { label: "Okay", value: 5 },
                { label: "Low", value: 3 },
                { label: "Struggling", value: 1 }
              ].map((mood) => (
                <div
                  key={mood.label}
                  className={`mood ${mood.label.toLowerCase()} ${
                    selectedMood === mood.value ? "active-mood" : ""
                  }`}
                  onClick={() => setSelectedMood(mood.value)}
                >
                  {mood.label}
                </div>
              ))}
            </div>

            <button
              className="primary-btn full-width"
              onClick={logMood}
            >
              Log Today's Mood
            </button>
          </div>

          {/* Weekly Overview */}
          <div className="card">
            <h3>Your Week at a Glance</h3>
            <div className="week-row">
              <div className="day">Mon 😊</div>
              <div className="day">Tue 😐</div>
              <div className="day">Wed 🙂</div>
              <div className="day">Thu 😊</div>
              <div className="day">Fri 🙂</div>
              <div className="day">Sat 😐</div>
              <div className="day">Sun ?</div>
            </div>
          </div>

          {/* Wellness Goals */}
          <div className="card">
            <h3>Your Wellness Goals</h3>

            <div className="goal">
              <span>Daily meditation</span>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: "65%" }}></div>
              </div>
            </div>

            <div className="goal">
              <span>Mood tracking</span>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: "85%" }}></div>
              </div>
            </div>

            <div className="goal">
              <span>Sleep schedule</span>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: "40%" }}></div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card">
            <h3>Recent Activity</h3>
            <ul className="activity-list">
              <li>Completed mood check-in</li>
              <li>Read article: Managing Exam Stress</li>
              <li>Contacted counselor</li>
            </ul>
          </div>

        </div>

        {/* RIGHT COLUMN */}
        <div>

          <div className="card">
            <h3>Quick Actions</h3>

            <button
              className="outline-btn"
              onClick={() => navigate("/support")}
            >
              Request Support
            </button>

            <button
              className="outline-btn"
              onClick={() => navigate("/resources")}
            >
              Browse Resources
            </button>

            <button
              className="outline-btn"
              onClick={() => navigate("/self-test")}
            >
              Take Assessment
            </button>

          </div>

          <div className="card">
            <h3>Upcoming Sessions</h3>
            <p>Counseling Session - Feb 22, 2:00 PM</p>
            <p>Group Therapy - Feb 25, 4:30 PM</p>
          </div>

          <div className="quote-card">
            "Taking care of yourself doesn't mean me first, it means me too."
            <br /> — L.R. Knost
          </div>

        </div>

      </div>

    </div>
  );
}