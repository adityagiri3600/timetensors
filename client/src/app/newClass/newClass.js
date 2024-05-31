import { React, useState } from "react";
import "./newClass.css";

const NewClass = ({ classes, setClasses, classObjects, index, Day }) => {

    const [classid, setClassid] = useState(classes[index].classid);

    const deleteClass = () => {
        setClasses(classes.filter((c, i) => i !== index))
    }

    return (
        <div className="newClass">
            <select
                onChange={(e) => {
                    setClassid(e.target.value)
                    setClasses(
                        classes.map((c, i) =>
                            i === index ? { ...c, classid: e.target.value } : c
                        )
                    )
                }}
                value={classid}
            >
                {classObjects.map((c, i) =>
                    <option key={c.classid} value={c.classid}>{c.Name}</option>
                )}
            </select>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            
            }}>
                <div className="timeField">
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
                </div>
                <button onClick={deleteClass} className="deleteClass-btn">
                    <img src="/delete.svg" alt="delete" className="deleteIcon" />
                </button>
            </div>
        </div>
    );
};

export default NewClass;