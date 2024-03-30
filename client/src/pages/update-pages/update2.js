import React from "react";

const Update2 = ({ ttName, setTtName,description,setDescription }) => {
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
            <label htmlFor="description" className="labels">Description:</label>
            <textarea
                id="description"
                value={description}
                onChange={(e)=> setDescription(e.target.value)}
                className="description"
            />
        </div>
    );
}

export default Update2;