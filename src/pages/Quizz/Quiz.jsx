import React, { useState, useEffect } from "react";
import "./Quiz.css";
import { useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { base_url } from "../../utils/apiroute";
import bussiness from "../../assets/bussiness.svg";
import Navbar from "../../component/Navbar/Navbar";
import toast from "react-hot-toast";

const Quiz = () => {
  const location = useLocation();
  const quizData = location.state.quizData;

  const questions = quizData.questions;

  const excerciseId = quizData._id;
  const difficulty = quizData.difficultLevel;
  const name = quizData.name;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);

  const token = localStorage.getItem("auth-token");
  const userId = jwt_decode(token).userId;

  const handleOptionSelect = (optionIndex) => {
    setSelectedOption(optionIndex);
  };

  const handleNextQuestion = () => {
    if (selectedOption !== null) {
      if (
        quizData.questions[currentQuestion].correctOption === selectedOption
      ) {
        setScore((prev) => prev + quizData.questions[currentQuestion].mark);
      }

      if (currentQuestion === questions.length - 1) {
        handleSubmit(score);
      }

      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    }
  };
  const handleSubmit = (s) => {
    console.log(s);
    axios
      .post(`${base_url}/user/updateScore`, {
        userId,
        excerciseId,
        score:s,
        name,
        difficulty,
      })
      .then((res) => {
        toast.success("Test Submitted ")
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Somethinng Went Wrong");
      });
    setCurrentQuestion(currentQuestion + 1);
    setSelectedOption(null);
  };

  const scorePerQuestion=difficulty==='Easy'?1:difficulty==='Hard'?4:2;

  return (
    <div className='layout-container'>
    <div className="top-container">
      <Navbar />
    </div>
    <div className="bottom-container">
    
    
    <div className="quiz-app">
      <div className="quiz-container">
      <h2>{quizData.name}</h2>
      <span className={`difficult-${quizData.difficultLevel}`}>
      {quizData.difficultLevel}
      </span>
      </div>
     

    

      {currentQuestion < quizData.questions.length ? (
        <div className="question-container">
          <div className="main-question-container">
          <p>
            {currentQuestion + 1 + " ) "}
            {quizData.questions[currentQuestion].questionText}
          </p>
          <p>Question Attemted : {currentQuestion}</p>
          </div>
          <div className="option-containier">
          <ul>
            {quizData.questions[currentQuestion].options.map(
              (option, index) => (
                <li
                  key={index}
                  onClick={() => handleOptionSelect(index)}
                  className={selectedOption === index ? "selected" : ""}
                >
                  {option}
                </li>
              )
            )}
          </ul>
          </div>
         
          <div className="button-container">
            <button onClick={handleNextQuestion} className="next-button">
              {currentQuestion===questions.length-1?"Submit":'Next'}
            </button>
          </div>
        </div>
      ) : (
        <div className="quiz-result">
          <div className="left-container">
            <img style={{
              height:"300",width:"300"
            }} src={bussiness} alt="bussiness"/>
          </div>
          <div className="right-container">
          <h2 style={{color:'black'}}>Quiz Completed!</h2>
          <p>Your Score: {score}</p>
          <p style={{color:"green"}}>Total correct : {score/Number(scorePerQuestion)}</p>
          <p style={{color:"red"}}>Wrong : {(questions.length-score/Number(scorePerQuestion))}</p>
          </div>
        
        </div>
      )}
    </div>
    </div>
  </div>
  );
};

export default Quiz;
