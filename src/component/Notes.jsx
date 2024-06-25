import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/style.css"; // Assuming your CSS file is named style.css

const Notes = () => {
  const [data, setdata] = useState([]);
  const [error, setError] = useState(null); // State for error handling
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const fetchNotes = async () => {
    const jwtToken = localStorage.getItem("jwtToken");

    if (!jwtToken) {
      // No JWT token present, redirect to login
      setError("You need to login to view notes.");
      navigate("/login");
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://notesbackend-oxk3.onrender.com/todo/notes/",
        {
          headers: {
            Authorization: `JWT ${jwtToken}`,
          },
        }
      );
      // console.log(response.data);
      setdata(response.data);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error("Error fetching notes:", error);
      setError("Failed to retrieve notes."); // Set user-friendly error message
      navigate("/login");
    } finally {
      setIsLoading(false);
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
      {isLoading && (
        <svg
          width="100"
          height="100"
          viewBox="0 0 200 200"
          style={{ display: "block", margin: "0 auto" }}
        >
          <circle
            fill="#FF156D"
            stroke="#FF156D"
            strokeWidth="15"
            r="15"
            cx="40"
            cy="65"
          >
            <animate
              attributeName="cy"
              calcMode="spline"
              dur="2s"
              values="65;135;65;"
              keyTimes="0;0.5;1"
              keySplines=".5 0 .5 1;.5 0 .5 1"
              repeatCount="indefinite"
              begin="-0.4s" // Adjust timing for bouncing effect
            />
          </circle>
          <circle
            fill="#FF156D"
            stroke="#FF156D"
            strokeWidth="15"
            r="15"
            cx="100"
            cy="65"
          >
            <animate
              attributeName="cy"
              calcMode="spline"
              dur="2s"
              values="65;135;65;"
              keyTimes="0;0.5;1"
              keySplines=".5 0 .5 1;.5 0 .5 1"
              repeatCount="indefinite"
              begin="-0.2s" // Adjust timing for bouncing effect
            />
          </circle>
          <circle
            fill="#FF156D"
            stroke="#FF156D"
            strokeWidth="15"
            r="15"
            cx="160"
            cy="65"
          >
            <animate
              attributeName="cy"
              calcMode="spline"
              dur="2s"
              values="65;135;65;"
              keyTimes="0;0.5;1"
              keySplines=".5 0 .5 1;.5 0 .5 1"
              repeatCount="indefinite"
              begin="0s" // Adjust timing for bouncing effect
            />
          </circle>
        </svg>
      )}
      <div className="newnote">
        <button onClick={handleCreateNoteClick}>Create New Note</button>
      </div>
    </div>
  );
};

export default Notes;
