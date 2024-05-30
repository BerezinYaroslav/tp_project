import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '../Header/Header.jsx';
import Sidebar from '../Sidebar/Sidebar.jsx';
import Main from '../Main/Main.jsx';
import Calendar from '../Calendar/Calendar.jsx';

function App() {
  const [search, setSearch] = React.useState('');

  return (
    <div className="app">
      <Header setSearch={setSearch} search={search} />
      <div className="app__container">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Main search={search} />} />
          <Route path="calendar" element={<Calendar />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
