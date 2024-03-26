import React, { useState } from "react"
import "./new2.css"

const New2 = ({ editCode, setEditCode }) => {
    return (
        <div className="new2-container">
            <input
                type="text"
                placeholder="Edit Code"
                value={editCode}
                onChange={(e) => setEditCode(e.target.value)}
                className="editCodeField"
            />
        </div>
    )
}

export default New2;