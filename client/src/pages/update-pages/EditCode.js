import React from "react";
import InputField from "../../app/inputField/InputField";

const EditCode = ({ editCode, setEditCode, disabled }) => {
    return (
        <div className="update1-container">

            <p className="info-paragraph">
                Every timetable has an edit code that is a password required to edit the timetable. If you do
                 not have the edit code for this timetable please ask for it to the creater of this timetable.
            </p>
            <InputField
                state={editCode}
                setState={setEditCode}
                disabled={disabled}
                label="Edit Code"
            />
        </div>
    );
}

export default EditCode;