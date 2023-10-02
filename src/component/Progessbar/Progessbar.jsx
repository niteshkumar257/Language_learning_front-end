import React from 'react';
import './ProgessBar.css';

const ProgressBar = ({ percentage }) => {
  return (
    <div className="progress-bar">
      <div className="progress" style={{ width: `${percentage}%` }}></div>
    </div>
  );
};

export default ProgressBar;
