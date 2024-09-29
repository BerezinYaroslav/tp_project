import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import notification from '../../images/notification.png';
import avatar from '../../images/avatar.png';

function Header({ search, setSearch }) {
  const userId = 1;
  const [username, setUsername] = useState('');
  const [tasksForToday, setTasksForToday] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMenuDropdown, setShowMenuDropdown] = useState(false);
  const [taskCount, setTaskCount] = useState(0);

  const location = useLocation();

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/main':
        return 'All Tasks';
      case '/tasks':
        return 'Today\'s Tasks';
      case '/lists':
        return 'Task Lists';
      case '/calendar':
        return 'Calendar';
      case '/analytics':
        return 'Analytics';
      default:
        return 'Tasks';
    }
  };

  useEffect(() => {
    if (userId) {
      fetch(`http://stride.ddns.net:8080/users/${userId}`)
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
    fetch(`http://stride.ddns.net:8080/tasks/parentIdIsNull?date=${today}&priority=1&parentId=null&isDone=false`)
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

  const toggleMenuDropdown = () => {
    setShowMenuDropdown(!showMenuDropdown);
  };

  const handleInput = (e) => {
    setSearch(e.target.value);
  };

  return (
    <header className="header">
      <h1 className="header__logo">
        <Link to="/main" className={location.pathname === '/main' ? 'sidebar__item sidebar__item_active' : 'sidebar__item'}>
          STRIDE
        </Link>
      </h1>

      <h2 className="header__title">
        {getPageTitle()}
      </h2>

      <input
        type="text"
        className="header__input"
        placeholder="Search task..."
        onChange={handleInput}
        value={search}
      />

      <div className="header__profile">
        <div className="header__notification-container">
          <img
            src={notification}
            alt="notification"
            className="header__notification"
            onClick={toggleDropdown}
          />
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
        <img src={avatar} alt="avatar" className="header__avatar" width={50} height={50} onClick={toggleMenuDropdown}/>
        {showMenuDropdown && (
          <div className="header__dropdown">
            <h2><a href="/about">About Stride</a></h2>
            <h2><a href="/">Log Out</a></h2>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
