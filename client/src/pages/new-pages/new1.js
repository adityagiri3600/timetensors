import React, { useState } from "react"
import InputField from "../../app/inputField/InputField";

const New1 = ({ ttName, setTtName, disabled }) => {
    return (
        <div className="new1-container">
            <InputField
                state={ttName}
                setState={setTtName}
                label="Timetable Name"
                disabled={disabled}
            />
        </div>
    )
}

export default New1;