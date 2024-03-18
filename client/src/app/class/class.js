import {React,useState,useEffect} from "react";
import "./class.css";
import Icon from "../icon/icon";

const Class = ({Subject,Start,End,date}) => {
    let cssClassName = `class `;
    const classesWithIcons = ["Math", "Physics", "OOPS", "English", "UHV"]

    const [currDate, setCurrDate] = useState(new Date());
    const [hour, setHour] = useState(currDate.getHours() + currDate.getMinutes() / 60 + currDate.getSeconds() / 3600);

    const updateTime = () => {
        const newDateTime = new Date();
        setCurrDate(newDateTime);
        setHour(newDateTime.getHours() + newDateTime.getMinutes() / 60 + newDateTime.getSeconds() / 3600);
    };

    useEffect(() => {
        const intervalId = setInterval(updateTime, 1000);
        return () => clearInterval(intervalId);
    }, [hour]);

    const begin = parseInt(Start);
    const end = parseInt(End);

    if (begin <= hour && hour < end && currDate.toDateString() === date.toDateString()) {
        cssClassName += " active";
    }
    if (begin + 2 === end) {
        cssClassName += " lab";
    }
    if (Subject === "Recess") {
        cssClassName += " recess";
    }
    if (date.getTime() < currDate.getTime() && currDate.toDateString() !== date.toDateString()){
        cssClassName += " past"
    }else if (hour >= end && currDate.toDateString() === date.toDateString()){
        cssClassName += " past"
    }

    return (
        <div className={cssClassName}>
            <h2>{Subject}</h2>
            <p>{Start} - {End}</p>
            {classesWithIcons.includes(Subject) && <Icon class={Subject} />}
        </div>
    );
}

export default Class;