import React, { useState, useEffect } from 'react';
import { getTimetable, getEditCodeFromLocalStorage } from '../../app/timetrackFunctions';
import { useParams } from 'react-router-dom';
import UpdateTimeTable from '../../app/updateTimeTable/updateTimeTable';

const AddExtraClasses = () => {
    const { ttRoute } = useParams();
    const [data, setData] = useState([]);
    const [selectedClass, setSelectedClass] = useState(null);
    const [date, setDate] = useState(null);
    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);

    const fetchData = async () => {
        const response = await getTimetable(ttRoute);
        setData(response);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (

        <div style={{
            padding: '20px',
        }}>
            <p style={{ fontSize: '1.5rem', margin: 0 }}>Add Extra Class</p>
            <p style={{ fontSize: '0.8rem', margin: 0, color: "#FFFFFFAA" }}>Select a class and date</p>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
            }}>
                <input type='date' className='datepicker' onChange={(e) => setDate(e.target.value)} />
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <input type='time' className='datepicker' style={{ width: "100px", margin: "1px" }} onChange={(e) => setStart(e.target.value)} />
                    <input type='time' className='datepicker' style={{ width: "100px", margin: "1px" }} onChange={(e) => setEnd(e.target.value)} />
                </div>
            </div>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gridGap: '10px'

            }}>
                {data?.classObjects?.map((classObject, index) => (
                    <div
                        key={index}
                        onClick={() => setSelectedClass(classObject.classid)}
                        style={{
                            padding: '10px',
                            cursor: 'pointer',
                            WebkitTapHighlightColor: 'transparent',
                            backgroundColor: classObject.color,
                            borderRadius: '5px',
                            outline: selectedClass === classObject.classid ? '2px dashed white' : 'none'
                        }}
                    >
                        <p>{classObject.Name}</p>
                    </div>
                ))}
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: '20px'
            }}>
                <UpdateTimeTable
                    ttRoute={ttRoute}
                    body={{
                        editCode: getEditCodeFromLocalStorage(ttRoute),
                        extraClasses: {
                            date: date,
                            classid: selectedClass,
                            Start: start,
                            End: end
                        }
                    }}
                    text='Add Extra Class'
                    setEditCodeError={() => { }}
                    disabled={selectedClass === null || date === null || start === null || end === null}
                />
            </div>
        </div>
    );
}

export default AddExtraClasses;