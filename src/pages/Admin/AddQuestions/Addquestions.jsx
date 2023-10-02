// App.js
import React, { useState, useEffect } from "react";
import QuestionForm from "../QuestionForm/QuestionForm";
import axios from "axios";
import { base_url } from "../../../utils/apiroute";
import "./Addquestions.css";
import toast from "react-hot-toast";
import Navbar from "../../../component/Navbar/Navbar";
function Addquestions() {
  const [exerciseName, setExerciseName] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState("Medium");
  const [selectedLanguage, setSelectedLanguage] = useState(
    "65182ef6d1aeacb21f58ef7a"
  );
  const [questions, setQuestions] = useState([]);
  const [langList, setLangList] = useState();

  const addQuestion = (question) => {
    setQuestions([...questions, question]);
  };

  const generateExerciseJSON = () => {
    const exerciseJSON = {
      name: exerciseName,
      difficultLevel: difficultyLevel,
      language: selectedLanguage,
      questions: questions,
    };
    console.log(exerciseJSON);
    axios
      .post(`${base_url}/excercise/CreateEx`, {
        name: exerciseName,
        difficultLevel: difficultyLevel,
        language: selectedLanguage,
        questions: questions,
      })
      .then((res) => {
        console.log(res.data);
        toast.success("Excercise added succesfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      });
  };

  const getAllLangList = () => {
    axios
      .get(`${base_url}/lang/getAllLang`)
      .then((res) => {
        setLangList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllLangList();
  }, []);
  return (
    <div className="layout-container">
      <div className="top-container">
        <Navbar />
      </div>
      <div className="bottom-container">
        <div className="App">
          <h1>Add Test</h1>
          <div>
            <label>Exercise Name:</label>
            <div className="input-container">
              <input
                type="text"
                value={exerciseName}
                placeholder="Enter Excercise Name"
                onChange={(e) => setExerciseName(e.target.value)}
              />
            </div>
          </div>
          <div >
            <label>Difficulty Level:</label>
            <div className="input-container">
              <select
                value={difficultyLevel}
                onChange={(e) => setDifficultyLevel(e.target.value)}
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>
          <div>
            <label>Language:</label>
            <div className="input-container">
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
              >
                {langList?.map((lang) => (
                  <option value={lang._id}>{lang.name}</option>
                ))}
              </select>
            </div>
          </div>
          <QuestionForm
            addQuestion={addQuestion}
            difficultyLevel={difficultyLevel}
          />
          <button onClick={generateExerciseJSON}>Add Excercise</button>
          <div className="questions-list">
            <h2>Questions</h2>
            <ul>
              {questions.map((question, index) => (
                <li key={index}>
                  <strong>Question {index + 1}:</strong> {question.questionText}
                  <br />
                  <strong>Options:</strong> {question.options.join(", ")}
                  <br />
                  <strong>Correct Option:</strong> Option{" "}
                  {question.correctOption + 1}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Addquestions;
