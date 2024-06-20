import React, { useState, useEffect } from 'react';
import TagCreate from './TagCreate.jsx';
import ListCreate from './ListCreate.jsx'; // Assuming this component already exists

function TaskCreate({ show, onClose, onTaskCreated }) {
  const [newTask, setNewTask] = useState({
    name: '',
    description: '',
    finishDate: '',
    tags: [],
    lists: [],
    priority: 1,
  });
  const [tags, setTags] = useState([]);
  const [lists, setLists] = useState([]);
  const [showTagCreate, setShowTagCreate] = useState(false);
  const [showListCreate, setShowListCreate] = useState(false);

  useEffect(() => {
    // Fetch existing tags
    fetch('http://localhost:8080/tags')
      .then((response) => response.json())
      .then((data) => setTags(data))
      .catch((error) => console.error('Error fetching tags:', error));

    // Fetch existing lists
    fetch('http://localhost:8080/lists')
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
    fetch('http://localhost:8080/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => response.json())
      .then((data) => {
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
        <h2>Create New Task</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Task Name:
            <input type="text" name="name" value={newTask.name} onChange={(e) => setNewTask({ ...newTask, name: e.target.value })} required />
          </label>
          <label>
            Description:
            <textarea name="description" value={newTask.description} onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} />
          </label>
          <label>
            Finish Date:
            <input type="date" name="finishDate" value={newTask.finishDate} onChange={(e) => setNewTask({ ...newTask, finishDate: e.target.value })} required />
          </label>
          <label>
            Tags:
            <div>
              {tags.map((tag) => (
                <span key={tag.id} style={{ backgroundColor: tag.color, marginRight: '5px' }}>
                  {tag.name}
                </span>
              ))}
            </div>
            <button type="button" onClick={() => setShowTagCreate(true)}>New Tag</button>
            {showTagCreate && <TagCreate onTagCreated={handleTagCreated} onClose={() => setShowTagCreate(false)} />}
          </label>
          <label>
            Lists:
            <div>
              {lists.map((list) => (
                <span key={list.id}>{list.name}</span>
              ))}
            </div>
            <button type="button" onClick={() => setShowListCreate(true)}>New List</button>
            {showListCreate && <ListCreate onListCreated={handleListCreated} onClose={() => setShowListCreate(false)} />}
          </label>
          <label>
            Priority:
            <select name="priority" value={newTask.priority} onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })} required>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </label>
          <button type="submit">Create Task</button>
        </form>
      </div>
    </div>
  );
}

export default TaskCreate;
