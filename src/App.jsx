import "./App.css";
import Register from "./component/Register";
import Login from "./component/Login";
import Notes from "./component/Notes";
import NoteDetails from "./component/NoteDetails";
import CreateNote from "./component/CreateNote";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";

function App() {
  return (
    <div className="outer">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Notes />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/notes/:id" element={<NoteDetails />} />
          <Route path="/notes" element={<CreateNote />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
