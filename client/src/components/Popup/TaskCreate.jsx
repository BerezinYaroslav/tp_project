import React, { useState, useEffect } from 'react';
import TagCreate from './TagCreate.jsx';
import './TaskCreate.css';

function TaskCreate({ show, onClose, onTaskCreated }) {
  const [newTask, setNewTask] = useState({
    name: '',
    description: '',
    finishDate: '',
    tags: [],
    lists: [],
  });
  const [tags, setTags] = useState([]);
  const [lists, setLists] = useState([]);
  const [showTagCreate, setShowTagCreate] = useState(false);

  useEffect(() => {
    // Fetch existing tags
    fetch('http://stride.ddns.net:8080/tags')
      .then((response) => response.json())
      .then((data) => setTags(data))
      .catch((error) => console.error('Error fetching tags:', error));

    // Fetch existing lists
    fetch('http://stride.ddns.net:8080/lists')
      .then((response) => response.json())
      .then((data) => setLists(data))
      .catch((error) => console.error('Error fetching lists:', error));
  }, []);

  const handleTagCreated = (newTag) => {
    setTags([...tags, newTag]);
    setShowTagCreate(false);
  };

  const handleListCreated = (newList) => {
    setLists([...lists, newList]);
    setShowListCreate(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://stride.ddns.net:8080/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => response.json())
      .then(() => {
        onTaskCreated();
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
        <h2 className="title">New Task</h2>
        <form onSubmit={handleSubmit} className="task-form">
          <label>Date</label>
          <input
            type="date"
            name="finishDate"
            value={newTask.finishDate}
            onChange={(e) => setNewTask({ ...newTask, finishDate: e.target.value })}
            required
          />

          <label>Task</label>
          <input
            type="text"
            name="name"
            value={newTask.name}
            onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
            required
          />

          <label>Comments</label>
          <textarea
            name="description"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          />

          <label>List</label>
          <div className="input-with-button">
            <select
              name="lists"
              value={newTask.lists}
              onChange={(e) => setNewTask({ ...newTask, lists: [e.target.value] })}
            >
              <option value="">Select</option>
              {lists.map((list) => (
                <option key={list.id} value={list.id}>{list.name}</option>
              ))}
            </select>
          </div>

          <label>Tag</label>
          <div className="input-with-button">
            <select
              name="tags"
              value={newTask.tags}
              onChange={(e) => setNewTask({ ...newTask, tags: [e.target.value] })}
            >
              <option value="">Select</option>
              {tags.map((tag) => (
                <option key={tag.id} value={tag.id}>{tag.name}</option>
              ))}
            </select>
            <button type="button" className="new-button" onClick={() => setShowTagCreate(true)}>
              New Tag
            </button>
          </div>

          <button type="submit" className="submit-button">Add Task</button>
        </form>

        {/* Tag Create Popup */}
        {showTagCreate && (
          <div className="popup">
            <div className="popup-content">
              <TagCreate onTagCreated={handleTagCreated} onClose={() => setShowTagCreate(false)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TaskCreate;
