import { useState } from "react";

export default function MoodTracker() {
  const [mood, setMood] = useState("");

  const saveMood = () => {
    localStorage.setItem("mood", mood);
    alert("Mood Saved!");
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Track Your Mood</h2>
        <select onChange={(e) => setMood(e.target.value)}>
          <option>Select Mood</option>
          <option>Happy</option>
          <option>Neutral</option>
          <option>Sad</option>
        </select>
        <br /><br />
        <button onClick={saveMood}>Save</button>
      </div>
    </div>
  );
}