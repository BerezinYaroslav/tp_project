// TaskView.jsx
import React from 'react';

function TaskView({ task, onClose }) {
  if (!task) return null;

  return (
    <div className="task-view-popup">
      <div className="task-view-content">
        <h2>{task.name}</h2>
        <p>{task.description}</p>
        <p>Due Date: {new Date(task.finishDate).toLocaleDateString()}</p>
        {/* Add more task details as needed */}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default TaskView;
