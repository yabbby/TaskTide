import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PlannerPage = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('Pending');
  const [message, setMessage] = useState('');

  // Fetch tasks from the server when the component mounts
  useEffect(() => {
    const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage

    axios.get('http://localhost:5000/api/tasks', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
  }, []);

  // Handle adding a new task
  const handleAddTask = (e) => {
    e.preventDefault();

    const newTask = { title, description, dueDate, status };
    const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage

    axios.post('http://localhost:5000/api/tasks', newTask, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        setTasks([...tasks, response.data]); // Add the new task to the tasks list
        setMessage('Task added successfully!');
        setTitle('');
        setDescription('');
        setDueDate('');
        setStatus('Pending');
      })
      .catch(error => {
        console.error('Error adding task:', error);
        setMessage('Error adding task');
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-black">Planner</h2>

        {/* Task Form */}
        <form onSubmit={handleAddTask}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="title">Task Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="dueDate">Due Date</label>
            <input
              type="date"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700" htmlFor="status">Status</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Task
          </button>
        </form>

        {message && <p className="mt-4 text-center text-red-600">{message}</p>}

        {/* Task List */}
        <h3 className="text-xl font-semibold mt-6 mb-4 text-black">Your Tasks</h3>
        <div>
          {tasks.length === 0 ? (
            <p>No tasks added yet.</p>
          ) : (
            <ul className="space-y-4">
              {tasks.map((task) => (
                <li key={task._id} className="p-4 border-b border-gray-300 text-black">
                  <h4 className="font-semibold">{task.title}</h4>
                  <p>{task.description}</p>
                  <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
                  <p>Status: {task.status}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlannerPage;
