import React from "react";
import UpdateTimeTable from "../../app/updateTimeTable/updateTimeTable";

const Update4 = ({ body, setEditCodeError, classes, events, setEvents , ttRoute }) => {

    events.sort((a, b) => {
        const aDate = new Date(a.date);
        const bDate = new Date(b.date);
        return aDate - bDate;
    });

    return (
        <div className="update4-container">
            {events.map((event, i) => (
                <div key={i} style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px",
                    width: "90%",
                }}>
                    <h1>{event.event}</h1>
                    <p>{new Date(event.date).toLocaleDateString()}, {new Date(event.date).getHours()}:00</p>
                    <button onClick={() => {
                        const newEvents = [...events];
                        newEvents.splice(i, 1);
                        setEvents(newEvents);
                    }}>Delete</button>
                </div>
            ))}
            <div className="update-btn-container">
                <UpdateTimeTable
                    body={{
                        ...body,
                        classes,
                        events
                    }}
                    ttRoute={ttRoute}
                    setEditCodeError={setEditCodeError}
                />
            </div>
        </div>
    )
}

export default Update4;