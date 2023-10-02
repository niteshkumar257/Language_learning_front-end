import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { base_url } from '../../utils/apiroute'
import jwt_decode from "jwt-decode";
import { difficultLevels } from '../../utils/constant';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import "./Home.css"
import LanguageCard from '../../component/LanguageCard';
import Loader from '../../component/Loader/Loader';
import Navbar from '../../component/Navbar/Navbar';

const Home = () => {
  const [langList,setLangList]=useState();
  const [isLoading,setIsLoadsing]=useState();
  const token=localStorage.getItem('auth-token');
  const [lang,setLang]=useState(null);
  const [difficult,setDifficult]=useState(null);
  // const userDetails=jwt_decode(token);
  // console.log(userDetails);
  
  
  const getAllLangList=()=>{
      axios.get(`${base_url}/lang/getAllLang`).then((res)=>
      {
        console.log(res.data);
        setLangList(res.data);
      }).catch((err)=>{
        console.log(err);
      })
  }
  useEffect(()=>
  {
      getAllLangList();
      console.log(token);
  },[])

 

  return (
  <>
  
  <div className='layout-container'>
      <div className="top-container">
         <Navbar />
      </div>
      <div className="bottom-container">
      <div className="home-page-container">
     
     <div className="all-lang-container" >
       {
         isLoading ? <Loader visible={isLoading}/> : (langList?.map((language) => (
       <LanguageCard  key={language._id} language={language} />
     ))) }

     </div>
   </div>
      </div>
    </div>
   
  </>
  )
}

export default Home