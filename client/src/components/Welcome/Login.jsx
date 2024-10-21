import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Weclome.css'; // Using the same CSS as Register
import API_BASE_URL from '../../config.js';
import { UserContext } from '../App/UserContext'; // Import UserContext

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { logout } = useContext(UserContext);
  const { login } = useContext(UserContext);
  const { setAuth } = useContext(UserContext);

  const handleSubmit = async (e) => {

    const user = {
      email,
      password,
    };

    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const userId = await response.json(); // Expecting the body to be just the user ID
        login(userId); // Save user ID in context
        setAuth (email, password);
        navigate('/tasks'); // Redirect to tasks page
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
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
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
            <button type="submit">Login</button>
          </form>
          <div className="register-link">
            <p>Don't have an account? <Link to="/register">Register here</Link>
            </p>
            <p>Forgot your password? <Link to="/reset">Reset here</Link></p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
