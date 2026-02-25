import { Link } from "react-router-dom";
import "../styles/Home.css";

export default function Home() {
  return (
    <div className="home-container">

      {/* Hero Section */}
      <div className="hero">
        <h1>Support Your Mental Well-being</h1>
        <p>
          A safe space for students to reflect, track mood, and access helpful resources.
        </p>
        <Link to="/self-test">
          <button className="primary-btn">Take Self-Assessment</button>
        </Link>
      </div>

      {/* Features Section */}
      <div className="features">
        <div className="feature-card">
          <h3>📝 Journal Your Thoughts</h3>
          <p>Express your emotions privately and reflect on your experiences.</p>
        </div>

        <div className="feature-card">
          <h3>😊 Track Your Mood</h3>
          <p>Monitor emotional patterns and build awareness over time.</p>
        </div>

        <div className="feature-card">
          <h3>📚 Explore Resources</h3>
          <p>Access trusted mental health guidance and self-care tools.</p>
        </div>
      </div>

      {/* Quick Help */}
      <div className="support-box">
        <h3>Need Immediate Support?</h3>
        <p>
          If you're experiencing a crisis, please contact local emergency services
          or reach out to a mental health professional immediately.
        </p>
      </div>

    </div>
  );
}