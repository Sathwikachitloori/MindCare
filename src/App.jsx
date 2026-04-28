import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [generatedCaptcha, setGeneratedCaptcha] = useState("35715");
  const [errors, setErrors] = useState({});
  const [isLogin, setIsLogin] = useState(true);

  const navigate = useNavigate();

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validatePassword = (password) =>
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password);

  const generateCaptcha = () => {
    const newCaptcha = Math.floor(10000 + Math.random() * 90000).toString();
    setGeneratedCaptcha(newCaptcha);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!validateEmail(email)) newErrors.email = "Invalid email format.";
    if (!validatePassword(password))
      newErrors.password =
        "Password must be 8+ chars, include uppercase, lowercase, number & special character.";
    if (!isLogin && password !== confirmPassword)
      newErrors.confirm = "Passwords do not match.";
    if (captchaAnswer !== generatedCaptcha)
      newErrors.captcha = "Captcha incorrect.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        let res;
        if (isLogin) {
          res = await API.post("/auth/login", { email, password });
        } else {
          res = await API.post("/auth/register", {
            name: "User",
            email,
            password,
          });
        }

        if (res.data && res.data.token) {
          localStorage.setItem("token", res.data.token);
          navigate("/dashboard", { replace: true });
        } else {
          alert("Login failed: No token received");
        }
      } catch (err) {
        alert(err.response?.data?.message || err.message);
      }
    } else {
      generateCaptcha();
      setCaptchaAnswer("");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "2rem" }}>
      <h2>{isLogin ? "Login" : "Register"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}

        {!isLogin && (
          <>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirm && <p style={{ color: "red" }}>{errors.confirm}</p>}
          </>
        )}

        <p>Captcha: {generatedCaptcha}</p>
        <input
          type="text"
          placeholder="Enter Captcha"
          value={captchaAnswer}
          onChange={(e) => setCaptchaAnswer(e.target.value)}
        />
        {errors.captcha && <p style={{ color: "red" }}>{errors.captcha}</p>}

        <button type="submit">{isLogin ? "Login" : "Register"}</button>
      </form>

      <p>
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Sign Up" : "Login"}
        </button>
      </p>
    </div>
  );
}

export default App;
