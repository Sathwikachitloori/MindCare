import { useState } from "react";
import "../styles/SelfTest.css";

const questions = [
  "Over the past two weeks, how often have you felt down, depressed, or hopeless?",
  "How often have you had little interest or pleasure in doing things?",
  "How often have you felt nervous or anxious?",
  "How often have you had trouble sleeping?",
  "How often have you felt tired or had low energy?",
  "How often have you had difficulty concentrating?",
  "How often have you felt bad about yourself?",
  "How often have you felt overwhelmed?",
  "How often have you experienced mood swings?",
  "How often have you avoided social interactions?"
];

const options = [
  { label: "Not at all", value: 0 },
  { label: "Several days", value: 1 },
  { label: "More than half the days", value: 2 },
  { label: "Nearly every day", value: 3 }
];

export default function SelfTest() {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [finished, setFinished] = useState(false);

  const handleSelect = (value) => {
    const updated = [...answers];
    updated[current] = value;
    setAnswers(updated);
  };

  const nextQuestion = () => {
    if (answers[current] === null) return alert("Please select an option.");

    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
    }
  };

  const prevQuestion = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const totalScore = answers.reduce((a, b) => a + (b || 0), 0);
  const progress = Math.round(((current + 1) / questions.length) * 100);

  /* ---------- START SCREEN ---------- */
  if (!started) {
    return (
      <div className="assessment-container">
        <h1>Mental Health Self-Assessment</h1>
        <p className="subtitle">
          A confidential questionnaire to help you understand your current mental well-being.
        </p>

        <div className="info-box">
          <h3>Before You Begin:</h3>
          <ul>
            <li>This assessment takes about 5 minutes</li>
            <li>Answer honestly based on the past two weeks</li>
            <li>Your responses are private</li>
            <li>This is not a diagnostic tool</li>
          </ul>
        </div>

        <button className="primary-btn" onClick={() => setStarted(true)}>
          Start Assessment
        </button>
      </div>
    );
  }

  /* ---------- RESULT SCREEN ---------- */
  if (finished) {
    return (
      <div className="assessment-container">
        <h2>Your Results</h2>
        <p className="score">Total Score: {totalScore}</p>

        {totalScore <= 10 && (
          <p>You seem to be managing well. Keep maintaining healthy habits.</p>
        )}
        {totalScore > 10 && totalScore <= 20 && (
          <p>You may be experiencing moderate stress. Consider relaxation and support.</p>
        )}
        {totalScore > 20 && (
          <p>Your responses suggest higher distress. Seeking professional support may help.</p>
        )}

        <button className="primary-btn" onClick={() => window.location.reload()}>
          Retake Assessment
        </button>
      </div>
    );
  }

  /* ---------- QUESTION SCREEN ---------- */
  return (
    <div className="assessment-container">

      <div className="progress-header">
        <span>Question {current + 1} of {questions.length}</span>
        <span>{progress}% Complete</span>
      </div>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>

      <h3 className="question">{questions[current]}</h3>

      <div className="options">
        {options.map((opt) => (
          <div
            key={opt.label}
            className={`option ${answers[current] === opt.value ? "selected" : ""}`}
            onClick={() => handleSelect(opt.value)}
          >
            {opt.label}
          </div>
        ))}
      </div>

      <div className="nav-buttons">
        <button onClick={prevQuestion} disabled={current === 0}>
          Previous
        </button>
        <button className="primary-btn" onClick={nextQuestion}>
          {current === questions.length - 1 ? "Finish" : "Next"}
        </button>
      </div>

    </div>
  );
}