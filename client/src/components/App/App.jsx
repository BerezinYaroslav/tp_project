import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '../Header/Header.jsx';
import Sidebar from '../Sidebar/Sidebar.jsx';
import Main from '../Main/Main.jsx';
import Calendar from '../Calendar/CalendarPage.jsx';
import Lists from '../Lists/Lists.jsx';
import ListTasks from '../Lists/ListsTasks.jsx';
import AnalyticsPage from '../Analytics/AnalyticsPage.jsx';

function App() {
  const [search, setSearch] = React.useState('');

  return (
    <div className="app">
      <Header setSearch={setSearch} search={search} />
      <div className="app__container">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Main search={search} />} />
          <Route path="lists" element={<Lists />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/list-tasks/:listId" element={<ListTasks />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
