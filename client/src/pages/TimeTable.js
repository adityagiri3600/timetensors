import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getClassDetails, getEditCodeFromLocalStorage } from "../app/timetrackFunctions";
import ClassList from "../app/classList/classList";
import Datetime from "../app/datetime/datetime";
import NotFound from "./NotFound";
import Carousel from "../app/carousel/carousel";
import "./TimeTable.css"

const TimeTable = () => {
    const { ttRoute } = useParams();
    const [data, setData] = useState([]);
    const [classes, setClasses] = useState([])
    const [notFound, setNotFound] = useState(false);
    const [userHasEditCode, setUserHasEditCode] = useState(false);

    const fetchData = async () => {
        try {
            const response = await axios.get(`/api/timetable/${ttRoute}`);
            setData(response.data);
            setClasses(response.data.classes);
            doesUserHaveEditCode(ttRoute, setUserHasEditCode);
            console.log(response)

            // Add timetable to recently viewed timetables
            const recentlyViewedTimetables = JSON.parse(localStorage.getItem("recentlyViewedTimetables")) || [];
            if (!recentlyViewedTimetables.includes(ttRoute)) {
                recentlyViewedTimetables.push(ttRoute);
                localStorage.setItem("recentlyViewedTimetables", JSON.stringify(recentlyViewedTimetables));
            }
        } catch (error) {
            setNotFound(true);
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const dateInitalValue = new Date();
    dateInitalValue.setHours(0, 0, 0, 0);
    const [date, setDate] = useState(dateInitalValue);
    const [fakeDate, setFakeDate] = useState(date);

    const [weekDay, setWeekDay] = useState(date.getDay())
    const [fakeWeekDay, setFakeWeekDay] = useState(weekDay);



    const getClassesAtDate = (date_param) => {
        let extraClasses = [];
        if (data.extraClasses) {
            for (let i = 0; i < data.extraClasses.length; i++) {
                let ecDate = new Date(data.extraClasses[i].date);
                ecDate.setHours(0, 0, 0, 0);
                if (ecDate.valueOf() == date_param.valueOf()) {
                    extraClasses.push({ ...data.extraClasses[i], isExtraClass: true });
                }
            }
        }
        if (data.classesAtSpecificDate) {
            for (let i = 0; i < data.classesAtSpecificDate.length; i++) {
                let casdDate = new Date(data.classesAtSpecificDate[i].date);
                casdDate.setHours(0, 0, 0, 0);
                if (casdDate.valueOf() == date_param.valueOf()) {
                    return [
                        ...data.classesAtSpecificDate[i].classes,
                        ...extraClasses
                    ].sort((a, b) => {
                        if (a.Start < b.Start) {
                            return -1;
                        }
                        if (a.Start > b.Start) {
                            return 1;
                        }
                        return 0;
                    })
                        .map(classElement => {
                            return getClassDetails(data.classObjects, classElement);
                        });
                }
            }
        }
        return [
            ...classes.filter(classElement => classElement.Day == date_param.getDay()),
            ...extraClasses
        ].sort((a, b) => {
            if (a.Start < b.Start) {
                return -1;
            }
            if (a.Start > b.Start) {
                return 1;
            }
            return 0;
        })
            .map(classElement => {
                return getClassDetails(data.classObjects, classElement);
            });
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
    const incrementDateByDays = (date, days) => {
        let result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    };

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

    const doesUserHaveEditCode = (ttRoute, setUserHasEditCode = () => { }) => {
        if (window == undefined)
            return
        const editCode = localStorage.getItem(`${ttRoute}EditCode`);
        if (editCode) {
            setUserHasEditCode(true);
            console.log("User has edit code for this timetable\nEdit Code: ", editCode);
        }
        return true;
    }

    const postEvent = (event) => {
        axios.post(`/api/timetable/update/${ttRoute}`,
            { ...data, editCode: getEditCodeFromLocalStorage(ttRoute), events: [...data.events, event] },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
            .catch((e) => console.error(e))
            .then((r) => {
                console.log(r)
                fetchData();
            })
    }

    return (
        <>
            {notFound ? (
                <NotFound thing={"timetable"} name={ttRoute} />
            ) : (
                <div className="timetable-container">
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        paddingTop: "15px",
                    }}>
                        <h1 className="title">
                            <a href="/">TimeTrack</a>
                        </h1>
                        <button
                            onClick={(e) => {
                                fetchData();
                                const icon = e.currentTarget.querySelector('.refresh-icon');
                                icon.classList.add('rotate');
                                setTimeout(() => {
                                    icon.classList.remove('rotate');
                                }, 200);
                            }}
                            style={{
                                backgroundColor: "transparent",
                                border: "none",
                                cursor: "pointer",
                                padding: "0",
                            }}
                        >
                            <img src="/refresh.svg" alt="Refresh" className="refresh-icon" style={{
                                width: "20px",
                                height: "20px",
                                marginLeft: "10px"
                            }} />
                        </button>
                    </div>
                    <div className="date-edit-container">
                        <Datetime date={date} />
                        <a href={`/update/${ttRoute}`} className="edit-btn" onClick={(e) => {
                            // animate edit icon rotation
                            e.preventDefault();
                            const icon = e.currentTarget.querySelector('.edit-icon');
                            icon.classList.add('rotate');
                            setTimeout(() => {
                                icon.classList.remove('rotate');
                                window.location.href = `/update/${ttRoute}`;
                            }, 200);
                        }}>
                            <img src="/editIcon.svg" alt="Edit" className="edit-icon" />
                            <p>Edit</p>
                        </a>
                    </div>
                    <Carousel onChange={handleCarouselChange} loopback={true}>
                        {[...Array(7).keys()].map((day, i) => (
                            <ClassList
                                key={i}
                                todaysClasses={
                                    getClassesAtDate(
                                        (weekDay + day) % 7 == fakeWeekDay
                                            ? fakeDate
                                            : new Date(fakeDate.getFullYear(),
                                                fakeDate.getMonth(),
                                                fakeDate.getDate() + diffmod7(floorMod(day + weekDay, 7), fakeWeekDay))
                                    )
                                }
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
                                events={data.events}
                                postEvent={postEvent}
                                userHasEditCode={userHasEditCode}
                            />
                        ))}
                    </Carousel>
                </div>
            )}
        </>
    );
}

export default TimeTable;