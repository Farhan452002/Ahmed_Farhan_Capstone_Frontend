import "./PlayGame.css";

function PlayGame() {
    const categories = ["History", "Science", "Geography", "Sports", "Movies"];
    const points = [100, 200, 300, 400, 500];

    return (
        <div>
            <h2>Jeopardy Game</h2>
            <div className="board">
                {categories.map((category, catIndex) => (
                    <div key={catIndex} className="category-column">
                        <div className="category-header">{category}</div>
                        {points.map((point, pointIndex) => (
                            <div key={pointIndex} className="question-box">
                                ${point}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PlayGame;
