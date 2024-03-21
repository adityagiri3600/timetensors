import React from "react";
import "./NotFound.css";

const NotFound = ({ttCode}) => {
    return (
        <div className="NotFoundContainer">
            <h1 className={"title"}> <a href="/">TimeTrack</a> </h1>
            <h1 className="error-404">404 :(</h1>
            <p> Seems like the timetable <span className="ttCode">{ttCode}</span> does not exist. </p>
        </div>
    );
};

export default NotFound;