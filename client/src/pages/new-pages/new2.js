import React from "react"
import InputField from "../../app/inputField/InputField";

const New2 = ({ editCode, setEditCode, disabled }) => {
    return (
        <div className="new2-container">
            <InputField
                state={editCode}
                setState={setEditCode}
                label="Secret edit code"
                disabled={disabled}
            />
        </div>
    )
}

export default New2;