// CalendarPage.jsx
import React, { useState, useEffect } from 'react';
import Calendar from './Calendar';

function CalendarPage() {
  const [tasks, setTasks] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://stride.ddns.net:8080/tasks/parentIdIsNull?parentId=null'); // Adjust the API endpoint as needed
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Filter tasks to only include those within the current month and year
  const filteredTasks = tasks.filter((task) => {
    const taskDate = new Date(task.finishDate);
    return taskDate.getMonth() === currentMonth && taskDate.getFullYear() === currentYear;
  });

  return (
    <div className="calendar-page">
      <Calendar tasks={filteredTasks} currentDate={currentDate} setCurrentDate={setCurrentDate} />
    </div>
  );
}

export default CalendarPage;
