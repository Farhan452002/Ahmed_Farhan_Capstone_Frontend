import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import PlayGame from "./pages/PlayGame";
import AddQuestion from "./pages/AddQuestion";
import ViewQuestions from "./pages/ViewQuestions";
import EditQuestions from "./pages/EditQuestions";
import "./App.css";

function App() {
    return (
        <Router>
            <div className="container">
                <Routes>
                    {/* Landing Page Route */}
                    <Route path="/" element={<LandingPage />} />
                </Routes>

                {/* Show Navbar Only If Not on Landing Page */}
                <Routes>
                    <Route
                        path="/*"
                        element={
                            <>
                                <nav className="navbar">
                                    <Link to="/play-game" className="nav-button">Play Game</Link>
                                    <Link to="/add-question" className="nav-button">Add Question</Link>
                                    <Link to="/view-questions" className="nav-button">View Questions</Link>
                                    <Link to="/edit-questions" className="nav-button">Edit Questions</Link>
                                </nav>

                                <Routes>
                                    <Route path="/play-game" element={<PlayGame />} />
                                    <Route path="/add-question" element={<AddQuestion />} />
                                    <Route path="/view-questions" element={<ViewQuestions />} />
                                    <Route path="/edit-questions" element={<EditQuestions />} />
                                </Routes>
                            </>
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
