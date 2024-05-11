import React, { useEffect, useState } from "react";
import Class from "../class/class";
import "./classList.css"

const ClassList = ({ todaysClasses, date, position, postEvent, events, userHasEditCode }) => {

    const [focusedClass, setFocusedClass] = useState(-1);
    const setFocusedClassWrapper = (i) => {
        if (focusedClass === i) {
            setFocusedClass(-1);
        }
        else {
            setFocusedClass(i);
        }
    }

    if (todaysClasses.length === 0) return (
        <div className="classList-container" style={{ width: "100vw" }}>
            <h1 className="noclass">There are no classes today.</h1>
        </div>
    )

    return (
        <div className="classList-container" style={{ width: "100vw" }}>
            <div className={"classList " + position}>
                {todaysClasses.map((props, i) => (
                    <Class key={i}
                        {...props}
                        date={date}
                        handleClick={() => setFocusedClassWrapper(i)}
                        focused={focusedClass === i && position === "center"}
                        events={events} 
                        postEvent={postEvent}
                        userHasEditCode={userHasEditCode}
                    />
                ))}
            </div>
        </div>
    )
}

export default ClassList;