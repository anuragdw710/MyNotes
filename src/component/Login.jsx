import "../styles/style.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const data = {
        username: username,
        password: password,
      };
      const response = await axios.post(
        "https://notesbackend-oxk3.onrender.com/auth/jwt/create/",
        data
      );
      const { access } = response.data;
      localStorage.setItem("jwtToken", access);
      navigate("/");
    } catch (err) {
      console.log("Login error-----------------", err?.response?.data.detail);
      if (err?.response?.data) setError(err.response.data.detail);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    setError("");
  }, []);

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Login"}
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}

export default LoginPage;
