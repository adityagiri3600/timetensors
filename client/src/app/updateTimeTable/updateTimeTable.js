import React from 'react';
import axios from 'axios';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';
import './updateTimeTable.css';
import { IconChecks } from '@tabler/icons-react';

const UpdateTimeTable = ({ ttRoute, body, setEditCodeError, disabled, text }) => {
    
    const { isLoggedIn, userData, updateUserData } = useAuth();
    const navigate = useNavigate();

    const handleResponse = (response) => {
        if (response.status === 200) {
            console.log("Time table updated");
            navigate(`/${ttRoute}`);

            if (isLoggedIn) {
                updateUserData({
                    editCodes : [...userData.editCodes.filter(code => code.id !== ttRoute), {
                        id: ttRoute,
                        code: body.editCode
                    }]
                });
            }else{
                // Save edit code to local storage
                let userData = JSON.parse(localStorage.getItem('userData')) || {};
                let editCodes = userData.editCodes || [];
                editCodes = [...editCodes.filter(code => code.id !== ttRoute), {
                    id: ttRoute,
                    code: body.editCode
                }];
                localStorage.setItem('userData', JSON.stringify({ ...userData, editCodes }));
            }
        } else {
            console.error("An error occurred");
        }
    };

    const handleErrorResponse = (error) => {
        console.error("Invalid edit code");
        setEditCodeError(true);
    }

    const handleClick = async () => {
        try {
            const response = await axios.post(
                `/api/timetable/update/${ttRoute}`,
                body,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            handleResponse(response);
        } catch (error) {
            handleErrorResponse(error);
        }
    };

    return (
        <button onClick={handleClick} className='updateTimeTable-btn btn-press' disabled={disabled} tabIndex={-1}>
            {text || 'Update'}
            &nbsp;
            <IconChecks stroke={2} size={20} />
        </button>
    );
};

export default UpdateTimeTable;
