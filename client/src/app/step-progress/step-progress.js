import React, { useState } from "react";

const StepProgress = ({ step, n, swipeToNavigateAlert }) => {
    const [opacity, setOpacity] = useState(1);
    setTimeout(() => {
        setOpacity(0);
    }, 1000);
    return (
        <div
            style={{
                padding: "5px",
                marginBottom: "10px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}
        >

            {swipeToNavigateAlert &&
                <div style={{
                    width: "100vw",
                    height: "100vh",
                    backgroundColor: "#000000AA",
                    position: "absolute",
                    top: "0",
                    left: "0",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "2.4rem",
                    opacity: `${opacity}`,
                    transition: "opacity 1s linear"
                }}>
                    Swipe to Navigate
                </div>
            }
            {[...Array(n).keys()].map((index) => (
                <div
                    key={index}
                    className="progress-bar"
                    style={{
                        width: `${100 / n}vw`,
                        height: "2px",
                        backgroundColor: `${index <= step ? "#2b7df8" : "grey"}`,
                        margin: "2px",
                    }}
                >
                </div>
            ))}
        </ div>
    )
}

export default StepProgress;