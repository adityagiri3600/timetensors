import { React, useState, useEffect } from "react";
import "./class.css";

const Class = ({ Subject, Start, End, date, handleClick, focused }) => {
    let cssClassName = `class `;

    const [currDate, setCurrDate] = useState(new Date());
    const [hour, setHour] = useState(currDate.getHours() + currDate.getMinutes() / 60 + currDate.getSeconds() / 3600);

    const updateTime = () => {
        const newDateTime = new Date();
        setCurrDate(newDateTime);
        setHour(newDateTime.getHours() + newDateTime.getMinutes() / 60 + newDateTime.getSeconds() / 3600);
    };

    useEffect(() => {
        const intervalId = setInterval(updateTime, 1000);
        return () => clearInterval(intervalId);
    }, [hour]);

    const begin = parseInt(Start);
    const end = parseInt(End);

    if (begin <= hour && hour < end && currDate.toDateString() === date.toDateString()) {
        cssClassName += " active";
    }
    if (begin + 2 === end) {
        cssClassName += " lab";
    }
    if (Subject === "Recess") {
        cssClassName += " recess";
    }
    if (date.getTime() < currDate.getTime() && currDate.toDateString() !== date.toDateString()) {
        cssClassName += " past"
    } else if (hour >= end && currDate.toDateString() === date.toDateString()) {
        cssClassName += " past"
    }

    return (
        <div className={`${cssClassName} ${focused ? 'focused' : ''}`} onClick={handleClick}>
            {cssClassName.includes("active") &&
                <div style={{ width: "100%", height: "3px" }}>
                    <div className="progress" style={{
                        width: `${(hour - begin) / (end - begin) * 100}%`,
                        backgroundColor: "white",
                        height: "100%",
                        borderRadius: "5px",
                        boxShadow: "0px 0px 10px 0px white"
                    }}></div>
                </div>
            }
            <div style={{ padding: "10px" }}>
                <h2>{Subject}</h2>
                <p>{Start} - {End}</p>
            </div>
            <div className="classButtons">
                <button>Add Event</button>
                <button>View CLass</button>
            </div>
        </div>
    );
}

export default Class;