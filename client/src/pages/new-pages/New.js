import React, { useState } from "react";
import StepProgress from "../../app/step-progress/step-progress";
import Carousel from "../../app/carousel/carousel";

const New = () => {

    const [step,setStep] = useState(0);

    const steps = [

    ]

    return (
        <div className="new-container">
            <h1 className="step-heading"> <span className="step-count">Step {step + 1}:</span> {steps[step]}</h1>
            <StepProgress step={step} n={steps.length} />
            <Carousel getIndex={setStep}>

            </Carousel>
        </div>
    )
}