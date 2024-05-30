import React from 'react';
import Header from '../Header/Header.jsx';
import Sidebar from '../Sidebar/Sidebar.jsx';
import Main from '../Main/Main.jsx';

function App() {
  const [search, setSearch] = React.useState('');

  return (
    <div className="app">
      <Header setSearch={setSearch} search={search} />
      <div className="app__container">
        <Sidebar />
        <Main search={search} />
      </div>
    </div>
  );
}

export default App;
