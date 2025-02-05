import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";
import PlayGame from "./pages/PlayGame";
import AddQuestion from "./pages/AddQuestion";
import LandingPage from "./pages/LandingPage";
import "./App.css";

function App() {
    return (
        <Router>
            <div className="container">
                {/* Navbar */}
                <nav className="navbar">
                    <NavLink to="/" className="nav-link" activeclassname="active">
                        Home
                    </NavLink>
                    <NavLink to="/play-game" className="nav-link" activeclassname="active">
                        Play Game
                    </NavLink>
                    <NavLink to="/add-question" className="nav-link" activeclassname="active">
                        Add Question
                    </NavLink>
                </nav>

                {/* Routes */}
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/play-game" element={<PlayGame />} />
                    <Route path="/add-question" element={<AddQuestion />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
