import React from "react";
import TimetableCreator from "../../app/timetableCreator/timetableCreator";
import UpdateTimeTable from "../../app/updateTimeTable/updateTimeTable";

const Update3 = ({ body, setEditCodeError, classes, setClasses, ttRoute }) => {

    return (
        <div className="update3-container">
            <TimetableCreator classes={classes} setClasses={setClasses} />
            <div className="update-btn-container">
                <UpdateTimeTable
                    body={{
                        ...body,
                        classes,
                    }}
                    ttRoute={ttRoute}
                    setEditCodeError={setEditCodeError}
                />
            </div>
        </div>
    )
}

export default Update3;