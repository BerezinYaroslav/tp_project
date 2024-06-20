import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ListTasks() {
  const [tasks, setTasks] = useState([]);
  const { listId } = useParams();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`http://localhost:8080/tasks?list_id=${listId}`); // Adjust the API endpoint as needed
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [listId]);

  return (
    <div className="list-tasks-page">
      <h1>Tasks for List {listId}</h1>
      <div className="tasks-container">
        {tasks.map((task) => (
          <div key={task.id} className="task-item">
            <span>{task.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListTasks;
