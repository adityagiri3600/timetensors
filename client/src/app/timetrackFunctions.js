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
        const userData = JSON.parse(localStorage.getItem("userData"));
        if (userData) {
            const editCode = userData.editCodes.find(code => code.id === route).code;
            if (editCode) {
                console.log("Edit Code found in localStorage: ", editCode);
                return editCode;
            }
        }
    }
}

const doesUserHaveEditCode = (ttRoute, setUserHasEditCode=()=>{}) => {
    if (window !== undefined) {
        const userData = JSON.parse(localStorage.getItem("userData"));
        if (userData) {
            const userHasEditCode = userData.editCodes.some(code => code.id === ttRoute);
            setUserHasEditCode(userHasEditCode);
            return userHasEditCode;
        }
    }
    return false;
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

const determineTextColor = (hex) => {
    let r = parseInt(hex.substr(1, 2), 16);
    let g = parseInt(hex.substr(3, 2), 16);
    let b = parseInt(hex.substr(5, 2), 16);
    let brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness < 155 ? "white" : "black";
}

export { getTimetable, getEditCodeFromLocalStorage, doesUserHaveEditCode, getClassDetails, determineTextColor };