import React, { useState, useEffect } from "react";
import { getTimetable } from "../app/timetrackFunctions";
import "./Home.css";
import Carousel from "../app/carousel/carousel";

const Home = () => {

    const [recentlyViewed, setRecentlyViewed] = useState([]);

    useEffect(() => {
        const fetchTimetables = async () => {
            let recentlyViewedIds = localStorage.getItem("recentlyViewedTimetables");
            if (recentlyViewedIds) {
                recentlyViewedIds = JSON.parse(recentlyViewedIds);
                const recentlyViewedTimetables = await Promise.all(recentlyViewedIds.map(id => getTimetable(id)));
                setRecentlyViewed(recentlyViewedTimetables);
                console.log(recentlyViewedTimetables);
            }
        };
        
        fetchTimetables();
    }, []);


    return (
        <div style={{
            padding: "20px",
        }}>
            <h1>TimeTrack</h1>
            <form action="/new">
                <input type="submit" value="Create a New Timetable" className="newTimeTable" />
            </form>
            {recentlyViewed.length > 0 &&
            <div>
                <p>Recently Viewed Timetables</p>
                {recentlyViewed.map((timetable, index) => (
                        <div 
                            key={index} 
                            className="recentlyViewed"
                            onClick={() => window.location.href = `/${timetable.ttid}`}
                            style={{
                                width: "200px",
                                margin: "20px",
                            }}
                        >
                            <div style={{display: "flex", alignItems: "center" }}>
                            <p style={{margin: 0}}>{timetable?.ttName}</p>
                            <p style={{margin: "0 0 0 10px", color: "#FFFFFFAA", fontSize:"0.8rem"}}>{timetable?.ttid}</p>
                            </div>
                            <p style={{margin: 0, color: "#FFFFFFAA"}}>{timetable?.description}</p>
                        </div>
                    ))}
            </div>
            }
        </div>
    );
}

export default Home;