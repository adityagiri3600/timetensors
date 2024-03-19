import {React,useState,useEffect} from "react";
import Navigate from "../app/navigate/navigate";
import NewClass from "../app/newClass/newClass";
import NewTimeTable from "../app/newTimeTable/newTimeTable";
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

    const [nameOfClass, setNameOfClass] = useState("")
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")

    return (
        <div>
            <h1 className="dayTitle">{fakeDate.toLocaleDateString('en-us', { weekday: "long" })}</h1>
            <Navigate handlePrev={handlePrev} handleNext={handleNext} />
            <input type="text" placeholder="Name your TimeTable" value={ttName} onChange={(e) => setTtName(e.target.value)} className="ttNameField"/>
            <NewClass nameOfClass={nameOfClass} setNameOfClass={setNameOfClass} startTime={startTime} setStartTime={setStartTime} endTime={endTime} setEndTime={setEndTime} />
            <NewTimeTable ttName={ttName} day={fakeWeekDay} subject={nameOfClass} start={startTime} end={endTime} />
        </div>
    );
}

export default New;