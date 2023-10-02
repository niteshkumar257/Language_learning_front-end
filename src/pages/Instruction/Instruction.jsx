// src/components/InstructionPage.js

import React from 'react';
import './instruction.css';
import { useNavigate,useLocation } from 'react-router-dom';
import Navbar from '../../component/Navbar/Navbar';

const Instruction = () => {

const location=useLocation();
console.log(location.state);
const ex=location.state.ex;
    const navigate=useNavigate();
    const takeTest = () => {
    
        navigate(`/quiz/${ex._id}/takeTest`, {
          state: {
            quizData: ex,
          },
        });
      };
  return (
    <div className='layout-container'>
    <div className="top-container">
      <Navbar />
    </div>
    <div className="bottom-container">
    <div className="instruction-container">
      <h1>Quiz Instructions</h1>
      <p>
        Welcome to the quiz! Here are the instructions for the quiz:
      </p>
      <ol>
        <li>Each question has 4 options.</li>
        <li>You cannot go back to previous questions.</li>
        <li>Mark the correct option out of the four choices.</li>
        <li>If the exercise is easy, mark the question with 1 point.</li>
        <li>If the exercise is medium, mark the question with 2 points.</li>
        <li>If the exercise is hard, mark the question with 4 points.</li>
      </ol>
      <p>Good luck!</p>
      <button onClick={takeTest}>Start Test</button>
    </div>
    </div>
  </div>
    
   
  );
};

export default Instruction;
