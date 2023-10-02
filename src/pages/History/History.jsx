import React, { useEffect, useState } from 'react'
import axios from "axios";
import {base_url }from "../../utils/apiroute";
import jwtDecode from 'jwt-decode';
import './History.css';
import Navbar from '../../component/Navbar/Navbar';



const History = () => {
const [allTest,setAllTest]=useState();
const [isLoading,setIsLoading]=useState(true);

const token=localStorage.getItem('auth-token')
const userId=jwtDecode(token).userId;

  const getAllTest=()=>{
   axios.get(`${base_url}/user/getAllPastTest/${userId}`)
   .then((res)=>{
   setIsLoading(false);
   console.log(res.data.allTest);
    setAllTest(res.data.allTest);
   }).catch((err)=>
   {
    console.log(err);
    setIsLoading(false);
   })
  }
  useEffect(()=>{
    getAllTest();
  },[])
  return (
     <>

<div className='layout-container'>
      <div className="top-container">
        <Navbar />
      </div>
      <div className="bottom-container">
      <div className="history-container">
       <div className="header-container">
        <span>All Given Test</span>
       </div>
       <div className="pastTest-container">
            {
               isLoading ? <span>Loading ..</span> :
              allTest.length>0 ?(
                allTest.map((test)=>{
                    return <div className='mark-container' key={test._id} >
                       <div className="left-container">
                        <span>{test.name}</span>
                        <span className={`difficult-${test.difficulty}`}>{test.difficulty}</span>
                       </div>
                       <div className="right-container">
                        <span>score : {test.score}</span>
                       </div>
                         
                    </div>
                })

              ):<span>No test given</span>
            }
       </div>
     </div>
      </div>
    </div>
    
     </>
  )
}

export default History