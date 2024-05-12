import React from "react";
import UpdateTimeTable from "../../app/updateTimeTable/updateTimeTable";

const Update4 = ({ body, setEditCodeError, classes, events, setEvents, ttRoute }) => {

    events.sort((a, b) => {
        const aDate = new Date(a.date);
        const bDate = new Date(b.date);
        return aDate - bDate;
    });

    return (
        <div className="update4-container">
            {events.map((event, i) => (
                <div key={i} className="eventList" style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "90%"
                }}>
                    <input
                        type="text"
                        value={event.event}
                        onChange={(e) => {
                            const newEvents = [...events];
                            newEvents[i].event = e.target.value;
                            setEvents(newEvents);
                        }}
                    />
                    <p style={{padding:"5px"}}>{new Date(event.date).toDateString()}, {new Date(event.date).getHours()}:00</p>
                    <button onClick={() => {
                        const newEvents = [...events];
                        newEvents.splice(i, 1);
                        setEvents(newEvents);
                    }} style={{
                        height: "80%",
                        border: "none",
                        padding: "0",
                        background: "rgb(255, 55, 55)",
                        borderRadius: "5px"
                    }}>
                        <img src="/delete.svg" alt="delete" style={{
                                background: "rgb(255, 55, 55)",
                                width: "60%",
                                height: "90%"
                        }} />
                    </button>
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