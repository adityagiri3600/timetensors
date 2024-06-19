import { useParams } from "react-router-dom";
import { getTimetable } from "../app/timetrackFunctions";
import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import axios from "axios";
import { IconChecks, IconEye, IconSkull } from "@tabler/icons-react";

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

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    useEffect(() => {
        debounce(fetchTimetable(), 1000);
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
            <div style={{display:"flex", alignItems:"center"}}>
                <IconEye/>
                <p style={{marginLeft:"5px"}}>views: <span style={{ color: "#2b7df8" }}>{data?.views || "0"}</span></p>
            </div>

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
                            display: "flex",
                            alignItems: "center",
                        }}
                        onClick={() => deleteTimeTable()}
                    >
                        {!deleted
                            ?(<>
                                <IconSkull/>
                                &nbsp;
                                Delete TimeTable
                            </>)
                            :(<>
                                <IconChecks/>
                                &nbsp;
                                Deleted
                            </>)
                        }
                    </button>
                )}
            </div>
        </div>
    );
};

export default TimeTableInfo;
