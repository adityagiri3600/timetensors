import { React, useState } from "react";
import Select from "react-select";
import "./newClass.css";

const NewClass = ({ classes, setClasses, classObjects, index, Day }) => {

    const [classid, setClassid] = useState(classes[index].classid);

    const deleteClass = () => {
        setClasses(classes.filter((c, i) => i !== index))
    }

    return (
        <div className="newClass">
            <Select
                placeholder="Select Class"
                options={classObjects.map(c => ({ value: c.classid, label: c.Name }))}
                onChange={(e) => {
                    setClassid(e.value)
                    setClasses(
                        classes.map((c, i) =>
                            i === index ? { ...c, classid: e.value } : c
                        )
                    )
                }}
                styles={{
                    control: (styles) => ({
                        ...styles,
                        backgroundColor: "transparent",
                        border: "none",
                    }),
                    menu: (styles) => ({
                        ...styles,
                        backgroundColor: "black"
                    }),
                    option: (styles, { isFocused }) => {
                        return {
                            ...styles,
                            backgroundColor: isFocused
                                ? "#2b7df8"
                                : "transparent",
                            color: "white",
                        };
                    },
                    container: (styles) => ({
                        ...styles,
                        width: "100%",
                    }),
                    singleValue: (styles) => ({
                        ...styles,
                        width: "100px",
                        color: "white",
                    }),
                    input: (styles) => ({
                        ...styles,
                        color: "white",
                    }),
                }}
            />
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