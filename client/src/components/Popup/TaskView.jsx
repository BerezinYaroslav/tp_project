import React, { useState, useEffect } from 'react';
import TagCreate from './TagCreate';
import SubtasksPane from './SubtasksPane';

function TaskView({ task, onClose }) {
  const [editedTask, setEditedTask] = useState({ ...task });
  const [tags, setTags] = useState(task.taskTags || []);
  const [lists, setLists] = useState([]);
  const [showTagCreate, setShowTagCreate] = useState(false);

  useEffect(() => {
    // Fetch available lists (assuming a separate API endpoint for lists)
    fetch('http://stride.ddns.net:8080/lists')
      .then((response) => response.json())
      .then((data) => setLists(data))
      .catch((error) => console.error('Error fetching lists:', error));
  }, []);

  // Handle form input changes for editing
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({
      ...editedTask,
      [name]: value,
    });
  };

  // Handle tag removal
  const handleRemoveTag = (tagId) => {
    setTags(tags.filter((tag) => tag.id !== tagId));
  };

  // Handle task update submission (will only trigger reload for main task changes)
  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    const updatedTask = {
      ...editedTask,
      taskTags: tags, // Include updated tags
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
        onClose(); // Close the popup after successful edit
        window.location.reload(); // Refresh the page only after saving the main task
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  // Handle task deletion (triggers page reload)
  const handleDeleteTask = async () => {
    try {
      const response = await fetch(`http://stride.ddns.net:8080/tasks/${task.id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        onClose(); // Close the popup after successful deletion
        window.location.reload(); // Refresh the page after task deletion
      } else {
        console.error('Error deleting task');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Handle new tag creation
  const handleTagCreated = (newTag) => {
    setTags([...tags, newTag]); // Add new tag to the task's tag list
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

          {/* Date and List in a single row */}
          <div className="row">
            <div className="input-group">
              <label>Date</label>
              <input
                type="date"
                name="finishDate"
                value={new Date(editedTask.finishDate).toISOString().split('T')[0]} // Pre-filled date
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>List</label>
              <select
                name="list"
                value={editedTask.list?.id || ''}
                onChange={(e) =>
                  setEditedTask({
                    ...editedTask,
                    list: {
                      id: e.target.value,
                      name: e.target.options[e.target.selectedIndex].text,
                    },
                  })
                }
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
                #{tag.name}{' '}
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
            <button
              type="button"
              className="tags-button"
              onClick={() => setShowTagCreate(true)}
            >
              New Tag
            </button>
          </div>

          {/* SubtasksPane: Handles subtasks independently */}
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
