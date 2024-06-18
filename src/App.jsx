import "./App.css";
import Register from "./component/Register";
import Login from "./component/Login";
import Notes from "./component/Notes";
import NoteDetails from "./component/NoteDetails";
import CreateNote from "./component/CreateNote";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Notes />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/notes/:id" element={<NoteDetails />} />
        <Route path="/notes" element={<CreateNote />} />
      </Routes>
    </Router>
  );
}

export default App;
