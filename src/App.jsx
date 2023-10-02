import React from 'react'
import {BrowserRouter as Router ,Route,Routes} from "react-router-dom"
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import TestPage from "./pages/TestPage/TestPage";
import History from "./pages/History/History";
import Profile from "./pages/Profile/Profile";
import ScorePage from "./pages/scorePage/ScorePage";
import LeaderBoard from "./pages/Leaderboard/Leaderboard";
import Instruction from './pages/Instruction/Instruction';
import AddLang from "./pages/Admin/AddLang/AddLang";
import Addquestions from './pages/Admin/AddQuestions/Addquestions';
import Quiz from './pages/Quizz/Quiz';
import { Toaster } from 'react-hot-toast';
import Layout from "./Layout";

const App = () => {
  return (

    <Router>
      
      <Routes>
              <Route path='/home' element={<Home/>} />
              <Route path='/login' element={<Login/>}/>
              <Route path='/register' element={<Register/>}/>
              <Route path='/Test/:id' element={<TestPage/>}/>
              <Route path='/score' element={<ScorePage/>}/>
              <Route path='/profile' element={<Profile/>}/>
              <Route path='/history' element={<History/>}/>
              <Route path='/leaderboard' element={<LeaderBoard/>}/>
              <Route path='/quiz/:id/takeTest' element={<Quiz/>}/>
              <Route path='/instruction' element={<Instruction/>}/>
              <Route path='/addLang' element={<AddLang/>}/>
              <Route path='/addquestions' element={<Addquestions/>}/>
              <Route/>
      
      
      </Routes>
      
      <Toaster/>

    </Router>
   
  )
}

export default App