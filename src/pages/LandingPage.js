import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="landing-container">
            <h1>Welcome to Jeopardy!</h1>
            <button className="start-button" onClick={() => navigate("/play-game")}>
                Start Game
            </button>
        </div>
    );
}

export default LandingPage;
