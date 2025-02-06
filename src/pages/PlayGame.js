import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./PlayGame.css"; 

function PlayGame() {
    const location = useLocation();
    const numTeams = location.state?.numTeams || 1; // Get the number of teams from the landing page

    const [questions, setQuestions] = useState([]);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [showAnswer, setShowAnswer] = useState(false);
    const [isQuestionAvailable, setIsQuestionAvailable] = useState(true);
    const [teamScores, setTeamScores] = useState(Array(numTeams).fill(0)); // Initialize scores to 0 for each team
    const [clickedButtons, setClickedButtons] = useState({}); // Track clicked buttons to change color

    // Fetch questions from backend
    useEffect(() => {
        fetch("http://localhost:5000/questions")
            .then((res) => res.json())
            .then((data) => setQuestions(data))
            .catch((error) => console.error("Error fetching questions:", error));
    }, []);

    // Get unique categories
    const categories = [...new Set(questions.map((q) => q.category))];

    // Function to get a question based on category and points
    const getQuestion = (category, points) => {
        return questions.find(q => q.category === category && q.points === points) || null;
    };

    // Function to update team scores
    const updateTeamScore = (teamIndex, amount) => {
        setTeamScores((prevScores) =>
            prevScores.map((score, index) => 
                index === teamIndex ? score + amount : score
            )
        );
    };

    // Handle clicking a button
    const handleQuestionClick = (category, points) => {
        const question = getQuestion(category, points);
        if (question) {
            setSelectedQuestion(question);
            setIsQuestionAvailable(true);
        } else {
            setSelectedQuestion({ question: "Please Add a Question", answer: "" });
            setIsQuestionAvailable(false);
        }
        setShowAnswer(false);

        // Change button color to black after click
        setClickedButtons((prev) => ({
            ...prev,
            [`${category}-${points}`]: true
        }));
    };

    // Reset the game (reset points and button colors)
    const resetGame = () => {
        setTeamScores(Array(numTeams).fill(0)); // Reset team scores to 0
        setClickedButtons({}); // Reset all clicked buttons
        setSelectedQuestion(null); // Close the question modal
        setShowAnswer(false); // Hide the answer
    };

    return (
        <div className="game-container">
            <h2>Islamic Jeopardy Game</h2>

            {/* Team Panels */}
            <div className="team-container">
                {teamScores.map((score, index) => (
                    <div key={index} className="team-panel">
                        <h3>Team {index + 1}</h3>
                        <p>Points: {score}</p>
                        <button className="add" onClick={() => updateTeamScore(index, 100)}>+</button>
                        <button className="subtract" onClick={() => updateTeamScore(index, -100)}>-</button>
                    </div>
                ))}
            </div>

            {/* Jeopardy Board */}
            <div className="board">
                {categories.map(category => (
                    <div key={category} className="category-column">
                        <h3>{category}</h3>
                        {[100, 200, 300, 400, 500].map(points => (
                            <button
                                key={points}
                                onClick={() => handleQuestionClick(category, points)}
                                style={{
                                    backgroundColor: clickedButtons[`${category}-${points}`] ? 'black':"yellow",
                                    color: clickedButtons[`${category}-${points}`] ? 'white' : 'black'
                                }}
                            >
                                {points}
                            </button>
                        ))}
                    </div>
                ))}
            </div>

            {/* Question Modal */}
            {selectedQuestion !== null && (
                <div className="question-modal">
                    <h3>Question:</h3>
                    <p>{selectedQuestion.question}</p>
                    
                    {isQuestionAvailable && (
                        <button onClick={() => setShowAnswer(true)}>Show Answer</button>
                    )}

                    {showAnswer && isQuestionAvailable && (
                        <p><strong>Answer:</strong> {selectedQuestion.answer}</p>
                    )}

                    <button onClick={() => setSelectedQuestion(null)}>Close</button>
                </div>
            )}

            {/* Reset Button */}
            <button className="reset-button" onClick={resetGame}>Reset Game</button>
        </div>
    );
}

export default PlayGame;
