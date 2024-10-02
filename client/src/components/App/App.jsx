import React from 'react';
import {
  Route, Routes, Navigate, useLocation,
} from 'react-router-dom';
import Header from '../Header/Header.jsx';
import Sidebar from '../Sidebar/Sidebar.jsx';
import Main from '../Main/Main.jsx';
import Calendar from '../Calendar/CalendarPage.jsx';
import Lists from '../Lists/Lists.jsx';
import ListTasks from '../Lists/ListsTasks.jsx';
import AnalyticsPage from '../Analytics/AnalyticsPage.jsx';
import Login from '../Welcome/Login.jsx';
import Register from '../Welcome/Register.jsx';
import AllTasks from '../Tasks/Tasks.jsx';
import About from '../About/About.jsx';

function App() {
  const [search, setSearch] = React.useState('');
  const location = useLocation();

  return (
    <div className="app">
      {location.pathname !== '/' && <Header setSearch={setSearch} search={search} />}
      <div className="app__container">
        {location.pathname !== '/' && <Sidebar />}
        <Routes>
          <Route path="/main" element={<AllTasks search={search} />} />
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tasks" element={<Main search={search} />} />
          <Route path="lists" element={<Lists />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/list-tasks/:listId" element={<ListTasks search={search} />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to="/register" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
