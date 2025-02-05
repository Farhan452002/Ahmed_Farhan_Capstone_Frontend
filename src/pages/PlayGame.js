import { useState, useEffect } from "react";
import axios from "axios";
import "./PlayGame.css";

function PlayGame() {
    const [questions, setQuestions] = useState([]);
    const [revealed, setRevealed] = useState({});

    useEffect(() => {
        axios.get("http://localhost:5000/questions")
            .then(response => setQuestions(response.data))
            .catch(error => console.error("Error fetching questions:", error));
    }, []);

    const revealAnswer = (id) => {
        setRevealed(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div>
            <h2>Jeopardy Game</h2>
            <div className="board">
                {questions.map((q) => (
                    <div key={q._id} className="question-box" onClick={() => revealAnswer(q._id)}>
                        {revealed[q._id] ? q.answer : `${q.category} - ${q.points}`}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PlayGame;
