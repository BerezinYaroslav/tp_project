import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import TaskCreate from '../Popup/TaskCreate.jsx';
import TaskView from '../Popup/TaskView.jsx';
import '../Tasks/AllTasks.css';

function ListTasks({ search }) {
  const { listId } = useParams();
  const [listName, setListName] = useState('Loading...');
  const [tasks, setTasks] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showTaskView, setShowTaskView] = useState(false);

  const fetchListName = useCallback(() => {
    fetch(`http://stride.ddns.net:8080/lists/${listId}`)
      .then((response) => response.json())
      .then((data) => setListName(data.name))
      .catch((error) => console.error('Error fetching list:', error));
  }, [listId]);

  const fetchTasks = useCallback(() => {
    fetch(`http://stride.ddns.net:8080/tasks/list?listId=${listId}`)
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error('Error fetching tasks:', error));
  }, [listId]);

  useEffect(() => {
    fetchTasks();
    fetchListName();
  }, [fetchListName, fetchTasks]);

  const handleFinishedChange = async (e, task) => {
    e.stopPropagation();
    const updatedIsDone = !task.isDone;
    const updatedTask = { ...task, isDone: updatedIsDone };

    try {
      const response = await fetch('http://stride.ddns.net:8080/tasks', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      });

      if (response.ok) {
        setTasks((prevTasks) => prevTasks.map((t) => (t.id === task.id ? updatedTask : t)));
      } else {
        console.error('Error updating task isDone status');
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (search.startsWith('#')) {
      const tagQuery = search.substring(1).toLowerCase();
      return task.taskTags?.some((tag) => tag.name.toLowerCase().includes(tagQuery));
    }

    return task.name.toLowerCase().includes(search.toLowerCase());
  });

  const handleTaskCreated = () => {
    fetchTasks();
    setShowPopup(false);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const getTextColor = (backgroundColor) => {
    const color = backgroundColor.slice(1);
    const r = parseInt(color.slice(0, 2), 16);
    const g = parseInt(color.slice(2, 4), 16);
    const b = parseInt(color.slice(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? 'black' : 'white';
  };

  return (
    <main className="tasks">
      <div className="lists-header">
        <h1>{listName}</h1>
        <button className="tasks__create-button" onClick={() => setShowPopup(true)}>+</button>
      </div>
      <div className="tasks__list">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className="tasks__item"
            onClick={() => {
              setSelectedTask(task);
              setShowTaskView(true);
            }}
          >
            <div className="tasks__item-details">
              <div className="tasks__item-header">
                <h3 className={`tasks__item-title ${task.isDone ? 'task-finished' : ''}`}>{task.name}</h3>
                <input
                  type="checkbox"
                  className="styled-checkbox"
                  checked={task.isDone}
                  onClick={(e) => handleFinishedChange(e, task)}
                />
              </div>

              <div className="tasks__item-info">
                <span className="tasks__item-date">{formatDate(task.finishDate)}</span>
                {task.lists && task.lists.length > 0 && (
                  <span className="tasks__item-list">{task.lists[0].name}</span>
                )}
                <div className="tasks__tags">
                  {task.taskTags && task.taskTags.length > 0 ? (
                    task.taskTags.map((tag) => (
                      <span
                        key={tag.id}
                        className="tasks__tag"
                        style={{ backgroundColor: tag.color, color: getTextColor(tag.color) }}
                      >
                        #
                        {tag.name.toLowerCase()}
                      </span>
                    ))
                  ) : (
                    <span className="tasks__no-tags">No tags</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <TaskCreate show={showPopup} onClose={() => setShowPopup(false)} onTaskCreated={handleTaskCreated} />
      {selectedTask && (
        <>
          {showTaskView && (
            <TaskView
              show={showTaskView}
              task={selectedTask}
              onClose={() => setShowTaskView(false)}
            />
          )}
        </>
      )}
    </main>
  );
}

export default ListTasks;
