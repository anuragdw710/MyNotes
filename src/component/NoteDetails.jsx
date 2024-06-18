import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/style.css";
import { useNavigate } from "react-router-dom";

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
        const response = await axios.get(
          `http://127.0.0.1:8000/todo/notes/${id}`
        );
        console.log("Note details:", response.data);
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

      const response = await axios.put(
        `http://127.0.0.1:8000/todo/notes/${id}`,
        updateData
      );

      console.log("Note updated successfully:", response.data);
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
      await axios.delete(`http://127.0.0.1:8000/todo/notes/${id}`);
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
              <h2>{note.heading}</h2>
              <p>Created by: {note.writer}</p>
              <p>{note.description}</p>
              <p>Created at: {note.created_at.slice(0, 10)}</p>
              <button onClick={handleEditClick}>Edit</button>
              <button onClick={handleDeleteNote}>Delete</button>
            </>
          ) : (
            <>
              <h2>Edit Note</h2>
              <input
                type="text"
                name="heading"
                value={updatedHeading}
                onChange={handleInputChange}
                className="edit-input"
              />
              <textarea
                name="description"
                value={updatedDescription}
                onChange={handleInputChange}
                className="edit-textarea"
              />
              <button onClick={handleUpdateNote}>Save Changes</button>
              <button onClick={handleEditClick}>Cancel</button>
            </>
          )}
        </div>
      ) : (
        <p>Loading note details...</p>
      )}
    </div>
  );
};

export default NoteDetails;
