import React, { useState,useEffect } from "react";
import axios from "axios"
import Carousel from "../../app/carousel/carousel";
import Update1 from "./update1";
import Update2 from "./update2";
import Update3 from "./update3"
import StepProgress from "../../app/step-progress/step-progress";
import "./Update.css"
import { useParams } from "react-router-dom";

const Update = () => {

    const { ttRoute } = useParams();
    const [data, setData] = useState([]);

    const [editCode, setEditCode] = useState("")
    const [editCodeError, setEditCodeError] = useState(false)
    const [step, setStep] = useState(0);

    const [ttName, setTtName] = useState("")


    const fetchData = async () => {
        try {
            const response = await axios.get(`/api/timetable/${ttRoute}`);
            setData(response.data.classes);
            setTtName(response.data.ttName);
            console.log(response)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    const steps = [
        "Enter the Edit Code:",
        "Change MetaData",
        "Update timetable"
    ]

    return (
        <div className="update-container">
            <h1 className="step-heading"> <span className="step-count">Step {step + 1}:</span> {steps[step]}</h1>
            <StepProgress step={step} n={steps.length} />
            {editCodeError ? <p className="editCodeError">Invalid Edit Code</p> : null}
            <Carousel getIndex={setStep}>
                <Update1
                    editCode={editCode}
                    setEditCode={setEditCode}
                />
                <Update2
                    ttName={ttName}
                    setTtName={setTtName}
                />
                <Update3
                    editCode={editCode}
                    setEditCodeError={setEditCodeError}
                    ttName={ttName}
                    data={data}
                    setData={setData}
                    ttRoute={ttRoute}
                />
            </Carousel>
        </div>
    );
}

export default Update;