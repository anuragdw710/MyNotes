import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/style.css"; // Assuming your CSS file is named style.css

const Notes = () => {
  const [data, setdata] = useState([]);
  const [error, setError] = useState(null); // State for error handling
  const navigate = useNavigate();

  const fetchNotes = async () => {
    const jwtToken = localStorage.getItem("jwtToken");

    if (!jwtToken) {
      // No JWT token present, redirect to login
      setError("You need to login to view notes.");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.get("http://127.0.0.1:8000/todo/notes/", {
        headers: {
          Authorization: `JWT ${jwtToken}`,
        },
      });
      console.log(response.data);
      setdata(response.data);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error("Error fetching notes:", error);
      setError("Failed to retrieve notes."); // Set user-friendly error message
      navigate("/login");
    }
  };

  const handleCreateNoteClick = () => {
    navigate("/notes/"); // Corrected path for creating a new note
  };

  useEffect(() => {
    fetchNotes(); // Fetch notes on component mount
  }, []);

  return (
    <div className="note">
      <h1 className="heading-note">Notes</h1>
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <ul>
          {data.map((note) => (
            <li key={note.id} className="notelist">
              <Link to={`/notes/${note.id}`} className="link notelink">
                <h2>{note.heading}</h2>
                <p>{note.created_at.slice(0, 10)}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
      <div className="newnote">
        <button onClick={handleCreateNoteClick}>Create New Note</button>
      </div>
    </div>
  );
};

export default Notes;
