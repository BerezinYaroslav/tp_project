import React, { useState } from 'react';

function ListCreate({ show, onClose, onListCreated }) {
  const [newList, setNewList] = useState({
    name: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewList({
      ...newList,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:8080/lists', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newList),
    })
      .then((response) => response.json())
      .then((data) => {
        onListCreated();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  if (!show) {
    return null;
  }

  return (
    <div className="popup">
      <div className="popup-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Create New Task</h2>
        <form onSubmit={handleSubmit}>
          <label>
            List Name:
            <input type="text" name="name" value={newList.name} onChange={handleInputChange} required />
          </label>
          <button type="submit">Create List</button>
        </form>
      </div>
    </div>
  );
}

export default ListCreate;
