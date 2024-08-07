import { React, useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../AuthContext";
import { getClassDetails, getEditCodeFromLocalStorage } from "../app/timetrackFunctions";
import ClassList from "../app/classList/classList";
import Datetime from "../app/datetime/datetime";
import NotFound from "./NotFound";
import Carousel from "../app/carousel/carousel";
import debounce from 'lodash.debounce';
import { IconPencil, IconInfoCircle, IconRefresh } from '@tabler/icons-react';
import "./TimeTable.css"
import { useTheme } from "../ThemeContext";

const TimeTable = () => {
    const { ttRoute } = useParams();
    const navigate = useNavigate();
    const { isLoggedIn, userData, updateUserData } = useAuth();
    const { theme } = useTheme();
    const [data, setData] = useState([]);
    const [classes, setClasses] = useState([])
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
    const markView = async () => {
        await axios.post(`/api/timetable/view/${ttRoute}`);
    }

    const debouncedMarkView = useCallback(debounce(markView, 5000), []);

    useEffect(() => {
        fetchData();
        debouncedMarkView();

        return () => {
            debouncedMarkView.cancel();
        };
    }, [debouncedMarkView]);

    useEffect(() => {
        if (isLoggedIn) {
            updateUserData({ recentlyViewed: [...userData.recentlyViewed?.filter(x => x !== ttRoute), ttRoute] });
        }
    }, [isLoggedIn])

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
            { ...data, editCode: userData?.editCodes?.find((code) => code.id === ttRoute).code, events: [...data.events, event] },
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
        <div
            style={{
                height: "100vh",
                overflow: "hidden",
            }}
        >
            {notFound ? (
                <NotFound thing={"timetable"} name={ttRoute} />
            ) : (
                <div className={`timetable-container timetable-container-${theme}`}>
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        paddingTop: "15px",
                    }}>
                        <div
                            onClick={(e) => {
                                fetchData();
                                const icon = e.currentTarget.querySelector('.refresh-icon');
                                icon.classList.add('rotate');
                                setTimeout(() => {
                                    icon.classList.remove('rotate');
                                }, 200);
                            }}
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                cursor: "pointer",
                                WebkitTapHighlightColor: "transparent",
                            }}
                        >
                            <IconRefresh className="refresh-icon" />
                        </div>
                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                            onClick={() => navigate("/")}
                        >
                            <img src="/timetensors.svg" alt="logo" style={{
                                height: "2.5rem",
                                padding: "0 1rem",
                                filter: theme === "paper" ? "invert(100%)" : "invert(0%)",
                            }}></img>
                        </div>
                        <Link to={`/info/${ttRoute}`} style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                            <div className="btn-press">
                                <IconInfoCircle />
                            </div>
                        </Link>
                    </div>
                    <div className="date-edit-container">
                        <Datetime date={date} />
                        <div className="edit-btn btn-press" onClick={(e) => {
                            // animate edit icon rotation
                            e.preventDefault();
                            const icon = e.currentTarget.querySelector('.edit-icon');
                            icon.classList.add('rotate');
                            setTimeout(() => {
                                icon.classList.remove('rotate');
                                navigate(`/update/${ttRoute}`);
                            }, 200);
                        }}>
                            <IconPencil className="edit-icon" />
                            <p style={{marginLeft:"5px"}}>Edit</p>
                        </div>
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
                                ttRoute={ttRoute}
                            />
                        ))}
                    </Carousel>
                </div>
            )}
        </div>
    );
}

export default TimeTable;