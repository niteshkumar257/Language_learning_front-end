import React from 'react';
import "./ProfileCard.css";
import dummyImage from "../../assets/dummy.png";
import axios from 'axios';
import { base_url } from '../../utils/apiroute';
import jwtDecode from 'jwt-decode';
import toast from "react-hot-toast";
import ProgressBar from '../Progessbar/Progessbar';
import EditIcon from '@mui/icons-material/Edit';

const ProfileCard = ({ user }) => {
  const token = localStorage.getItem('auth-token');
  const userId = jwtDecode(token).userId;

  const resetProgress = () => {
    axios.put(`${base_url}/user/resetTestInfo/${userId}`)
      .then((res) => {
        console.log(res);
        toast("Reset Successfully");
      })
      .catch((err) => {
        console.log(err);
        toast("Something went wrong");
      });
  };

  return (
    <div className="profile-section">
      <div className="profile-image">
        <img src={dummyImage} alt={`${user.username}'s Profile`} />
      </div>
      <div className="profile-info">
        <h2 className="profile-username">{user?.username}</h2>
        <p className="profile-email">Email: {user?.email}</p>
        <p className="profile-tests-given">Tests Given: {user.scores.length}</p>
        <p>Language Preferance </p>
      
        <div className="progress-bar-container">
          <span className="progress-label">Progress :</span>
          <div className="progress-bar">
            <ProgressBar percentage={60} />
          </div>
        </div>

        <button className='reset-button' onClick={resetProgress}>Reset</button>
      </div>
    </div>
  );
};

export default ProfileCard;
