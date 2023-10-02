import React, { useState } from 'react'
import "./Login.css";
import { Link } from 'react-router-dom';
import MySVG from "../../assets/quiz.svg";
import axios from "axios";
import { base_url } from '../../utils/apiroute';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import Loader from '../../component/Loader/Loader';

const Login = () => {

  const [data,setData]=useState({
    email:'',
    password:''
  })
  const navigate=useNavigate();
  const [isLoading,setIsLoading]=useState(false);

    const handleChange=(e)=>{
       
     e.preventDefault();
    setData({...data,[e.target.name]:e.target.value})
   }
   const  handleSubmit=(e)=>{
       e.preventDefault();
       const {email,password}=data;
      axios.post(`${base_url}/user/login`,{
        email,password
      }).then((res)=>
      {

        console.log(res.data);
        localStorage.setItem('auth-token',res.data.token);
        setIsLoading(false);
        toast.success('Login successfully')
        navigate('/home');

      }).catch((err)=>{
        console.log(err);
        setIsLoading(false);
        toast.error('someting went wrong');
      })
   }
  return (
     <div className="formContainer">
        <div style={{display:'flex',justifyContent:"center",alignItems:"center",columnGap:20}}>
        <img style={{height:40,width:40}} src={MySVG} alt='svg'/>
    <span>Learn Lang</span>
        </div>
        <form className='formWrapper' >
        <span style={{fontSize:18,fontWeight:"bold"}}>Login</span>
            <input type='text' placeholder='username' name='email' value={data.email} onChange={(e)=>handleChange(e)}/>
            <input type="password" placeholder='password' name="password" value={data.password} onChange={(e)=>handleChange(e)} />
            <button onClick={handleSubmit} >{isLoading ? <Loader visible={isLoading}/>:"Login"}</button>
        </form>
        <p>New user <Link to='/register'>Regsiter</Link> </p>
     </div>
  )
}

export default Login