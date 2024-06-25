import { Link } from "react-router-dom";

const NotesList = ({ data, error }) => {
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
    </div>
  );
};

export default NotesList;
