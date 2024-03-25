import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NewClass from "../app/newClass/newClass";
import Navigate from "../app/navigate/navigate";
import UpdateTimeTable from "../app/updateTimeTable/updateTimeTable";
import Papa from "papaparse";
import "./New.css";

const Update = () => {
    
    const fetchData = async () => {
        const response = await fetch(`/api/data/${ttRoute}`);
        if (!response.ok) {
            return;
        }
        
        const csvData = await response.text();
        
        const parsedData = Papa.parse(csvData, {
            header: true,
            dynamicTyping: true
        });
        
        setData(parsedData.data);
    };
    
    useEffect(() => {
        fetchData();
    }, []);
    
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

    const { ttRoute } = useParams();
    const [ttName, setTtName] = useState("");
    const [editCode, setEditCode] = useState("");
    const [data, setData] = useState([]);
    const [editCodeError, setEditCodeError] = useState(false);
    
    const addClass = () => {
        setData([...data, { Day: fakeWeekDay, Subject: "", Start: "12:00", End: "13:00" }])
    }

    return (
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
                placeholder="Edit Code"
                value={editCode}
                onChange={(e) => setEditCode(e.target.value)}
                className="editCodeField"
            />
            {editCodeError ? <p className="editCodeError">Invalid edit code</p> : null}
            <h1 className="dayTitle">
                {fakeDate.toLocaleDateString("en-us", { weekday: "long" })}
            </h1>
            <Navigate handlePrev={handlePrev} handleNext={handleNext} />
            {data.map((c, i) =>
                c.Day === fakeWeekDay ? (
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
            <UpdateTimeTable
                classes={data}
                ttName={ttName}
                ttRoute={ttRoute}
                editCode={editCode}
                setEditCodeError={setEditCodeError}
                disabled={ttName === ""}
            />
        </div>
    )
}

export default Update;