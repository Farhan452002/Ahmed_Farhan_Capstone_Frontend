import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import PlayGame from "./pages/PlayGame";
import AddQuestion from "./pages/AddQuestion";
import ViewQuestions from "./pages/ViewQuestions";
import "./App.css";

function App() {
    return (
        <Router>
            <div className="container">
                <nav className="navbar">
                    <Link to="/">Play Game</Link>
                    <Link to="/add-question">Add Question</Link>
                    <Link to="/view-questions">View Questions</Link>
                </nav>

                <h1>Jeopardy Board Game</h1>

                <Routes>
                    <Route path="/" element={<PlayGame />} />
                    <Route path="/add-question" element={<AddQuestion />} />
                    <Route path="/view-questions" element={<ViewQuestions />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
