import { useState, useEffect } from "react";
import "./AddQuestion.css";

function AddQuestion() {
    const [categories, setCategories] = useState(["Prophets", "Islamic History", "Quran", "Islamic Law", "Tabligh"]);
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    const [selectedPoints, setSelectedPoints] = useState(100);
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [questions, setQuestions] = useState([]);
    const [showWarning, setShowWarning] = useState(false);
    const [existingQuestion, setExistingQuestion] = useState(null);

    // Fetch existing questions from backend
    useEffect(() => {
        fetch("http://localhost:5000/questions")
            .then((res) => res.json())
            .then((data) => setQuestions(data))
            .catch((error) => console.error("Error fetching questions:", error));
    }, []);

    // Function to check if a slot is occupied
    const getQuestion = (category, points) => {
        return questions.find(q => q.category === category && q.points === points) || null;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const existing = getQuestion(selectedCategory, selectedPoints);

        if (existing) {
            setExistingQuestion(existing);
            setShowWarning(true);
        } else {
            saveQuestion();
        }
    };

    // Function to save or overwrite a question
    const saveQuestion = async () => {
        const existing = getQuestion(selectedCategory, selectedPoints);

        if (existing) {
            await fetch(`http://localhost:5000/questions/${existing._id}`, { method: "DELETE" });
        }

        await fetch("http://localhost:5000/questions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ category: selectedCategory, points: selectedPoints, question, answer }),
        });

        setQuestions([...questions.filter(q => q._id !== existing?._id), { category: selectedCategory, points: selectedPoints, question, answer }]);
        setShowWarning(false);
        setQuestion("");
        setAnswer("");
    };

    return (
        <div className="add-question-container">
            <h2>Add a Question</h2>

            <form onSubmit={handleSubmit}>
                <label>Category:</label>
                <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>

                <label>Points:</label>
                <select value={selectedPoints} onChange={(e) => setSelectedPoints(Number(e.target.value))}>
                    {[100, 200, 300, 400, 500].map(points => <option key={points} value={points}>{points}</option>)}
                </select>

                <label>Question:</label>
                <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} required />

                <label>Answer:</label>
                <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} required />

                <button type="submit">Add Question</button>
            </form>

            <h2>Jeopardy Board</h2>
            <div className="legend">
                <span className="empty-slot"></span> Empty Slot
                <span className="occupied-slot"></span> Occupied Slot
            </div>

            <div className="board">
                {categories.map(category => (
                    <div key={category} className="category-column">
                        <h3>{category}</h3>
                        {[100, 200, 300, 400, 500].map(points => {
                            const existing = getQuestion(category, points);
                            return (
                                <button
                                    key={points}
                                    className={existing ? "occupied" : "empty"}
                                    onClick={() => {
                                        setSelectedCategory(category);
                                        setSelectedPoints(points);
                                    }}
                                >
                                    {points}
                                </button>
                            );
                        })}
                    </div>
                ))}
            </div>

            {showWarning && (
                <div className="warning-modal">
                    <p>Are you sure you wish to replace the already existing question with a new one?</p>
                    <button onClick={saveQuestion}>Yes</button>
                    <button onClick={() => setShowWarning(false)}>No</button>
                </div>
            )}
        </div>
    );
}

export default AddQuestion;
