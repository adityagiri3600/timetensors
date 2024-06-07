import React from 'react';
import axios from 'axios';
import { useAuth } from '../../AuthContext';
import './newTimeTable.css';

const NewTimeTable = ({ body, setTtRoute, setCreated, disabled }) => {

  const { isLoggedIn, userData, updateUserData } = useAuth();

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
      setCreated(true);
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
