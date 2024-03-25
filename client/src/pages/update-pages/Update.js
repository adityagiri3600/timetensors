import React, { useState } from "react";
import Carousel from "../../app/carousel/carousel";
import Update1 from "./update1";
import Update2 from "./update2";
import StepProgress from "../../app/step-progress/step-progress";
import "./Update.css"

const Update = () => {

    const [editCode, setEditCode] = useState("")
    const [editCodeError, setEditCodeError] = useState(false)
    const [step, setStep] = useState(0);

    const steps = [
        "Enter the Edit Code:",
        "Make Changes"
    ]

    return (
        <div className="update-container">
            <h1 className="step-heading"> <span className="step-count">Step {step + 1}:</span> {steps[step]}</h1>
            <StepProgress step={step} n={steps.length} />
            {editCodeError ? <p className="editCodeError">Invalid Edit Code</p> : null}
            <Carousel getIndex={setStep}>
                <Update1 editCode={editCode} setEditCode={setEditCode} />
                <Update2 editCode={editCode} setEditCodeError={setEditCodeError} />
            </Carousel>
        </div>
    );
}

export default Update;