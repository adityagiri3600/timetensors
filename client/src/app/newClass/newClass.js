import { React, useState } from "react";
import "./newClass.css";

const NewClass = ({ classes, setClasses, index, Day }) => {

    const deleteClass = () => {
        setClasses(classes.filter((c, i) => i !== index))
    }

    return (
        <div className="newClass">
            <input
                type="text"
                placeholder="Class Name"
                value={classes[index].Subject}
                onChange={(e) =>
                    setClasses(
                        classes.map((c, i) =>
                            i === index ? { ...c, Subject: e.target.value, Day: Day } : c
                        )
                    )
                }
                className="classNameField"
            />
            <input
                type="time"
                value={classes[index].Start}
                onChange={(e) =>
                    setClasses(
                        classes.map((c, i) =>
                            i === index ? { ...c, Start: e.target.value, Day: Day } : c
                        )
                    )
                }
                className="startTimeField"
            />
            <input
                type="time"
                value={classes[index].End}
                onChange={(e) =>
                    setClasses(
                        classes.map((c, i) =>
                            i === index ? { ...c, End: e.target.value, Day: Day } : c
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