import { useState } from "react";

function AddQuestion() {
    const [category, setCategory] = useState("");
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [points, setPoints] = useState(100);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newQuestion = { category, question, answer, points };

        try {
            const res = await fetch("http://localhost:5000/questions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newQuestion),
            });

            if (res.ok) {
                alert("Question added successfully!");
                setCategory("");
                setQuestion("");
                setAnswer("");
                setPoints(100);
            }
        } catch (error) {
            console.error("Error adding question:", error);
        }
    };

    return (
        <div>
            <h2>Add a Question</h2>
            <form onSubmit={handleSubmit}>
                <label>Category:</label>
                <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
                
                <label>Question:</label>
                <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} required />
                
                <label>Answer:</label>
                <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} required />
                
                <label>Points:</label>
                <input type="number" value={points} onChange={(e) => setPoints(e.target.value)} min="100" max="500" step="100" required />
                
                <button type="submit">Add Question</button>
            </form>
        </div>
    );
}

export default AddQuestion;
