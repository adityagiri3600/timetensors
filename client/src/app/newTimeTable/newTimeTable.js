import React from 'react';
import axios from 'axios';
import { useAuth } from '../../AuthContext';
import './newTimeTable.css';
import { useNavigate } from 'react-router-dom';

const NewTimeTable = ({ body, setTtRoute, disabled }) => {

  const { isLoggedIn, userData, updateUserData } = useAuth();
  const navigate = useNavigate();

  const handleResponse = (response) => {
    if (response.status === 200) {
      updateUserData({
        editCodes: [...userData.editCodes, {
          id: response.data.ttRoute,
          code: body.editCode
        }],
        createdTimetables: [...userData.createdTimetables || [], response.data.ttRoute]
      });
      setTtRoute(response.data.ttRoute);
      navigate(`/${response.data.ttRoute}`);
    }
  };

  const handleClick = () => {
    axios.post('api/timetable/new',
      {
        ...body,
        creator : isLoggedIn ? userData.username : ''
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(handleResponse)
      .catch(error => console.error('Error:', error));
  };

  return (
    <button onClick={handleClick} className='newTimeTable-btn' disabled={disabled}>
      Create
    </button>
  );
};

export default NewTimeTable;
