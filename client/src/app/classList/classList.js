import React from "react";
import Class from "../class/class";
import "./classList.css"

const ClassList = ({ todaysClasses, date }) => {

    if (todaysClasses.length === 0) return (
        <div className="classList-container">
            <h1 className="noclass">There are no classes today.</h1>
        </div>
    )

    return (
        <div className="classList-container">
            <div className="classList">
                {todaysClasses.map((props, i) => (
                    <Class key={i} {...props} date={date} />
                ))}
            </div>
        </div>
    )
}

export default ClassList;