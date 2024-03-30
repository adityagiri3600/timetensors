import React, { useState } from "react";
import NewClass from "../../app/newClass/newClass";
import UpdateTimeTable from "../../app/updateTimeTable/updateTimeTable";

const Update3 = ({ body, setEditCodeError, data, setData, ttRoute }) => {

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
        setData([...data, { Day: fakeWeekDay, Subject: "", Start: "12:00", End: "13:00" }])
    }

    return (
        <div className="update3-container">
            <h1 className="dayTitle">
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
                {data.map((c, i) =>
                    c.Day == fakeWeekDay ? (
                        <NewClass
                            key={i}
                            classes={data}
                            setClasses={setData}
                            index={i}
                            Day={fakeWeekDay}
                        />
                    ) : null
                )}
                <button onClick={addClass} className="newClass-btn">
                    Add Class
                </button>
            </div>
            <div className="update-btn-container">
                <UpdateTimeTable
                    body={{
                        ...body,
                        classes: data,
                    }}
                    ttRoute={ttRoute}
                    setEditCodeError={setEditCodeError}
                />
            </div>
        </div>
    )
}

export default Update3;