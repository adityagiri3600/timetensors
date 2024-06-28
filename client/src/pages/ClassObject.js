import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HexColorPicker } from "react-colorful";
import axios from "axios";
import NotFound from "./NotFound";
import { motion } from "framer-motion";
import FileUpload from "../app/fileUpload/FileUpload";
import FileView from "../app/fileView/FileView";
import { useAuth } from "../AuthContext";
import { IconPaperclip, IconPencil, IconTrash } from "@tabler/icons-react";
import { determineTextColor } from "../app/timetrackFunctions";
import styles from "./ClassObject.module.css";

const ClassObject = () => {
    const { classRoute } = useParams();
    const { isLoggedIn, userData } = useAuth();
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState("");
    const [color, setColor] = useState("#000000");
    const [editingColor, setEditingColor] = useState(false);
    const [editCode, setEditCode] = useState("");
    const [properties, setProperties] = useState([]);
    const [notFound, setNotFound] = useState(false);
    const [saved, setSaved] = useState(false);
    const [editCodeError, setEditCodeError] = useState(false);

    const fetchData = async () => {
        try {
            const response = await axios.get(`/api/classObject/${classRoute}`);
            setData(response.data);
            setName(response.data.Name);
            setColor(response.data.color);
            setProperties(response.data.Properties);
        } catch (error) {
            setNotFound(true);
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className={styles.container}>
            {notFound ? (
                <NotFound thing="class" name={classRoute} />
            ) : (
                <div>
                    <div className={styles.header}
                    style={{
                        backgroundColor: color,
                        color: determineTextColor(color),
                    }}>
                        <input
                            type="text"
                            value={name}
                            size={name.length + 1}
                            className={styles.className}
                            style={{
                                color: determineTextColor(color),
                            }}
                            disabled={!editMode}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        />
                        <button
                            onClick={() => {
                                if (!isLoggedIn) {
                                    navigate("/auth/google");
                                } else if (userData.editCodes.length === 0) {
                                    return;
                                } else {
                                    setEditMode(!editMode);
                                }
                            }}
                            style={{
                                position: "absolute",
                                right: "10px",
                                border: "none",
                                padding: "5px",
                                background: "none",
                                color: "rgb(var(--foreground-rgb))",
                                marginLeft: "10px",
                            }}
                        >
                            <IconPencil
                                size={30}
                                color={determineTextColor(color)}
                                fill={
                                    editMode
                                        ? "rgba(var(--foreground-rgb), 0.5)"
                                        : "transparent"
                                }
                            />
                        </button>
                        <p
                            style={{
                                fontSize: "1rem",
                                margin: 0,
                                color: determineTextColor(color),
                            }}
                        >
                            {classRoute}
                        </p>
                        <div
                            onClick={() =>
                                setEditingColor(!editingColor && editMode)
                            }
                            style={{
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <p
                                style={{
                                    fontSize: "1rem",
                                    color: determineTextColor(color),
                                    margin: 0,
                                }}
                            >
                                color :{" "}
                            </p>
                            <p
                                style={{
                                    fontSize: "1rem",
                                    margin: 0,
                                }}
                            >
                                &nbsp;
                                {color}
                            </p>
                        </div>
                        {editingColor && editMode && (
                            <HexColorPicker
                                color={color}
                                onChange={setColor}
                                style={{ marginTop: "5px" }}
                            />
                        )}
                        <div
                            style={{
                                paddingTop: "10px",
                            }}
                        >
                            {properties &&
                                properties.map((property, i) => (
                                    <div
                                        key={i}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            height: editMode ? "40px" : "20px",
                                            transition: "height 0.5s",
                                        }}
                                    >
                                        <input
                                            type="text"
                                            value={property.Name}
                                            style={{
                                                background: "none",
                                                width: "70px",
                                                border: "none",
                                                color: determineTextColor(color),
                                                fontSize: "1rem",
                                                outline: "none",
                                                padding: "5px",
                                                paddingLeft: "0",
                                                textAlign: editMode
                                                    ? "center"
                                                    : "left",
                                                flex: "1 1 auto",
                                            }}
                                            disabled={!editMode}
                                            placeholder="Name"
                                            onChange={(e) => {
                                                setProperties(
                                                    properties.map((p, j) =>
                                                        j === i
                                                            ? {
                                                                  ...p,
                                                                  Name: e.target
                                                                      .value,
                                                              }
                                                            : p
                                                    )
                                                );
                                            }}
                                        />
                                        <p style={{ margin: "0 10px" }}>:</p>
                                        <input
                                            type="text"
                                            value={property.Value}
                                            style={{
                                                background: "none",
                                                width: "70px",
                                                border: "none",
                                                color: determineTextColor(color),
                                                fontSize: "1rem",
                                                outline: "none",
                                                borderLeft: "none",
                                                padding: "5px",
                                                textAlign: "center",
                                                flex: "1 1 auto",
                                            }}
                                            disabled={!editMode}
                                            placeholder="Value"
                                            onChange={(e) => {
                                                setProperties(
                                                    properties.map((p, j) =>
                                                        j === i
                                                            ? {
                                                                  ...p,
                                                                  Value: e
                                                                      .target
                                                                      .value,
                                                              }
                                                            : p
                                                    )
                                                );
                                            }}
                                        />
                                        <motion.button
                                            initial={{ scaleX: 0 }}
                                            animate={{
                                                scaleX: editMode ? 1 : 0,
                                            }}
                                            onClick={() => {
                                                setProperties(
                                                    properties.map((p, j) =>
                                                        j === i
                                                            ? {
                                                                  ...p,
                                                                  Shown: !p.Shown,
                                                              }
                                                            : p
                                                    )
                                                );
                                            }}
                                            style={{
                                                border: "none",
                                                padding: "5px",
                                                background: "none",
                                                color: determineTextColor(color),
                                            }}
                                        >
                                            {property.Shown
                                                ? "Shown"
                                                : "Hidden"}
                                        </motion.button>

                                        <motion.button
                                            initial={{ scaleX: 0 }}
                                            animate={{
                                                scaleX: editMode ? 1 : 0,
                                            }}
                                            onClick={() => {
                                                setProperties(
                                                    properties.filter(
                                                        (p, j) => j !== i
                                                    )
                                                );
                                            }}
                                            style={{
                                                border: "none",
                                                padding: "5px",
                                                background: "none",
                                            }}
                                        >
                                            <IconTrash
                                                color={determineTextColor(color)}
                                                size={20}
                                            />
                                        </motion.button>
                                    </div>
                                ))}
                            {editMode && (
                                <motion.button
                                    initial={{ scaleY: 0 }}
                                    animate={{ scaleY: 1 }}
                                    style={{
                                        width: "100%",
                                        border: "none",
                                        borderTopRightRadius: "0",
                                        borderTopLeftRadius: "0",
                                        borderBottomRightRadius: "5px",
                                        borderBottomLeftRadius: "5px",
                                        backgroundColor: determineTextColor(color),
                                        color: color,
                                        padding: "5px",
                                    }}
                                    onClick={() => {
                                        setProperties([
                                            ...properties,
                                            { Name: "", Value: "" },
                                        ]);
                                    }}
                                >
                                    +
                                </motion.button>
                            )}
                        </div>
                    </div>
                    <p
                        style={{
                            fontFamily: "QuickSandRegular",
                            fontSize: "1.5rem",
                            margin: "5px",
                            marginLeft: "10px",
                            marginTop: "30px",
                        }}
                    >
                        Attachments &nbsp;
                        <IconPaperclip size={30} stroke={1} />
                    </p>
                    <div
                        style={{
                            paddingLeft: "10px",
                            borderLeft: `5px solid ${color}`,
                        }}
                    >
                        <FileView
                            filePath={`classObject/${classRoute}`}
                            editMode={editMode}
                        />
                        {isLoggedIn && editMode && (
                            <FileUpload
                                filePath={`classObject/${classRoute}`}
                            />
                        )}
                    </div>
                    {editCodeError && (
                        <p
                            style={{
                                color: "red",
                                fontSize: "1rem",
                            }}
                        >
                            Invalid edit code
                        </p>
                    )}
                    {saved && (
                        <p
                            style={{
                                color: "green",
                                fontSize: "1rem",
                            }}
                        >
                            Saved!
                        </p>
                    )}
                    {editMode && (
                        <motion.div
                            initial={{ y: 100 }}
                            animate={{ y: 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 10,
                            }}
                            style={{
                                position: "fixed",
                                bottom: "0",
                                right: "0",
                                display: "flex",
                                alignItems: "center",
                                backgroundColor: "#000000AA",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                    flexDirection: "column",
                                }}
                            >
                                <input
                                    type="text"
                                    value={editCode}
                                    style={{
                                        background: "none",
                                        width: "70px",
                                        height: "17px",
                                        border: "none",
                                        borderBottom: `1px solid ${color}`,
                                        color: color,
                                        fontSize: "1rem",
                                        outline: "none",
                                        padding: "5px",
                                        marginLeft: "10px",
                                    }}
                                    placeholder="Edit Code"
                                    onChange={(e) => {
                                        setEditCode(e.target.value);
                                    }}
                                />
                                <p
                                    style={{
                                        fontSize: "0.5rem",
                                        marginLeft: "10px",
                                        color: "#FFFFFFAA",
                                    }}
                                >
                                    Same as timetable edit code if this class
                                    was created automatically
                                </p>
                            </div>
                            <button
                                style={{
                                    border: "none",
                                    borderRadius: "5px",
                                    backgroundColor: "#159215",
                                    color: properties.some(
                                        (p) => p.Name === "" || p.Value === ""
                                    )
                                        ? "#FFFFFF55"
                                        : "white",
                                    padding: "10px",
                                    margin: "20px",
                                    width: "100px",
                                    fontSize: "1rem",
                                }}
                                onClick={async () => {
                                    try {
                                        const response = await axios.post(
                                            `/api/classObject/update/${classRoute}`,
                                            {
                                                editCode: editCode,
                                                color: color,
                                                Name: name,
                                                Properties: properties,
                                            }
                                        );
                                        if (response.status === 200) {
                                            setSaved(true);
                                            setTimeout(() => {
                                                setSaved(false);
                                            }, 2000);
                                        }
                                    } catch (error) {
                                        if (error.response.status === 401) {
                                            setEditCodeError(true);
                                            setTimeout(() => {
                                                setEditCodeError(false);
                                            }, 2000);
                                        }
                                        console.error(
                                            "Error updating data:",
                                            error
                                        );
                                    }
                                }}
                                disabled={properties.some(
                                    (p) => p.Name === "" || p.Value === ""
                                )}
                            >
                                Save
                            </button>
                        </motion.div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ClassObject;
