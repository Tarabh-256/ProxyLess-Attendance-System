import React, { useState } from 'react';

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskInput, setEditingTaskInput] = useState('');

  const addTask = () => {
    if (taskInput.trim()) {
      setTasks([...tasks, { id: Date.now(), text: taskInput }]);
      setTaskInput('');
    }
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const startEditing = (task) => {
    setEditingTaskId(task.id);
    setEditingTaskInput(task.text);
  };

  const editTask = () => {
    setTasks(tasks.map(task => 
      task.id === editingTaskId ? { ...task, text: editingTaskInput } : task
    ));
    setEditingTaskId(null);
    setEditingTaskInput('');
  };

  return (
    <div className=" mx-auto p-8 border items-center border-gray-300 bg-indigo-300 h-full rounded-lg grid grid-cols-2 gap-4">
      <div className='p-12 bg-green-300 rounded-lg'>
        <h2 className="text-center text-xl font-bold mb-4">Student Todo List</h2>
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Enter a new task"
          className="w-full p-2 mb-3 border border-gray-300 rounded"
        />
        <button
          onClick={addTask}
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Task
        </button>
      </div>
      <ul className="list-none p-0 mt-5 grid grid-cols-1 gap-3  overflow-y-auto" style={{ maxHeight: '300px' }}>
        {tasks.map(task => (
          <li key={task.id} className="p-3 bg-gray-100 border border-gray-300 rounded flex justify-between items-center">
            {editingTaskId === task.id ? (
              <>
                <input
                  type="text"
                  value={editingTaskInput}
                  onChange={(e) => setEditingTaskInput(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <button
                  onClick={editTask}
                  className="ml-3 bg-green-500 text-white p-1 rounded hover:bg-green-600"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                {task.text}
                <div>
                  <button
                    onClick={() => startEditing(task)}
                    className="ml-3 bg-yellow-500 text-white p-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="ml-3 bg-red-500 text-white p-1 rounded hover:bg-red-600"
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

export default Todo;
