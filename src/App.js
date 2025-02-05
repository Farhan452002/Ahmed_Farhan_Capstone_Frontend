import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PlayGame from "./pages/PlayGame";
import AddQuestion from "./pages/AddQuestion";
import "./App.css";

function App() {
    return (
        <Router>
            <div className="container">
                <h1>Jeopardy Board Game</h1>
                <Routes>
                    <Route path="/" element={<PlayGame />} />
                    <Route path="/add-question" element={<AddQuestion />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
