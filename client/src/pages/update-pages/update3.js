import { React, useState } from "react";
import InputField from "../../app/inputField/InputField";

const Update3 = ({ classObjects, setClassObjects, disabled }) => {

    const [name, setName] = useState("");

    return (
        <div className="update3-container">
            <div>
                <InputField
                    state={name}
                    setState={setName}
                    label="Class Name:"
                    disabled={disabled}
                />
                <button onClick={() => setClassObjects([...classObjects, { Name: name, classid: Math.random().toString(36).substring(7) }])}>Add Class</button>
            </div>
            {classObjects.map((c, i) =>
                <div 
                    key={i}
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "90%",
                        height: "50px",
                    }}
                >
                    <p style={{paddingLeft:"40px"}}>{c.Name}</p>
                    <button onClick={() => setClassObjects(classObjects.filter((c, index) => index !== i))}
                        style={{
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
            )}
        </div>
    );
}

export default Update3;