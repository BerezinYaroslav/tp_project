// TagCreate.jsx
import React, { useState } from 'react';

function TagCreate({ onTagCreated, onClose }) {
  const [tagName, setTagName] = useState('');
  const [tagColor, setTagColor] = useState('#ffffff');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:8080/tags', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: tagName, color: tagColor }),
    })
      .then((response) => response.json())
      .then((data) => {
        onTagCreated(data); // Pass the new tag back to the parent
        onClose(); // Close the TagCreate popup
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="tag-create-popup">
      <form onSubmit={handleSubmit}>
        <label>
          Tag Name:
          <input type="text" value={tagName} onChange={(e) => setTagName(e.target.value)} required />
        </label>
        <label>
          Tag Color:
          <input type="color" value={tagColor} onChange={(e) => setTagColor(e.target.value)} />
        </label>
        <button type="submit">Create Tag</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
}

export default TagCreate;
