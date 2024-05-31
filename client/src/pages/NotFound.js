import React from "react";
import "./NotFound.css";

const NotFound = ({thing, name}) => {
    return (
        <div className="NotFoundContainer">
            <h1 className={"title"}> <a href="/">TimeTrack</a> </h1>
            <h1 className="error-404">404 :(</h1>
            <p> Seems like the {thing} <span className="ttRoute">{name}</span> does not exist. </p>
        </div>
    );
};

export default NotFound;