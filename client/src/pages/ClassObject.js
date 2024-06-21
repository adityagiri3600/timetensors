import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { HexColorPicker } from "react-colorful";
import axios from "axios";
import NotFound from "./NotFound";
import { motion } from "framer-motion";
import FileUpload from "../app/fileUpload/FileUpload";
import FileView from "../app/fileView/FileView";
import { useAuth } from "../AuthContext";

const ClassObject = () => {

    const { classRoute } = useParams();
    const { isLoggedIn } = useAuth();
    const [data, setData] = useState([]);
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
            setColor(response.data.color);
            setProperties(response.data.Properties);
            console.log(response)
        } catch (error) {
            setNotFound(true);
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <motion.div
            style={{
                height: "100vh",
                overflow: "hidden",
            }}
        >
            {notFound ? (
                <NotFound thing="class" name={classRoute} />
            ) : (
                <div style={{
                    padding: '20px',
                }}>
                    <p style={{ fontSize: '3rem', margin: 0 }}>{data.Name}</p>
                    <p style={{ fontSize: '1rem', margin: 0, color: "#FFFFFFAA" }}>{classRoute}</p>
                    <div onClick={()=>setEditingColor(!editingColor)} style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                        <p style={{ fontSize: '1rem', margin: 0 }}>color : </p>
                        <div style={{
                            width: '20px',
                            height: '20px',
                            backgroundColor: color,
                            borderRadius: '50%',
                            marginLeft: '10px',
                            marginRight: '5px',
                        }}></div>
                        <p style={{ fontSize: '1rem', margin: 0, color: "#FFFFFFAA" }}>{color} </p>
                    </div>
                    {editingColor && <HexColorPicker color={color} onChange={setColor} style={{marginTop: "5px"}} />}
                    <div style={{
                        paddingTop: '10px',
                    }}>
                        {properties && properties.map((property, i) => (
                            <div key={i} style={{
                                display: 'flex',
                                alignItems: 'center',
                            }}>
                                <input
                                    type="text"
                                    value={property.Name}
                                    style={{
                                        background: "none",
                                        width: "70px",
                                        height: "30px",
                                        border: "none",
                                        color: "#FFFFFFAA",
                                        fontSize: "1rem",
                                        outline: "none",
                                        padding: "5px",
                                        textAlign: "center",
                                        flex: "1 1 auto"
                                    }}
                                    placeholder="Name"
                                    onChange={(e) => { setProperties(properties.map((p, j) => j === i ? { ...p, Name: e.target.value } : p)) }}
                                />
                                <p style={{ margin: "0 10px" }}>:</p>
                                <input
                                    type="text"
                                    value={property.Value}
                                    style={{
                                        background: "none",
                                        width: "70px",
                                        height: "30px",
                                        border: "none",
                                        color: color,
                                        fontSize: "1rem",
                                        outline: "none",
                                        borderLeft: "none",
                                        padding: "5px",
                                        textAlign: "center",
                                        flex: "1 1 auto"
                                    }}
                                    placeholder="Value"
                                    onChange={(e) => { setProperties(properties.map((p, j) => j === i ? { ...p, Value: e.target.value } : p)) }}
                                />
                                <button onClick={() => { setProperties(properties.map((p, j) => j === i ? { ...p, Shown: !p.Shown } : p)) }}
                                    style={{
                                        border: "none",
                                        padding: "5px",
                                        background: "none",
                                        color: "white",
                                    }}
                                >
                                    {property.Shown ? "Shown" : "Hidden"}
                                </button>
                                <button
                                    onClick={() => {
                                        setProperties(properties.filter((p, j) => j !== i))
                                    }}
                                    style={{
                                        border: "none",
                                        padding: "5px",
                                        background: "none",
                                    }}
                                >
                                    <img src="/delete.svg" alt="delete" style={{
                                        background: "none",
                                        width: "28px",
                                        height: "28px"
                                    }} />
                                </button>
                            </div>
                        ))}
                        <button
                            style={{
                                width: "100%",
                                border: "none",
                                borderTopRightRadius: "0",
                                borderTopLeftRadius: "0",
                                borderBottomRightRadius: "5px",
                                borderBottomLeftRadius: "5px",
                                backgroundColor: color,
                                color: "white",
                                padding: "5px",
                            }}
                            onClick={() => {
                                setProperties([...properties, { Name: "", Value: "" }])
                            }}>+</button>
                    </div>
                    <p style={{
                        fontFamily: "QuickSandRegular",
                        fontSize: '1.5rem',
                        margin: "5px",
                        marginLeft: "-5px",
                        color: color,
                    }}>Attachments :</p>
                    <div style={{paddingLeft:"10px", borderLeft: `5px solid ${color}`}}>
                        <FileView filePath={`classObject/${classRoute}`} />
                        {isLoggedIn&&<FileUpload filePath={`classObject/${classRoute}`} />}
                    </div>
                    {editCodeError && (
                        <p style={{
                            color: "red",
                            fontSize: "1rem",
                        }}>Invalid edit code</p>
                    )}
                    {saved && (
                        <p style={{
                            color: "green",
                            fontSize: "1rem",
                        }}>Saved!</p>
                    )}
                    <div style={{
                        position: 'fixed',
                        bottom: '0',
                        right: '0',
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: "#000000AA",
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            flexDirection: 'column',
                        }}>
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
                                onChange={(e) => { setEditCode(e.target.value) }}
                            />
                            <p style={{
                                fontSize: '0.5rem',
                                marginLeft: "10px",
                                color: "#FFFFFFAA",
                            }}>Same as timetable edit code if this class was created automatically</p>
                        </div>
                        <button
                            style={{
                                border: "none",
                                borderRadius: "5px",
                                backgroundColor: "#159215",
                                color: properties.some(p => p.Name === "" || p.Value === "") ? "#FFFFFF55" : "white",
                                padding: "10px",
                                margin: "20px",
                                width: '100px',
                                fontSize: '1rem',
                            }}
                            onClick={async () => {
                                try {
                                    const response = await axios.post(`/api/classObject/update/${classRoute}`, {
                                        editCode: editCode,
                                        color: color,
                                        Properties: properties,
                                    })
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
                                    console.error('Error updating data:', error);
                                }
                            }}
                            disabled={properties.some(p => p.Name === "" || p.Value === "")}
                        >Save</button>
                    </div>
                </div>
            )}
        </motion.div>
    );
}

export default ClassObject;