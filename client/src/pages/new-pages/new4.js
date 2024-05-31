import { React, useState, useEffect } from "react";
import NewTimeTable from "../../app/newTimeTable/newTimeTable";
import NewClass from "../../app/newClass/newClass";



const TimetableCreator = ({ classes, setClasses, classObjects }) => {

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
        setClasses([...classes, { Day: fakeWeekDay, classid: classObjects[0]?.classid, Start: "12:00", End: "13:00" }])
    }

    return (
        <div style={{ width: "100%" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h1 style={{
                    fontSize: "2rem",
                    margin: "20px",
                    textAlign: "left",
                    textShadow: "none"
                }}>
                    {fakeDate.toLocaleDateString("en-us", { weekday: "long" })}
                </h1>
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
                {classes.map((c, i) =>
                    c.Day == fakeWeekDay ? (
                        <NewClass
                            key={i}
                            classes={classes}
                            setClasses={setClasses}
                            classObjects={classObjects}
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




const New4 = ({ classes, setClasses, classObjects, body, setCreated, setTtRoute }) => {

    return (
        <div className="new3-container">
            <div>
                <TimetableCreator
                    classes={classes}
                    setClasses={setClasses}
                    classObjects={classObjects}
                />
            </div>
            <div className="new-btn-container">
                <NewTimeTable
                    body={body}
                    setCreated={setCreated}
                    setTtRoute={setTtRoute}
                    disabled={body.ttName === "" || body.editCode === ""}
                />
            </div>
        </div>
    );
}

export default New4;