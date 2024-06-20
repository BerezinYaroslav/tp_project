import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

function AnalyticsPage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:8080/tasks');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const calculateAnalyticsData = () => {
    const today = new Date();
    let completed = 0;
    let missed = 0;
    let toBeCompleted = 0;

    tasks.forEach(task => {
      const finishDate = new Date(task.finish_date);

      if (task.is_done) {
        completed++;
      } else if (finishDate < today) {
        missed++;
      } else {
        toBeCompleted++;
      }
    });

    return { completed, missed, toBeCompleted };
  };

  const analyticsData = calculateAnalyticsData();

  const pieChartData = {
    labels: ['Completed', 'Missed', 'To Be Completed'],
    datasets: [
      {
        data: [analyticsData.completed, analyticsData.missed, analyticsData.toBeCompleted],
        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
      },
    ],
  };

  useEffect(() => {
    return () => {
      // Cleanup chart instance if it exists
      const chartInstance = Chart.getChart('pie-chart');
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, []);

  return (
    <div className="analytics-page">
      <h1>Task Analytics</h1>
      <div className="chart-container">
        <Pie data={pieChartData} id="pie-chart" />
      </div>
      <div className="data-container">
        <div className="data-item">
          <h3>Completed</h3>
          <p>{analyticsData.completed}</p>
        </div>
        <div className="data-item">
          <h3>Missed</h3>
          <p>{analyticsData.missed}</p>
        </div>
        <div className="data-item">
          <h3>To Be Completed</h3>
          <p>{analyticsData.toBeCompleted}</p>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPage;
