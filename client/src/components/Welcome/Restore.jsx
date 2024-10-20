import React from 'react';
import { Link } from 'react-router-dom';
import './Weclome.css';

function Restore() {
  return (
    <>
      <header className="register-header"><b>STRIDE</b></header>
      <div className="register-page">
        <div className="register-container">
          <h1>Password Reset Successful</h1>
          <p>Your password has been successfully updated. You can now log in using your new password.</p>
          <Link to="/login">
            <button className="register-button">Go to Login</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Restore;
