import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { base_url } from '../../utils/apiroute'
import ExcerciseCard from '../../component/excerciseCard';
import TextField from '@mui/material/TextField';
import { difficultLevels } from '../../utils/constant';
import Navbar from '../../component/Navbar/Navbar';

import './TestPage.css';


const TestPage = () => {

  const [allEx,setAllEx]=useState();
  const [isLoading,setIsLoading]=useState(true);
  const { id } = useParams();
  const [level,setLevel]=useState("Easy");
  
  const getAllExcercise=()=>
  {

     setIsLoading(true);
      axios.get(`${base_url}/excercise/getAllEx/${id}/${level}`).then((res)=>{
        setIsLoading(false);
      
        setAllEx(res.data.allExLang);
      }).catch((err)=>{
        console.log(err);
        setIsLoading(false);
      })
  }
  
  useEffect(()=>
  {
     getAllExcercise();
  },[level])
  return (

    <div className='layout-container'>
    <div className="top-container">
       <Navbar />
    </div>
    <div className="bottom-container">
    <div className='main-container'>
     <div className="filter-container">
       
     <TextField
      sx={{
        flex: 1,
        height: '6vh',
        borderColor: 'black',
        '& .MuiInputLabel-root': {
          color: 'black', // Label color
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'black', // Border color for the fieldset
          },
          '&:hover fieldset': {
            borderColor: 'blue', // Border color when hovering
          },
          '&.Mui-focused fieldset': {
            borderColor: 'rgb(132, 0, 255)', // Border color when focused
          },
        },
      }}
      id="outlined-select-currency-native"
      select
      label="Difficulty Level"
      value={level}
      onChange={(e) => setLevel(e.target.value)}
      SelectProps={{
        native: true,
      }}
      
    >
      {difficultLevels.map((option) => (
        <option key={option.id} value={option.diff_name}>
          {option.diff_name}
        </option>
      ))}
    </TextField>
        
       </div>
      <div className="excercise-container">
           {
            isLoading ? <span>Loading..</span> :(allEx?.length>0 ? allEx?.map((ex)=>{
             return  <ExcerciseCard key={ex._id} ex={ex}/>
            })
            :<div style={{
              width:'100%',height:'100vh',display:"flex",
              justifyContent:'center',alignItems:'center'
            }}>No Excercise</div>)}
      </div>
    </div>
    </div>
  </div>
    
  )
}

export default TestPage