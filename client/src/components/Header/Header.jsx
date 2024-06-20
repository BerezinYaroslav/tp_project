import React, { useState, useEffect } from 'react';
import notification from '../../images/notification.png';
import avatar from '../../images/avatar.png';

function Header({ search, setSearch }) {
  const userId = 1;
  const [username, setUsername] = useState('');
  const [tasksForToday, setTasksForToday] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [taskCount, setTaskCount] = useState(0);

  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:8080/users/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          setUsername(data.name);
        })
        .catch((error) => console.error('Error fetching username:', error));
    }

    fetchTasksForToday();
  }, [userId]);

  const fetchTasksForToday = () => {
    const today = new Date().toISOString().split('T')[0];
    fetch(`http://localhost:8080/tasks?date=${today}&priority=1`)
      .then((response) => response.json())
      .then((data) => {
        setTasksForToday(data);
        setTaskCount(data.length);
      })
      .catch((error) => console.error('Error fetching tasks for today:', error));
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleInput = (e) => {
    setSearch(e.target.value);
  };

  return (
    <header className="header">
      <h1 className="header__logo">
        STRIDE
      </h1>
      <h2 className="header__title">
        Tasks
      </h2>
      <input type="text" className="header__input" placeholder="Search task..." onChange={handleInput} value={search} />
      <div className="header__profile">
        <div className="header__notification-container">
          <img src={notification} alt="notification" className="header__notification" onClick={toggleDropdown} />
          {taskCount > 0 && (
            <div className="header__notification-badge">{taskCount}</div>
          )}
        </div>
        {showDropdown && (
          <div className="header__dropdown">
            <ul>
              {tasksForToday.map((task) => (
                <li key={task.id}>{task.name}</li>
              ))}
            </ul>
          </div>
        )}
        {username}
        <img src={avatar} alt="avatar" className="header__avatar" width={50} height={50} />
      </div>
    </header>
  );
}

export default Header;
