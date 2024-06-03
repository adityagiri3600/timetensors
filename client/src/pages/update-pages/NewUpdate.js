import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { doesUserHaveEditCode, getEditCodeFromLocalStorage } from "../../app/timetrackFunctions";
import InputField from "../../app/inputField/InputField";
import axios from "axios";

const NewUpdate = () => {

    const {ttRoute} = useParams();
    const [editCode, setEditCode] = useState("");
    const [userHasEditCode, setUserHasEditCode] = useState(false);
    const [editCodeError, setEditCodeError] = useState(false);

    useEffect(() => {
        doesUserHaveEditCode(ttRoute, setUserHasEditCode);
        getEditCodeFromLocalStorage(ttRoute);
    }, []);

    const updateOptions = [
        {
            name: "Change MetaData",
            route: "metadata"
        },
        {
            name: "Change Regular Timetable",
            route: "regular"
        },
        {
            name: "Add/Remove classes",
            route: "classes"
        },
        {
            name: "edit specific dates",
            route: "specific-dates"
        },
        {
            name: "Add/Remove extra classes",
            route: "extra-classes"
        },
        {
            name: "Add/Remove events",
            route: "events"
        }
    ];

    return (
        <div>
            {!userHasEditCode ? 
            <div>
                <InputField
                    label="Edit Code"
                    state={editCode}
                    setState={setEditCode}
                    disabled={false}
                />
                {editCodeError && <p>Invalid edit code</p>}
                <button onClick={() => {
                    axios.post(`/api/timetable/verify/${ttRoute}`, { editCode })
                    .then(res => {
                        if (res.status === 200) {
                            setUserHasEditCode(true);
                            if (window !== undefined) {
                                localStorage.setItem(`${ttRoute}EditCode`, editCode);
                                setUserHasEditCode(true);
                            }
                        }
                    })
                    .catch(err => {
                        setEditCodeError(true);
                    });
                }}>Next</button>
            </div>
            :
            <div>
                {updateOptions.map(option => {
                    return <button key={option.name} onClick={() => {
                        window.location.href = `/update/${option.route}/${ttRoute}`;
                    }}>{option.name}</button>
                })}
            </div>}
        </div>
    );
}

export default NewUpdate;