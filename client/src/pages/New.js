import { React, useState, useEffect } from "react";
import Navigate from "../app/navigate/navigate";
import NewClass from "../app/newClass/newClass";
import NewTimeTable from "../app/newTimeTable/newTimeTable";
import Created from "./Created";
import "./New.css"

const New = () => {
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

    const [ttName, setTtName] = useState("")
    const [ttCode, setTtCode] = useState("")
    const [ttRoute, setTtRoute] = useState("")
    const [created, setCreated] = useState(false)

    const [classes, setClasses] = useState([
        { day: weekDay, subject: "", start: "12:00", end: "13:00" }
    ]);

    const addClass = () => {
        setClasses([...classes, { day: fakeWeekDay, subject: "", start: "12:00", end: "13:00" }])
    }

    return (
        <>
            {created ? (
                <Created ttName={ttName} ttRoute={ttRoute}/>
            ) : (
                <div>
                    <input
                        type="text"
                        placeholder="TimeTable name"
                        value={ttName}
                        onChange={(e) => setTtName(e.target.value)}
                        className="ttNameField"
                    />
                    <input
                        type="text"
                        placeholder="code"
                        value={ttCode}
                        onChange={(e) => setTtCode(e.target.value)}
                        className="ttCodeField"
                    />
                    <h1 className="dayTitle">
                        {fakeDate.toLocaleDateString("en-us", { weekday: "long" })}
                    </h1>
                    <Navigate handlePrev={handlePrev} handleNext={handleNext} />
                    {classes.map((c, i) =>
                        c.day === fakeWeekDay ? (
                            <NewClass
                                key={i}
                                classes={classes}
                                setClasses={setClasses}
                                index={i}
                                day={fakeWeekDay}
                            />
                        ) : null
                    )}
                    <button onClick={addClass} className="newClass-btn">
                        Add Class
                    </button>
                    <NewTimeTable
                        ttName={ttName}
                        classes={classes}
                        ttCode={ttCode}
                        setCreated={setCreated}
                        setTtRoute={setTtRoute}
                        disabled={ttName === ""}
                    />
                </div>
            )}
        </>
    );
}

export default New;