import React, { useState } from 'react';
import './TagCreate.css';

function TagCreate({ onTagCreated, onClose }) {
  const [tagName, setTagName] = useState('');
  const [tagColor, setTagColor] = useState('#ffffff');

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://stride.ddns.net:8080/tags', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: tagName, color: tagColor }),
    })
      .then((response) => response.json())
      .then((data) => {
        onTagCreated(data);
        onClose();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="tag-popup-overlay">
      <div className="tag-popup">
        <h2>Create a New Tag</h2>
        <form onSubmit={handleSubmit}>
          <label>Tag Name:</label>
          <input
            type="text"
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
            required
          />

          <label>Color:</label>
          <input
            type="color"
            value={tagColor}
            onChange={(e) => setTagColor(e.target.value)}
          />

          <div className="button-group">
            <button type="submit">Create Tag</button>
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default TagCreate;
