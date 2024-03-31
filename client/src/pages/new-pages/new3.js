import { React, useState, useEffect } from "react";
import NewTimeTable from "../../app/newTimeTable/newTimeTable";
import TimetableCreator from "../../app/timetableCreator/timetableCreator";

const New3 = ({ body, setCreated, setTtRoute }) => {

    const [classes, setClasses] = useState([
        { Day: new Date().getDay(), Subject: "", Start: "12:00", End: "13:00" }
    ]);

    return (
        <div className="new3-container">
            <div>
                <TimetableCreator data={classes} setData={setClasses} />
                <div className="new-btn-container">
                    <NewTimeTable
                        body={body}
                        setCreated={setCreated}
                        setTtRoute={setTtRoute}
                        disabled={body.ttName === "" || body.editCode === ""}
                    />
                </div>
            </div>
        </div>
    );
}

export default New3;