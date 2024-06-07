import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [invalid, setInvalid] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    return (
        <div>
            <h2>Login</h2>
            {invalid && <p>Invalid username or password</p>}
            <form onSubmit={async (e) => {
                e.preventDefault();
                try {
                    const response = await axios.post("/api/login", {
                        username: username,
                        password,
                    });
                    console.log(response);
                    login(response.data);
                    navigate(-1);
                } catch (error) {
                    if (error.response.status === 404) {
                        setInvalid(true);
                        setInterval(() => {
                            setInvalid(false);
                        }, 5000);
                    }
                    console.error(error);
                }
            }}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        autoComplete="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        autoComplete="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <a href="/signup">Not a user? Sign up instead</a>
                <div style={{
                    display: "flex",
                    justifyContent: "right"
                }}>
                    <button type="submit">Log In</button>
                </div>
            </form>
        </div>
    );
}

export default LogIn;