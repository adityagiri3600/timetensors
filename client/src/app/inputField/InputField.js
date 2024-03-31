import React from "react";
import "./InputField.css";

const InputField = ({ state, setState, disabled, label, textarea }) => {
    return (
        <div>
            <label htmlFor="inputFieldid" style={{ color: "#ffffff80", marginLeft: "15px" }}>{label}</label>
            {
                textarea ?
                    <textarea
                        id="inputFieldid"
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
                            backgroundColor: "black",
                            width: "300px",
                            height: "150px",
                            margin: "10px",
                            padding: "10px",
                            color: "white",
                            borderRadius: "10px",
                            fontSize: "1.3rem",
                            outline: "none"
                        }}
                        className="inputFieldComponent"
                        disabled={disabled}
                    />
                    :
                    <input
                        id="inputFieldid"
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
                            backgroundColor: "black",
                            width: "300px",
                            margin: "10px",
                            padding: "10px",
                            color: "white",
                            borderRadius: "10px",
                            fontSize: "1.3rem",
                            outline: "none"
                        }}
                        className="inputFieldComponent"
                        disabled={disabled}
                    />
            }
        </div>
    );
}

export default InputField;