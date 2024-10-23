import React, { useContext, useState, useEffect } from 'react';
import API_BASE_URL from '../../config.js';
import { UserContext } from '../App/UserContext.jsx';

function ListCreate({ show, onClose, onListCreated }) {
  const { userId, creds } = useContext(UserContext);  // Fetch userId and creds from context
  const [newList, setNewList] = useState({
    name: '',
    owner: null, // Will store the owner object
  });

  const [owner, setOwner] = useState(null);

  useEffect(() => {
    if (userId && creds) {
      fetch(`${API_BASE_URL}/users/${userId}`, {
        headers: {
          'Authorization': `Basic ${btoa(creds)}`
        }
      })
        .then((response) => response.json())
        .then((data) => {
          setOwner(data);  // Set the fetched owner data
        })
        .catch((error) => console.error('Error fetching user:', error));
    }
  }, [userId, creds]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewList({
      ...newList,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (creds && owner) {
      const listData = {
        ...newList,
        owner,  // Attach the owner (user) object to the list
      };

      if (creds && userId) {
        fetch(`${API_BASE_URL}/lists?ownerId=${userId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${btoa(creds)}`
          },
          body: JSON.stringify(listData),
        })
          .then((response) => response.json())
          .then((data) => {
            onListCreated();  // Notify the parent component about list creation
            setNewList({name: '', owner: null});  // Reset the form
          })
          .catch((error) => console.error('Error creating list:', error));
      }
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="popup">
      <div className="popup-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Create New List</h2>
        <form onSubmit={handleSubmit}>
          <label>
            List Name: <input
              type="text"
              name="name"
              value={newList.name}
              onChange={handleInputChange}
              required
            />
          </label>
          <button className="submit-button" type="submit">Create List</button>
        </form>
      </div>
    </div>
  );
}

export default ListCreate;
