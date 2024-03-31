import React, { useState } from "react"
import InputField from "../../app/inputField/InputField";

const New1 = ({ ttName, setTtName, description, setDescription, disabled }) => {
    return (
        <div className="new1-container">
            <InputField
                state={ttName}
                setState={setTtName}
                label="Timetable Name:"
                disabled={disabled}
            />
            <InputField
                state={description}
                setState={setDescription}
                disabled={disabled}
                label="And a description! (if you want)"
                textarea={true}
            />
        </div>
    )
}

export default New1;