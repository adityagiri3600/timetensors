import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import "./class.css";

const Class = ({ classItem, date, handleClick, focused, events, postEvent, ttRoute }) => {
    let cssClassName = `class `;

    const [currDate, setCurrDate] = useState(new Date());
    const [hour, setHour] = useState(currDate.getHours() + currDate.getMinutes() / 60 + currDate.getSeconds() / 3600);
    const [footer, setFooter] = useState("buttons");
    const [event, setEvent] = useState("")
    const { userData, isLoggedIn } = useAuth();
    let userHasEditCode = userData.editCodes.some(code => code.id === ttRoute)
    const navigate = useNavigate();

    const updateTime = () => {
        const newDateTime = new Date();
        setCurrDate(newDateTime);
        setHour(newDateTime.getHours() + newDateTime.getMinutes() / 60 + newDateTime.getSeconds() / 3600);
    };

    useEffect(() => {
        const intervalId = setInterval(updateTime, 1000);
        return () => clearInterval(intervalId);
    }, [hour]);

    const begin = parseInt(classItem.Start);
    const end = parseInt(classItem.End);

    if (begin <= hour && hour < end && currDate.toDateString() === date.toDateString()) {
        cssClassName += " active";
    }
    if (begin + 2 === end) {
        cssClassName += " lab";
    }
    if (classItem.Name === "Recess") {
        cssClassName += " recess";
    }
    if (date.getTime() < currDate.getTime() && currDate.toDateString() !== date.toDateString()) {
        cssClassName += " past"
    } else if (hour >= end && currDate.toDateString() === date.toDateString()) {
        cssClassName += " past"
    }

    return (
        <>
            <div className={`${cssClassName} ${focused ? 'focused' : ''}`} >
                <div onClick={() => {
                    if (!focused) setFooter("buttons");
                    handleClick();
                }}>
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
                        <h2>{classItem.Name}</h2>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div>
                                {classItem.Properties.map((property, i) => (
                                    property.Shown && <p key={i} style={{ fontSize: "0.6rem" }}>{property.Value}</p>
                                ))}
                            </div>
                            <p>{classItem.Start} - {classItem.End}</p>
                        </div>
                        {
                            events.filter(event => (
                                new Date(event.date).toDateString() === new Date(date).toDateString())
                                && begin === parseInt(new Date(event.date).getHours())).length > 0
                            &&

                            <div className="eventBox">
                                {events.filter(event => (
                                    new Date(event.date).toDateString() === new Date(date).toDateString())
                                    && begin === parseInt(new Date(event.date).getHours())).map((event, i) => (
                                        <ul key={i} className="event">
                                            <li>{event.event}</li>
                                        </ul>
                                    ))}
                            </div>}
                    </div>
                </div>

                <div className="classButtons" style={{
                    height: focused ? "39px" : "0px",
                    overflow: "hidden"
                }}>
                    {footer === "buttons" ? (
                        <>
                            {userHasEditCode && <button className="btn-press" onClick={() => setFooter("add event")}>Add Event</button>}
                            <button className="btn-press" onClick={() => navigate(`/class/${classItem.classid}`)}>View Class</button>
                        </>
                    ) : footer === "add event" ? (
                        <>
                            <input
                                autoFocus
                                type="text"
                                placeholder="Event Name"
                                value={event}
                                onChange={(e) => setEvent(e.target.value)}
                                style={{
                                    padding: "5px",
                                    paddingLeft: "15px",
                                    margin: "0",
                                    borderRadius: "none",
                                    border: "none",
                                    outline: "none",
                                    backgroundColor: "#000000AA",
                                    color: "white"
                                }}
                                onKeyUp={(e) => {
                                    if (e.key === "Enter") {
                                        postEvent({ date: new Date(date).setHours(parseInt(classItem.Start)), event: event })
                                        handleClick();
                                        setEvent("")
                                    }
                                }} />
                        </>
                    ) : null}
                </div>
            </div>
        </>
    );
}

export default Class;