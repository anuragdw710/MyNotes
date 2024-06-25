import "../styles/style.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const data = { email, username, password, first_name, last_name };
      const response = await axios.post(
        "https://notesbackend-oxk3.onrender.com/auth/users/",
        data
      );
      navigate("/login");
    } catch (err) {
      console.log("Login error-----------------", err.response.data);
      if (err?.response?.data) setError(err.response.data);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    setError("");
  }, []);

  return (
    <div className="container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="First Name"
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Register"}
        </button>
      </form>
      {error.email && <p className="error-message">{error.email}</p>}
      {error.username && <p className="error-message">{error.username}</p>}
      {error.password && <p className="error-message">{error.password}</p>}
      {error.first_name && <p className="error-message">{error.first_name}</p>}
      {error.last_name && <p className="error-message">{error.last_name}</p>}
    </div>
  );
};

export default Register;
