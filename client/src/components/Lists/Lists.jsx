import React, {useState, useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import ListCreate from '../Popup/ListCreate.jsx';
import API_BASE_URL from '../../config.js';
import {UserContext} from "../App/UserContext.jsx";

function Lists() {
  const { userId } = useContext(UserContext);
  const { creds } = useContext(UserContext);
  const [lists, setLists] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const fetchLists = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/lists?ownerId=${userId}`, {
          headers: {
            'Authorization': `Basic ${btoa(creds)}`
          }
        });
        const data = await response.json();
        setLists(data);
      } catch (error) {
        console.error('Error fetching lists:', error);
      }
  };

  useEffect(() => {
    if (creds && userId) {
      fetchLists();
    }
  }, [creds, userId]);

  const handleListCreated = () => {
    fetchLists();
    setShowPopup(false);
  };

  const handleListClick = (listId) => {
    navigate(`/list-tasks/${listId}`);
  };

  const deleteList = async (listId) => {
    if (creds) {
      try {
        const response = await fetch(`${API_BASE_URL}/lists/${listId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Basic ${btoa(creds)}`
          }
        });

        if (response.ok) {
          setLists(lists.filter((list) => list.id !== listId));
        } else {
          console.error('Error deleting list');
        }
      } catch (error) {
        console.error('Error deleting list:', error);
      }
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
            <div key={list.id} className="list-item" onClick={() => handleListClick(list.id)}>
              <span>{list.name}</span>
              {/* Delete button */}
              <button className="delete-list-button"   onClick={(event) => {
                event.stopPropagation();
                deleteList(list.id);
              }}>
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
