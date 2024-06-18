import { useEffect, useState } from "react";
import "../styles/style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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
    navigate("/notes/");
  };

  useEffect(() => {
    fetchNotes(); // Fetch notes on component mount
  }, []);
  return (
    <div>
      <h1>Notes</h1>
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <ul>
          {data.map((note) => (
            <li key={note.id}>
              <Link to={`/notes/${note.id}`}>
                {note.heading} - {note.writer} (created:{" "}
                {note.created_at.slice(0, 10)})
              </Link>
            </li>
          ))}
        </ul>
      )}
      <button onClick={handleCreateNoteClick}>New Note</button>
    </div>
  );
};

export default Notes;
