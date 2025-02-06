import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
    const [numTeams, setNumTeams] = useState(1); // Default to 1 team
    const navigate = useNavigate();

    const handleStartGame = () => {
        navigate("/play-game", { state: { numTeams } }); // Pass numTeams to PlayGame
    };

    return (
        <div className="landing-container">
            <h1>Welcome to Farhan's Islamic Jeopardy!</h1>
            <label htmlFor="teams">Number of Teams:</label>
            <select 
                id="teams" 
                value={numTeams} 
                onChange={(e) => setNumTeams(Number(e.target.value))}
            >
                {[...Array(5)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
            </select>
            <button onClick={handleStartGame}>Start Game</button>
        </div>
    );
}

export default LandingPage;
