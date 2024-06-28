import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StepProgress from "../../app/step-progress/step-progress";
import Carousel from "../../app/carousel/carousel";
import New1 from "./new1";
import New2 from "./new2";
import New4 from "./new4";
import Created from "../Created";
import Classes from "../update-pages/Classes";
import { useAuth } from "../../AuthContext";
import { motion } from "framer-motion";
import "./New.css";

const New = () => {
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    const [step, setStep] = useState(0);
    const [ttName, setTtName] = useState("");
    const [description, setDescription] = useState("");
    const [editCode, setEditCode] = useState("");
    const [ttRoute, setTtRoute] = useState("");

    const [classes, setClasses] = useState([]);
    const [classObjects, setClassObjects] = useState([]);

    const steps = [
        "Give a name!",
        "Write a secret edit code",
        "Add your classes",
        "Make your schedule"
    ]
    if (!isLoggedIn) {
        navigate("/login");
        return null;
    }
    return (
        <motion.div
            style={{
                position: "absolute",
                height: "100vh",
                overflow: "hidden",
                backgroundColor: "rgb(var(--background-rgb))",
                width: "100vw",
            }}
        >
            <div className="new-container">
                        <h1 className="step-heading"> <span className="step-count">Step {step + 1}:</span> {steps[step]}</h1>
                        <p style={{
                            margin: "0 10px",
                            fontSize: "0.8rem",
                            color: "rgb(var(--foreground-rgb))",
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
                            <Classes
                                classObjects={classObjects}
                                setClassObjects={setClassObjects}
                                disabled={step !== 2}
                            />
                            <New4
                                classes={classes}
                                setClasses={setClasses}
                                classObjects={classObjects}
                                body={{ ttName, description, classes, classObjects, editCode }}
                                setTtRoute={setTtRoute}
                            />
                        </Carousel>
            </div>
        </motion.div>
    )
}

export default New;