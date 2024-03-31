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
            <label htmlFor="description" className="labels">Description:</label>
            <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onKeyDown={(e) => {
                    // prevents tabbing to next input field as it breaks the carousel
                    if (e.keyCode === 9) {
                        e.preventDefault()
                        e.target.focus();
                    }
                }}
                className="description"
                disabled={disabled}
            />
        </div>
    );
}

export default Update2;