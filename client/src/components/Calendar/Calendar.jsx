import React, { useState, useEffect, useContext } from 'react';
import TaskView from '../Popup/TaskView.jsx';
import TaskCreateWithDate from '../Popup/TaskCreateWithDate.jsx';
import API_BASE_URL from '../../config.js';
import { UserContext } from "../App/UserContext.jsx";

function Calendar({ onTaskChange }) {
  const { userId } = useContext(UserContext);
  const { creds } = useContext(UserContext);
  const [tasks, setTasks] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedTask, setSelectedTask] = useState(null);
  const [showTaskView, setShowTaskView] = useState(false);
  const [showTaskCreateWithDate, setShowTaskCreateWithDate] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/parentIdIsNull?ownerId=${userId}&parentId=null`, {
        headers: {
          'Authorization': `Basic ${btoa(creds)}`
        }
      });
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleChange = () => {
    if (creds && userId) {
      fetchTasks();
    }
  };

  useEffect(() => {
    if (creds && userId) {
      fetchTasks();
    }
  }, [creds, userId, currentMonth, currentYear]);

  const handleMonthChange = (offset) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev); // Create a copy of the current date
      newDate.setMonth(newDate.getMonth() + offset); // Adjust the month
      return newDate;
    });
  };

  const handleYearChange = (offset) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev); // Create a copy of the current date
      newDate.setFullYear(newDate.getFullYear() + offset); // Adjust the year
      return newDate;
    });
  };

  const generateCalendar = () => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDay = new Date(currentYear, currentMonth, 1).getDay() || 7;
    const days = [];
    let day = 1;
    const totalCells = Math.ceil((daysInMonth + (firstDay - 1)) / 7) * 7;

    for (let i = 1; i <= totalCells; i++) {
      if (i < firstDay || day > daysInMonth) {
        days.push(null);
      } else {
        days.push(day++);
      }
    }

    return days;
  };

  const renderCalendar = () => {
    const days = generateCalendar();
    const weeks = [];
    let week = [];

    days.forEach((day, index) => {
      if (index % 7 === 0 && index !== 0) {
        weeks.push(week);
        week = [];
      }
      week.push(day);
    });
    weeks.push(week);

    return weeks.map((week, index) => (
      <div key={index} className="calendar-week">
        {week.map((day, dayIndex) => (
          <div
            key={dayIndex}
            className={`calendar-day ${day === currentDate.getDate() ? 'current-day' : ''}`}
            onClick={() => day && handleDayClick(day)}
          >
            {day}
            {day && renderTasksForDay(day)}
          </div>
        ))}
      </div>
    ));
  };

  const handleDayClick = (day) => {
    const date = new Date(currentYear, currentMonth, day);
    setSelectedDate(date);
    setShowTaskCreateWithDate(true);
  };

  const renderTasksForDay = (day) => {
    return tasks
      .filter((task) => {
        const taskDate = new Date(task.finishDate);
        return taskDate.getDate() === day && taskDate.getMonth() === currentMonth && taskDate.getFullYear() === currentYear;
      })
      .map((task) => (
        <div
          key={task.id}
          className="task-item"
          onClick={(e) => {
            e.stopPropagation(); // Prevent day click
            setSelectedTask(task);
            setShowTaskView(true);
          }}
        >
          {task.name}
        </div>
      ));
  };

  const handleTaskCreated = () => {
    fetchTasks();
    setShowTaskCreateWithDate(false);
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <h2>{currentDate.toLocaleString('en-GB', {month: 'long'})} {currentYear}</h2>
        <button onClick={() => handleYearChange(-1)}>&lt;&lt;</button>
        <button onClick={() => handleMonthChange(-1)}>&lt;</button>
        <button onClick={() => handleMonthChange(1)}>&gt;</button>
        <button onClick={() => handleYearChange(1)}>&gt;&gt;</button>
      </div>
      <div className="weekdays">
        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((weekday, index) => (
          <div key={index} className="weekday">{weekday}</div>
        ))}
      </div>
      <div className="calendar-grid">
        {renderCalendar()}
      </div>
      {showTaskView && selectedTask && (
        <TaskView
          task={selectedTask}
          onClose={() => setShowTaskView(false)}
          onTaskChange={onTaskChange}
          onChange={handleChange}
        />
      )}
      {showTaskCreateWithDate && selectedDate && (
        <TaskCreateWithDate
          show={showTaskCreateWithDate}
          onClose={() => setShowTaskCreateWithDate(false)}
          onTaskCreated={handleTaskCreated}
          initialDate={selectedDate} // Pass the selected date to pre-fill the TaskCreate form
        />
      )}
    </div>
  );
}

export default Calendar;
