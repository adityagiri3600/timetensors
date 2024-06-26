import React, { useState } from "react";
import Class from "../class/class";
import { motion } from "framer-motion";
import "./classList.css";
import { useTheme } from "../../ThemeContext";

const ClassList = ({
    todaysClasses,
    date,
    position,
    postEvent,
    events,
    ttRoute,
}) => {
    const {theme} = useTheme();
    const [focusedClass, setFocusedClass] = useState(-1);
    const setFocusedClassWrapper = (i) => {
        if (focusedClass === i) {
            setFocusedClass(-1);
        } else {
            setFocusedClass(i);
        }
    };

    if (todaysClasses.length === 0)
        return (
            <div
                className="classList-container"
                style={{
                    width: "100vw",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "center",
                }}
            >
                <svg
                    style={{
                        width: "100%",
                        height: "100%",
                        display: "block",
                        overflow: "visible",
                    }}
                >
                    <image
                        href="/noclasses.svg"
                        width="100%"
                        height="100%"
                        style={{
                            position: "absolute",
                            scale: "0.5",
                            top: "50%",
                            left: "50%",
                            transform: "translate(57%, 50%)",
                            boxShadow: "0 0 10px 10px rgba(0, 0, 0, 1)",
                            filter: 
                                theme=="paper"
                                    ? "invert(1) opacity(0.5)"
                                    : "drop-shadow(0 0 5px rgba(0, 0, 0, 1)) drop-shadow(0 0 10px rgba(0, 0, 0, 1)) drop-shadow(0 0 20px rgba(0, 0, 0, 1)) drop-shadow(0 0 40px rgba(0, 0, 0, 1))"
                                ,
                            zIndex: "1",
                        }}
                    />
                </svg>
            </div>
        );

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, x: 40 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 10,
            },
        },
    };

    return (
        <div className="classList-container" style={{ width: "100vw" }}>
            <motion.div
                className={"classList classList-" + theme + " " + position}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {todaysClasses.map((classItem, i) => (
                    <motion.div
                        variants={itemVariants}
                        key={i}
                        style={{ width: "100%" }}
                    >
                        <Class
                            key={i}
                            classItem={classItem}
                            date={date}
                            handleClick={() => setFocusedClassWrapper(i)}
                            focused={
                                focusedClass === i && position === "center"
                            }
                            events={events}
                            postEvent={postEvent}
                            ttRoute={ttRoute}
                        />
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default ClassList;
