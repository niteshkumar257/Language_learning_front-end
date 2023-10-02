import React from 'react';
import "./LanguageCard.css";
import { useNavigate } from 'react-router-dom';
import QuizIcon from '@mui/icons-material/Quiz';

const LanguageCard = ({ language }) => {
  const navigate=useNavigate();
  const handleClick=()=>{
        console.log(language._id)
        navigate(`/Test/${language._id}`);

  }
  return (
    <div onClick={handleClick} className="language-card">
      <span>{language.name}</span>
      <QuizIcon sze={40}/>
    
    </div>
  );
};

export default LanguageCard;
