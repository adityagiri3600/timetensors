import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ClassList from "../app/classList/classList";
import Datetime from "../app/datetime/datetime";
import NotFound from "./NotFound";
import Carousel from "../app/carousel/carousel";
import "./TimeTable.css"

const TimeTable = () => {
    const { ttRoute } = useParams();
    const [data, setData] = useState([]);
    const [classes,setClasses] = useState([])
    const [notFound, setNotFound] = useState(false);

    const fetchData = async () => {
        try {
            const response = await axios.get(`/api/timetable/${ttRoute}`);
            setData(response.data);
            setClasses(response.data.classes);
            console.log(response)
        } catch (error) {
            setNotFound(true);
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

    const getClassesAtDay = (day) => {
        return classes.filter(classElement => classElement.Day == day);
        return []
    }

    const floorMod = (a, b) => {
        return ((a % b) + b) % b;
    }
    const diffmod7 = (a, b) => {
        a %= 7
        b %= 7
        if (a < b) {
            if (b - a < 4) {
                return a - b;
            }
            else {
                return a - b + 7;
            }
        }
        else {
            if (a - b < 4) {
                return a - b;
            }
            else {
                return a - b - 7;
            }
        }
    }

    const handleCarouselChange = (index) => {
        index += weekDay;
        index %= 7;
        if (floorMod(index - fakeWeekDay, 7) == 1) {
            fakeDate.setDate(date.getDate() + 1);
            setFakeWeekDay(index);
        }
        else if (floorMod(index - fakeWeekDay, 7) == 6) {
            fakeDate.setDate(date.getDate() - 1);
            setFakeWeekDay(index);
        }
    }

    return (
        <>
            {notFound ? (
                <NotFound ttRoute={ttRoute} />
            ) : (
                <div className="timetable-container">
                    <h1 className={"title"}>
                        <a href="/">TimeTrack</a>
                    </h1>
                    <div className="date-edit-container">
                        <Datetime date={date} />
                        <a href={`/update/${ttRoute}`} className="edit-btn">
                            <img src="/editIcon.svg" alt="Edit" className="edit-icon" />
                            <p>Edit</p>
                        </a>
                    </div>
                    <Carousel onChange={handleCarouselChange} loopback={true}>
                        {[...Array(7).keys()].map((day) => (
                            <ClassList
                                todaysClasses={getClassesAtDay((day + weekDay) % 7)}
                                date={
                                    (weekDay + day) % 7 == fakeWeekDay
                                        ? fakeDate
                                        : new Date(fakeDate.getFullYear(),
                                            fakeDate.getMonth(),
                                            fakeDate.getDate() + diffmod7(floorMod(day + weekDay, 7), fakeWeekDay))
                                }
                                position={
                                    diffmod7(floorMod(day + weekDay, 7), fakeWeekDay) == 0
                                        ? "center"
                                        : diffmod7(floorMod(day + weekDay, 7), fakeWeekDay) == 1
                                            ? "right"
                                            : diffmod7(floorMod(day + weekDay, 7), fakeWeekDay) == -1
                                                ? "left"
                                                : "none"
                                }
                            />
                        ))}
                    </Carousel>
                </div>
            )}
        </>
    );
}

export default TimeTable;