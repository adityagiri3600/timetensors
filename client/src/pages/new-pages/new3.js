import { React, useState, useEffect } from "react";
import NewTimeTable from "../../app/newTimeTable/newTimeTable";
import TimetableCreator from "../../app/timetableCreator/timetableCreator";

const New3 = ({classes, setClasses}) => {

    return (
        <div className="new3-container">
            <div>
                <TimetableCreator classes={classes} setClasses={setClasses} />
            </div>
        </div>
    );
}

export default New3;