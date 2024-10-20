// CalendarPage.jsx
import React, {useState, useEffect, useContext} from 'react';
import Calendar from './Calendar';
import API_BASE_URL from '../../config.js';
import {UserContext} from "../App/UserContext.jsx";

function CalendarPage() {
  const { userId } = useContext(UserContext);
const { creds } = useContext(UserContext);
  const [tasks, setTasks] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/tasks/parentIdIsNull?ownerId=${userId}&parentId=null`, {
          headers: {
            'Authorization': `Basic ${btoa(creds)}`
          }
        }); // Adjust the API endpoint as needed
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
