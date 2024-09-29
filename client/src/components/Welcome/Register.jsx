import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Weclome.css'; // Import the new CSS file

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      id: 1, name, email, password,
    };

    try {
      const response = await fetch('http://stride.ddns.net:8080/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        navigate('/tasks');
      } else {
        console.error('Registration failed');
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
            <button type="submit">Confirm</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
