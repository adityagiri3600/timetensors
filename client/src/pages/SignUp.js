import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernames, setUsernames] = useState([]);
    const { login } = useAuth();
    const navigate = useNavigate();

    const getUsernames = async () => {
        try {
            const response = await axios.get("/api/signup/usernames");
            setUsernames(response.data.map((user) => user.username));
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getUsernames();
        console.log(usernames);
    }, []);

    return (
        <motion.div
            exit={{
                height: "0px",
                transition: {
                    duration: 0.3,
                }
            }}
            style={{
                height: "100vh",
                overflow: "hidden",
            }}
        >
            <div>
                <h2>Sign up</h2>
                <form onSubmit={async (e) => {
                    e.preventDefault();
                    try {
                        const response = await fetch("/api/signup", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                username,
                                password
                            })
                        });
                        console.log(response);
                        login(response.data)
                        navigate(-1);
                    } catch (error) {
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
                            autoComplete="new-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <a href="/login"> already a user? Log in instead</a>
                    <div style={{
                        display: "flex",
                        justifyContent: "right"
                    }}>
                        {usernames.includes(username) && <p>Username already taken</p>}
                        <button type="submit" disabled={usernames.includes(username)}>Sign Up</button>
                    </div>
                </form>
            </div>
        </motion.div>
    );
}

export default SignUp;