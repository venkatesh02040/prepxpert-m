import React, { useEffect, useState } from 'react';
import { FaChartBar, FaRedo, FaHome } from "react-icons/fa"; // Importing icons
import "./FinishScreen.css";

const FinishScreen = ({ dispatch }) => {
    const [userId, setUserId] = useState(null);

    // Fetch user details from localStorage on mount
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUserId(storedUser.id);
        }
    }, []);

    // Function to reset scores in JSON Server and localStorage
    const resetScores = async () => {
        const resetData = {
            communication_score: 0,
            aptitude_score: 0,
            technical_score: 0,
            overall_score: 0
        };

        try {
            if (!userId) {
                console.warn("⚠️ User ID not found, cannot reset scores.");
                return;
            }

            // Update JSON Server
            const response = await fetch(`https://new-quiz-repo.onrender.com/users/${userId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(resetData)
            });

            if (!response.ok) throw new Error("Failed to reset scores");

            // Update localStorage
            const storedUser = JSON.parse(localStorage.getItem("user")) || {};
            localStorage.setItem("user", JSON.stringify({ ...storedUser, ...resetData }));

            console.log("Scores reset successfully!");

            // Dispatch action to restart quiz
            dispatch({ type: "restartQuiz" });

        } catch (error) {
            console.error("Error resetting scores:", error);
        }
    };

    return (
        <div className="finish-container">
            <h2>Quiz Completed!</h2>
            <p className="congrats-message">Well done! You have successfully completed the quiz.</p>

            <div className="btn-group">
                <button className="btn score-btn" onClick={() => window.location.href = "/dashboard/score-analytics"}>
                    <FaChartBar className="btn-icon" /> View Scores
                </button>
                <button className="btn restart-btn" onClick={resetScores}>
                    <FaRedo className="btn-icon" /> Restart Quiz
                </button>
                <button className="btn dashboard-btn" onClick={() => window.location.href = "/dashboard"}>
                    <FaHome className="btn-icon" /> Go to Dashboard
                </button>
            </div>
        </div>
    );
};

export default FinishScreen;
