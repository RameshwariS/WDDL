import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';

function UpdateStudent() {
  const [name, setName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [fees, setFees] = useState('');
  const [standard, setStandard] = useState('');
  const [medium, setMedium] = useState('');
  
  const { id } = useParams();
  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();
    await API.put(`/api/v1/student/update/${id}`, { 
      name, 
      roll_no: rollNo, 
      fees, 
      standard, 
      medium 
    });
    navigate('/dashboard');
  };

  return (
    <form onSubmit={handleUpdate}>
      <h2>Update Student</h2>
      
      <input 
        type="text" 
        placeholder="Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Roll Number" 
        value={rollNo} 
        onChange={(e) => setRollNo(e.target.value)} 
      />
      <input 
        type="number" 
        placeholder="Fees" 
        value={fees} 
        onChange={(e) => setFees(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Standard" 
        value={standard} 
        onChange={(e) => setStandard(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Medium" 
        value={medium} 
        onChange={(e) => setMedium(e.target.value)} 
      />

      <button type="submit">Update</button>
    </form>
  );
}

export default UpdateStudent;
