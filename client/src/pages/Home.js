import React from "react";
import "./Home.css";

const Home = () => {
    return (
        <div>
            <h1>TimeTrack</h1>
            <form action="/new">
                <input type="submit" value="New TimeTable" className="newTimeTable"/>
            </form>
        </div>
    );
}

export default Home;