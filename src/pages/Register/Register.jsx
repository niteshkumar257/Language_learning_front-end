import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "./Register.css"
import {AiOutlineFileImage} from "react-icons/ai";
import   MySVG  from "../../assets/quiz.svg";
import axios from 'axios';
import { base_url } from '../../utils/apiroute';
import toast, { Toaster } from 'react-hot-toast';
import Loader from '../../component/Loader/Loader';
import { useNavigate } from 'react-router-dom';


const Register = () => {

  const [data,setData]=useState({
    username:'',
    email:'',
    password:'',
    language:'',
  })
  const navigate=useNavigate();
   const [isLoading,setIsloading]=useState(false);
    const handleChange=(e)=>{
       
       setData({...data,[e.target.name]:e.target.value})
    }
    const notify = (msg) => toast(`${msg}`);
    const register=(e)=>{
      e.preventDefault();
      const {username,email,password}=data;
    
     setIsloading(true);
      axios.post(`${base_url}/user/register`,{
        username,email,password
      }).then((res)=>
      {
        console.log(res);
        setIsloading(false);
        toast.success('Registation Succesfully');
        navigate('/login');
        
        
      }).catch((err)=>
      {
        console.log(err);
        setIsloading(false);
        toast.error('something went wrong');
      })

    }
  return (
    <div className="formContainer">
        <div style={{display:'flex',justifyContent:"center",alignItems:"center",columnGap:20}}>
        <img style={{height:40,width:40}} src={MySVG} alt='svg'/>
    <span>Learn Lang</span>
        </div>
   
    
    <form className='formWrapper' >
    <span style={{fontSize:18,fontWeight:"bold"}}>Register</span>
        <input type='text' placeholder='username' name='username' value={data.name} onChange={(e)=>handleChange(e)} />
        <input type="email" placeholder='email' name='email' value={data.email} onChange={(e)=>handleChange(e)}/>
        <input type="password" placeholder='password' name='password' value={data.password} onChange={(e)=>handleChange(e)} />
   
       
     
        <button onClick={register} >{isLoading?<Loader visible={isLoading}/>:"Register"}</button>
    </form>
    <p>Already have account <Link to="/login">Login</Link> </p>
 </div>
  )
}

export default Register