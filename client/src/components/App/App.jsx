import React from 'react';
import {
  Route, Routes, Navigate, useLocation,
} from 'react-router-dom';
import Header from '../Header/Header.jsx';
import Sidebar from '../Sidebar/Sidebar.jsx';
import Main from '../Main/Main.jsx';
import Calendar from '../Calendar/Calendar.jsx';
import Lists from '../Lists/Lists.jsx';
import ListTasks from '../Lists/ListsTasks.jsx';
import AnalyticsPage from '../Analytics/AnalyticsPage.jsx';
import Login from '../Welcome/Login.jsx';
import Register from '../Welcome/Register.jsx';
import AllTasks from '../Tasks/Tasks.jsx';
import About from '../About/About.jsx';
import Restore from "../Welcome/Restore.jsx";
import Reset from "../Welcome/Reset.jsx";

function App() {
  const [search, setSearch] = React.useState('');
  const location = useLocation();

  // Check if the user is authenticated
  const isAuthenticated = Boolean(localStorage.getItem('userId'));

  // Define pages where Header and Sidebar should not be shown
  const hideHeaderAndSidebar = ['/login', '/register', '/', '/reset', '/restore'];

  return (
    <div className="app">
      {/* Render Header only if the current route is not in hideHeaderAndSidebar */}
      {!hideHeaderAndSidebar.includes(location.pathname) && (
        <Header setSearch={setSearch} search={search} />
      )}

      <div className="app__container">
        {/* Render Sidebar only if the current route is not in hideHeaderAndSidebar */}
        {!hideHeaderAndSidebar.includes(location.pathname) && <Sidebar />}

        <Routes>
          {/* Public routes for unauthenticated users */}
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/tasks" /> : <Login />}
          />
          <Route
            path="/register"
            element={isAuthenticated ? <Navigate to="/tasks" /> : <Register />}
          />
          <Route
            path="/reset"
            element={isAuthenticated ? <Navigate to="/tasks" /> : <Reset />}
          />
          <Route
            path="/restore"
            element={isAuthenticated ? <Navigate to="/tasks" /> : <Restore />}
          />

          {/* Redirect from '/' based on authentication status */}
          <Route
            path="/"
            element={isAuthenticated ? <Navigate to="/tasks" /> : <Navigate to="/login" />}
          />

          {/* Private routes for authenticated users */}
          <Route
            path="/tasks"
            element={isAuthenticated ? <Main search={search} /> : <Navigate to="/login" />}
          />
          <Route
            path="/main"
            element={isAuthenticated ? <AllTasks search={search} /> : <Navigate to="/login" />}
          />
          <Route
            path="/lists"
            element={isAuthenticated ? <Lists /> : <Navigate to="/login" />}
          />
          <Route
            path="/calendar"
            element={isAuthenticated ? <Calendar /> : <Navigate to="/login" />}
          />
          <Route
            path="/analytics"
            element={isAuthenticated ? <AnalyticsPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/list-tasks/:listId"
            element={isAuthenticated ? <ListTasks search={search} /> : <Navigate to="/login" />}
          />
          <Route
            path="/about"
            element={isAuthenticated ? <About /> : <Navigate to="/login" />}
          />

          {/* Catch-all route for undefined paths */}
          <Route path="*" element={<Navigate to={isAuthenticated ? "/tasks" : "/login"} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
