import React, { useState, useEffect } from "react";
import { getTimetable } from "../app/timetrackFunctions";
import { useAuth } from "../AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { IconTablePlus } from "@tabler/icons-react";
import "./Home.css";

const Home = () => {
    const { isLoggedIn, login, logout, userData } = useAuth();
    const [recentlyViewed, setRecentlyViewed] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTimetables = async () => {
            let recentlyViewedIds = userData?.recentlyViewed;
            if (recentlyViewedIds) {
                const recentlyViewedTimetables = await Promise.all(
                    recentlyViewedIds.map((id) => getTimetable(id))
                );
                setRecentlyViewed(recentlyViewedTimetables.reverse());
            }
        };

        fetchTimetables();
    }, [userData]);

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const token = query.get("token");
        if (token) {
            localStorage.setItem("token", token);
            axios
                .get("/api/user", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    login(res.data);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }, [location.search]);

    return (
        <motion.div
            style={{
                height: "100vh",
                overflow: "hidden",
            }}
        >
            <div
                className="recentlyViewedContainer"
                style={{
                    height: "100vh",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        paddingTop: "20px",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <img
                            src="/TimeTrack.svg"
                            alt="logo"
                            style={{
                                height: "2rem",
                            }}
                        ></img>
                        <p
                            style={{
                                color: "#FFFFFFAA",
                                margin: "0",
                                fontSize: "0.8rem",
                                textAlign: "center",
                            }}
                        >
                            pre-release 1.0.0-alpha
                        </p>
                    </div>
                    {isLoggedIn ? (
                        <>
                            <p>{userData.username}</p>
                            <button
                                onClick={() => {
                                    logout();
                                    navigate("/");
                                }}
                                className="btn-press"
                                style={{
                                    background: "none",
                                    color: "white",
                                    border: "1px solid #FFFFFFAA",
                                    padding: "10px",
                                    borderRadius: "5px",
                                    marginLeft: "10px",
                                }}
                            >
                                Log out
                            </button>
                        </>
                    ) : (
                        <Link
                            onClick={() => {
                                window.location.href =
                                    process.env.NODE_ENV === "development"
                                        ? "http://localhost:5000/auth/google"
                                        : "/auth/google";
                            }}
                            className="btn-press"
                            style={{
                                background: "none",
                                color: "white",
                                border: "1px solid #FFFFFFAA",
                                padding: "10px",
                                borderRadius: "5px",
                            }}
                        >
                            Log in/Sign up
                        </Link>
                    )}
                </div>

                <>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%",
                            maxWidth: "600px",
                        }}
                    >
                        <p className="recentlHeading">Recent</p>
                        <Link
                            type="submit"
                            className="newTimeTable btn-press"
                            to="/new"
                            style={{
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <IconTablePlus size={20} stroke={1} />
                            <p style={{ margin: "0 0 0 5px" }}>new</p>
                        </Link>
                    </div>
                    <div
                        style={{
                            overflowY: "scroll",
                            scrollbarWidth: "none",
                            display: "flex",
                        }}
                    >
                        {recentlyViewed.map((timetable, index) => {
                            if (!timetable?.ttName || !timetable?.ttid) {
                                return null;
                            }
                            return (
                                <Link
                                    key={index}
                                    className="recentlyViewed btn-press"
                                    to={`/${timetable.ttid}`}
                                    style={{
                                        maxHeight: "100px",
                                        maxWidth: "300px",
                                        overflow: "hidden",
                                    }}
                                >
                                    <div className="textFade">
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                            }}
                                        >
                                            <p
                                                style={{
                                                    margin: 0,
                                                    textWrap: "nowrap",
                                                }}
                                            >
                                                {timetable?.ttName}
                                            </p>
                                            <p
                                                style={{
                                                    margin: "0 0 0 10px",
                                                    color: "#FFFFFFAA",
                                                    fontSize: "0.8rem",
                                                }}
                                            >
                                                {timetable?.ttid}
                                            </p>
                                        </div>
                                        <p
                                            style={{
                                                margin: 0,
                                                color: "#FFFFFFAA",
                                            }}
                                        >
                                            {timetable?.description}
                                        </p>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </>
            </div>
        </motion.div>
    );
};

export default Home;
