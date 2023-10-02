import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { base_url } from '../../utils/apiroute';
import './Leaderboard.css';
import dummy from "../../assets/dummy.png";
import Winner from "../../assets/trophy.svg";
import Navbar from '../../component/Navbar/Navbar';


const sortList=(userList)=>
{
    userList.sort((a,b)=>b.totalScore-a.totalScore) 
    userList.map((user,index)=>{
         if(index===0) user.rank=true;
         else user.rank=false;
    })
    console.log(userList);
    return userList;
}

const Leaderboard = () => {


  const [leaderBoardList,setLeaderBoardList]=useState();
  const [isLoading,setIsLoading]=useState(true);
  const getLeaderBoard=()=>{
    axios.get(`${base_url}/user//leaderboard`)
    .then((res)=>
    {
      
      setLeaderBoardList(sortList(res.data.userList));
      console.log(res.data.userList);
      setIsLoading(false);
    }).catch((err)=>{
      console.log(err);
      setIsLoading(false);
    })
  }
 useEffect(()=>{
   getLeaderBoard();
 },[])
  return (
    <div className='layout-container'>
    <div className="top-container">
     <Navbar />
    </div>
    <div className="bottom-container">
     <div className="leaderboard-container">
         {
          leaderBoardList?.map((user)=>(
           !user.isAdmin   &&  <UserContainer key={user._id} user={user} />
          ))
         }
     </div>
     </div>
      </div>
  )
}

const UserContainer=({user})=>{
    return (

    
      <div className={`container-${user.rank?"first":"no"}`}>
         <div className="left">
          <img  src={dummy} alt='dummy'/>
          {
            user.rank &&     <img style={{height:30,width:30}} src={Winner} />
          }
       
         </div>
         <div className="right">
           <span>Name : {user.username}</span>
           <span>Test Score : { user.totalScore}</span> 
         </div>
    
    </div>
      
    )
}

export default Leaderboard