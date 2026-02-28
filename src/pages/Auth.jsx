import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

export default function Auth() {
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [generatedCaptcha, setGeneratedCaptcha] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    generateCaptcha();
  }, []);

  useEffect(() => {
    if (generatedCaptcha) drawCaptcha();
  }, [generatedCaptcha]);

  const generateCaptcha = () => {
    const chars = "0123456789";
    let captcha = "";
    for (let i = 0; i < 5; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setGeneratedCaptcha(captcha);
  };

  const drawCaptcha = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background
    ctx.fillStyle = "#f2f2f2";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw random lines (distortion)
    for (let i = 0; i < 5; i++) {
      ctx.strokeStyle = randomColor();
      ctx.beginPath();
      ctx.moveTo(
        Math.random() * canvas.width,
        Math.random() * canvas.height
      );
      ctx.lineTo(
        Math.random() * canvas.width,
        Math.random() * canvas.height
      );
      ctx.stroke();
    }

    // Draw digits
    for (let i = 0; i < generatedCaptcha.length; i++) {
      ctx.save();

      ctx.font = "24px Arial";
      ctx.fillStyle = randomColor();

      const x = 20 + i * 30;
      const y = 35;

      const angle = (Math.random() - 0.5) * 0.5;
      ctx.translate(x, y);
      ctx.rotate(angle);

      ctx.fillText(generatedCaptcha[i], 0, 0);

      ctx.restore();
    }
  };

  const randomColor = () => {
    return `rgb(${Math.floor(Math.random() * 150)},
                ${Math.floor(Math.random() * 150)},
                ${Math.floor(Math.random() * 150)})`;
  };

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password);

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!validateEmail(email))
      newErrors.email = "Invalid email format.";

    if (!validatePassword(password))
      newErrors.password =
        "Password must be 8+ chars, include uppercase, lowercase, number & special character.";

    if (!isLogin && password !== confirmPassword)
      newErrors.confirm = "Passwords do not match.";

    if (captchaAnswer !== generatedCaptcha)
      newErrors.captcha = "Captcha incorrect.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      localStorage.setItem(
        "demoUser",
        JSON.stringify({ email })
      );

      navigate("/home", { replace: true });
    } else {
      generateCaptcha(); // regenerate if wrong
      setCaptchaAnswer("");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>

        <form onSubmit={handleSubmit}>

          <label>Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="error">{errors.email}</p>}

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="error">{errors.password}</p>}

          {!isLogin && (
            <>
              <label>Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
              />
              {errors.confirm && (
                <p className="error">{errors.confirm}</p>
              )}
            </>
          )}

          <label>Enter Captcha</label>

          <div className="captcha-container">
            <canvas
              ref={canvasRef}
              width="180"
              height="50"
              className="captcha-canvas"
            />
            <button
              type="button"
              onClick={generateCaptcha}
              className="refresh-btn"
            >
              ↻
            </button>
          </div>

          <input
            type="text"
            value={captchaAnswer}
            onChange={(e) =>
              setCaptchaAnswer(e.target.value)
            }
          />
          {errors.captcha && (
            <p className="error">{errors.captcha}</p>
          )}

          <button className="primary-btn full-width">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="toggle">
          {isLogin
            ? "Don't have an account?"
            : "Already have an account?"}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? " Sign Up" : " Login"}
          </span>
        </p>
      </div>
    </div>
  );
}