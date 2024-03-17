import {React,useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import Papa from "papaparse";
import Class from "../app/class/class";
import Navigate from "../app/navigate/navigate";

const Section = () => {
    const { section } = useParams();
    const [data, setData] = useState([]);
    useEffect(() => {
        Papa.parse(`/${section}.csv`, {
            download: true,
            header: true,
            complete: data => {
                setData(data.data);
            }
        });
    }, []);

    const [date, setDate] = useState(new Date());
    const [fakeDate, setFakeDate] = useState(date);

    const [weekDay, setWeekDay] = useState(date.getDay())
    const [fakeWeekDay, setFakeWeekDay] = useState(weekDay);

    const [todaysClasses, setTodaysClasses] = useState(data.filter(someClass => someClass.Day == weekDay));

    useEffect(() => {
        setTodaysClasses(data.filter(someClass => someClass.Day == fakeWeekDay));
    }, [data, fakeWeekDay]);

    const handleNext = () => {
        fakeDate.setDate(date.getDate() + 1);
        setFakeWeekDay((fakeWeekDay+1)%7);
    }
    
    const handlePrev = () => {
        fakeDate.setDate(date.getDate() - 1);
        setFakeWeekDay((fakeWeekDay+6)%7);
    }

    return (
        <div>
            {todaysClasses.length > 0 ? (
                <div>
                    <h1 className={"title"}>TimeTrack</h1>
                    <h2 className={"info"}><a href="https://github.com/Xyncross1111/timetrack">Repo</a></h2>
                    <Navigate handlePrev={handlePrev} handleNext={handleNext} />
                    {todaysClasses.map((props, i) => (
                        <Class key={i} {...props} date={fakeDate}/>
                    ))}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Section;