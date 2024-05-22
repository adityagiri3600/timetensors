import React, { useEffect, useState } from "react";
import NewClass from "../../app/newClass/newClass";
import "./timetableCreator.css";

const TimetableCreator = ({ classes, setClasses, classesAtSpecificDate, setNewClassesAtSpecificDate, editingSpecificDate, setEditingSpecificDate }) => {

    const [date, setDate] = useState(new Date());
    const [fakeDate, setFakeDate] = useState(date);

    const [weekDay, setWeekDay] = useState(date.getDay())
    const [fakeWeekDay, setFakeWeekDay] = useState(weekDay);

    useEffect(() => {
        setNewClassesAtSpecificDate({ date: fakeDate, classes: classes.filter(c => c.Day == fakeWeekDay) });
    }, [classes, fakeWeekDay, editingSpecificDate])

    const getClassesAtDate = (date_param) => {
        if (classesAtSpecificDate.length > 0) {
            for (let i = 0; i < classesAtSpecificDate.length; i++) {
                let casdDate = new Date(classesAtSpecificDate[i].date);
                casdDate.setHours(0, 0, 0, 0);
                date_param.setHours(0, 0, 0, 0);
                if (casdDate.valueOf() == date_param.valueOf()) {
                    return classesAtSpecificDate[i].classes;
                }
            }
        }
        return classes.filter(classElement => classElement.Day == date_param.getDay());
    }

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
            {editingSpecificDate ?
                <p style={{
                    fontSize: "0.8rem",
                    color: "#FFFFFFAA",
                    margin: "0",
                    padding: "0 20px"
                }}>
                    Be careful, in this mode you are only editing the classes for {fakeDate.toLocaleDateString("en-us", { month: "long", day: "numeric" })}.
                    Changes will only take effect when "Update" is clicked and only for this date.
                    To edit weekly instead, click the button again.
                </p>
                : null
            }
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h1 style={{
                    fontSize: "2rem",
                    margin: "20px",
                    textAlign: "left",
                    textShadow: "none"
                }}>
                    {fakeDate.toLocaleDateString("en-us", { weekday: "long" })}
                </h1>
                <button onClick={() => setEditingSpecificDate(!editingSpecificDate)} className="editingSpecificDatebtn">
                    {editingSpecificDate
                        ? `Editing ${fakeDate.toLocaleDateString("en-us", { month: "long", day: "numeric" })}`
                        : `Editing all ${fakeDate.toLocaleDateString("en-us", { weekday: "long" })}s`
                    }
                    <p style={{ fontSize: "0.5rem" }}> click to change </p>
                </button>
            </div>
            <div className="new-navbuttons">
                <button onClick={handlePrev} className="prev-btn">
                    prev
                </button>
                <button onClick={handleNext} className="next-btn">
                    next
                </button>
            </div>
            <div className="newClasslist">
                {(editingSpecificDate ? getClassesAtDate(fakeDate) : classes).map((c, i) =>
                    c.Day == fakeWeekDay ? (
                        <NewClass
                            key={i}
                            classes={editingSpecificDate ? getClassesAtDate(fakeDate) : classes}
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