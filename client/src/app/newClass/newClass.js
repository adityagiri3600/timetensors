import {React,useState} from "react";
import "./newClass.css"

const NewClass = (props) => {

    return (
        <div className="newClass">
            <input type="text" placeholder="Class Name" value={props.nameOfClass} onChange={(e) => props.setNameOfClass(e.target.value)} />
            <input type="time" value={props.startTime} onChange={(e) => props.setStartTime(e.target.value)} />
            <input type="time" value={props.endTime} onChange={(e) => props.setEndTime(e.target.value)} />
        </div>
    );
}

export default NewClass;