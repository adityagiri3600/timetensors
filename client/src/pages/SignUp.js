import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../AuthContext";
import { Link, useNavigate } from "react-router-dom";
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
            style={{
                height: "100vh",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}
        >
            <Link to={"/"} style={{width:"100%"}}>
                <div
                    className="btn-press"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "left",
                        padding: "10px",
                        width: "fit-content",
                    }}
                >
                    <img
                        src="/chevronleft.svg"
                        alt="logo"
                        style={{
                            height: "1rem",
                            padding: "10px",
                        }}
                    ></img>
                    Home
                </div>
            </Link>
            <p style={{
                textAlign: "center",
                fontSize: "2rem",
                padding: "10px",
            }}>Sign up</p>
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
                    navigate("/");
                } catch (error) {
                    console.error(error);
                }
            }}>
                <div>
                    <label htmlFor="username" style={{ display: "block", marginLeft: "15px" }}>Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={{
                            backgroundColor: "black",
                            width: "300px",
                            margin: "10px",
                            padding: "10px",
                            color: "white",
                            borderRadius: "10px",
                            fontSize: "1.3rem",
                            outline: "none",
                            border: "1px solid #3c3c3c"
                        }}
                    />
                </div>
                <div>
                    <label htmlFor="password" style={{ display: "block", marginLeft: "15px" }}>Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{
                            backgroundColor: "black",
                            width: "300px",
                            margin: "10px",
                            padding: "10px",
                            color: "white",
                            borderRadius: "10px",
                            fontSize: "1.3rem",
                            outline: "none",
                            border: "1px solid #3c3c3c"
                        }}
                    />
                </div>
                <Link to="/signup" style={{
                    textAlign: "center",
                    color: "#ffffff80",
                    textDecoration: "underline",
                    padding: "10px",
                }}> already a user? Log in instead</Link>
                <div style={{
                    display: "flex",
                    justifyContent: "right"
                }}>
                    {usernames.includes(username) && <p style={{
                            color: "red",
                            fontSize: "0.8rem",
                            padding: "10px",
                        }}>Username already taken</p>}
                    <button 
                        type="submit" 
                        style={{
                            backgroundColor: "#159215",
                            color: "white",
                            border: "none",
                            fontSize: "1.1rem",
                            padding: "10px",
                            borderRadius: "5px",
                            margin: "10px",
                        }}
                        disabled={usernames.includes(username)}
                    >Sign Up</button>
                </div>
            </form>
        </motion.div>
    );
}

export default SignUp;