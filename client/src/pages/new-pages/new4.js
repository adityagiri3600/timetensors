import React from "react";
import NewTimeTable from "../../app/newTimeTable/newTimeTable";

const New4 = ({ uniqueClasses, body, setCreated, setTtRoute, disabled }) => {
    return (
        <div style={{ width: "100vw", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h1 style={{ textShadow: "none", margin: "10px" }}>
                <span style={{ color: "#2b7df8" }}>
                    {uniqueClasses.length}
                </span>
                {
                    uniqueClasses.length === 0 ? " no classes were identified" :
                    uniqueClasses.length === 1 ? " class was identified" :
                    " classes were identified"
                }
            </h1>

            <div style={{
                width: "90vw",
                border: "1px solid #3c3c3c",
                borderRadius: "10px"
            }}>
                <ol>
                    {
                        uniqueClasses.map((c, i) => (
                            <li>{c}</li>
                        ))
                    }
                </ol>
            </div>

            <div className="new-btn-container">
                <NewTimeTable
                    body={body}
                    setCreated={setCreated}
                    setTtRoute={setTtRoute}
                    disabled={body.ttName === "" || body.editCode === ""}
                />
            </div>
        </div>
    );
}

export default New4;