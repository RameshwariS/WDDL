import { useState, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import FilterControls from './components/FilterControls';
import './App.css';

export default function App() {
  const auth = useContext(AuthContext);
  const user = auth?.user;
  const [tasks, setTasks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  
  // Filter states
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');

  // Task management functions
  const handleAddTask = (newTask) => {
    setTasks([...tasks, {
      ...newTask,
      id: Date.now(),
      createdAt: new Date().toISOString()
    }]);
  };

  const handleEditTask = (id, updatedTask) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, ...updatedTask } : task
    ));
    setEditingId(null);
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleToggleStatus = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { 
        ...task, 
        status: task.status === 'pending' ? 'completed' : 'pending' 
      } : task
    ));
  };

  // Filter tasks based on selected filters
  const filteredTasks = tasks.filter(task => {
    return (
      (filterStatus === 'all' || task.status === filterStatus) &&
      (filterCategory === 'all' || task.category === filterCategory) &&
      (filterPriority === 'all' || task.priority === filterPriority)
    );
  });

  if (!auth) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="app">
      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
        <Route path="/" element={
          user ? (
            <div className="task-manager">
              <header>
                <h1>Task Manager</h1>
                <button className="logout-btn" onClick={() => auth.logout()}>
                  Logout
                </button>
              </header>
              
              <TaskForm 
                taskToEdit={tasks.find(t => t.id === editingId)}
                onSave={editingId ? 
                  (updatedTask) => handleEditTask(editingId, updatedTask) : 
                  handleAddTask
                }
                onCancel={() => setEditingId(null)}
              />
              
              <FilterControls
                filterStatus={filterStatus}
                setFilterStatus={setFilterStatus}
                filterCategory={filterCategory}
                setFilterCategory={setFilterCategory}
                filterPriority={filterPriority}
                setFilterPriority={setFilterPriority}
              />
              
              <TaskList 
                tasks={filteredTasks}
                onEdit={setEditingId}
                onDelete={handleDeleteTask}
                onToggle={handleToggleStatus}
              />
            </div>
          ) : (
            <Navigate to="/login" />
          )
        } />
      </Routes>
    </div>
  );
}