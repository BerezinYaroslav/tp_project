import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Weclome.css'; // Import the new CSS file
import API_BASE_URL from '../../config.js';
import { UserContext } from '../App/UserContext.jsx'; // Import UserContext

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState(18); // Default age set to 18
  const navigate = useNavigate();
  const { login, setAuth } = useContext(UserContext);
  const { logout } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      name,
      email,
      password,
      age, // Include age in the registration payload
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const userId = await response.json();
        login(userId);
        setAuth(email, password);
        navigate('/tasks');
      } else {
        logout();
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
          <h1>Registration</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter your username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              min="0"
              max="150"
              placeholder="Enter your age"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              required
            />
            <button type="submit">Confirm</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
