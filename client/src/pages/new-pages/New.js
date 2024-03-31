import React, { useEffect, useState } from "react";
import StepProgress from "../../app/step-progress/step-progress";
import Carousel from "../../app/carousel/carousel";
import New1 from "./new1";
import New2 from "./new2";
import New3 from "./new3";
import New4 from "./new4";
import Created from "../Created";
import "./New.css";

const New = () => {

    const [step, setStep] = useState(0);
    const [ttName, setTtName] = useState("");
    const [description, setDescription] = useState("");
    const [editCode, setEditCode] = useState("");
    const [ttRoute, setTtRoute] = useState("");
    const [created, setCreated] = useState(false);

    const [classes, setClasses] = useState([
        { Day: new Date().getDay(), Subject: "", Start: "12:00", End: "13:00" }
    ]);
    const [uniqueClasses, setUniqueClasses] = useState([]);

    useEffect(() => {
        const unique = [...new Set(classes.map(c => c.Subject))];
        unique.sort();
        setUniqueClasses(unique);
    }, [classes]);

    const steps = [
        "Give a name!",
        "Write a secret edit code",
        "Make your schedule",
        "Verify"
    ]

    return (
        <div className="new-container">
            {created ? (
                <Created ttName={ttName} ttRoute={ttRoute} />
            ) :
                <>
                    <h1 className="step-heading"> <span className="step-count">Step {step + 1}:</span> {steps[step]}</h1>
                    <p style={{
                        margin: "0 10px",
                        fontSize: "0.8rem",
                        color: "#FFFFFFAA"
                    }} >Swipe to Navigate</p>
                    <StepProgress step={step} n={steps.length} />
                    <Carousel getIndex={setStep}>
                        <New1
                            ttName={ttName}
                            setTtName={setTtName}
                            description={description}
                            setDescription={setDescription}
                            disabled={step !== 0}
                        />
                        <New2
                            editCode={editCode}
                            setEditCode={setEditCode}
                            disabled={step !== 1}
                        />
                        <New3
                            classes={classes}
                            setClasses={setClasses}
                            />
                        <New4 
                            uniqueClasses={uniqueClasses}
                            body={{ ttName, description, editCode }}
                            setCreated={setCreated}
                            setTtRoute={setTtRoute}
                            disabled={step !== 2}
                        />
                    </Carousel>
                </>
            }
        </div>
    )
}

export default New;