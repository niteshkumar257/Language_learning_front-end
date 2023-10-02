import React ,{useEffect,useState} from 'react'
import axios from "axios";
import { base_url } from '../../utils/apiroute';
import jwtDecode from 'jwt-decode';
import ProfileCard from '../../component/Profile/ProfileCard';
import "./Profile.css";
import Navbar from '../../component/Navbar/Navbar';


const Profile = () => {

  const  token=localStorage.getItem('auth-token');
  const userId=jwtDecode(token)?.userId;
  console.log(jwtDecode(token));
  const isAdmin=jwtDecode(token).isAdmin;
  const [user,setUser]=useState(null);
  const [isLoading,setIsLoading]=useState(true);

  const getUserData=()=>
  {
    axios.get(`${base_url}/user/getUser/${userId}`)
    .then((res)=>
    {
      console.log(res.data);
      setUser(res.data.userDetails);
      setIsLoading(false);
    }).catch((err)=>
    {
      console.log(err);
      setIsLoading(false);
    })
   
  }
  useEffect(()=>{
   getUserData();
  },[])
  return (

    <div className='layout-container'>
    <div className="top-container">
      <Navbar />
    </div>
    <div className="bottom-container">
    <div className='profile-container'>
      {
        isLoading ?<span>Loading ...</span>:   <ProfileCard user={user}/>
      }
     
    </div>
    </div>
  </div>
   
  )
}

export default Profile