import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NewClass from "../../app/newClass/newClass";
import Navigate from "../../app/navigate/navigate";
import UpdateTimeTable from "../../app/updateTimeTable/updateTimeTable";
import "./update2.css"

const Update = ({editCode, setEditCodeError}) => {
    
    const fetchData = async () => {
        try {
            const response = await axios.get(`/api/timetable/${ttRoute}`);
            setData(response.data.classes);
            console.log(response)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
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
    const [data, setData] = useState([]);
    
    const addClass = () => {
        setData([...data, { Day: fakeWeekDay, Subject: "", Start: "12:00", End: "13:00" }])
    }

    return (
        <div className="update2-container">
            <input
                type="text"
                placeholder="TimeTable name"
                value={ttName}
                onChange={(e) => setTtName(e.target.value)}
                className="ttNameField"
            />
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
                        name: ttName,
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

export default Update;