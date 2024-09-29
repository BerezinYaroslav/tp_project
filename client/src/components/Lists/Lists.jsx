import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ListCreate from '../Popup/ListCreate.jsx';

function Lists() {
  const [lists, setLists] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  // Fetch lists from the server
  const fetchLists = async () => {
    try {
      const response = await fetch('http://stride.ddns.net:8080/lists'); // Replace with your actual API endpoint
      const data = await response.json();
      setLists(data);
    } catch (error) {
      console.error('Error fetching lists:', error);
    }
  };

  useEffect(() => {
    fetchLists();
  }, []);

  // Handle list creation and close the popup
  const handleListCreated = () => {
    fetchLists();
    setShowPopup(false);
  };

  // Handle navigation to list tasks
  const handleListClick = (listId) => {
    navigate(`/list-tasks/${listId}`); // Navigate to the proper route with listId as a parameter
  };

  // Handle list deletion
  const deleteList = async (listId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this list?");
    if (!confirmDelete) return; // Abort if the user cancels the deletion

    try {
      const response = await fetch(`http://stride.ddns.net:8080/lists/${listId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove the deleted list from the state (UI)
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
