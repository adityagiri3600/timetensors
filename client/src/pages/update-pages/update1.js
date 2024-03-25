import React from "react";
import "./update1.css"

const Update1 = ({ editCode, setEditCode }) => {
    return (
        <div className="update1-container">
            <input
                type="text"
                value={editCode}
                onChange={(e) => setEditCode(e.target.value)}
                placeholder="Edit Code"
                className="editCodeField"
            />
        </div>
    );
}

export default Update1;