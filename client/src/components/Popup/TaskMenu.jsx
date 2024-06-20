// TaskAction.jsx
import React, { useState, useEffect } from 'react';

function TaskMenu({ task, action, onClose, onTaskUpdated, onTaskDeleted }) {
  const [editedTask, setEditedTask] = useState({ ...task });

  useEffect(() => {
    setEditedTask({ ...task });
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({
      ...editedTask,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/tasks/${task.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedTask),
      });
      if (response.ok) {
        onTaskUpdated();
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8080/tasks/${task.id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        onTaskDeleted();
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        {action === 'edit' ? (
          <div className="task-edit-popup">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                value={editedTask.name}
                onChange={handleChange}
                placeholder="Task name"
              />
              <input
                type="date"
                name="finishDate"
                value={editedTask.finishDate}
                onChange={handleChange}
              />
              <button type="submit">Save</button>
              <button type="button" onClick={onClose}>Cancel</button>
            </form>
          </div>
        ) : (
          <div className="task-delete-popup">
            <p>Are you sure you want to delete this task?</p>
            <button onClick={handleDelete}>Yes</button>
            <button onClick={onClose}>No</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TaskMenu;
