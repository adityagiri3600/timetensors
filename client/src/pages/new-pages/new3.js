import { React, useState, useEffect } from "react";
import NewTimeTable from "../../app/newTimeTable/newTimeTable";
import TimetableCreator from "../../app/timetableCreator/timetableCreator";

const New3 = ({ ttName, editCode, setCreated, setTtRoute }) => {

    const [classes, setClasses] = useState([
        { Day: new Date().getDay(), Subject: "", Start: "12:00", End: "13:00" }
    ]);

    return (
        <div className="new3-container">
            <div>
                <TimetableCreator data={classes} setData={setClasses} />
                <div className="new-btn-container">
                    <NewTimeTable
                        body={{ ttName, classes, editCode }}
                        setCreated={setCreated}
                        setTtRoute={setTtRoute}
                        disabled={ttName === ""}
                    />
                </div>
            </div>
        </div>
    );
}

export default New3;