import { useParams } from "react-router-dom";
import { getTimetable } from "../app/timetrackFunctions";
import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import axios from "axios";

const TimeTableInfo = () => {
    const { ttRoute } = useParams();
    const { userData, isLoggedIn } = useAuth();
    const [editCode, setEditCode] = useState("");
    const [data, setData] = useState({});
    const [deleted, setDeleted] = useState(false);
    const fetchTimetable = async () => {
        setData(await getTimetable(ttRoute));
        console.log(data);
    };
    useEffect(() => {
        fetchTimetable();
        if (isLoggedIn) {
            setEditCode(
                userData?.editCodes?.find((code) => code?.id === ttRoute)?.code
            );
        }
    }, []);

    const deleteTimeTable = async () => {
        try {
            const res = await axios.delete(`/api/timetable/${ttRoute}`, {
                data: {
                    editCode: editCode,
                },
            });
            console.log(res.data);
            setDeleted(true);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div
            style={{
                padding: "20px",
            }}
        >
            <p
                style={{
                    fontSize: "2rem",
                    margin: "10px",
                    marginBottom: "0px",
                }}
            >
                {data?.ttName}
            </p>
            <p style={{ color: "#ffffffaa", margin: "0 0 0 20px" }}>
                created by{" "}
                <span style={{ color: "#2b7df8" }}>
                    {data?.creator || "unknown"}
                </span>
            </p>
            <p>{data?.description}</p>
            <div
                style={{
                    display: "flex",
                    justifyContent: "right",
                }}
            >
                {editCode && (
                    <button
                        style={{
                            padding: "10px",
                            backgroundColor: "#ff0000",
                            fontWeight: "bold",
                            color: "white",
                            fontSize: "1rem",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            right: "20px",
                        }}
                        onClick={() => deleteTimeTable()}
                    >
                        Delete TimeTable
                    </button>
                )}
            </div>
            {deleted && <p>TimeTable Deleted Successfully</p>}
        </div>
    );
};

export default TimeTableInfo;
