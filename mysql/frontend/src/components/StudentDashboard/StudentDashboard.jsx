import { useEffect, useState } from 'react';
import API from '../../api';
import { useNavigate } from 'react-router-dom';
import './StudentDashboard.css'

function StudentDashboard() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  const fetchStudents = async () => {
    const res = await API.get('/api/v1/student/getall');
    
    console.log(res.data); // ADD THIS line to see what backend is sending
  
    // If res.data.students exists, set that
    if (Array.isArray(res.data.students)) {
      setStudents(res.data.students);
    } else {
      setStudents([]); // If something wrong, set empty array
    }
  };
  

  const deleteStudent = async (id) => {
    await API.delete(`/api/v1/student/delete/${id}`);
    fetchStudents(); // reload after delete
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div>
      <h2>Student Dashboard</h2>
      <button onClick={() => navigate('/create')}>Create New Student</button>
      {students.map(student => (
        <div key={student.id}>
          <p>{student.name}</p>
          <p>{student.roll_no} </p>
          <span>{student.fees} </span>
          <br/>
          <p>{student.standard} </p>
          <p>{student.medium} </p>
          <button onClick={() => navigate(`/update/${student.id}`)}>Update</button>
          <button onClick={() => deleteStudent(student.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default StudentDashboard;
