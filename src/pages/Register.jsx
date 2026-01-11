import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/api";

export default function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const submit = async () => {
        try {
            await API.post("/auth/register", form);
            alert("Registered successfully");
        } catch (err) {
            alert(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>

            <input
                placeholder="Name"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
            />

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

            <button onClick={submit}>Register</button>

            <p>
                Already have an account? <Link to="/">Login</Link>
            </p>

            {/* Internal CSS */}
            <style>
                {`
                    .register-container {
                        width: 300px;
                        margin: 100px auto;
                        padding: 30px;
                        border: 1px solid #ccc;
                        border-radius: 8px;
                        box-shadow: 2px 2px 12px rgba(0,0,0,0.1);
                        text-align: center;
                        font-family: Arial, sans-serif;
                    }

                    .register-container h2 {
                        margin-bottom: 20px;
                        color: #333;
                    }

                    .register-container input {
                        width: 90%;
                        padding: 10px;
                        margin: 10px 0;
                        border: 1px solid #ccc;
                        border-radius: 5px;
                        font-size: 14px;
                    }

                    .register-container button {
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

                    .register-container button:hover {
                        background-color: #45a049;
                    }

                    .register-container p {
                        margin-top: 15px;
                        font-size: 14px;
                        color: #555;
                    }

                    .register-container a {
                        color: #4CAF50;
                        text-decoration: none;
                    }

                    .register-container a:hover {
                        text-decoration: underline;
                    }
                `}
            </style>
        </div>
    );
}
