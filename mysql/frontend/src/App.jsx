import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import StudentDashboard from './components/StudentDashboard/StudentDashboard';
import CreateStudent from './components/CreateStudent';
import UpdateStudent from './components/UpdateStudent';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="/create" element={<CreateStudent />} />
        <Route path="/update/:id" element={<UpdateStudent />} />
      </Routes>
    </Router>
  );
}

export default App;
