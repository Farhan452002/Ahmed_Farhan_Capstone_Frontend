import { useState, useEffect } from "react";
import "./PlayGame.css"; // Ensure you style the board properly

function PlayGame() {
    const [questions, setQuestions] = useState([]);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [showAnswer, setShowAnswer] = useState(false);

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

    // Handle clicking a button
    const handleQuestionClick = (category, points) => {
        const question = getQuestion(category, points);
        setSelectedQuestion(question);
        setShowAnswer(false);
    };

    return (
        <div className="game-container">
            <h2>Jeopardy Board</h2>
            <div className="board">
                {categories.map(category => (
                    <div key={category} className="category-column">
                        <h3>{category}</h3>
                        {[100, 200, 300, 400, 500].map(points => (
                            <button key={points} onClick={() => handleQuestionClick(category, points)}>
                                {points}
                            </button>
                        ))}
                    </div>
                ))}
            </div>

            {selectedQuestion !== null && (
                <div className="question-modal">
                    <h3>Question:</h3>
                    <p>{selectedQuestion ? selectedQuestion.question : "Please Add a Question"}</p>
                    
                    {selectedQuestion && (
                        <button onClick={() => setShowAnswer(true)}>Show Answer</button>
                    )}

                    {showAnswer && selectedQuestion && (
                        <p><strong>Answer:</strong> {selectedQuestion.answer}</p>
                    )}

                    <button onClick={() => setSelectedQuestion(null)}>Close</button>
                </div>
            )}
        </div>
    );
}

export default PlayGame;
