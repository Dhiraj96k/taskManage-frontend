import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/api";

export default function Login() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const submit = async () => {
        try {
            const res = await API.post("/auth/login", form);
            localStorage.setItem("token", res.data.token);  // ✅ here only
            navigate("/dashboard");
        } catch (err) {
            alert(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>

            <input
                placeholder="Email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
            />

            <input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
            />

            <button onClick={submit}>Login</button>

            <p>
                New user? <Link to="/register">Register here</Link>
            </p>

            {/* Internal CSS */}
            <style>
                {`
                    .login-container {
                        width: 300px;
                        margin: 100px auto;
                        padding: 30px;
                        border: 1px solid #ccc;
                        border-radius: 8px;
                        box-shadow: 2px 2px 12px rgba(0,0,0,0.1);
                        text-align: center;
                        font-family: Arial, sans-serif;
                    }
                    .login-container h2 {
                        margin-bottom: 20px;
                        color: #333;
                    }
                    .login-container input {
                        width: 90%;
                        padding: 10px;
                        margin: 10px 0;
                        border: 1px solid #ccc;
                        border-radius: 5px;
                        font-size: 14px;
                    }
                    .login-container button {
                        width: 95%;
                        padding: 10px;
                        margin-top: 15px;
                        background-color: #4CAF50;
                        color: white;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                        font-size: 16px;
                    }
                    .login-container button:hover {
                        background-color: #45a049;
                    }
                    .login-container p {
                        margin-top: 15px;
                        font-size: 14px;
                        color: #555;
                    }
                    .login-container a {
                        color: #4CAF50;
                        text-decoration: none;
                    }
                    .login-container a:hover {
                        text-decoration: underline;
                    }
                `}
            </style>
        </div>
    );
}
