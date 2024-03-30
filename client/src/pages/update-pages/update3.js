import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NewClass from "../../app/newClass/newClass";
import Navigate from "../../app/navigate/navigate";
import UpdateTimeTable from "../../app/updateTimeTable/updateTimeTable";

const Update3 = ({ editCode, setEditCodeError, ttName, data, setData , ttRoute}) => {

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
        <div className="update2-container">
            <h1 className="dayTitle">
                {fakeDate.toLocaleDateString("en-us", { weekday: "long" })}
            </h1>
            <Navigate handlePrev={handlePrev} handleNext={handleNext} />
            <div>
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
            </div>
            <div className="add-update-container">
                <button onClick={addClass} className="newClass-btn">
                    Add Class
                </button>
                <UpdateTimeTable
                    body={{
                        ttName: ttName,
                        classes: data,
                        editCode: editCode,
                    }}
                    ttRoute={ttRoute}
                    setEditCodeError={setEditCodeError}
                />
            </div>
        </div>
    )
}

export default Update3;