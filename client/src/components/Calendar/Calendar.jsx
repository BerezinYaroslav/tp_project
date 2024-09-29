import React, {useState} from 'react';
import TaskCreate from "../Popup/TaskCreate.jsx";
import TaskView from "../Popup/TaskView.jsx";

function Calendar({ tasks }) {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const [selectedTask, setSelectedTask] = useState(null);
  const [showTaskView, setShowTaskView] = useState(false);

  const getMonthName = (monthIndex) => {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return monthNames[monthIndex];
  };

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const generateCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];
    let day = 1;

    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < (firstDay === 0 ? 6 : firstDay - 1)) {
          days.push(null);
        } else if (day > daysInMonth) {
          days.push(null);
        } else {
          days.push(day++);
        }
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
          <div key={dayIndex} className={`calendar-day ${day === currentDate.getDate() ? 'current-day' : ''}`}>
            {day}
            {day && tasks
              .filter((task) => {
                const taskDate = new Date(task.finishDate);
                return taskDate.getDate() === day && taskDate.getMonth() === currentMonth && taskDate.getFullYear() === currentYear;
              })
              .map((task) => (
                <div
                  key={task.id}
                  className="task-item"
                  onClick={() => {
                    setSelectedTask(task);
                    setShowTaskView(true);
                  }}
                >
                  {task.name}
                </div>
              ))}
          </div>
        ))}
      </div>
    ));
  };

  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  return (
    <div className="calendar">
      <div className="calendar-header">
        <h2>{getMonthName(currentMonth)} {currentYear}</h2>
      </div>
      <div className="weekdays">
        {weekdays.map((weekday, index) => (
          <div key={index} className="weekday">{weekday}</div>
        ))}
      </div>
      <div className="calendar-grid">
        {renderCalendar()}
      </div>
          {showTaskView && (
            <TaskView
              show={showTaskView}
              task={selectedTask}
              onClose={() => setShowTaskView(false)}
            />
          )}
    </div>
  );
}

export default Calendar;
