import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ListCreate from '../Popup/ListCreate.jsx';

function Lists() {
  const [lists, setLists] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const fetchLists = async () => {
    try {
      const response = await fetch('http://localhost:8080/lists'); // Replace with your actual API endpoint
      const data = await response.json();
      setLists(data);
    } catch (error) {
      console.error('Error fetching lists:', error);
    }
  };

  useEffect(() => {
    fetchLists();
  }, []);

  const handleListCreated = () => {
    fetchLists();
    setShowPopup(false);
  };

  const handleListClick = (listId) => {
    navigate(`/list-tasks/${listId}`);
  };

  return (
    <div className="lists-page">
      <main className="main-content">
        <div className="lists-header">
          <h1>Lists</h1>
          <button className="add-list-button" onClick={() => setShowPopup(true)}>+</button>
        </div>

        <div className="lists-container">
          {lists.map((list) => (
            <div key={list.id} className="list-item" onClick={() => handleListClick(list.id)}>
              <span>{list.name}</span>
              <button className="delete-list-button">Delete</button>
            </div>
          ))}
        </div>
      </main>

      <ListCreate
        show={showPopup}
        onClose={() => setShowPopup(false)}
        onListCreated={handleListCreated}
      />
    </div>
  );
}

export default Lists;
