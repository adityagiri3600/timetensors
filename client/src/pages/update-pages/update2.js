import React from "react";
import InputField from "../../app/inputField/InputField";

const Update2 = ({ ttName, setTtName, description, setDescription, disabled }) => {
    return (
        <div className="update2-container">
            <InputField
                state={ttName}
                setState={setTtName}
                disabled={disabled}
                label="Timetable Name"
            />
            <InputField
                state={description}
                setState={setDescription}
                disabled={disabled}
                label="Description"
                textarea={true}
            />
        </div>
    );
}

export default Update2;