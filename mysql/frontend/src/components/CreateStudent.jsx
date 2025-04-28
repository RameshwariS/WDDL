import { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

function CreateStudent() {
  const [name, setName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [fees, setFees] = useState('');
  const [standard, setStandard] = useState('');
  const [medium, setMedium] = useState('');
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    await API.post('/api/v1/student/create', { name, roll_no: rollNo, fees, standard, medium });
    navigate('/dashboard');
  };

  return (
    <form onSubmit={handleCreate}>
      <h2>Create Student</h2>

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

      <button type="submit">Create</button>
    </form>
  );
}

export default CreateStudent;
