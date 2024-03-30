import React from "react";

const Update2 = ({ ttName, setTtName }) => {
    return (
        <div className="update2-container">
            <label htmlFor="ttName" className="labels">Timetable Name:</label>
            <input
                id="ttName"
                type="text"
                value={ttName}
                onChange={(e) => setTtName(e.target.value)}
                className="ttNameField"
            />
        </div>
    );
}

export default Update2;