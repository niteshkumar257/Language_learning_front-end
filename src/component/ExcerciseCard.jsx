import React from "react";
import "./excerciseCard.css";
import { useNavigate } from "react-router-dom";

const ExcerciseCard = ({ ex }) => {
  const navigate = useNavigate();

  const takeTest = () => {
    
    navigate(`/instruction`, {
      state: {
        ex:ex,
      },
    });
  };

  return (
    <div className="exercise-card">
      <div className="left-container">
      <span>{ex.name}</span>
      <p className={`difficult-${ex.difficultLevel}`}>Difficulty: {ex.difficultLevel}</p>
      </div>
      <div className="right-container">
      <button onClick={takeTest} className="take-test-button">
        Take Test
      </button>
      </div>
    
    
    </div>
  );
};

export default ExcerciseCard;
