import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NotFound from "./NotFound";

const ClassObject = () => {

    const { classRoute } = useParams();
    const [data, setData] = useState([]);
    const [notFound, setNotFound] = useState(false);

    const fetchData = async () => {
        try {
            const response = await axios.get(`/api/classObject/${classRoute}`);
            setData(response.data);
            console.log(response)
        } catch (error) {
            setNotFound(true);
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            {notFound ? (
                <NotFound thing="class" name={classRoute} />
            ) : (
                <div>
                    <h1>{data.Name}</h1>
                </div>
            )}
        </>
    );
}

export default ClassObject;