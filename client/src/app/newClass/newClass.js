import { React, useState } from "react";
import "./newClass.css";

const NewClass = ({ classes, setClasses, index, day }) => {

    const deleteClass = () => {
        setClasses(classes.filter((c, i) => i !== index))
    }

    return (
        <div className="newClass">
            <input
                type="text"
                placeholder="Class Name"
                value={classes[index].subject}
                onChange={(e) =>
                    setClasses(
                        classes.map((c, i) =>
                            i === index ? { ...c, subject: e.target.value, day: day } : c
                        )
                    )
                }
                className="classNameField"
            />
            <input
                type="time"
                value={classes[index].start}
                onChange={(e) =>
                    setClasses(
                        classes.map((c, i) =>
                            i === index ? { ...c, start: e.target.value, day: day } : c
                        )
                    )
                }
                className="startTimeField"
            />
            <input
                type="time"
                value={classes[index].end}
                onChange={(e) =>
                    setClasses(
                        classes.map((c, i) =>
                            i === index ? { ...c, end: e.target.value, day: day } : c
                        )
                    )
                }
                className="endTimeField"
            />
            <button onClick={deleteClass} className="deleteClass-btn">
                <img src="/delete.png" alt="delete" className="deleteIcon" />
            </button>
        </div>
    );
};

export default NewClass;