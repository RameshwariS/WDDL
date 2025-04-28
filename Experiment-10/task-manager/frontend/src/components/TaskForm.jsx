import { useState, useEffect } from 'react';

const TaskForm = ({ taskToEdit, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        dueDate: new Date().toISOString().split('T')[0],
        status: 'pending',
        category: 'work',
        priority: 'medium'
      });

    useEffect(() => {
        if (taskToEdit) {
            setFormData(taskToEdit);
        }
    }, [taskToEdit]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData); // Make sure onSave is passed as prop
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
                required
            />
            <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
            />
            <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                required
            />
            <select
                name="category"
                value={formData.category}
                onChange={handleChange}
            >
                <option value="work">Work</option>
                <option value="personal">Personal</option>
                <option value="shopping">Shopping</option>
                <option value="other">Other</option>
            </select>

            <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
            >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
            </select>
            <select
                name="status"
                value={formData.status}
                onChange={handleChange}
            >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
            </select>
            <button type="submit">{taskToEdit ? 'Update' : 'Add'} Task</button>
            {taskToEdit && <button type="button" onClick={onCancel}>Cancel</button>}
        </form>
    );
};

export default TaskForm;