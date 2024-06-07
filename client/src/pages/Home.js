import React, { useState, useEffect } from "react";
import { getTimetable } from "../app/timetrackFunctions";
import { useAuth } from "../AuthContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Home.css";

const Home = () => {
    const { isLoggedIn, logout, userData } = useAuth();
    const [recentlyViewed, setRecentlyViewed] = useState([]);

    useEffect(() => {
        const fetchTimetables = async () => {
            let recentlyViewedIds = userData?.recentlyViewed;
            if (recentlyViewedIds) {
                const recentlyViewedTimetables = await Promise.all(recentlyViewedIds.map(id => getTimetable(id)));
                setRecentlyViewed(recentlyViewedTimetables.reverse());
            }
        };

        fetchTimetables();
    }, [userData]);


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
            <div
                className="recentlyViewedContainer"
                style={{
                    height: "100vh",
                }}
            >
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: "20px",
                }}>
                    <img src="/TimeTrack.svg" alt="logo" style={{
                        height: "2rem"
                    }}></img>
                    {isLoggedIn ?
                        <>
                            <p>{userData.username}</p>
                            <button
                                onClick={logout}
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
                        :
                        <Link
                            to="/login"
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
                        </Link>}
                </div>
                {recentlyViewed.length > 0 &&
                    <>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", maxWidth: "600px" }}>
                            <p className="recentlHeading">Recent</p>
                            <Link type="submit" className="newTimeTable btn-press" to="/new" style={{
                                display: "flex",
                                alignItems: "center",
                            }}>
                                <img src="/plus.svg" style={{ width: "20px", height: "20px", marginRight: "10px" }} alt="Create New Timetable"></img>
                                new
                            </Link>
                        </div>
                        <div style={{
                            overflowY: "scroll",
                            scrollbarWidth: "none",
                            display: "flex",
                        }}>
                            {recentlyViewed.map((timetable, index) => {
                                if (!timetable?.ttName || !timetable?.ttid) {
                                    return null;
                                }
                                return (
                                    <Link
                                        key={index}
                                        className="recentlyViewed btn-press"
                                        to={`/${timetable.ttid}`}
                                    >
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <p style={{ margin: 0, textWrap: "nowrap" }}>{timetable?.ttName}</p>
                                            <p style={{ margin: "0 0 0 10px", color: "#FFFFFFAA", fontSize: "0.8rem", }}>{timetable?.ttid}</p>
                                        </div>
                                        <p style={{ margin: 0, color: "#FFFFFFAA" }}>{timetable?.description}</p>
                                    </Link>
                                )
                            })}
                        </div>
                    </>
                }
            </div>
        </motion.div>
    );
}

export default Home;