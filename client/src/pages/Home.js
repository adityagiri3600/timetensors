import React, { useState, useEffect } from "react";
import { getTimetable } from "../app/timetrackFunctions";
import "./Home.css";

const Home = () => {

    const [recentlyViewed, setRecentlyViewed] = useState([]);

    useEffect(() => {
        const fetchTimetables = async () => {
            let recentlyViewedIds = localStorage.getItem("recentlyViewedTimetables");
            if (recentlyViewedIds) {
                recentlyViewedIds = JSON.parse(recentlyViewedIds);
                const recentlyViewedTimetables = await Promise.all(recentlyViewedIds.map(id => getTimetable(id)));
                setRecentlyViewed(recentlyViewedTimetables);
            }
        };

        fetchTimetables();
    }, []);


    return (
        <div className="recentlyViewedContainer" style={{
            height: "100vh",
        }}>
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: "20px",
            }}>
                <img src="/TimeTrack.svg" alt="logo" style={{
                    height: "3rem"
                }}></img>
            </div>
            {recentlyViewed.length > 0 &&
                <>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", maxWidth: "600px" }}>
                        <p className="recentlHeading">Recent</p>
                        <button type="submit" className="newTimeTable" onClick={() => window.location.href = "/new"} style={{
                            display: "flex",
                            alignItems: "center",
                        }}>
                            <img src="/plus.svg" style={{ width: "20px", height: "20px", marginRight: "10px" }} alt="Create New Timetable"></img>
                            new
                        </button>
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
                                <div
                                    key={index}
                                    className="recentlyViewed"
                                    onClick={() => window.location.href = `/${timetable.ttid}`}
                                >
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <p style={{ margin: 0, textWrap: "nowrap" }}>{timetable?.ttName}</p>
                                        <p style={{ margin: "0 0 0 10px", color: "#FFFFFFAA", fontSize: "0.8rem", }}>{timetable?.ttid}</p>
                                    </div>
                                    <p style={{ margin: 0, color: "#FFFFFFAA" }}>{timetable?.description}</p>
                                </div>
                            )
                        })}
                    </div>
                </>
            }
        </div>
    );
}

export default Home;