import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const CreateNote = () => {
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const jwtToken = localStorage.getItem("jwtToken");

    if (!jwtToken) {
      // No JWT token present, handle error
      console.error("Missing JWT token");
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/todo/notes/",
        { heading: heading, description: description },
        {
          headers: {
            Authorization: `JWT ${jwtToken}`,
          },
        }
      );

      console.log("Note created successfully:", response.data);
      navigate("/"); // Redirect to notes list on successful creation
    } catch (error) {
      console.error("Error creating note:", error);
      // Handle errors here (e.g., display error message)
    }
  };

  return (
    <div className="note-details">
      <div>
        <h2>Create Note</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="heading">Heading:</label>
          <input
            type="text"
            id="heading"
            name="heading"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            className="edit-input"
          />
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            className="create-note-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="note-button-box">
            <button type="submit">Create Note</button>
          </div>
        </form>
      </div>
      <Link to="/" className="back-link">
        Back
      </Link>
    </div>
  );
};

export default CreateNote;
