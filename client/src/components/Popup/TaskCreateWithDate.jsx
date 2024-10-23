import React, { useState, useEffect, useContext } from 'react';
import TagCreate from './TagCreate';
import TagManagement from './TagManagement';
import './TaskCreate.css';
import API_BASE_URL from '../../config.js';
import { UserContext } from '../App/UserContext.jsx';
import ListCreate from "./ListCreate.jsx";

function TaskCreateWithDate({ show, onClose, onTaskCreated, initialDate }) {
  const { userId } = useContext(UserContext);
  const { creds } = useContext(UserContext);
  const [newTask, setNewTask] = useState({
    owner: null,
    name: '',
    description: '',
    finishDate: initialDate.toISOString().split('T')[0], // Use initialDate for pre-filled date
    taskTags: [],
    list: null,
  });
  const [owner, setOwner] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedTagId, setSelectedTagId] = useState('');
  const [lists, setLists] = useState([]);
  const [showTagCreate, setShowTagCreate] = useState(false);
  const [showTagManagement, setShowTagManagement] = useState(false);
  const [showListCreate, setShowListCreate] = useState(false);

  const fetchUser = () => {
    if (userId) {
      fetch(`${API_BASE_URL}/users/${userId}`, {
        headers: {
          'Authorization': `Basic ${btoa(creds)}`
        }
      })
        .then((response) => response.json())
        .then((data) => {
          setOwner(data);
        })
        .catch((error) => console.error('Error fetching user:', error));
    }
  };

  useEffect(() => {
    if (creds) {
      // Fetch existing tags
      fetch(`${API_BASE_URL}/tags?ownerId=${userId}`, {
        headers: {
          'Authorization': `Basic ${btoa(creds)}`
        }
      })
        .then((response) => response.json())
        .then((data) => setTags(data))
        .catch((error) => console.error('Error fetching tags:', error));

      // Fetch existing lists
      fetch(`${API_BASE_URL}/lists?ownerId=${userId}`, {
        headers: {
          'Authorization': `Basic ${btoa(creds)}`
        }
      })
        .then((response) => response.json())
        .then((data) => setLists(data))
        .catch((error) => console.error('Error fetching lists:', error));

      fetchUser();
    }
  }, [creds]);

  const handleListCreated = (createdList) => {
    setLists([...lists, createdList]);
    setNewTask((prevTask) => ({
      ...prevTask,
      list: createdList,
    }));
    setShowListCreate(false);
  };

  const handleTagCreated = (newTag) => {
    setTags([...tags, newTag]);
    setSelectedTags([...selectedTags, newTag]);
    setShowTagCreate(false);
  };

  const handleTagRemoved = (removedTagId) => {
    setSelectedTags(selectedTags.filter(tag => tag.id !== removedTagId));
    setTags(tags.filter(tag => tag.id !== removedTagId));
  };

  const handleTagSelect = (e) => {
    const tagId = e.target.value;
    const selectedTag = tags.find((tag) => tag.id === parseInt(tagId));

    if (selectedTag && !selectedTags.some((tag) => tag.id === selectedTag.id)) {
      setSelectedTags([...selectedTags, selectedTag]);
    }

    setSelectedTagId('');
  };

  const handleRemoveTag = (tagId) => {
    setSelectedTags(selectedTags.filter((tag) => tag.id !== tagId));
  };

  const handleListSelect = (e) => {
    const listId = e.target.value;
    const selectedList = lists.find((list) => list.id === parseInt(listId));

    if (selectedList) {
      setNewTask((prevTask) => ({
        ...prevTask,
        list: selectedList,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskData = {
      ...newTask,
      owner: owner,
      taskTags: selectedTags,
    };
    if (userId && creds) {
      fetch(`${API_BASE_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${btoa(creds)}`
        },
        body: JSON.stringify(taskData),
      })
        .then((response) => response.json())
        .then(() => {
          onTaskCreated();
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="popup">
      <div className="popup-content">
        <span className="close-button" onClick={onClose}>Close</span>
        <h2>{initialDate.toString().split('00')[0]}</h2>
        <h2 className="title">New Task</h2>

        <form onSubmit={handleSubmit} className="task-form">

          <label>Task</label>
          <input
            type="text"
            name="name"
            value={newTask.name}
            onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
            required
          />

          <label>Description</label>
          <textarea
            name="description"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          />

          <label>List</label>
          <div className="input-with-button">
            <select
              name="list"
              value={newTask.list?.id || ''}
              onChange={(e) => handleListSelect(e)}
            >
              <option value="">None</option>
              {lists.map((list) => (
                <option key={list.id} value={list.id}>{list.name}</option>
              ))}
            </select>
            <button
              type="button"
              className="tags-button"
              onClick={() => setShowListCreate(true)}
            >
              New List
            </button>
          </div>

          {showListCreate && (
            <ListCreate
              show={showListCreate}
              onClose={() => setShowListCreate(false)}
              onListCreated={handleListCreated}
            />
          )}


          <label>Tags</label>
          <div className="tags-container-scroll">
            {selectedTags.map((tag) => (
              <span
                key={tag.id}
                className="task-tag"
                style={{ backgroundColor: tag.color }}
              >
                #{tag.name}
                {' '}
                <button
                  type="button"
                  className="tags-delete-button"
                  onClick={() => handleRemoveTag(tag.id)}
                >
                  x
                </button>
              </span>
            ))}
          </div>

          <div className="input-with-button">
            <select
              name="tags"
              value={selectedTagId}
              onChange={handleTagSelect}
            >
              <option value="">Select Tag</option>
              {tags.map((tag) => (
                <option key={tag.id} value={tag.id}>{tag.name}</option>
              ))}
            </select>
            <button type="button" className="tags-button" onClick={() => setShowTagCreate(true)}>
              New Tag
            </button>
            <button
              type="button"
              className="tags-button"
              onClick={() => setShowTagManagement(true)}
            >
              Manage Tags
            </button>
          </div>

          <button type="submit" className="submit-button">Add Task</button>
        </form>

        {showTagCreate && (
          <div className="popup">
            <div className="popup-content">
              <TagCreate onTagCreated={handleTagCreated} onClose={() => setShowTagCreate(false)} />
            </div>
          </div>
        )}

        {showTagManagement && (
          <div className="popup">
            <div className="popup-content">
              <TagManagement
                tags={tags}
                onTagRemoved={handleTagRemoved}
                onClose={() => setShowTagManagement(false)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TaskCreateWithDate;
