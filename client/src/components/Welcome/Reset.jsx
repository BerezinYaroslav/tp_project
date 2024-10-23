import React, { useState, useContext } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './Weclome.css';
import API_BASE_URL from '../../config.js';
import { UserContext } from '../App/UserContext.jsx';

function Reset() {
  const [email, setEmail] = useState('');
  const [taskName, setTaskName] = useState('');
  const [password, setPassword] = useState('');
  const { login, setAuth } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/restore?taskName=${taskName}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const userId = await response.json();
        setAuth(email, password);
        login(userId);
        navigate('/tasks');
      } else {
        const alert = await response.text();
        window.alert(alert);
        console.error(alert);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <header className="register-header"><b>STRIDE</b></header>
      <div className="register-page">
        <div className="register-container">
          <h1>Password Reset</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Name of the last created task"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Enter your new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Reset Password</button>
            <div className="register-link">
              <p><Link to="/login">Back to Login</Link></p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Reset;
