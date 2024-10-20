import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import notification from '../../images/notification.png';
import avatar from '../../images/avatar.png';
import API_BASE_URL from '../../config.js';
import { UserContext } from '../App/UserContext.jsx';
import TaskView from '../Popup/TaskView.jsx'; // Import TaskView

function Header({ search, setSearch }) {
  const { userId } = useContext(UserContext);
  const { creds } = useContext(UserContext);
  const { logout } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [tasks, setTasks] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMenuDropdown, setShowMenuDropdown] = useState(false);
  const [taskCount, setTaskCount] = useState(0);
  const [overdueTasks, setOverdueTasks] = useState([]);
  const [tasksForToday, setTasksForToday] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null); // State for the selected task
  const [showTaskView, setShowTaskView] = useState(false); // State to control TaskView visibility

  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const menuDropdownRef = useRef(null);

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
      case '/about':
        return 'About';
      default:
        return 'Tasks';
    }
  };

  useEffect(() => {
    if (userId && creds) {
      fetchUserDetails();
      fetchTasks();
    }
  }, [userId, creds]);

  const fetchUserDetails = () => {
    fetch(`${API_BASE_URL}/users/${userId}`, {
      headers: {
        'Authorization': `Basic ${btoa(creds)}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setUsername(data.name);
      })
      .catch((error) => console.error('Error fetching username:', error));
  };

  const fetchTasks = () => {
    fetch(`${API_BASE_URL}/tasks/parentIdIsNull?ownerId=${userId}&parentId=null`, {
      headers: {
        'Authorization': `Basic ${btoa(creds)}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setTasks(data);
        filterTasks(data);
      })
      .catch((error) => console.error('Error fetching tasks:', error));
  };

  const filterTasks = (tasks) => {
    const today = new Date().toISOString().split('T')[0];
    const overdue = [];
    const todayTasks = [];

    tasks.forEach((task) => {
      const taskDate = new Date(task.finishDate).toISOString().split('T')[0];
      if (taskDate < today && !task.isDone) {
        overdue.push(task);
      } else if (taskDate === today && !task.isDone) {
        todayTasks.push(task);
      }
    });

    setOverdueTasks(overdue);
    setTasksForToday(todayTasks);
    setTaskCount(overdue.length + todayTasks.length);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const toggleMenuDropdown = () => {
    setShowMenuDropdown(!showMenuDropdown);
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setShowTaskView(true);
  };

  const handleInput = (e) => {
    setSearch(e.target.value);
    if (location.pathname !== '/main' && location.pathname !== '/tasks') {
      navigate('/main');
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current && !dropdownRef.current.contains(event.target) &&
        showDropdown
      ) {
        setShowDropdown(false);
      }

      if (
        menuDropdownRef.current && !menuDropdownRef.current.contains(event.target) &&
        showMenuDropdown
      ) {
        setShowMenuDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown, showMenuDropdown]);

  return (
    <header className="header">
      <h1 className="header__logo">
        <Link
          to="/main"
          className={location.pathname === '/main' ? 'sidebar__item sidebar__item_active' : 'sidebar__item'}
        >
          STRIDE
        </Link>
      </h1>

      <h2 className="header__title">
        {getPageTitle()}
      </h2>

      <input
        type="text"
        className="header__input"
        placeholder="Search task or #tags..."
        onChange={handleInput}
        value={search}
      />

      <div className="header__profile">
        <div className="header__notification-container" ref={dropdownRef}>
          <img
            src={notification}
            alt="notification"
            className="header__notification"
            onClick={toggleDropdown}
          />
          {taskCount > 0 && (
            <div className="header__notification-badge">{taskCount}</div>
          )}
          {showDropdown && (
            <div className="header__dropdown">
              <div className="list">Today's Tasks</div>
              <ul>
                {tasksForToday.map((task) => (
                  <div className="list_item" key={task.id} onClick={() => handleTaskClick(task)}>
                    {task.name}
                  </div>
                ))}
              </ul>
              <div className="list">Overdue Tasks</div>
              <ul>
                {overdueTasks.map((task) => (
                  <div className="list_item" key={task.id} onClick={() => handleTaskClick(task)}>
                    {task.name}
                  </div>
                ))}
              </ul>
            </div>
          )}
        </div>

        <span className="header__username" onClick={toggleMenuDropdown}>{username}</span>
        <div className="header__avatar-container" ref={menuDropdownRef}>
          <img src={avatar} alt="avatar" className="header__avatar" width={50} height={50}
               onClick={toggleMenuDropdown}/>
          {showMenuDropdown && (
            <div className="header__dropdown">
              <Link to="/about" className="dropdown_button">About Stride</Link>
              <Link to="/" onClick={logout} className="dropdown_button">Log Out</Link>
            </div>
          )}
        </div>
      </div>

      {selectedTask && showTaskView && (
        <TaskView
          task={selectedTask}
          onClose={() => {
            setShowTaskView(false);
            setSelectedTask(null);
          }}
        />
      )}
    </header>
  );
}

export default Header;
