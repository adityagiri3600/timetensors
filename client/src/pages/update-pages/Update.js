import React, { useState, useEffect } from "react";
import axios from "axios"
import Carousel from "../../app/carousel/carousel";
import EditCode from "./EditCode";
import Metadata from "./Metadata";
import Classes from "./Classes";
import Regular from "./Regular";
import Events from "./Events";
import StepProgress from "../../app/step-progress/step-progress";
import "./Update.css"
import { useParams } from "react-router-dom";

const Update = () => {

    const { ttRoute } = useParams();
    const [data, setData] = useState([]);
    const [classes, setClasses] = useState([]);
    const [classesAtSpecificDate, setClassesAtSpecificDate] = useState([]);
    const [classObjects, setClassObjects] = useState([])
    const [events, setEvents] = useState([]);

    const [editCode, setEditCode] = useState("")
    const [editCodeError, setEditCodeError] = useState(false)
    const [step, setStep] = useState(0);

    const [ttName, setTtName] = useState("")
    const [description, setDescription] = useState("")


    const fetchData = async () => {
        try {
            const response = await axios.get(`/api/timetable/${ttRoute}`);
            setData(response.data);
            setTtName(response.data.ttName);
            setClasses(response.data.classes);
            setClassesAtSpecificDate(response.data.classesAtSpecificDate);
            setClassObjects(response.data.classObjects);
            setEvents(response.data.events);
            setDescription(response.data.description);
            getEditCodeFromLocalStorage(ttRoute, setEditCode);
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
        "Update classes",
        "Update timetable",
        "Update events",
    ]

    return (
        <div className="update-container">
            <h1 className="step-heading"> <span className="step-count">Step {step + 1}:</span> {steps[step]}</h1>
            <p style={{
                margin: "0 10px",
                fontSize: "0.8rem",
                color: "#FFFFFFAA"
            }} >Swipe to Navigate</p>
            <StepProgress step={step} n={steps.length} />
            {editCodeError ? <p className="editCodeError">Invalid Edit Code</p> : null}
            <Carousel getIndex={setStep}>
                <EditCode
                    editCode={editCode}
                    setEditCode={setEditCode}
                    disabled={step !== 0}
                />
                <Metadata
                    ttName={ttName}
                    setTtName={setTtName}
                    description={description}
                    setDescription={setDescription}
                    disabled={step !== 1}
                />
                <Classes
                    classObjects={classObjects}
                    setClassObjects={setClassObjects}
                    disabled={step !== 2}
                />
                <Regular
                    body={{ ttName, description, editCode, classObjects, events}}
                    setEditCodeError={setEditCodeError}
                    classes={classes}
                    classObjects={classObjects}
                    classesAtSpecificDate={classesAtSpecificDate}
                    ttRoute={ttRoute}
                    disabled={step !== 3}
                />
                <Events
                    body={{ ttName, description, editCode, classObjects, events}}
                    setEditCodeError={setEditCodeError}
                    classes={classes}
                    events={events}
                    setEvents={setEvents}
                    ttRoute={ttRoute}
                    disabled={step !== 4}
                />
            </Carousel>
        </div>
    );
}

const getEditCodeFromLocalStorage = (ttRoute, setEditCode) => {
    if (window == undefined)
        return
    const storedEditCode = localStorage.getItem(`${ttRoute}EditCode`);
    if (storedEditCode)
        setEditCode(storedEditCode);
}

export default Update;