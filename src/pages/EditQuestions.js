import { useState, useEffect } from "react";
import "./EditQuestions.css";

function EditQuestions() {
    const [questions, setQuestions] = useState([]);
    const [editingQuestion, setEditingQuestion] = useState(null);
    const [editedQuestion, setEditedQuestion] = useState({ question: "", answer: "" });

    useEffect(() => {
        fetch("http://localhost:5000/questions")
            .then((res) => res.json())
            .then((data) => setQuestions(data))
            .catch((error) => console.error("Error fetching questions:", error));
    }, []);

    // Open the edit form with current question details
    const handleEditClick = (q) => {
        setEditingQuestion(q);
        setEditedQuestion({ question: q.question, answer: q.answer });
    };

    // Update question in the database
    const handleSaveEdit = async () => {
        const response = await fetch(`http://localhost:5000/questions/${editingQuestion._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(editedQuestion),
        });

        if (response.ok) {
            setQuestions(
                questions.map((q) =>
                    q._id === editingQuestion._id ? { ...q, ...editedQuestion } : q
                )
            );
            setEditingQuestion(null);
        } else {
            console.error("Failed to update question.");
        }
    };

    // Delete question from the database
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this question?");
        if (!confirmDelete) return;

        const response = await fetch(`http://localhost:5000/questions/${id}`, {
            method: "DELETE",
        });

        if (response.ok) {
            setQuestions(questions.filter((q) => q._id !== id));
        } else {
            console.error("Failed to delete question.");
        }
    };

    return (
        <div className="edit-questions-container">
            <h2>Edit Questions</h2>
            <div className="questions-table">
                {questions.map((q) => (
                    <div key={q._id} className="question-card">
                        <p><strong>Category:</strong> {q.category}</p>
                        <p><strong>Points:</strong> {q.points}</p>
                        <p><strong>Question:</strong> {q.question}</p>
                        <p><strong>Answer:</strong> {q.answer}</p>
                        <button className="edit-btn" onClick={() => handleEditClick(q)}>Edit</button>
                        <button className="delete-btn" onClick={() => handleDelete(q._id)}>Delete</button>
                    </div>
                ))}
            </div>

            {editingQuestion && (
                <div className="edit-popup">
                    <h3>Edit Question</h3>
                    <label>Question:</label>
                    <input
                        type="text"
                        value={editedQuestion.question}
                        onChange={(e) => setEditedQuestion({ ...editedQuestion, question: e.target.value })}
                    />
                    <label>Answer:</label>
                    <input
                        type="text"
                        value={editedQuestion.answer}
                        onChange={(e) => setEditedQuestion({ ...editedQuestion, answer: e.target.value })}
                    />
                    <button className="save-btn" onClick={handleSaveEdit}>Save</button>
                    <button className="cancel-btn" onClick={() => setEditingQuestion(null)}>Cancel</button>
                </div>
            )}
        </div>
    );
}

export default EditQuestions;
