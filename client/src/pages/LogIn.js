import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const LogIn = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [invalid, setInvalid] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    return (
        <motion.div
            style={{
                height: "100vh",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Link to={"/"} style={{ width: "100%" }}>
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
            <p
                style={{
                    textAlign: "center",
                    fontSize: "2rem",
                    padding: "10px",
                }}
            >
                Login
            </p>
            <form
                onSubmit={async (e) => {
                    e.preventDefault();
                    try {
                        const response = await axios.post("/api/login", {
                            username: username,
                            password,
                        });
                        console.log(response);
                        login(response.data);
                        navigate("/");
                    } catch (error) {
                        if (error.response.status === 404) {
                            setInvalid(true);
                            setInterval(() => {
                                setInvalid(false);
                            }, 5000);
                        }
                        console.error(error);
                    }
                }}
            >
                <div>
                    <label
                        htmlFor="username"
                        style={{ display: "block", marginLeft: "15px" }}
                    >
                        Username
                    </label>
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
                            border: "1px solid #3c3c3c",
                        }}
                    />
                </div>
                <div>
                    <label
                        htmlFor="password"
                        style={{ display: "block", marginLeft: "15px" }}
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        autoComplete="password"
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
                            border: "1px solid #3c3c3c",
                        }}
                    />
                </div>
                <Link
                    to="/signup"
                    style={{
                        textAlign: "center",
                        color: "#ffffff80",
                        textDecoration: "underline",
                        padding: "10px",
                    }}
                >
                    Not a user? Sign up instead
                </Link>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "right",
                    }}
                >
                    {invalid && (
                        <p
                            style={{
                                color: "red",
                                fontSize: "0.8rem",
                                padding: "10px",
                            }}
                        >
                            Invalid username or password
                        </p>
                    )}
                    <button
                        style={{
                            backgroundColor: "#159215",
                            color: "white",
                            border: "none",
                            fontSize: "1.1rem",
                            padding: "10px",
                            borderRadius: "5px",
                            margin: "10px",
                        }}
                        type="submit"
                    >
                        Log In
                    </button>
                </div>
            </form>
        </motion.div>
    );
};

export default LogIn;
