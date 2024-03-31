import React from "react";
import TimetableCreator from "../../app/timetableCreator/timetableCreator";
import UpdateTimeTable from "../../app/updateTimeTable/updateTimeTable";

const Update3 = ({ body, setEditCodeError, data, setData, ttRoute }) => {

    return (
        <div className="update3-container">
            <TimetableCreator data={data} setData={setData} />
            <div className="update-btn-container">
                <UpdateTimeTable
                    body={{
                        ...body,
                        classes: data,
                    }}
                    ttRoute={ttRoute}
                    setEditCodeError={setEditCodeError}
                />
            </div>
        </div>
    )
}

export default Update3;