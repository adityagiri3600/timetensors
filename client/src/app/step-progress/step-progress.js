import React from "react";

const StepProgress = ({step, n}) => {
    return (
        <div 
            style={{
                padding:"5px",
                marginBottom: "10px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}
        >
            {[...Array(n).keys()].map((index)=>(
                <div 
                    className="progress-bar"
                    style={{
                        width: `${100/n}vw`,
                        height:"2px",
                        backgroundColor:`${index <= step ? "#2b7df8" : "grey"}`,
                        margin: "2px",
                    }}
                >
                </div>
            ))}
        </ div>
    )
}

export default StepProgress;