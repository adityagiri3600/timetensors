import { React, useState } from "react";
import InputField from "../../app/inputField/InputField";
import { determineTextColor } from "../../app/timetrackFunctions";
import { setNonce } from "react-colorful";

const Classes = ({ classObjects, setClassObjects, disabled }) => {

    const [name, setName] = useState("");

    return (
        <div className="update3-container">
            <div>
                <InputField
                    state={name}
                    setState={setName}
                    label="Class Name:"
                    disabled={disabled}
                />
                <div style={{
                    display: "flex",
                    justifyContent: "right",
                    margin: "10px"
                }}>
                    <button
                        onClick={() => setClassObjects([...classObjects, { Name: name, classid: Math.random().toString(36).substring(7), color: "#2b7df8" }])}
                        style={{
                            padding: "5px 10px",
                            background: "#2b7df8",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer"
                        }}
                    >
                        Add Class
                    </button>
                </div>
            </div>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gridGap: '10px',
                marginTop: '20px'
            }}>
                {classObjects?.map((classObject, index) => (
                    <div
                        key={index}
                        style={{
                            padding: '10px',
                            position: 'relative',
                            cursor: 'pointer',
                            WebkitTapHighlightColor: 'transparent',
                            backgroundColor: classObject.color,
                            color: determineTextColor(classObject.color),
                            borderRadius: '5px',
                        }}
                    >
                        <button onClick={() => setClassObjects(classObjects.filter((c, i) => i !== index))}
                            style={{
                                position: "absolute",
                                right: "0",
                                top: "0",
                                border: "none",
                                background: "none",
                                color: determineTextColor(classObject.color),
                                cursor: "pointer"
                            }}>
                            <img src="/x.svg" alt="delete" style={{
                                width: "20px",
                                height: "20px"
                            }} />
                        </button>
                        <p style={{textAlign:"center"}}>{classObject.Name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Classes;