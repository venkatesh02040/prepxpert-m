import React from 'react'
import "./StartScreen.css";

const StartScreen = ({ dispatch, totalQuestions, maxPossiblePoints }) => {
  return (
    <div className='quiz_wrapper'>
      <h3>Welcome to</h3>
      <h2>PrepXpert Assessment</h2>
      <p>Number of questions: {totalQuestions || "Loading..."}</p>
      <p>Total points: {maxPossiblePoints || "Calculating..."}</p>
      <button className='s-btn' onClick={() => dispatch({ type: "active" })}>
        Let's Start the Test
      </button>
    </div>
  );
};

export default StartScreen;
