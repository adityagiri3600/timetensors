import React from "react";

const Update1 = ({ editCode, setEditCode, disabled }) => {
    return (
        <div className="update1-container">

            <p className="info-paragraph">
                Every timetable has an edit code that is a password required to edit the timetable. If you do
                 not have the edit code for this timetable please ask for it to the creater of this timetable.
            </p>

            <label htmlFor="editCode" className="labels">Edit Code:</label>
            <input
                id="editCode"
                type="text"
                value={editCode}
                onChange={(e) => setEditCode(e.target.value)}
                onKeyDown={(e) => {
                    // prevents tabbing to next input field as it breaks the carousel
                    if (e.keyCode === 9 || e.keyCode === 13) {
                        e.preventDefault()
                        e.target.focus();
                    }
                }}
                className="editCodeField"
            />
        </div>
    );
}

export default Update1;