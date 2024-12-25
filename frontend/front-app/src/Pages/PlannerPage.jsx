import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PlannerPage = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('Pending');
  const [message, setMessage] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null); // Track the task being edited

  // Fetch tasks from the server when the component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve token
        const response = await axios.get('http://localhost:5000/api/tasks', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error.response?.data || error.message);
        toast.error('Error fetching tasks!', {
          bodyStyle: { color: 'black' },
          style: { backgroundColor: 'white' },
        });
      }
    };
    fetchTasks();
  }, []);

  // Handle adding or updating a task
  const handleAddOrUpdateTask = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!title || !description || !dueDate) {
      toast.error('Please fill in all fields!', {
        bodyStyle: { color: 'black' },
        style: { backgroundColor: 'white' },
      });
      return;
    }

    const taskData = {
      title,
      description,
      dueDate: new Date(dueDate).toISOString(), // Format the date to ISO
      status,
    };

    try {
      let response;
      const token = localStorage.getItem('token'); // Retrieve token

      if (editingTaskId) {
        // Update the task
        response = await axios.put(
          `http://localhost:5000/api/tasks/${editingTaskId}`,
          taskData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const updatedTask = response.data;
        setTasks(tasks.map(task => (task._id === updatedTask._id ? updatedTask : task)));
        toast.success('Task Updated!', {
          bodyStyle: { color: 'black' },
          style: { backgroundColor: 'white' },
        });
      } else {
        // Add a new task
        response = await axios.post('http://localhost:5000/api/tasks', taskData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks([...tasks, response.data]);
        toast.success('New Task Added!', {
          bodyStyle: { color: 'black' },
          style: { backgroundColor: 'white' },
        });
      }

      setMessage('Task saved successfully!');
      resetForm();
    } catch (error) {
      console.error('Error saving task:', error.response?.data || error.message);
      setMessage('Error saving task');
      toast.error(`Error saving task: ${error.response?.data?.message || 'Unexpected error'}`, {
        bodyStyle: { color: 'black' },
        style: { backgroundColor: 'white' },
      });
    }
  };

  // Reset the form
  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDueDate('');
    setStatus('Pending');
    setEditingTaskId(null);
  };

  // Handle edit button click
  const handleEditTask = (task) => {
    setTitle(task.title);
    setDescription(task.description);
    setDueDate(task.dueDate.split('T')[0]); // Format date for input
    setStatus(task.status);
    setEditingTaskId(task._id); // Set the task being edited
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-black">Planner</h2>

        {/* Task Form */}
        <form onSubmit={handleAddOrUpdateTask}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-black" htmlFor="title">Task Title</label>
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
            <label className="block text-sm font-medium text-black" htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-black" htmlFor="dueDate">Due Date</label>
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
            <label className="block text-sm font-medium text-black" htmlFor="status">Status</label>
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
            {editingTaskId ? 'Update Task' : 'Add Task'}
          </button>
        </form>

        {message && <p className="mt-4 text-center text-red-600">{message}</p>}

        {/* Task List */}
        <h3 className="text-xl font-semibold mt-6 mb-4 text-black">Your Tasks</h3>
        <div>
          {tasks.length === 0 ? (
            <p className="text-black">No tasks added yet.</p>
          ) : (
            <ul className="space-y-4">
              {tasks.map((task) => (
                <li key={task._id} className="p-4 border-b border-gray-300">
                  <h4 className="font-semibold text-black">{task.title}</h4>
                  <p className="text-black">{task.description}</p>
                  <p className="text-black">Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
                  <p className="text-black">Status: {task.status}</p>
                  <button
                    onClick={() => handleEditTask(task)}
                    className="mt-2 text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
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

