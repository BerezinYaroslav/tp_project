import React, { useState, useEffect, useCallback, useMemo } from 'react';
import TaskCreate from '../Popup/TaskCreate.jsx';
import TaskView from '../Popup/TaskView.jsx';

function Main({ ownerId, search }) {
  const [tasks, setTasks] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showTaskView, setShowTaskView] = useState(false);

  const today = useMemo(() => new Date(), []);
  const tomorrow = useMemo(() => new Date(today.getTime() + 24 * 60 * 60 * 1000), [today]);

  const formatDate = (date) => date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });

  const getTextColor = (backgroundColor) => {
    const color = backgroundColor.slice(1);
    const r = parseInt(color.slice(0, 2), 16);
    const g = parseInt(color.slice(2, 4), 16);
    const b = parseInt(color.slice(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? 'black' : 'white';
  };

  const fetchTasks = useCallback(() => {
    fetch(`http://stride.ddns.net:8080/tasks/parentIdIsNull?owner_id=${ownerId}&parent_id=null&finish_date=${today.toISOString().split('T')[0]}&finish_date=${tomorrow.toISOString().split('T')[0]}`)
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error('Error fetching tasks:', error));
  }, [ownerId, today, tomorrow]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Handle updating the isDone state
  const handleFinishedChange = async (e, task) => {
    e.stopPropagation(); // Prevent click from propagating to the parent div
    const updatedIsDone = !task.isDone; // Toggle the isDone state
    const updatedTask = { ...task, isDone: updatedIsDone }; // Create updated task object

    try {
      const response = await fetch(`http://stride.ddns.net:8080/tasks`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      });

      if (response.ok) {
        // Update the task state locally
        setTasks((prevTasks) =>
          prevTasks.map((t) => (t.id === task.id ? updatedTask : t))
        );
      } else {
        console.error('Error updating task isDone status');
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (search.startsWith('#')) {
      // Search by tags
      const tagQuery = search.substring(1).toLowerCase();
      return task.taskTags?.some((tag) => tag.name.toLowerCase().includes(tagQuery));
    } else {
      // Search by task name
      return task.name.toLowerCase().includes(search.toLowerCase());
    }
  });
  const todayTasks = filteredTasks.filter((task) => task.finishDate === today.toISOString().split('T')[0]);
  const tomorrowTasks = filteredTasks.filter((task) => task.finishDate === tomorrow.toISOString().split('T')[0]);

  const handleTaskCreated = () => {
    fetchTasks();
    setShowPopup(false);
  };

  return (
    <main className="main">
      {[
        { title: 'Today', date: formatDate(today), tasks: todayTasks },
        {
          title: 'Tomorrow',
          date: formatDate(tomorrow),
          tasks: tomorrowTasks,
          showAddButton: true,
        },
      ].map(({ title, date, tasks, showAddButton }) => (
        <div key={title} className="main__column">
          <div className="main__title-item">
            <h3 className="main__title">{title}</h3>
            <p className="main__date">{date}</p>
            {showAddButton && <button className="main__button" onClick={() => setShowPopup(true)}>+</button>}
          </div>
          {tasks.map((task) => (
            <div
              key={task.id}
              className="main__item"
              onClick={() => {
                setSelectedTask(task);
                setShowTaskView(true);
              }}
            >
              <div className="main__item-header">
                {/* Task Name and Checkbox */}
                <div className="main__item-left">
                  <h3 className={`main__item-title ${task.isDone ? 'task-finished' : ''}`}>
                    {task.name}
                  </h3>
                </div>
                {/* Checkbox to mark task as done/undone */}
                <input
                  type="checkbox"
                  className="styled-checkbox"
                  checked={task.isDone}
                  onClick={(e) => handleFinishedChange(e, task)}
                />
              </div>
              <div className="main__item-subtitle">{task.description}</div>

              {/* Display Tags under Task Description */}
              <div className="main__tags">
                {task.taskTags && task.taskTags.length > 0 ? (
                  task.taskTags.map((tag) => (
                    <span
                      key={tag.id}
                      className="main__tag"
                      style={{ backgroundColor: tag.color, color: getTextColor(tag.color) }}
                    >
                      #{tag.name.toLowerCase()}
                    </span>
                  ))
                ) : (
                  <span>No Tags</span>
                )}
              </div>
            </div>
          ))}
        </div>
      ))}
      <TaskCreate show={showPopup} onClose={() => setShowPopup(false)} onTaskCreated={handleTaskCreated} />
      {selectedTask && (
        <>
          {showTaskView && <TaskView show={showTaskView} task={selectedTask} onClose={() => setShowTaskView(false)} />}
        </>
      )}
    </main>
  );
}

export default Main;
