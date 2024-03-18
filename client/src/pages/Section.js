import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Papa from "papaparse";
import Navigate from "../app/navigate/navigate";
import ClassList from "../app/classList/classList";
import Datetime from "../app/datetime/datetime";
import Batch from "../app/batch/batch";
import "./Section.css"

const Section = () => {
    const { section } = useParams();
    const [data, setData] = useState([]);
    useEffect(() => {
        Papa.parse(`/data/${section}1.csv`, {
            download: true,
            header: true,
            complete: data => {
                setData(data.data);
            }
        });
    });

    const [date, setDate] = useState(new Date());
    const [fakeDate, setFakeDate] = useState(date);

    const [weekDay, setWeekDay] = useState(date.getDay())
    const [fakeWeekDay, setFakeWeekDay] = useState(weekDay);

    const [todaysClasses, setTodaysClasses] = useState(data.filter(someClass => someClass.Day == weekDay));

    useEffect(() => {
        setTodaysClasses(data.filter(someClass => someClass.Day == fakeWeekDay));
    }, [data, fakeWeekDay]);

    const handleNext = () => {
        fakeDate.setDate(date.getDate() + 1);
        setFakeWeekDay((fakeWeekDay + 1) % 7);
    }

    const handlePrev = () => {
        fakeDate.setDate(date.getDate() - 1);
        setFakeWeekDay((fakeWeekDay + 6) % 7);
    }

    return (
        <div>
            <h1 className={"title"}>TimeTrack</h1>
            <div className="datetime-batch-container">
                <Datetime date={date} />
                <Batch setData={setData} section={section}/>
            </div>
            <Navigate handlePrev={handlePrev} handleNext={handleNext} />
            <ClassList todaysClasses={todaysClasses} date={fakeDate} day={fakeWeekDay} />
        </div>
    );
}

export default Section;