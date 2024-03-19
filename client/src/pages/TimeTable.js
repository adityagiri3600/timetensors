import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Papa from "papaparse";
import Navigate from "../app/navigate/navigate";
import ClassList from "../app/classList/classList";
import Datetime from "../app/datetime/datetime";
import Batch from "../app/batch/batch";
import NotFound from "./NotFound";
import "./TimeTable.css"

const TimeTable = () => {
    const { ttName } = useParams();
    const [data, setData] = useState([]);
    const [notFound, setNotFound] = useState(false);

    const fetchData = async () => {

        const response = await fetch(`api/data/${ttName}.csv`);
        if (!response.ok) {
            setNotFound(true);
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
        <>
            {
                notFound ?
                    <NotFound ttName={ttName}/>
                    :
                    <div>
                        <h1 className={"title"}> <a href="/">TimeTrack</a> </h1>
                        <div className="datetime-batch-container">
                            <Datetime date={date} />
                        </div>
                        <Navigate handlePrev={handlePrev} handleNext={handleNext} />
                        <ClassList todaysClasses={todaysClasses} date={fakeDate} day={fakeWeekDay} />
                    </div>
            }
        </>
    );
}

export default TimeTable;