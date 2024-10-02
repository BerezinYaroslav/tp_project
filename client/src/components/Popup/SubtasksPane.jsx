import React, { useState, useEffect } from 'react';
import './SubtasksPane.css';

function SubtasksPane({ taskId, parentFinishDate }) {
  const [subtasks, setSubtasks] = useState([]);
  const [newSubtaskName, setNewSubtaskName] = useState('');

  // Fetch subtasks when component mounts
  useEffect(() => {
    fetchSubtasks();
  }, [taskId]);

  const fetchSubtasks = async () => {
    try {
      const response = await fetch(`http://stride.ddns.net:8080/tasks/parent?parentId=${taskId}`);
      const data = await response.json();
      setSubtasks(data);
    } catch (error) {
      console.error('Error fetching subtasks:', error);
    }
  };

  // Create a new subtask
  const handleCreateSubtask = async () => {
    if (!newSubtaskName) return;

    const newSubtask = {
      name: newSubtaskName,
      parentId: taskId,
      finishDate: parentFinishDate,
      description: 'Subtask',
      tags: [],
      lists: [],
    };

    try {
      const response = await fetch('http://stride.ddns.net:8080/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSubtask),
      });

      if (response.ok) {
        fetchSubtasks(); // Refresh subtasks list
        setNewSubtaskName(''); // Reset input field
      } else {
        console.error('Error creating subtask');
      }
    } catch (error) {
      console.error('Error creating subtask:', error);
    }
  };

  // Toggle the 'isDone' state of a subtask
  const handleToggleSubtask = async (subtask) => {
    const updatedSubtask = { ...subtask, isDone: !subtask.isDone };

    try {
      const response = await fetch('http://stride.ddns.net:8080/tasks', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedSubtask),
      });

      if (response.ok) {
        fetchSubtasks(); // Refresh subtasks list
      } else {
        console.error('Error updating subtask');
      }
    } catch (error) {
      console.error('Error updating subtask:', error);
    }
  };

  // Delete a subtask
  const handleDeleteSubtask = async (subtaskId) => {
    try {
      const response = await fetch(`http://stride.ddns.net:8080/tasks/${subtaskId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchSubtasks(); // Refresh subtasks list
      } else {
        console.error('Error deleting subtask');
      }
    } catch (error) {
      console.error('Error deleting subtask:', error);
    }
  };

  return (
    <div className="subtasks-pane">
      <h3>Subtasks</h3>

      {/* Scrollable Subtasks List */}
      <div className="subtasks-list">
        {subtasks.length === 0 && <p>No subtasks available.</p>}
        {subtasks.map((subtask) => (
          <div key={subtask.id} className="subtask-item">
            <input
              className="styled-checkbox"
              type="checkbox"
              checked={subtask.isDone}
              onChange={() => handleToggleSubtask(subtask)}
            />
            <span className={subtask.isDone ? 'subtask-completed' : ''}>
              {subtask.name}
            </span>
            <button
              type="button"
              className="tags-delete-button"
              onClick={() => handleDeleteSubtask(subtask.id)}
            >
              X
            </button>
          </div>
        ))}
      </div>

      {/* Subtask Creation */}
      <div className="subtask-create">
        <input
          type="text"
          value={newSubtaskName}
          onChange={(e) => setNewSubtaskName(e.target.value)}
          placeholder="New subtask name"
        />
        <button type="button" onClick={handleCreateSubtask}>
          Add Subtask
        </button>
      </div>
    </div>
  );
}

export default SubtasksPane;
