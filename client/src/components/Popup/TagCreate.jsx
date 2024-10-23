import React, { useContext, useState, useEffect } from 'react';
import './TagCreate.css';
import API_BASE_URL from '../../config.js';
import { UserContext } from "../App/UserContext.jsx";

function TagCreate({ onTagCreated, onClose }) {
  const { userId } = useContext(UserContext);
  const { creds } = useContext(UserContext);
  const [newTag, setNewTag] = useState({
    name: '',
    color: '#ffffff',
    creator: null,
  });
  const [owner, setOwner] = useState(null);

  const fetchUser = () => {
    if (userId && creds) {
      fetch(`${API_BASE_URL}/users/${userId}`, {
        headers: {
          'Authorization': `Basic ${btoa(creds)}`
        }
      })
        .then((response) => response.json())
        .then((data) => {
          setOwner(data);
          setNewTag((prevTag) => ({
            ...prevTag,
            creator: data,
          }));
        })
        .catch((error) => console.error('Error fetching user:', error));
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userId, creds]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTag({
      ...newTag,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (creds && userId) {
      fetch(`${API_BASE_URL}/tags`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${btoa(creds)}`
        },
        body: JSON.stringify(newTag),
      })
        .then((response) => response.json())
        .then((data) => {
          onTagCreated(data);
          onClose();
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  };

  return (
    <div className="tag-popup-overlay">
      <div className="tag-popup">
        <h2>Create a New Tag</h2>
        <form onSubmit={handleSubmit}>
          <div className="tag-row">
            <div className="col-12">
          <label>Tag Name</label>
          <input
            type="text"
            name="name"
            value={newTag.name}
            onChange={handleInputChange}
            required
          />
            </div>
          <div className="col-12">
          <label>Color</label>
          <input
            type="color"
            name="color"
            value={newTag.color}
            onChange={handleInputChange}
          />
          </div>
          </div>
          <div className="button-group">
            <button type="submit" className="button_submit">Create Tag</button>
          </div>
        </form>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default TagCreate;
