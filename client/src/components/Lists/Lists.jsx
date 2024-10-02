import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ListCreate from '../Popup/ListCreate.jsx';

function Lists() {
  const [lists, setLists] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const fetchLists = async () => {
    try {
      const response = await fetch('http://stride.ddns.net:8080/lists');
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
    navigate(`/list-tasks/${listId}`); // Navigate to the proper route with listId as a parameter
  };

  const deleteList = async (listId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this list?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://stride.ddns.net:8080/lists/${listId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setLists(lists.filter((list) => list.id !== listId));
      } else {
        console.error('Error deleting list');
      }
    } catch (error) {
      console.error('Error deleting list:', error);
    }
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
            <div key={list.id} className="list-item">
              <span onClick={() => handleListClick(list.id)}>{list.name}</span>
              {/* Delete button */}
              <button className="delete-list-button" onClick={() => deleteList(list.id)}>
                Delete
              </button>
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
