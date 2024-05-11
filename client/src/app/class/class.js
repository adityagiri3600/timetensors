import { React, useState, useEffect } from "react";
import "./class.css";

const Class = ({ Subject, Start, End, date, handleClick, focused, postEvent, events }) => {
    let cssClassName = `class `;

    const [currDate, setCurrDate] = useState(new Date());
    const [hour, setHour] = useState(currDate.getHours() + currDate.getMinutes() / 60 + currDate.getSeconds() / 3600);
    const [footer, setFooter] = useState("buttons");
    const [event, setEvent] = useState("")

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
        <div className={`${cssClassName} ${focused ? 'focused' : ''}`}>
            <div onClick={handleClick}>
                {cssClassName.includes("active") && !focused &&
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
                    <div>
                        {events.filter(event => (
                            new Date(event.date).toDateString() === new Date(date).toDateString())
                            && begin === parseInt(new Date(event.date).getHours())).map((event, i) => (
                                <div key={i} className="event">
                                    <p>{event.event}</p>
                                </div>
                            ))}
                    </div>
                </div>
            </div>

            <div className="classButtons" style={{
                height: focused ? "39px" : "0px",
                overflow: "hidden"
            }}>
                {footer === "buttons" ? (
                    <>
                        <button onClick={() => setFooter("add event")}>Add Event</button>
                        <button>View Class</button>
                    </>
                ) : footer === "add event" ? (
                    <>
                        <input type="text" placeholder="Event Name" value={event} onChange={(e) => setEvent(e.target.value)} style={{
                            width: "90%",
                            padding: "5px",
                            margin: "0",
                            borderRadius: "none",
                            border: "none",
                            outline: "none",
                            backgroundColor: "#000000AA",
                            color: "white"
                        }} />
                        <button onClick={() => postEvent({ date: new Date(date).setHours(parseInt(Start)), event: event })}>Add Event</button>
                    </>
                ) : null}
            </div>
        </div>
    );
}

export default Class;