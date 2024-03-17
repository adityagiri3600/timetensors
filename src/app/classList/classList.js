import React from "react";
import Class from "../class/class";
import "./classList.css"

const ClassList = ({ todaysClasses, day, date }) => {

    if (todaysClasses.length === 0) return (
        <h1 className="noclass">There are no classes today.</h1>
    )

    return (
        <div className="classList">
            {todaysClasses.map((props, i) => (
                <Class key={i} {...props} date={date} />
            ))}
        </div>
    )
}

export default ClassList;