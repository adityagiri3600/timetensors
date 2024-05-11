import React, { useState } from "react";
import NewClass from "../../app/newClass/newClass";
import "./timetableCreator.css";

const TimetableCreator = ({ classes, setClasses }) => {

    const [date, setDate] = useState(new Date());
    const [fakeDate, setFakeDate] = useState(date);

    const [weekDay, setWeekDay] = useState(date.getDay())
    const [fakeWeekDay, setFakeWeekDay] = useState(weekDay);

    const handleNext = () => {
        fakeDate.setDate(date.getDate() + 1);
        setFakeWeekDay((fakeWeekDay + 1) % 7);
    }

    const handlePrev = () => {
        fakeDate.setDate(date.getDate() - 1);
        setFakeWeekDay((fakeWeekDay + 6) % 7);
    }

    const addClass = () => {
        setClasses([...classes, { Day: fakeWeekDay, Subject: "", Start: "12:00", End: "13:00" }])
    }

    return (
        <div style={{ width: "100%" }}>
            <h1 style={{
                fontSize: "2rem",
                margin: "20px",
                textAlign: "left",
                textShadow: "none"
            }}>
                {fakeDate.toLocaleDateString("en-us", { weekday: "long" })}
            </h1>
            <div className="new-navbuttons">
                <button onClick={handlePrev} className="prev-btn">
                    prev
                </button>
                <button onClick={handleNext} className="next-btn">
                    next
                </button>
            </div>
            <div className="newClasslist">
                {classes.map((c, i) =>
                    c.Day == fakeWeekDay ? (
                        <NewClass
                            key={i}
                            classes={classes}
                            setClasses={setClasses}
                            index={i}
                            Day={fakeWeekDay}
                        />
                    ) : null
                )}
                <button onClick={addClass} className="newClass-btn">
                    Add Class
                </button>
            </div>
        </div>
    )
}

export default TimetableCreator;