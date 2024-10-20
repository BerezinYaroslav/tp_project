// UserContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import API_BASE_URL from "../../config.js";

// Create the context
export const UserContext = createContext();

// Provider component
export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [creds, setCreds] = useState(null);

  const setAuth = (email, password) => {
    const newCreds = `${email}:${password}`;
    setCreds(newCreds);
    localStorage.setItem('creds', newCreds);
  };

  // Function to log in (save user ID)
  const login = (id) => {
    setUserId(id);
    localStorage.setItem('userId', id); // Save user ID in localStorage
  };

  // Function to log out
  const logout = () => {
    setUserId(null);
    setCreds(null);
    localStorage.removeItem('creds');
    localStorage.removeItem('userId');
  };

  // Load the user ID from localStorage when the app starts
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedCreds = localStorage.getItem('creds');

    if (storedUserId) {
      setUserId(storedUserId);
    }

    if (storedCreds) {
      setCreds(storedCreds);
    }
  }, []);

  return (
    <UserContext.Provider value={{ userId, login, logout, creds, setAuth }}>
      {children}
    </UserContext.Provider>
  );
};
