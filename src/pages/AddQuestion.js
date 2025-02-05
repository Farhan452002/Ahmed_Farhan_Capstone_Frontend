import { useState } from "react";
import axios from "axios";
import "./AddQuestion.css";

function AddQuestion() {
    const [questionData, setQuestionData] = useState({
        category: "",
        question: "",
        answer: "",
        points: ""
    });

    const handleChange = (e) => {
        setQuestionData({ ...questionData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/questions", questionData);
            alert("Question Added!");
            setQuestionData({ category: "", question: "", answer: "", points: "" });
        } catch (error) {
            console.error("Error adding question:", error);
        }
    };

    return (
        <div>
            <h2>Add a Question</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="category" placeholder="Category" value={questionData.category} onChange={handleChange} required />
                <input type="text" name="question" placeholder="Question" value={questionData.question} onChange={handleChange} required />
                <input type="text" name="answer" placeholder="Answer" value={questionData.answer} onChange={handleChange} required />
                <input type="number" name="points" placeholder="Points" value={questionData.points} onChange={handleChange} required />
                <button type="submit">Add Question</button>
            </form>
        </div>
    );
}

export default AddQuestion;
