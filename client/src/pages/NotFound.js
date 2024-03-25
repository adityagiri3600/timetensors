import React from "react";
import "./NotFound.css";

const NotFound = ({ttRoute}) => {
    return (
        <div className="NotFoundContainer">
            <h1 className={"title"}> <a href="/">TimeTrack</a> </h1>
            <h1 className="error-404">404 :(</h1>
            <p> Seems like the timetable <span className="ttRoute">{ttRoute}</span> does not exist. </p>
        </div>
    );
};

export default NotFound;