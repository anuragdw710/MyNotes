import "../styles/style.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    const data = {
      username: username,
      password: password,
    };
    axios
      .post("https://notesbackend-oxk3.onrender.com/auth/jwt/create/", data)
      .then((response) => {
        // console.log(response.data);
        const { access } = response.data;
        localStorage.setItem("jwtToken", access);
        navigate("/");
      })
      .catch((error) => {
        // console.log(error.response.data);
        setError("error----", error.response.data);
      });
    // if (isAuthenticated) {
    //   navigate("/dashboard");
    // } else {
    //   console.error("Authentication failed");
    // }
  };

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
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
