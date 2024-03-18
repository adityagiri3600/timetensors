import { useState, useEffect } from "react";
import "./datetime.css"

const Datetime = (props) => {
    const date = props.date;

    const month = date.toLocaleDateString('en-us', { month: "short" });
    const day = date.toLocaleDateString('en-us', { weekday: "long" });
    const dayNum = date.toLocaleDateString('en-us', { day: "numeric" });

    const [animatedDay, setAnimatedDay] = useState(day);

    useEffect(() => {
        for (let i = 0; i < day.length; i++) {
            setTimeout(() => {
                setAnimatedDay(prevAnimatedDay => {
                    if(i<day.length-1){
                        return prevAnimatedDay.substring(0, i) + day[i] + prevAnimatedDay.substring(i + 1);
                    }
                    return prevAnimatedDay.substring(0, i) + day[i];
                });
            }, 50 * i);
        }
        
    }, [day]);

    return (
        <div className="datetime">
            <h2>{month} {dayNum}</h2>
            <h3>{animatedDay}</h3>
        </div>
    );
}
export default Datetime;