import React, { useState, useEffect } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

function AnalyticsPage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://stride.ddns.net:8080/tasks/parentIdIsNull?parentId=null');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const getCurrentWeekRange = () => {
    const currentDate = new Date();
    const dayOfWeek = currentDate.getDay() || 7; // Adjust to make Sunday = 7, Monday = 1
    const firstDayOfWeek = new Date(currentDate.setDate(currentDate.getDate() - dayOfWeek + 1));
    const lastDayOfWeek = new Date(currentDate.setDate(firstDayOfWeek.getDate() + 6));

    return { startOfWeek: firstDayOfWeek, endOfWeek: lastDayOfWeek };
  };

  // Get the current week range
  const { startOfWeek, endOfWeek } = getCurrentWeekRange();

  // Calculate tasks completed per day for the current week
  const getTasksPerDay = () => {
    const dayCounts = {
      Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0,
    };
    const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    tasks.forEach((task) => {
      const finishDate = new Date(task.finishDate);

      // Normalize dates to ignore time differences
      const normalizedFinishDate = new Date(finishDate.toDateString());
      const normalizedStartOfWeek = new Date(startOfWeek.toDateString());
      const normalizedEndOfWeek = new Date(endOfWeek.toDateString());

      // Only count tasks within the current week range
      if (normalizedFinishDate >= normalizedStartOfWeek && normalizedFinishDate <= normalizedEndOfWeek && task.isDone) {
        const dayName = dayLabels[finishDate.getDay() === 0 ? 6 : finishDate.getDay() - 1]; // Get day of the week (adjust for Sunday as 0)
        dayCounts[dayName]++;
      }
    });

    return dayCounts;
  };

  // Prepare data for the Bar chart (tasks completed per day in the current week)
  const tasksPerDay = getTasksPerDay();
  const barChartData = {
    labels: Object.keys(tasksPerDay),
    datasets: [
      {
        label: 'Tasks Completed',
        data: Object.values(tasksPerDay),
        backgroundColor: ['#77DD77', '#77DD77', '#77DD77', '#77DD77', '#77DD77', '#77DD77', '#77DD77'],
      },
    ],
  };

  const getCompletionProportion = () => {
    let completed = 0;
    let unfinished = 0;

    tasks.forEach((task) => {
      if (task.isDone) {
        completed++;
      } else {
        unfinished++;
      }
    });

    return { completed, unfinished };
  };

  const { completed, unfinished } = getCompletionProportion();
  const pieChartData = {
    labels: ['Completed Tasks', 'Unfinished Tasks'],
    datasets: [
      {
        data: [completed, unfinished],
        backgroundColor: ['#77DD77', '#F7B500'],
        hoverBackgroundColor: ['#77DD77', '#F7B500'],
      },
    ],
  };

  return (
    <div className="analytics-page">
      {/* Left section for Bar Chart */}
      <div className="analytics-left">
        <h2>Completed tasks</h2>
        <p>{`${startOfWeek.toLocaleDateString()} - ${endOfWeek.toLocaleDateString()}`}</p>
        {' '}
        {/* Display current week range */}
        <Bar data={barChartData} />
      </div>

      {/* Right section for Pie Chart */}
      <div className="analytics-right">
        <h2>Task Completion</h2>
        <div className="chart-container">
          <Pie data={pieChartData} />
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPage;
