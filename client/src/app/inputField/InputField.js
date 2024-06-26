import React from "react";
import "./InputField.css";

const InputField = ({ state, setState, disabled, label, textarea }) => {
    return (
        <div>
            <label htmlFor={`inputFieldid-${label}`} style={{ color: "rgba(var(--foreground-rgb),0.5)", marginLeft: "15px" }}>{label}</label>
            {
                textarea ?
                    <textarea
                        id= {`inputFieldid-${label}`}
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        onKeyDown={(e) => {
                            // prevents tabbing to next input field as it breaks the carousel
                            if (e.keyCode === 9 || e.keyCode === 13) {
                                e.preventDefault()
                                e.target.focus();
                            }
                        }}
                        style={{
                            backgroundColor: "rgb(var(--background-rgb))", 
                            width: "300px",
                            height: "150px",
                            margin: "10px",
                            padding: "10px",
                            color: "rgb(var(--foreground-rgb))",
                            borderRadius: "10px",
                            fontSize: "1.3rem",
                            outline: "none",
                            border: "1px solid #3c3c3c"
                        }}
                        className="inputFieldComponent"
                        disabled={disabled}
                    />
                    :
                    <input
                        id={`inputFieldid-${label}`}
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        onKeyDown={(e) => {
                            // prevents tabbing to next input field as it breaks the carousel
                            if (e.keyCode === 9 || e.keyCode === 13) {
                                e.preventDefault()
                                e.target.focus();
                            }
                        }}
                        style={{
                            backgroundColor: "rgb(var(--background-rgb))",
                            width: "300px",
                            margin: "10px",
                            padding: "10px",
                            color: "rgb(var(--foreground-rgb))",
                            borderRadius: "10px",
                            fontSize: "1.3rem",
                            outline: "none",
                            border: "1px solid #3c3c3c"
                        }}
                        className="inputFieldComponent"
                        disabled={disabled}
                    />
            }
        </div>
    );
}

export default InputField;