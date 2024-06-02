import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getTimetable } from "../app/timetrackFunctions";
import NotFound from "./NotFound";
import { set } from "mongoose";

const ClassObject = () => {

    const { classRoute } = useParams();
    const [data, setData] = useState([]);
    const [color, setColor] = useState("#000000");
    const [editCode, setEditCode] = useState("");
    const [properties, setProperties] = useState([]);
    const [notFound, setNotFound] = useState(false);

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
        <>
            {notFound ? (
                <NotFound thing="class" name={classRoute} />
            ) : (
                <div style={{
                    padding: '20px',
                }}>
                    <p style={{ fontSize: '3rem', margin: 0 }}>{data.Name}</p>
                    <p style={{ fontSize: '1rem', margin: 0, color: "#FFFFFFAA" }}>{classRoute}</p>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                        <p style={{ fontSize: '1rem', margin: 0 }}>color : </p>
                        <input
                            type="color"
                            value={color}
                            style={{
                                width: "30px",
                                height: "30px",
                                border: "none",
                                marginLeft: "10px",
                                background: "none",
                            }}
                            onChange={(e) => { setColor(e.target.value) }}
                        />
                        <p style={{ fontSize: '1rem', margin: 0, color: "#FFFFFFAA" }}>{color} </p>
                    </div>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                        <p style={{ fontSize: '1rem', margin: 0 }}>edit code : </p>
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
                            onChange={(e) => { setEditCode(e.target.value) }}
                        />
                    </div>
                    <p style={{
                        fontSize: '0.5rem',
                        margin: 0,
                        color: "#FFFFFFAA",
                    }}>Same as timetable edit code if this class was created automatically</p>
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
                    <button
                        style={{
                            border: "none",
                            borderRadius: "5px",
                            backgroundColor: "#159215",
                            color: properties.some(p => p.Name === "" || p.Value === "") ? "#FFFFFF55" : "white",
                            padding: "10px",
                            margin: "20px",
                            position: 'fixed',
                            bottom: '0',
                            right: '0',
                            width: '100px',
                            fontSize: '1rem',
                        }}
                        onClick={async () => {
                            try {
                                await axios.post(`/api/classObject/update/${classRoute}`, {
                                    editCode: editCode,
                                    color: color,
                                    Properties: properties,
                                });
                                window.location.href = `/class/${classRoute}`;
                            } catch (error) {
                                console.error('Error updating data:', error);
                            }
                        }}
                        disabled={properties.some(p => p.Name === "" || p.Value === "")}
                    >Save</button>

                </div>
            )}
        </>
    );
}

export default ClassObject;