// QuestionForm.js
import React, { useEffect, useState } from 'react';
import "./QuestionForm.css";

const QuestionForm = ({ addQuestion,difficultyLevel }) => {
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctOption, setCorrectOption] = useState(0);
  const m=difficultyLevel==="Easy"?1:difficultyLevel==="Medium"?2:4;
  console.log(m);
  const [mark, setMark] = useState(m); // Default mark is 2

  const handleOptionChange = (index, text) => {
    const newOptions = [...options];
    newOptions[index] = text;
    setOptions(newOptions);
  };

  
  const handleAddQuestion = () => {
    const newQuestion = {
      questionText,
      options,
      correctOption,
      mark,
    };
    addQuestion(newQuestion);
    setQuestionText('');
    setOptions(['', '', '', '']);
    setCorrectOption(0);
    setMark(2); // Reset mark to default after adding a question
  };

  return (
    <div className="question-form">
      <h2>Add a Question</h2>
      <div className="question-container">
      <input
        type="text"
        placeholder="Question Text"
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
      />
      </div>
    
      <div className="options">
        {options.map((option, index) => (
          <div className='div-option' key={index}>
          
        
            <input
              type="radio"
              name="correctOption"
              value={index}
              checked={correctOption === index}
              onChange={() => setCorrectOption(index)}
              className='left-input'
            />
              <input
              type="text"
              placeholder={`Option ${index + 1}`}
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className='right-input'
            />
          </div>
        ))}
      </div>
      <div className='div-option'>
        <label className='left-input'>Mark:</label>
        <input
          type="number"
          value={difficultyLevel==="Easy"?1:difficultyLevel==="Medium"?2:4}
          onChange={(e) => setMark(e.target.value)}
          className='right-input'
        />
      </div>
      <button onClick={handleAddQuestion}>Add Question</button>
    </div>
  );
};

export default QuestionForm;
