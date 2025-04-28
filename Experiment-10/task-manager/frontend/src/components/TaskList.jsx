import { useState } from 'react';
import TaskForm from './TaskForm'; // Import TaskForm

const TaskList = ({ tasks, onEdit, onDelete, onToggle }) => {
    const [editingId, setEditingId] = useState(null);

    return (
        <div className="task-list">
            <h2>Tasks</h2>
            <ul>
                {tasks.map(task => (
                    <li key={task.id} className={task.status}>
                        {editingId === task.id ? (
                            <TaskForm
                                taskToEdit={task}
                                onSave={(updatedTask) => {
                                    onEdit(task.id, updatedTask);
                                    setEditingId(null);
                                }}
                                onCancel={() => setEditingId(null)}
                            />
                        ) : (
                            <>
                                <input
                                    type="checkbox"
                                    checked={task.status === 'completed'}
                                    onChange={() => onToggle(task.id)}
                                />
                                <div className="task-content">
                                    <h3>{task.title}</h3>
                                    <p>{task.description}</p>
                                    <div className="task-meta">
                                        <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                                        <span>Priority: {task.priority}</span>
                                        <span>Category: {task.category}</span>
                                        <span>Status: {task.status}</span>
                                    </div>
                                </div>
                                <div className="task-actions">
                                    <button
                                        className="edit-btn"
                                        onClick={() => setEditingId(task.id)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="delete-btn"
                                        onClick={() => onDelete(task.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;