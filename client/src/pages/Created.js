import React from 'react';

const Created = ({ttName, ttRoute}) => {
  return (
    <div>
      <h1>TimeTable {ttName} created successfully!</h1>
      <h2>You can find it here: <a href={`/${ttRoute}`}>time-track.app/{ttRoute}</a></h2>
    </div>
  );
}

export default Created;