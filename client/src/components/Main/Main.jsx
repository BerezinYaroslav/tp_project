import React, {
  useState, useEffect, useCallback, useMemo,
} from 'react';
import TaskCreate from '../Popup/TaskCreate.jsx';
import TaskMenu from '../Popup/TaskMenu.jsx';
import TaskView from '../Popup/TaskView.jsx';

function Main({ ownerId, search }) {
  const [tasks, setTasks] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showTaskView, setShowTaskView] = useState(false);
  const [showTaskMenu, setShowTaskMenu] = useState(false);
  const [taskMenuAction, setTaskMenuAction] = useState(null); // 'edit', 'delete', or null

  const today = useMemo(() => new Date(), []);
  const tomorrow = useMemo(() => new Date(today.getTime() + 24 * 60 * 60 * 1000), [today]);

  const formatDate = (date) => date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });

  const getTextColor = (backgroundColor) => {
    const color = backgroundColor.slice(1);
    const r = parseInt(color.slice(0, 2), 16);
    const g = parseInt(color.slice(2, 4), 16);
    const b = parseInt(color.slice(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? 'black' : 'white';
  };

  const fetchTasks = useCallback(() => {
    fetch(`http://localhost:8080/tasks?owner_id=${ownerId}&finish_date=${today.toISOString().split('T')[0]}&finish_date=${tomorrow.toISOString().split('T')[0]}`)
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error('Error fetching tasks:', error));
  }, [ownerId, today, tomorrow]);

  useEffect(() => { fetchTasks(); }, [fetchTasks]);

  const filteredTasks = tasks.filter((task) => task.name.toLowerCase().includes(search.toLowerCase()));
  const todayTasks = filteredTasks.filter((task) => task.finishDate === today.toISOString().split('T')[0]);
  const tomorrowTasks = filteredTasks.filter((task) => task.finishDate === tomorrow.toISOString().split('T')[0]);

  const handleTaskCreated = () => { fetchTasks(); setShowPopup(false); };
  const handleTaskUpdated = () => { fetchTasks(); setShowTaskMenu(false); };
  const handleTaskDeleted = () => { fetchTasks(); setShowTaskMenu(false); };

  return (
    <main className="main">
      {[
        { title: 'Today', date: formatDate(today), tasks: todayTasks },
        {
          title: 'Tomorrow', date: formatDate(tomorrow), tasks: tomorrowTasks, showAddButton: true,
        },
      ].map(({
               title, date, tasks, showAddButton,
             }) => (
        <div key={title} className="main__column">
          <div className="main__title-item">
            <h3 className="main__title">{title}</h3>
            <p className="main__date">{date}</p>
            {showAddButton && <button className="main__button" onClick={() => setShowPopup(true)}>+</button>}
          </div>
          {tasks.map((task) => (
            <div key={task.id} className="main__item" onClick={() => { setSelectedTask(task); setShowTaskView(true); }}>
              <div className="main__item-header">
                <h3 className="main__item-title">{task.name}</h3>
                <button onClick={(e) => { e.stopPropagation(); setSelectedTask(task); setShowTaskMenu(true); setTaskMenuAction('showButtons'); }}>:</button>
                {showTaskMenu && selectedTask && selectedTask.id === task.id && taskMenuAction === 'showButtons' && (
                  <div className="action-buttons">
                    <button onClick={(e) => { e.stopPropagation(); setTaskMenuAction('edit'); setShowTaskView(false); }}>Edit</button>
                    <button onClick={(e) => { e.stopPropagation(); setTaskMenuAction('delete'); setShowTaskView(false); }}>Delete</button>
                  </div>
                )}
              </div>
              <div className="main__item-subtitle">{task.name}</div>
              <div className="main__tags">
                {task.tags.map((tag) => (
                  <span key={tag.id} className="main__tag" style={{ backgroundColor: tag.color, color: getTextColor(tag.color) }}>
                    #
                    {tag.name.toLowerCase()}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
      <TaskCreate show={showPopup} onClose={() => setShowPopup(false)} onTaskCreated={handleTaskCreated} />
      {selectedTask && (
        <>
          {showTaskView && <TaskView show={showTaskView} task={selectedTask} onClose={() => setShowTaskView(false)} />}
          {showTaskMenu && (taskMenuAction === 'edit' || taskMenuAction === 'delete') && (
            <TaskMenu task={selectedTask} action={taskMenuAction} onClose={() => setShowTaskMenu(false)} onTaskUpdated={handleTaskUpdated} onTaskDeleted={handleTaskDeleted} />
          )}
        </>
      )}
    </main>
  );
}

export default Main;
