import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Papa from "papaparse";
import ClassList from "../app/classList/classList";
import Datetime from "../app/datetime/datetime";
import Batch from "../app/batch/batch";
import NotFound from "./NotFound";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import "./TimeTable.css"

const TimeTable = () => {
    const {  ttCode } = useParams();
    const [data, setData] = useState([]);
    const [notFound, setNotFound] = useState(false);

    const fetchData = async () => {

        const response = await fetch(`api/data/${ttCode}`);
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

    const getClassesAtDay = (day) => {
        return data.filter(someClass => someClass.Day == day);
    }

    const handleNext = () => {
        fakeDate.setDate(date.getDate() + 1);
        setFakeWeekDay((fakeWeekDay + 1) % 7);
    }

    const handlePrev = () => {
        fakeDate.setDate(date.getDate() - 1);
        setFakeWeekDay((fakeWeekDay + 6) % 7);
    }

    const floorMod = (a, b) => {
        return ((a % b) + b) % b;
    }

    const handleCarouselChange = (index) => {
        index += weekDay;
        index %= 7;
        if(floorMod(index - fakeWeekDay, 7) == 1){
            fakeDate.setDate(date.getDate() + 1);
            setFakeWeekDay(index);
        }
        else if(floorMod(index - fakeWeekDay, 7) == 6){
            fakeDate.setDate(date.getDate() - 1);
            setFakeWeekDay(index);
        }
    }

    return (
        <>
            {notFound ? (
                <NotFound ttCode={ttCode} />
            ) : (
                <div className="timetable-container">
                    <h1 className={"title"}>
                        <a href="/">TimeTrack</a>
                    </h1>
                    <div className="datetime-batch-container">
                        <Datetime date={date} />
                    </div>
                    <Carousel
                        showThumbs={false}
                        showArrows={false}
                        showStatus={false}
                        showIndicators={false}
                        infiniteLoop={true}
                        autoPlay={false}
                        onChange={handleCarouselChange}
                        swipeScrollTolerance={50}
                        preventMovementUntilSwipeScrollTolerance={true}
                    >
                        {[...Array(7).keys()].map((day) => (
                            <div key={day}>
                                <ClassList
                                    todaysClasses={getClassesAtDay((day + weekDay)%7)}
                                    date={fakeDate}
                                />
                            </div>
                        ))}
                    </Carousel>
                </div>
            )}
        </>
    );
}

export default TimeTable;