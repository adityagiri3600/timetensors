import React from 'react';
import './Created.css';

const Created = ({ttName, ttRoute}) => {
  return (
    <div className='created-container'>
      <h1>TimeTable {ttName} created successfully!</h1>
      <p>You can find it here: <a href={`/${ttRoute}`} className='ttLink'>time-track.app/{ttRoute}</a></p>
    </div>
  );
}

export default Created;