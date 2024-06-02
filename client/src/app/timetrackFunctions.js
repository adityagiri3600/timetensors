import axios from 'axios';

const getTimetable = async (route, setNotFound = () => {}) => {
    try {
        const response = await axios.get(`/api/timetable/${route}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        setNotFound(true);
        console.error('Error fetching data:', error);
    }
}

const getEditCodeFromLocalStorage = (route) => {
    if (window !== undefined) {
        return localStorage.getItem(`${route}EditCode`);
    }
}

const getClassDetails = (classObjects, classItem) => {
    for (let i = 0; i < classObjects.length; i++) {
        if (classObjects[i].classid === classItem.classid) {
            return {
                ...classObjects[i],
                ...classItem
            };
        }
    }
    if (classObjects.length > 0)
        return classObjects[0];
    return {
        Name: "Class not found",
        color: "#2b7df8",
        Properties: [],
        ...classItem
    };
}

export { getTimetable, getEditCodeFromLocalStorage, getClassDetails };