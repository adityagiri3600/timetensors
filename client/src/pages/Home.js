import React, { useState, useEffect } from "react";
import { getTimetable } from "../app/timetrackFunctions";
import { useAuth } from "../AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import {
    IconBrandGithub,
    IconLogout,
    IconTablePlus,
    IconUser,
} from "@tabler/icons-react";
import "./Home.css";
import GlowingBorder from "../app/GlowingBorder";
import { useTheme } from "../ThemeContext";

const Home = () => {
    const { isLoggedIn, login, logout, userData } = useAuth();
    const {theme, setTheme} = useTheme();
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
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingTop: "20px",
                        paddingLeft: "20px",
                        paddingRight: "20px",
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
                        <div
                            style={{
                                border: "1px solid #FFFFFFAA",
                                borderRadius: "5px",
                                display: "flex",
                                alihnitItems: "center",
                            }}
                        >
                            <p
                                style={{
                                    margin: "10px",
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <IconUser size={20} />
                                &nbsp;
                                {userData.username}
                            </p>
                            <button
                                onClick={() => {
                                    logout();
                                    navigate("/");
                                }}
                                className="btn-press"
                                style={{
                                    background: "#f31e40",
                                    color: "white",
                                    border: "none",
                                    padding: "10px",
                                    borderRadius: "0  5px 5px 0",
                                }}
                            >
                                <IconLogout size={20} />
                            </button>
                        </div>
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
                <select
                    className="themeSelect"
                    value={theme}
                    onChange={(e) => {
                        setTheme(e.target.value);
                    }}
                    style={{
                        width: "200px",
                        fontSize: "1rem",
                        margin: "20px",
                    }}
                >
                    <option value="classic">Classic</option>
                    <option value="simple">Simple</option>
                </select>
                <div
                    style={{
                        border: "1px solid #FFFFFFAA",
                        margin: "20px",
                        borderRadius: "5px",
                        backgroundImage:
                            "radial-gradient(#ffffffaa 1px, transparent 0)",
                        backgroundSize: "20px 20px",
                        maxWidth: "600px",
                    }}
                    className="dottedgrid"
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%",
                        }}
                    >
                        <p className="recentlHeading">Recent</p>
                        <GlowingBorder
                            width={71}
                            height={36}
                            color1="green"
                            color2="green"
                            id="new"
                            animation={"static"}
                            style={{
                                marginRight: "10px",
                            }}
                        >
                            <Link
                                type="submit"
                                className="newTimeTable btn-press"
                                to="/new"
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    margin: "2px",
                                }}
                            >
                                <IconTablePlus size={20} stroke={1} />
                                <p style={{ margin: "0 0 0 5px" }}>new</p>
                            </Link>
                        </GlowingBorder>
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
                                    }}
                                >
                                    <motion.div
                                        className="textFade"
                                        initial={{ opacity: 0 }}
                                        animate={{
                                            opacity: 1,
                                            transition: { duration: 0.5 },
                                        }}
                                    >
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
                                    </motion.div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        position: "absolute",
                        bottom: "10px",
                    }}
                >
                    <GlowingBorder
                        width={99}
                        height={40}
                        color1="#E32636"
                        color2="#00BFFF"
                        id="github"
                        animation={"square"}
                    >
                        <Link
                            to={"https://github.com/adityagiri3600/timetensors"}
                            target="_blank"
                            style={{
                                margin: "2px",
                                backgroundColor: "#010409da",
                                padding: "2px 10px",
                                borderRadius: "5px",
                                display: "flex",
                                alignItems: "center",
                                backdropFilter: "blur(1px)",
                            }}
                        >
                            <svg
                                height="32"
                                aria-hidden="true"
                                viewBox="0 0 16 16"
                                version="1.1"
                                width="20"
                                data-view-component="true"
                                class="octicon octicon-mark-github v-align-middle color-fg-default"
                            >
                                <path
                                    fill="white"
                                    d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"
                                ></path>
                            </svg>
                            &nbsp; github
                        </Link>
                    </GlowingBorder>
                    <img
                        src="/starit.png"
                        style={{
                            width: "150px",
                        }}
                    />
                </div>
            </div>
        </motion.div>
    );
};

export default Home;
