import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./style.css";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    name: "",
    mood: "",
    effort: "",
  });
  const [points, setPoints] = useState(0);
  const [badges, setBadges] = useState([]);
  const [filterMood, setFilterMood] = useState("");
  const [userId, setUserId] = useState(""); // Initialize as empty string

  // Fetch user ID based on email every time component mounts
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedEmail = localStorage.getItem("userEmail");
        if (!storedEmail) {
          console.error("No logged-in user email found.");
          return;
        }

        const response = await Axios.get("http://localhost:3000/users");
        const matchedUser = response.data.find(
          (user) => user.email === storedEmail
        );

        if (matchedUser) {
          setUserId(matchedUser.id);
          localStorage.setItem("userId", matchedUser.id);
        } else {
          console.error("User not found with the provided email.");
        }
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchUserId(); // Always fetch on component mount
  }, []);

  const API_URL = `http://localhost:3000/users/${userId}`;

  // Load tasks when userId is available
  useEffect(() => {
    if (userId) {
      const loadTasks = async () => {
        try {
          const response = await Axios.get(API_URL);
          setTasks(response.data.tasks || []);
        } catch (error) {
          console.error("Error fetching tasks:", error);
        }
      };
      loadTasks();
    }
  }, [userId, API_URL]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!newTask.name || !newTask.mood || !newTask.effort) {
      alert("Please fill out all fields!");
      return;
    }

    const taskPoints =
      newTask.effort === "high" ? 10 : newTask.effort === "medium" ? 5 : 2;

    const newTaskWithPoints = {
      ...newTask,
      id: Date.now(),
      completed: false,
      points: taskPoints,
    };

    try {
      const response = await Axios.get(API_URL);
      const userData = response.data;
      const updatedTasks = [...userData.tasks, newTaskWithPoints];

      await Axios.patch(API_URL, { tasks: updatedTasks });
      setNewTask({ name: "", mood: "", effort: "" });
      setTasks(updatedTasks); // Update local state directly
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const response = await Axios.get(API_URL);
      const userData = response.data;
      const updatedTasks = userData.tasks.filter((task) => task.id !== taskId);

      await Axios.patch(API_URL, { tasks: updatedTasks });
      setTasks(updatedTasks); // Update local state
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const completeTask = async (taskId) => {
    try {
      const completedTask = tasks.find((task) => task.id === taskId);
      if (!completedTask) return;

      await deleteTask(taskId);
      setPoints((prevPoints) => prevPoints + completedTask.points);
      updateBadges(points + completedTask.points);
    } catch (error) {
      console.error("Error completing task:", error);
    }
  };

  const updateBadges = (newPoints) => {
    let newBadges = [...badges];
    if (newPoints >= 50 && !newBadges.includes("Bronze Achiever")) {
      newBadges.push("Bronze Achiever");
    }
    if (newPoints >= 100 && !newBadges.includes("Silver Achiever")) {
      newBadges.push("Silver Achiever");
    }
    if (newPoints >= 200 && !newBadges.includes("Gold Achiever")) {
      newBadges.push("Gold Achiever");
    }
    setBadges(newBadges);
  };

  const handleFilterChange = (event) => {
    setFilterMood(event.target.value);
  };

  const resetDashboard = async () => {
    try {
      await Axios.patch(API_URL, { tasks: [] });
      setTasks([]);
      setPoints(0);
      setBadges([]);
      alert("Dashboard reset!");
    } catch (error) {
      console.error("Error resetting dashboard:", error);
    }
  };

  const filteredTasks = filterMood === "" ? tasks : tasks.filter((task) => task.mood === filterMood);

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container">
        <h1 className="dashboard-title">Welcome to Your Dashboard!</h1>
        <p className="dashboard-subtitle">Manage your tasks and earn rewards!</p>

        <div className="add-task-section">
          <h2>Add a New Task</h2>
          <form className="add-task-form" onSubmit={addTask}>
            <input
              type="text"
              name="name"
              placeholder="Enter Task Name"
              value={newTask.name}
              onChange={handleInputChange}
              className="input-task-name"
            />
            <select
              name="mood"
              value={newTask.mood}
              onChange={handleInputChange}
              className="dropdown"
            >
              <option value="">Select Mood</option>
              <option value="Energetic">Energetic</option>
              <option value="Focused">Focused</option>
            </select>
            <select
              name="effort"
              value={newTask.effort}
              onChange={handleInputChange}
              className="dropdown"
            >
              <option value="">Select Effort Level</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <button type="submit" className="add-task-button">
              Add Task
            </button>
          </form>
        </div>

        <div className="filter-section">
          <h2>Filter Tasks by Mood</h2>
          <select
            value={filterMood}
            onChange={handleFilterChange}
            className="dropdown"
          >
            <option value="">Show All Tasks</option>
            <option value="Energetic">Energetic</option>
            <option value="Focused">Focused</option>
          </select>
        </div>

        <div className="task-list-section">
          <h2>Your Tasks</h2>
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className={`task-item ${task.completed ? "completed" : ""}`}
              >
                <span>
                  {task.name} ({task.mood}, {task.effort} effort)
                </span>
                {!task.completed && (
                  <button
                    onClick={() => completeTask(task.id)}
                    className="complete-task-button"
                  >
                    Complete Task (+{task.points} points)
                  </button>
                )}
              </div>
            ))
          ) : (
            <p>No tasks match your selected mood!</p>
          )}
        </div>

        <div className="gamification-section">
          <h2>Gamification</h2>
          <p>Points Earned: {points}</p>
          {badges.length > 0 ? (
            badges.map((badge, index) => (
              <span key={index} className="badge">
                {badge}
              </span>
            ))
          ) : (
            <p>No badges earned yet. Keep completing tasks!</p>
          )}
        </div>

        <div className="reset-section">
          <button onClick={resetDashboard} className="reset-button">
            Reset Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;