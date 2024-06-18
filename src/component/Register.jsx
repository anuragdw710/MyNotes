import "../styles/style.css";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { email, username, password, first_name, last_name };
    console.log(data);

    axios
      .post("http://127.0.0.1:8000/auth/users/", data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response.data);
        setError("error----", error.response.data);
      });
  };

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
        <button type="submit">Register</button>
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
