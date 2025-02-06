import { useState, useEffect } from "react";
import "./ViewQuestions.css";

function ViewQuestions() {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/questions")
            .then((res) => res.json())
            .then((data) => setQuestions(data))
            .catch((error) => console.error("Error fetching questions:", error));
    }, []);

    // Group questions by category
    const groupedQuestions = {};
    questions.forEach((q) => {
        if (!groupedQuestions[q.category]) {
            groupedQuestions[q.category] = [];
        }
        groupedQuestions[q.category].push(q);
    });

    return (
        <div className="view-questions-container">
            <h2>All Questions</h2>
            <div className="questions-table">
                {Object.keys(groupedQuestions).map((category) => (
                    <div key={category} className="category-table">
                        <h3>{category}</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Points</th>
                                    <th>Question</th>
                                    <th>Answer</th>
                                </tr>
                            </thead>
                            <tbody>
                                {groupedQuestions[category].map((q) => (
                                    <tr key={q._id}>
                                        <td>{q.points}</td>
                                        <td>{q.question}</td>
                                        <td>{q.answer}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ViewQuestions;
