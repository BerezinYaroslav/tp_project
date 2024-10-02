import React, { useState, useEffect } from 'react';
import TagCreate from './TagCreate';
import SubtasksPane from './SubtasksPane';
import './TaskView.css';

function TaskView({ task, onClose }) {
  const [editedTask, setEditedTask] = useState({ ...task });
  const [tags, setTags] = useState(task.taskTags || []);
  const [allTags, setAllTags] = useState([]);
  const [selectedTagId, setSelectedTagId] = useState('');
  const [lists, setLists] = useState([]);
  const [showTagCreate, setShowTagCreate] = useState(false);

  useEffect(() => {
    fetch('http://stride.ddns.net:8080/lists')
      .then((response) => response.json())
      .then((data) => setLists(data))
      .catch((error) => console.error('Error fetching lists:', error));

    fetch('http://stride.ddns.net:8080/tags')
      .then((response) => response.json())
      .then((data) => setAllTags(data))
      .catch((error) => console.error('Error fetching tags:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({
      ...editedTask,
      [name]: value,
    });
  };

  const handleRemoveTag = (tagId) => {
    setTags(tags.filter((tag) => tag.id !== tagId));
  };

  const handleTagSelect = (e) => {
    const tagId = e.target.value;
    const selectedTag = allTags.find((tag) => tag.id === parseInt(tagId));
    if (selectedTag && !tags.some((tag) => tag.id === selectedTag.id)) {
      setTags([...tags, selectedTag]);
    }

    setSelectedTagId('');
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    const updatedTask = {
      ...editedTask,
      taskTags: tags,
    };

    try {
      const response = await fetch('http://stride.ddns.net:8080/tasks', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      });

      if (response.ok) {
        onClose();
        window.location.reload();
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async () => {
    try {
      const response = await fetch(`http://stride.ddns.net:8080/tasks/${task.id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        onClose();
        window.location.reload();
      } else {
        console.error('Error deleting task');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleTagCreated = (newTag) => {
    setAllTags([...allTags, newTag]);
    setTags([...tags, newTag]);
    setShowTagCreate(false);
  };

  return (
    <div className="popup-overlay">
      <div className="task-view-popup">
        <form className="task-form" onSubmit={handleSubmitEdit}>
          <h2>
            <label>Task</label>
            <input
              type="text"
              name="name"
              value={editedTask.name}
              onChange={handleChange}
              required
            />
          </h2>

          {/* Date and List */}
          <div className="row">
            <div className="input-group">
              <label>Date</label>
              <input
                type="date"
                name="finishDate"
                value={new Date(editedTask.finishDate).toISOString().split('T')[0]}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>List</label>
              <select
                name="list"
                value={editedTask.list?.id || ''}
                onChange={(e) => setEditedTask({
                  ...editedTask,
                  list: {
                    id: e.target.value,
                    name: e.target.options[e.target.selectedIndex].text,
                  },
                })}
              >
                <option value="">Select</option>
                {lists.map((list) => (
                  <option key={list.id} value={list.id}>
                    {list.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Comments/Description */}
          <label>Comments</label>
          <textarea
            name="description"
            value={editedTask.description}
            onChange={handleChange}
          />

          {/* Tag Management */}
          <label>Tags</label>
          <div className="tags-container">
            {tags.map((tag) => (
              <span
                key={tag.id}
                className="task-tag"
                style={{ backgroundColor: tag.color }}
              >
                #
                {tag.name}
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
              {allTags.map((tag) => (
                <option key={tag.id} value={tag.id}>{tag.name}</option>
              ))}
            </select>
            <button
              type="button"
              className="tags-button"
              onClick={() => setShowTagCreate(true)}
            >
              New Tag
            </button>
          </div>

          {/* SubtasksPane */}
          <SubtasksPane taskId={task.id} parentFinishDate={editedTask.finishDate} />

          {/* Submit Button */}
          <button type="submit" className="submit-button">
            Save Changes
          </button>

          {/* Delete Task */}
          <button
            type="button"
            className="delete-button"
            onClick={handleDeleteTask}
          >
            Delete Task
          </button>
        </form>

        <button className="close-button" onClick={onClose}>
          Close
        </button>

        {/* TagCreate Popup */}
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

export default TaskView;
