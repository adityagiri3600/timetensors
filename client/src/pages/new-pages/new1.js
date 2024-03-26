import React, {useState} from "react"
import "./new1.css"

const New1 = ({ttName,setTtName}) => {
    return (
        <div className="new1-container">
            <input
                        type="text"
                        placeholder="TimeTable name"
                        value={ttName}
                        onChange={(e) => setTtName(e.target.value)}
                        className="ttNameField"
                    />
        </div>
    )
}

export default New1;