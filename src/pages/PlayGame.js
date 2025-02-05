import { useState, useEffect } from "react";

function PlayGame() {
    const [questions, setQuestions] = useState([]);

    // Fetch questions from backend
    useEffect(() => {
        fetch("http://localhost:5000/questions")
            .then((res) => res.json())
            .then((data) => setQuestions(data))
            .catch((error) => console.error("Error fetching questions:", error));
    }, []);

    // Handle delete question
    const deleteQuestion = async (id) => {
        try {
            await fetch(`http://localhost:5000/questions/${id}`, { method: "DELETE" });
            setQuestions(questions.filter((q) => q._id !== id));
        } catch (error) {
            console.error("Error deleting question:", error);
        }
    };

    return (
        <div>
            <h2>Play Jeopardy!</h2>
            <table>
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Question</th>
                        <th>Answer</th>
                        <th>Points</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {questions.map((q) => (
                        <tr key={q._id}>
                            <td>{q.category}</td>
                            <td>{q.question}</td>
                            <td>{q.answer}</td>
                            <td>{q.points}</td>
                            <td>
                                <button onClick={() => deleteQuestion(q._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default PlayGame;
