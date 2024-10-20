import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useParams } from 'react-router-dom';
import TaskCreate from '../Popup/TaskCreate.jsx';
import TaskView from '../Popup/TaskView.jsx';
import '../Tasks/AllTasks.css';
import API_BASE_URL from '../../config.js';
import { UserContext } from '../App/UserContext.jsx';

function ListTasks({ search }) {
  const { userId } = useContext(UserContext);
  const { creds } = useContext(UserContext);
  const { listId } = useParams();
  const [list, setList] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showTaskView, setShowTaskView] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // State to track edit mode
  const [newListName, setNewListName] = useState(''); // State to track the new list name

  const fetchList = useCallback(() => {
    if (creds) {
      fetch(`${API_BASE_URL}/lists/${listId}?ownerId=${userId}`, {
        headers: {
          'Authorization': `Basic ${btoa(creds)}`
        }
      })
        .then((response) => response.json())
        .then((data) => {
          setList(data);
          setNewListName(data.name); // Initialize newListName with the current list name
        })
        .catch((error) => console.error('Error fetching list:', error));
    }
  }, [listId, userId, creds]);

  const fetchTasks = useCallback(() => {
    if (creds) {
      fetch(`${API_BASE_URL}/tasks/list?ownerId=${userId}&listId=${listId}`, {
        headers: {
          'Authorization': `Basic ${btoa(creds)}`
        }
      })
        .then((response) => response.json())
        .then((data) => setTasks(data))
        .catch((error) => console.error('Error fetching tasks:', error));
    }
  }, [listId, userId, creds]);

  useEffect(() => {
    fetchTasks();
    fetchList();
  }, [fetchList, fetchTasks]);

  const handleSaveListName = async () => {
    if (!list) return;

    const updatedList = { ...list, name: newListName };

    try {
      const response = await fetch(`${API_BASE_URL}/lists?ownerId=${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${btoa(creds)}`
        },
        body: JSON.stringify(updatedList),
      });

      if (response.ok) {
        setList(updatedList);
        setIsEditing(false);
      } else {
        console.error('Error updating list name');
      }
    } catch (error) {
      console.error('Error updating list:', error);
    }
  };

  const handleFinishedChange = async (e, task) => {
    e.stopPropagation();
    const updatedIsDone = !task.isDone;
    const updatedTask = { ...task, isDone: updatedIsDone };

    try {
      const response = await fetch(`${API_BASE_URL}/tasks?ownerId=${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${btoa(creds)}`
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
        {isEditing ? (
          <h1 className="lists-header-edit">
            <input
              type="text"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              placeholder={list?.name || 'List Name'}
              className="lists-header-view"
            />
            <button onClick={handleSaveListName} className="tasks__save-button">💾</button>
          </h1>
        ) : (
          <div className="lists-header-view">
            <h1>{list?.name || ''}
            <button onClick={() => setIsEditing(true)} className="tasks__edit-button">✎</button>
            </h1>
          </div>
        )}
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
                        #{tag.name.toLowerCase()}
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
      {selectedTask && showTaskView && (
        <TaskView
          show={showTaskView}
          task={selectedTask}
          onClose={() => setShowTaskView(false)}
        />
      )}
    </main>
  );
}

export default ListTasks;
