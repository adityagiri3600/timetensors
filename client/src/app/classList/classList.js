import React, { useState } from "react";
import Class from "../class/class";
import { motion } from "framer-motion";
import "./classList.css"

const ClassList = ({ todaysClasses, date, position, postEvent, events, ttRoute }) => {

    const [focusedClass, setFocusedClass] = useState(-1);
    const setFocusedClassWrapper = (i) => {
        if (focusedClass === i) {
            setFocusedClass(-1);
        }
        else {
            setFocusedClass(i);
        }
    }

    if (todaysClasses.length === 0) return (
        <div className="classList-container" style={{ width: "100vw" }}>
            <h1 className="noclass">There are no classes today.</h1>
        </div>
    )

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        },
    };
    
    const itemVariants = {
        hidden: { opacity: 0, x: 40 },
        visible: { opacity: 1, x: 0 ,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 10
            }
        }
    };
    

    return (
        <div className="classList-container" style={{ width: "100vw" }}>
            <motion.div className={"classList " + position} variants={containerVariants} initial="hidden" animate="visible">
                {todaysClasses.map((classItem, i) => (
                    <motion.div variants={itemVariants} key={i} style={{ width: "100%"}}>
                        <Class key={i}
                            classItem={classItem}
                            date={date}
                            handleClick={() => setFocusedClassWrapper(i)}
                            focused={focusedClass === i && position === "center"}
                            events={events}
                            postEvent={postEvent}
                            ttRoute={ttRoute}
                        />
                    </motion.div>
                ))}
            </motion.div>
        </div>
    )
}

export default ClassList;