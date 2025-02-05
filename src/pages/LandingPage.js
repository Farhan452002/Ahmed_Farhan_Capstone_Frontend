import { Link } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
    return (
        <div className="landing-container">
            <h1>Welcome to Jeopardy!</h1>
            <Link to="/play-game">
                <button className="start-button">Start Game</button>
            </Link>
        </div>
    );
}

export default LandingPage;
