import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/style.css";
import { Link, useNavigate } from "react-router-dom";

const NoteDetails = () => {
  const [note, setNote] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // State for edit mode
  const { id } = useParams(); // Get note ID from URL
  const navigate = useNavigate();

  const [updatedHeading, setUpdatedHeading] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const jwtToken = localStorage.getItem("jwtToken");

        if (!jwtToken) {
          // No JWT token present, redirect to login
          setError("You need to login to view notes.");
          navigate("/login");
          return;
        }
        const response = await axios.get(
          `https://notesbackend-oxk3.onrender.com/todo/notes/${id}`,
          {
            headers: {
              Authorization: `JWT ${jwtToken}`,
            },
          }
        );
        // console.log("Note details:", response.data);
        setNote(response.data);
        setError(null);
        setUpdatedHeading(response.data.heading); // Set initial values for editing
        setUpdatedDescription(response.data.description);
      } catch (error) {
        console.error("Error fetching note:", error);
        setError("Failed to retrieve note details.");
      }
    };

    fetchNote();
  }, [id]);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "heading") {
      setUpdatedHeading(value);
    } else if (name === "description") {
      setUpdatedDescription(value);
    }
  };

  const handleUpdateNote = async () => {
    try {
      const updateData = {
        heading: updatedHeading,
        description: updatedDescription,
      };
      const jwtToken = localStorage.getItem("jwtToken");

      if (!jwtToken) {
        // No JWT token present, redirect to login
        setError("You need to login to view notes.");
        navigate("/login");
        return;
      }

      const response = await axios.put(
        `https://notesbackend-oxk3.onrender.com/todo/notes/${id}`,
        {
          headers: {
            Authorization: `JWT ${jwtToken}`,
          },
        },
        updateData
      );

      // console.log("Note updated successfully:", response.data);
      setNote(response.data); // Update local state with updated note
      setIsEditing(false); // Exit edit mode
    } catch (error) {
      console.error("Error updating note:", error);
      setError("Failed to update note.");
    }
  };
  const handleDeleteNote = async () => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (!confirmation) return; // Exit if user cancels deletion

    try {
      const jwtToken = localStorage.getItem("jwtToken");

      if (!jwtToken) {
        // No JWT token present, redirect to login
        setError("You need to login to view notes.");
        navigate("/login");
        return;
      }
      await axios.delete(
        `https://notesbackend-oxk3.onrender.com/todo/notes/${id}`,
        {
          headers: {
            Authorization: `JWT ${jwtToken}`,
          },
        }
      );
      console.log("Note deleted successfully.");
      navigate("/");
      // Redirect to a proper location after deletion (e.g., notes list)
      // You can use `useNavigate` from react-router-dom for this
    } catch (error) {
      console.error("Error deleting note:", error);
      setError("Failed to delete note.");
    }
  };

  return (
    <div className="note-details">
      {error ? (
        <p className="error-message">{error}</p>
      ) : note ? (
        <div>
          {!isEditing ? (
            <>
              <div className="note-text">
                <h2>{note.heading}</h2>
                <div className="note-detail">
                  <p>Created by: {note.writer}</p>
                  <p>Created at: {note.created_at.slice(0, 10)}</p>
                </div>
                <p>{note.description}</p>
              </div>
              <div className="note-button-box">
                <button onClick={handleEditClick}>Edit</button>
                <button onClick={handleDeleteNote}>Delete</button>
              </div>
            </>
          ) : (
            <>
              <h2>Edit Note</h2>
              <form>
                <label htmlFor="heading">Heading:</label>
                <input
                  type="text"
                  name="heading"
                  value={updatedHeading}
                  onChange={handleInputChange}
                  className="edit-input"
                />
                <label htmlFor="description">Description:</label>
                <textarea
                  name="description"
                  value={updatedDescription}
                  onChange={handleInputChange}
                  className="create-note-textarea"
                />
                <div className="note-button-box">
                  <button onClick={handleUpdateNote}>Save Changes</button>
                  <button onClick={handleEditClick}>Cancel</button>
                </div>
              </form>
            </>
          )}
        </div>
      ) : (
        <p>Loading note details...</p>
      )}
      <Link to="/" className="back-link">
        Back
      </Link>
    </div>
  );
};

export default NoteDetails;
