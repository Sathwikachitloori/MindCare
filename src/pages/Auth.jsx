import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

export default function Auth() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [generatedCaptcha, setGeneratedCaptcha] = useState({ a: 0, b: 0 });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const a = Math.floor(Math.random() * 10);
    const b = Math.floor(Math.random() * 10);
    setGeneratedCaptcha({ a, b });
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

    if (
      parseInt(captchaAnswer) !==
      generatedCaptcha.a + generatedCaptcha.b
    )
      newErrors.captcha = "Captcha incorrect.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      localStorage.setItem(
        "demoUser",
        JSON.stringify({ email })
      );

      navigate("/dashboard", { replace: true });
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

          <label>
            What is {generatedCaptcha.a} + {generatedCaptcha.b} ?
          </label>
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