import { React, useEffect, useState } from "react";
import InputField from "../../app/inputField/InputField";
import { determineTextColor } from "../../app/timetrackFunctions";
import Select from "react-select";
import { motion } from "framer-motion";
import { IconCirclePlusFilled, IconId } from "@tabler/icons-react";

const Classes = ({ classObjects, setClassObjects, disabled }) => {
    const [createNew, setCreateNew] = useState(true);
    const [name, setName] = useState("");
    const [selectedClass, setSelectedClass] = useState(null);
    const [existingClasses, setExistingClasses] = useState([]);

    const colorArray = [
        "#f31e40",
        "#e58091",
        "#81a3e6",
        "#6d7688",
        "#273859",
        "#7876b3",
        "#6662d2",
        "#87b691",
        "#a88768",
        "#a86868",
        "#83b39c",
        "#829eb3",
        "#c187a7",
        "#c28888",
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`/api/classObject/all`);
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await res.json();
                setExistingClasses(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);

    function addClass(){
        if (createNew) {
            if (existingClasses.some((c) => c.Name === name) || classObjects.some((c) => c.Name === name)) {
                return;
            }
            setClassObjects([
                ...classObjects,
                {
                    Name: name,
                    classid: Math.random()
                        .toString(36)
                        .substring(7),
                    color: colorArray[
                        Math.floor(
                            Math.random() *
                                colorArray.length
                        )
                    ],
                },
            ]);
        } else {
            setClassObjects([
                ...classObjects,
                selectedClass,
            ]);
        }
    }

    return (
        <div className="update3-container">
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                }}
            >
                {createNew ? (
                    <InputField
                        state={name}
                        setState={setName}
                        label="Class Name:"
                        disabled={disabled}
                    />
                ) : (
                    <Select
                        options={existingClasses.map((c) => ({
                            value: c,
                            label: c.Name,
                        }))}
                        onChange={(e) => setSelectedClass(e.value)}
                        placeholder="Select Class"
                        styles={{
                            control: (styles) => ({
                                ...styles,
                                backgroundColor: "transparent",
                                border: "1px solid #3c3c3c",
                                fontSize: "1.3rem",
                                padding: "5px",
                            }),
                            singleValue: (styles) => ({
                                ...styles,
                                color: "white",
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
                            menu: (styles) => ({
                                ...styles,
                                backgroundColor: "#000000dd",
                            }),
                            container: (styles) => ({
                                ...styles,
                                padding: "10px",
                                width: "300px",
                            }),
                        }}
                    />
                )}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        margin: "10px",
                    }}
                >
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setCreateNew(!createNew)}
                        style={{
                            padding: "5px 10px",
                            color: "rgb(var(--foreground-rgb))",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            WebkitTapHighlightColor: "transparent",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        {createNew ? (
                            <>
                                <IconCirclePlusFilled
                                    size={25}
                                    fill="rgb(var(--foreground-rgb))"
                                />
                                &nbsp;
                                <p style={{ margin: 0 }}>Create New Class</p>
                            </>
                        ) : (
                            <>
                                <IconId
                                    size={25}
                                    stroke="rgb(var(--foreground-rgb))"
                                />
                                &nbsp;
                                <p style={{ margin: 0 }}>Use Existing Class</p>
                            </>
                        )}
                    </motion.div>
                    <button
                        onClick={addClass}
                        style={{
                            padding: "5px 10px",
                            background: "#2b7df8",
                            color:
                                name === "" && selectedClass === null
                                    ? "#ffffff55"
                                    : "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                        className="btn-press"
                        disabled={name === "" && selectedClass === null}
                    >
                        Add Class
                    </button>
                </div>
            </div>
            <div
                style={{
                    display: "flex",
                    maxWidth: "90%",
                    flexWrap: "wrap",
                    justifyContent: "center",
                }}
            >
                {classObjects?.map((classObject, index) => (
                    <div
                        key={index}
                        style={{
                            padding: "10px",
                            minWidth: "50px",
                            margin: "5px",
                            position: "relative",
                            cursor: "pointer",
                            WebkitTapHighlightColor: "transparent",
                            backgroundColor: classObject.color,
                            color: determineTextColor(classObject.color),
                            borderRadius: "5px",
                        }}
                    >
                        <button
                            onClick={() =>
                                setClassObjects(
                                    classObjects.filter((c, i) => i !== index)
                                )
                            }
                            style={{
                                position: "absolute",
                                right: "0",
                                top: "0",
                                border: "none",
                                background: "none",
                                color: determineTextColor(classObject.color),
                                cursor: "pointer",
                            }}
                        >
                            <img
                                src="/x.svg"
                                alt="delete"
                                style={{
                                    width: "20px",
                                    height: "20px",
                                }}
                            />
                        </button>
                        <p style={{ textAlign: "center" }}>
                            {classObject.Name.substring(0, 30)}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Classes;
