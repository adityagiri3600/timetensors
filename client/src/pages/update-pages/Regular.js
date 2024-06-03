import React, { useEffect, useState } from "react";
import TimetableCreator from "../../app/timetableCreator/timetableCreator";
import UpdateTimeTable from "../../app/updateTimeTable/updateTimeTable";

const Regular = ({ body, setEditCodeError, classes, classObjects , classesAtSpecificDate, ttRoute }) => {
    
    const [editingSpecificDate, setEditingSpecificDate] = useState(false);
    const [newClasses, setNewClasses] = useState(classes);
    useEffect(() => {
        setNewClasses(classes);
    }, [classes])
    const [newClassesAtSpecificDate, setNewClassesAtSpecificDate] = useState({ date: new Date(), classes: [] });

    const updateClassesAtSpecificDate = (casd, ncasd) => {
        for (let i = 0; i < casd.length; i++) {
            let casdDate = new Date(casd[i].date);
            casdDate.setHours(0, 0, 0, 0);
            let ncasdDate = new Date(ncasd.date);
            ncasdDate.setHours(0, 0, 0, 0);
            if (casdDate.valueOf() == ncasdDate.valueOf()) {
                casd[i].classes = ncasd.classes;
                return casd;
            }
        }
        return [...casd, ncasd];
    }

    return (
        <div className="update4-container">
            <TimetableCreator 
                classes={newClasses}
                setClasses={setNewClasses}
                classObjects={classObjects}
                classesAtSpecificDate={classesAtSpecificDate}
                setNewClassesAtSpecificDate={setNewClassesAtSpecificDate}
                editingSpecificDate={editingSpecificDate}
                setEditingSpecificDate={setEditingSpecificDate}
            />
            <div className="update-btn-container">
                <UpdateTimeTable
                    body={{
                        ...body,
                        classes: 
                            editingSpecificDate
                                ? classes
                                : newClasses,
                        classesAtSpecificDate: 
                            editingSpecificDate
                                ? updateClassesAtSpecificDate(classesAtSpecificDate, newClassesAtSpecificDate)
                                : classesAtSpecificDate
                    }}
                    ttRoute={ttRoute}
                    setEditCodeError={setEditCodeError}
                />
            </div>
        </div>
    )
}

export default Regular;