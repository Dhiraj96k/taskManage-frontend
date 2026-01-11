import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import API from "../api/api";

export default function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [role, setRole] = useState("");
    const [title, setTitle] = useState(""); // For new task input

    // Fetch tasks and decode JWT
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decoded = jwt_decode(token);
            setRole(decoded.role);
        }

        fetchTasks();
    }, []);

    // Fetch tasks from backend
    const fetchTasks = async () => {
        try {
            const res = await API.get("/tasks");
            setTasks(res.data.tasks);
        } catch (err) {
            console.error(err);
        }
    };

    // Create a new task
    const createTask = async () => {
        if (!title) return alert("Task title is required");
        try {
            await API.post("/tasks", { title });
            setTitle(""); // Clear input
            fetchTasks(); // Refresh task list
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Task creation failed");
        }
    };

    // Delete a task (admin only)
    const deleteTask = async (id) => {
        try {
            await API.delete(`/tasks/${id}`);
            fetchTasks(); // Refresh after delete
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Delete failed");
        }
    };

    return (
        <div className="dashboard-container">
            <h2>Dashboard</h2>
            <p>Logged in as: <strong>{role}</strong></p>

            {/* Add Task Input */}
            <div className="add-task">
                <input
                    placeholder="Task title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <button onClick={createTask}>Add Task</button>
            </div>

            {/* Tasks List */}
            <ul className="task-list">
                {tasks.map((task) => (
                    <li key={task._id} className={task.createdByRole === "admin" ? "admin-task" : ""}>
                        {task.title} {task.createdByRole === "admin" && "(Admin Task)"}
                        {role === "admin" && (
                            <button className="delete-btn" onClick={() => deleteTask(task._id)}>Delete</button>
                        )}
                    </li>
                ))}
            </ul>

            {/* Internal CSS */}
            <style>
                {`
                    .dashboard-container {
                        width: 600px;
                        margin: 50px auto;
                        padding: 30px;
                        border: 1px solid #ccc;
                        border-radius: 10px;
                        box-shadow: 2px 2px 12px rgba(0,0,0,0.1);
                        font-family: Arial, sans-serif;
                        text-align: center;
                    }

                    .dashboard-container h2 {
                        margin-bottom: 15px;
                        color: #333;
                    }

                    .dashboard-container p {
                        margin-bottom: 20px;
                        font-size: 16px;
                        color: #555;
                    }

                    .add-task input {
                        padding: 10px;
                        width: 70%;
                        border-radius: 5px;
                        border: 1px solid #ccc;
                        margin-right: 10px;
                        font-size: 14px;
                    }

                    .add-task button {
                        padding: 10px 15px;
                        border: none;
                        background-color: #4CAF50;
                        color: white;
                        font-size: 14px;
                        border-radius: 5px;
                        cursor: pointer;
                    }

                    .add-task button:hover {
                        background-color: #45a049;
                    }

                    .task-list {
                        list-style-type: none;
                        padding-left: 0;
                        margin-top: 20px;
                        text-align: left;
                    }

                    .task-list li {
                        padding: 10px;
                        margin-bottom: 8px;
                        border: 1px solid #ddd;
                        border-radius: 5px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }

                    .admin-task {
                        background-color: #ffe6e6;
                        border-color: #ff4d4d;
                    }

                    .delete-btn {
                        background-color: #ff4d4d;
                        border: none;
                        color: white;
                        padding: 5px 10px;
                        border-radius: 5px;
                        cursor: pointer;
                        font-size: 12px;
                    }

                    .delete-btn:hover {
                        background-color: #e60000;
                    }
                `}
            </style>
        </div>
    );
}
